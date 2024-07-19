export class LoginApiResponse {

   constructor(public httpStatusCode: number, public responseMessage: string, public accessToken: string) {}

}