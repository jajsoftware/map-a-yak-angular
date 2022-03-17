import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../components/app.component';
import { CreateLocationComponent } from '../components/create-location.component';
import { CreateMenuComponent } from '../components/create-menu.component';
import { CreateRouteComponent } from '../components/create-route.component';
import { MapComponent } from '../components/map.component';
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
        CreateMenuComponent,
        SaveModal,
        DiscardModal
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
