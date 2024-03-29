import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable, from, of } from "rxjs";
import { User } from "src/users/models/user.interface";
const bcrypt = require('bcrypt')


@Injectable()
export class AuthService{
    constructor(
    private readonly jwtService: JwtService     
    ){}
    
    generateJwt(user: User): Observable<string>{
        return from(this.jwtService.signAsync({user}));
    }

    hashPass(password: string): Observable<string>{
        return from<string>(bcrypt.hash(password, 12));
    }

    comparePass(newPassword: string, passwordHash: string): Observable<any | boolean>{
        return from<any | boolean>(bcrypt.compare(newPassword, passwordHash))
    }
 
}  


