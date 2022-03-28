import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountModal } from './account.modal';
import { ConfirmEmailComponent } from './components/confirm-email.component';
import { EmailConfirmationSentComponent } from './components/email-confirmation-sent.component';
import { ForgotPasswordComponent } from './components/forgot-password.component';
import { PasswordResetSentComponent } from './components/password-reset-sent.component';
import { RegisterComponent } from './components/register.component';
import { ResendEmailConfirmationComponent } from './components/resend-email-confirmation.component';
import { ResetPasswordConfirmationComponent } from './components/reset-password-confirmation.component';
import { ResetPasswordComponent } from './components/reset-password.component';
import { SignInComponent } from './components/sign-in.component';


@NgModule({
    declarations: [
        AccountModal,
        SignInComponent,
        RegisterComponent,
        EmailConfirmationSentComponent,
        ConfirmEmailComponent,
        ResendEmailConfirmationComponent,
        ForgotPasswordComponent,
        PasswordResetSentComponent,
        ResetPasswordComponent,
        ResetPasswordConfirmationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        AccountModal
    ]
})
export class AccountModule { }
