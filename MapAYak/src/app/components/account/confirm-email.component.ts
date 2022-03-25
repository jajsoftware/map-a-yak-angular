import { Component } from '@angular/core';
import { DefaultUrlSerializer, Event as NavigationEvent, NavigationStart, Router } from '@angular/router';
import { AccountModalType, ModalType } from '../../models/enums';
import { AccountService } from '../../services/account.service';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'confirm-email-component',
    templateUrl: './confirm-email.component.html'
})
export class ConfirmEmailComponent {

    //==============================================================================
    // Properties
    //==============================================================================
    public success: boolean;
    public error: string;

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly router: Router;
    private readonly accountService: AccountService;
    private readonly modalService: ModalService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(router: Router, accountService: AccountService, modalService: ModalService) {
        this.router = router;
        this.accountService = accountService;
        this.modalService = modalService;

        this.router.events.subscribe(event => this.onNewRoute(event));
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onNewRoute(route: NavigationEvent): void {
        if (!(route instanceof NavigationStart))
            return;

        var url = route.url.toLowerCase().split('?')[0];
        if (url !== '/account/confirmemail')
            return;

        this.router.navigate([]);
        this.accountService.updateAccountModalType(AccountModalType.ConfirmEmail);
        this.modalService.open(ModalType.Account);

        var parser = new DefaultUrlSerializer();
        var parsedUrl = parser.parse(route.url);

        var email = parsedUrl.queryParamMap.get('email');
        var token = parsedUrl.queryParamMap.get('token');

        if (!email || !token) {
            this.error = 'Invalid link.';
            return;
        }

        this.accountService.confirmEmail(email, token).subscribe(
            success => this.success = true,
            error => this.error = error.error);
    }

    onReturnHome(): void {
        this.modalService.close(ModalType.Account);
    }
}
