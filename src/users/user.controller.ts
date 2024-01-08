import { Post, Get, Put, Delete, Body, Controller, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./models/user.interface";
import { Observable, catchError, map, of } from "rxjs";


@Controller('users')
export class UserController{
    constructor(private userService: UserService){}

    @Post('signup')
    createUser(@Body() user: User): Observable<User | object>{
       return this.userService.create(user).pipe(
        map((user: User) => user),
        catchError(err => of({error: err.message}))
       ); 
    }

    @Post('login')
    login(@Body() user: User): Observable<Object>{
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return {access_token : jwt};
            })
        )
    }
    
    @Get(':id')
    findOneUser(@Param() params): Observable<User>{
        return this.userService.findOne(params.id);
    }
    
    @Delete(':id')
    deleteUser(@Param('id') id: string): Observable<User>{
        return this.userService.deleteOne(Number(id));
    }
    
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() user: User): Observable<any>{
        return this.userService.update(Number(id), user);
    }

}