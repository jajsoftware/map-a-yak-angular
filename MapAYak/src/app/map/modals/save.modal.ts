import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService, LayerType, LayerTypeDescription, MapService, ModalService, ModalType, UserLayerDto } from '@app/core';

@Component({
    selector: 'save-modal',
    templateUrl: './save.modal.html'
})
export class SaveModal implements OnInit {

    //==============================================================================
    // Properties
    //==============================================================================
    public name: FormControl;
    public description: FormControl;
    public type: string;
    public error: string;

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly mapService: MapService;
    private readonly dataService: DataService;
    private readonly modalService: ModalService;
    private layerType: LayerType;
    private existingLayer: boolean;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(mapService: MapService, dataService: DataService, modalService: ModalService) {
        this.mapService = mapService;
        this.dataService = dataService;
        this.modalService = modalService;

        this.name = new FormControl('', [Validators.required, Validators.maxLength(100)]);
        this.description = new FormControl('', Validators.maxLength(10000));

        this.mapService.layerCreated.subscribe(layerType => this.onLayerCreated(layerType));
        this.mapService.userLayerEdited.subscribe(layer => this.onEditUserLayer(layer));
    }

    //==============================================================================
    // Overrides
    //==============================================================================
    ngOnInit(): void {
        this.modalService.add(ModalType.Save, document.getElementById('saveModal'));
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onLayerCreated(layerType: LayerType): void {
        this.layerType = layerType;
        this.type = LayerTypeDescription.get(layerType);
    }

    onEditUserLayer(layer: UserLayerDto): void {
        this.existingLayer = true;

        this.name.reset(layer.name);
        this.description.reset(layer.description);

        this.name.disable();
    }

    onSave(): void {
        this.name.markAsTouched();
        this.description.markAsTouched();

        if (this.name.invalid || this.description.invalid)
            return;

        if (this.existingLayer) {
            this.dataService.update(this.layerType, this.name.value, this.description.value).subscribe(
                success => location.reload(),
                error => this.error = error.error);
        }
        else {
            this.dataService.save(this.layerType, this.name.value, this.description.value).subscribe(
                success => location.reload(),
                error => this.error = error.error);
        }
    }
}
