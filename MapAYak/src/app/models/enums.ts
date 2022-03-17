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
    Save = 0,
    Discard = 1,
    UserLayers = 2
}


export const LayerTypeDescription = new Map<number, string>([
    [LayerType.Route, 'Route'],
    [LayerType.Portage, 'Portage'],
    [LayerType.Campsite, 'Campsite']
]);
