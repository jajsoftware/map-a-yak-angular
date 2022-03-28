import { LayerType } from "../../enums/core.enums";

export class UserLayerDto {
    public type: LayerType;
    public name: string;
    public description: string;
    public markerPath: string;

    public constructor(initial?: Partial<UserLayerDto>) {
        Object.assign(this, initial);
    }
}
