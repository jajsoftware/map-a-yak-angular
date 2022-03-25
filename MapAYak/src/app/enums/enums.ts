export enum LayerType {
    Route = 0,
    Portage = 1,
    Campsite = 2
}

export enum LocationType {
    Portage = 0,
    Campsite = 1
}

export enum ModalType {
    Account = 0,
    Save = 1,
    Discard = 2,
    UserLayers = 3
}

export enum AccountModalType {
    SignIn = 0,
    Register = 1,
    EmailConfirmationSent = 2,
    ConfirmEmail = 3,
    ResendEmailConfirmation = 4,
    ForgotPassword = 5,
    PasswordResetSent = 6,
    ResetPassword = 7,
    ResetPasswordConfirmation = 8
}


export const LayerTypeDescription = new Map<number, string>([
    [LayerType.Route, 'Route'],
    [LayerType.Portage, 'Portage'],
    [LayerType.Campsite, 'Campsite']
]);
