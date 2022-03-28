export class ConfirmEmailDto {
    public email: string;
    public token: string;

    public constructor(initial?: Partial<ConfirmEmailDto>) {
        Object.assign(this, initial);
    }
}
