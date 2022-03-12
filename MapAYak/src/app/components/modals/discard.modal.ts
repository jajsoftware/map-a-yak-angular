import { Component, OnInit } from '@angular/core';
import { ModalType } from '../../models/enums';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'discard-modal',
    templateUrl: './discard.modal.html'
})
export class DiscardModal implements OnInit {

    public layerName: string;

    private modalService: ModalService;

    constructor(modalService: ModalService) {
        this.modalService = modalService;
        this.layerName = "REPLACE";
    }

    ngOnInit(): void {
        this.modalService.add(ModalType.Discard, document.getElementById('discardModal'));
    }

    discard(): void {
        location.reload();
    }
}
