import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AccountModule } from '@app/account';
import { CoreModule } from '@app/core';
import { MapModule } from '@app/map';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        MapModule,
        AccountModule,
        CoreModule,
        RouterModule.forRoot([
            { path: '', component: AppComponent },
            { path: '**', redirectTo: '' }
        ])
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
