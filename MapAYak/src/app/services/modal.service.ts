import { Injectable } from '@angular/core';
import { Modal } from 'bootstrap';
import { ModalType } from '../models/enums';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    //==============================================================================
    // Data Members
    //==============================================================================
    private modals: Map<ModalType, Modal>;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor() {
        this.modals = new Map<ModalType, Modal>();
    }

    //==============================================================================
    // Public Methods
    //==============================================================================
    add(type: ModalType, modal: Element): void {
        this.modals.set(type, new Modal(modal));
    }

    open(type: ModalType): void {
        this.modals.get(type).show();
    }
}
