export class ResetPasswordDto {
    public email: string;
    public password: string;
    public confirmPassword: string;
    public token: string;

    public constructor(initial?: Partial<ResetPasswordDto>) {
        Object.assign(this, initial);
    }
}
