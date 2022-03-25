import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ConfirmEmailDto } from '../models/dtos/confirm-email.dto';
import { EmailDto } from '../models/dtos/email.dto';
import { RegisterDto } from '../models/dtos/register.dto';
import { ResetPasswordDto } from '../models/dtos/reset-password.dto';
import { SignInDto } from '../models/dtos/sign-in.dto';
import { AccountModalType } from '../models/enums';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    //==============================================================================
    // Events
    //==============================================================================
    public accountModalTypeUpdated: Subject<AccountModalType>;

    //==============================================================================
    // Properties
    //==============================================================================
    public userName: string;

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly http: HttpClient;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(http: HttpClient) {
        this.http = http;

        this.accountModalTypeUpdated = new Subject<AccountModalType>();

        this.userName = window.sessionStorage.getItem('userName');
    }

    //==============================================================================
    // Public Methods
    //==============================================================================
    updateAccountModalType(type: AccountModalType): void {
        this.accountModalTypeUpdated.next(type);
    }

    signIn(email: string, password: string, rememberPassword: boolean): Observable<any> {
        var dto = new SignInDto({
            email: email,
            password: password,
            rememberPassword: rememberPassword
        });

        return this.http.post<any>('/api/Account/SignIn', dto).pipe(
            tap(data => {
                this.userName = data.userName;
                window.sessionStorage.setItem('userName', data.userName);
            }));
    }

    signOut(): Observable<any> {
        return this.http.get<any>('/api/Account/SignOutUser').pipe(
            tap(() => {
                this.userName = null;
                window.sessionStorage.removeItem('userName');
            }));
    }

    register(email: string, userName: string, password: string, confirmPassword: string): Observable<any> {
        var dto = new RegisterDto({
            email: email,
            userName: userName,
            password: password,
            confirmPassword: confirmPassword
        });

        return this.http.post<any>('/api/Account/Register', dto);
    }

    confirmEmail(email: string, token: string): Observable<any> {
        var dto = new ConfirmEmailDto({
            email: email,
            token: token
        });

        return this.http.post<any>('/api/Account/ConfirmEmail', dto).pipe(
            tap(data => {
                this.userName = data.userName;
                window.sessionStorage.setItem('userName', data.userName);
            }));
    }

    resendEmailConfirmation(email: string): Observable<any> {
        var dto = new EmailDto({
            email: email
        });

        return this.http.post<any>('/api/Account/ResendEmailConfirmation', dto);
    }

    forgotPassword(email: string): Observable<any> {
        var dto = new EmailDto({
            email: email
        });

        return this.http.post<any>('/api/Account/ForgotPassword', dto);
    }

    resetPassword(email: string, password: string, confirmPassword: string, token: string): Observable<any> {
        var dto = new ResetPasswordDto({
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            token: token
        });

        return this.http.post<any>('/api/Account/ResetPassword', dto);
    }
}
