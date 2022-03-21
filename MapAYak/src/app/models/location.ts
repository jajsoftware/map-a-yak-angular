import { LocationType } from "./enums";

export class Location {
    public userId: string;
    public userName: string;
    public type: LocationType;
    public name: string;
    public description: string;
    public latitude: number;
    public longitude: number;
}
