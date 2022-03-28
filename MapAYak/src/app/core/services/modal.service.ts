import { Injectable } from '@angular/core';
import { Modal } from 'bootstrap';
import { Subject } from 'rxjs';
import { AccountModalType, ModalType } from '../enums/core.enums';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    //==============================================================================
    // Events
    //==============================================================================
    public accountModalTypeUpdated: Subject<AccountModalType>;

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly modals: Map<ModalType, Modal>;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor() {
        this.modals = new Map<ModalType, Modal>();

        this.accountModalTypeUpdated = new Subject<AccountModalType>();
    }

    //==============================================================================
    // Public Methods
    //==============================================================================
    add(key: ModalType, modal: Element): void {
        this.modals.set(key, new Modal(modal));
    }

    open(key: ModalType): void {
        this.modals.get(key).show();
    }

    close(key: ModalType): void {
        this.modals.get(key).hide();
    }

    updateAccountModalType(type: AccountModalType): void {
        this.accountModalTypeUpdated.next(type);
    }
}
