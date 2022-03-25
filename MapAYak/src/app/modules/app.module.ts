import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AccountMenuComponent } from '../components/account-menu.component';
import { ConfirmEmailComponent } from '../components/account/confirm-email.component';
import { EmailConfirmationSentComponent } from '../components/account/email-confirmation-sent.component';
import { ForgotPasswordComponent } from '../components/account/forgot-password.component';
import { PasswordResetSentComponent } from '../components/account/password-reset-sent.component';
import { RegisterComponent } from '../components/account/register.component';
import { ResendEmailConfirmationComponent } from '../components/account/resend-email-confirmation.component';
import { ResetPasswordConfirmationComponent } from '../components/account/reset-password-confirmation.component';
import { ResetPasswordComponent } from '../components/account/reset-password.component';
import { SignInComponent } from '../components/account/sign-in.component';
import { AppComponent } from '../components/app.component';
import { CreateLocationComponent } from '../components/create-location.component';
import { CreateMenuComponent } from '../components/create-menu.component';
import { CreateRouteComponent } from '../components/create-route.component';
import { MapComponent } from '../components/map.component';
import { AccountModal } from '../components/modals/account.modal';
import { DiscardModal } from '../components/modals/discard.modal';
import { SaveModal } from '../components/modals/save.modal';
import { ViewLayersComponent } from '../components/view-layers.component';


@NgModule({
    declarations: [
        AppComponent,
        MapComponent,
        ViewLayersComponent,
        CreateRouteComponent,
        CreateLocationComponent,
        AccountMenuComponent,
        CreateMenuComponent,
        AccountModal,
        SaveModal,
        DiscardModal,
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
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', component: AppComponent },
            { path: '**', redirectTo: '' }
        ])
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
