export class CoordinateDto {
    public latitude: number;
    public longitude: number;

    public constructor(initial?: Partial<CoordinateDto>) {
        Object.assign(this, initial);
    }
}
