import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/models/user.entity';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { User } from './models/user.interface';
import { AuthService } from 'src/auth/auth.service';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  create(user: User): Observable<User> {
    return this.authService.hashPass(user.password).pipe(
      switchMap((passwordHash: string) => {
        const newUser = new UserEntity();
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.email = user.email;
        newUser.password = passwordHash;

        return from(this.userRepository.save(newUser)).pipe(
          map((user: User) => {
            const { password, ...result } = user;
            return result;
          }),
          catchError((err) => throwError(err)),
        );
      }),
    );
  }

  findOne(id: number): Observable<User> {
    return from(this.userRepository.findOne({ where: { id: id } })).pipe(
      map((user: User) => {
        const { password, ...result } = user;
        return result;
      }),
    );
  }

  findByEmail(email: string): Observable<User> {
    return from(this.userRepository.findOne({ where: { email: email } }));
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepository.delete(id));
  }

  update(id: number, user: User): Observable<any> {
    delete user.email;
    delete user.password;

    return from(this.userRepository.update(id, user));
  }

  login(user: User): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: User) =>{
        if(user){
          return this.authService.generateJwt(user).pipe(map((jwt: string) => jwt))
        } else {
          return 'Wrong email | password'
        }
      })
    );
  }

  validateUser(email: string, password: string): Observable<User> {
    return this.findByEmail(email).pipe(
      switchMap((user: User) => this.authService.comparePass(password, user.password).pipe(
        map((match: boolean) => {
          if(match) {
            const {password, ...result} = user;
            return result;
          } else {
            throw error; 
          }
        })
      ))
    );
  }
}
