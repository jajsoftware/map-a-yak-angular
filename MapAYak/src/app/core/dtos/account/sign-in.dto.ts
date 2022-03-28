export class SignInDto {
    public email: string;
    public password: string;
    public rememberPassword: boolean;

    public constructor(initial?: Partial<SignInDto>) {
        Object.assign(this, initial);
    }
}
