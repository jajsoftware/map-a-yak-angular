import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LayerType, LayerTypeDescription, ModalType } from '../../models/enums';
import { DataService } from '../../services/data.service';
import { MapService } from '../../services/map.service';
import { ModalService } from '../../services/modal.service';

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
    private mapService: MapService;
    private dataService: DataService;
    private modalService: ModalService;
    private layerType: LayerType;

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

    onSave(): void {
        this.name.markAsTouched();
        this.description.markAsTouched();

        if (!this.name.valid || !this.description.valid)
            return;

        this.dataService.save(this.layerType, this.name.value, this.description.value).subscribe(error => {
            if (error)
                this.error = error as string;
            else
                location.reload();
        });
    }
}
