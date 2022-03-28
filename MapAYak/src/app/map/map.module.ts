import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountMenuComponent } from './components/account-menu.component';
import { CreateLocationComponent } from './components/create-location.component';
import { CreateMenuComponent } from './components/create-menu.component';
import { CreateRouteComponent } from './components/create-route.component';
import { ViewLayersComponent } from './components/view-layers.component';
import { MapComponent } from './map.component';
import { DeleteConfirmationModal } from './modals/delete-confirmation.modal';
import { DiscardModal } from './modals/discard.modal';
import { SaveModal } from './modals/save.modal';
import { UserLayersModal } from './modals/user-layers.modal';


@NgModule({
    declarations: [
        MapComponent,
        ViewLayersComponent,
        CreateRouteComponent,
        CreateLocationComponent,
        CreateMenuComponent,
        AccountMenuComponent,
        SaveModal,
        DiscardModal,
        UserLayersModal,
        DeleteConfirmationModal
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        MapComponent,
        CreateMenuComponent,
        AccountMenuComponent,
        SaveModal,
        DiscardModal,
        UserLayersModal,
        DeleteConfirmationModal
    ]
})
export class MapModule { }
