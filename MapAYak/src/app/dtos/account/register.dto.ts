export class RegisterDto {
    public email: string;
    public userName: string;
    public password: string;
    public confirmPassword: string;

    public constructor(initial?: Partial<RegisterDto>) {
        Object.assign(this, initial);
    }
}
