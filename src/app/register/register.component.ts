import { Component } from '@angular/core';
import { RegisterService } from '../register.service';
import { AuthRequest } from '../AuthRequest';
import { FormControl, Validators } from '@angular/forms';
import { EmailErrorStateMatcher } from '../login/EmailErrorStateMatcher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isRegisteredSuccessfull = false;

  password: string = "";

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new EmailErrorStateMatcher();

  constructor(private registerService: RegisterService) { }

  registerUser(): void {
    console.log("startingRegistering")

    if (this.emailFormControl.value !== null && this.password.length !== 0) {
      let authRequest: AuthRequest = new AuthRequest(this.emailFormControl.value, this.password);

      this.registerService.registerUser(authRequest).subscribe(apiResponse =>
        this.isRegisteredSuccessfull = (apiResponse.httpStatusCode == 200 && apiResponse.responseMessage.includes("id"))
      );
    }
  }

}
