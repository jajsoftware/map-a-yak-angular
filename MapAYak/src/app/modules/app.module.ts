import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../components/app.component';
import { CreateComponent } from '../components/create.component';
import { DiscardModal } from '../components/modals/discard.modal';

@NgModule({
    declarations: [
        AppComponent,
        CreateComponent,
        DiscardModal
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
