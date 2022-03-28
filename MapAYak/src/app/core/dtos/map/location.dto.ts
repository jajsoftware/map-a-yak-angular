import { LocationType } from "../../enums/core.enums";

export class LocationDto {
    public userName: string;
    public type: LocationType;
    public name: string;
    public description: string;
    public latitude: number;
    public longitude: number;

    public constructor(initial?: Partial<LocationDto>) {
        Object.assign(this, initial);
    }
}
