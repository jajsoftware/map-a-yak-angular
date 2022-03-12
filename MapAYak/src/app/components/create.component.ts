import { Component } from '@angular/core';
import { ModalType } from '../models/enums';
import { ModalService } from '../services/modal.service';

@Component({
    selector: 'create-component',
    templateUrl: './create.component.html'
})
export class CreateComponent {

    private modalService: ModalService;

    constructor(modalService: ModalService) {
        this.modalService = modalService;
    }

    showSave(): void {
    }

    showDiscard(): void {
        if (noChanges) {
            location.reload();
            return;
        }

        // MOVE THIS BUT DON'T FORGET
        this.modalService.getDiscardModalAndChangeLayerName();

        this.modalService.open(ModalType.Discard);
    }

    createRoute(): void {
    }

    createPortage(): void {
    }

    createCampsite(): void {
    }
}
