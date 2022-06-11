import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError,tap } from "rxjs/operators";
import { User } from "./user.model"


export interface AuthResponseData{
    email:string,
    token:string,
    _id: string,
    expiresIn : number
}

@Injectable({
    providedIn:'root'
})
export class AuthService {

    constructor(private http :HttpClient,
                private router : Router){}

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer : any;

    signup(userData){
        return this.http
            .post<AuthResponseData>('http://localhost:3000/users/signup/',userData)  
            .pipe(catchError(this.handleError),
                  tap(resData =>{
                    this.handleAuthentication(resData['data'].rec.email,resData['data'].rec._id,resData['data'].rec.token,resData['data'].rec.expiresIn)

                  }))         

    }

    login(userData){
        console.log(userData)
        return this.http
            .post<AuthResponseData>('http://localhost:3000/users/login/',userData)
            .pipe(catchError(this.handleError),
            tap(resData =>{
                console.log(resData['data'].rec.email)
                this.handleAuthentication(resData['data'].rec.email,resData['data'].rec._id,resData['data'].rec.token,resData['data'].rec.expiresIn)

            }))         
    }

    autoLogin(){
        const user : {
            email:string,
            _id : string,
            _token : string,
            expirationDate : string

        } = JSON.parse(localStorage.getItem('userData'))

        if(!user){
            return;
        }

        const loadedUser = new User(user.email,user._id,user._token , new Date(user.expirationDate))

        if(loadedUser.token){
            this.user.next(loadedUser)
            const expirationTime = new Date(user.expirationDate).getTime() - new Date().getTime()
            this.autoLogout(expirationTime);
        }
        
    }


    logout(){
        this.user.next(null);
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDate : number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout()
        }, expirationDate);

    }
    private handleError(errResp){
        console.log("In error handle")
        let errorMessage = 'An unknown error has occured'
        console.log(errResp.error)
        if(!errResp.error ){
            return throwError(errorMessage)
        }else{
            console.log("handling error")
            return throwError(errResp.error.message)
        }    
    }

    private handleAuthentication(email:string, _id:string, token:string, expiresIn:number){
        
        const user = new User(email,_id,token, new Date(new Date().getTime() + expiresIn * 1000))
        this.user.next(user)
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userData' ,JSON.stringify(user))

    }
}

