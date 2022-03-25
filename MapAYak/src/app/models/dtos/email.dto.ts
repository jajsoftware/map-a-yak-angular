export class EmailDto {
    public email: string;

    public constructor(initial?: Partial<EmailDto>) {
        Object.assign(this, initial);
    }
}
