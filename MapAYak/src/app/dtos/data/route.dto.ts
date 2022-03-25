import { CoordinateDto } from "./coordinate.dto";

export class RouteDto {
    public userName: string;
    public name: string;
    public description: string;
    public coordinates: CoordinateDto[];

    public constructor(initial?: Partial<RouteDto>) {
        Object.assign(this, initial);
    }
}
