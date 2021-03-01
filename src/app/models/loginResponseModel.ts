export class LoginResponseModel {
    constructor(
        public token: string,
        public expiration: string
    ) { }
}