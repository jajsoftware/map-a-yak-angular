import { LocationType } from "./enums";

export class Location {
    public UserId: string;
    public LocationType: LocationType;
    public Name: string;
    public Description: string;
    public Latitude: number;
    public Longitude: number;
}
