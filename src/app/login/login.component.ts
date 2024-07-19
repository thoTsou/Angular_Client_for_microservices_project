import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { AuthRequest } from '../AuthRequest';
import { FormControl, Validators } from '@angular/forms';
import { EmailErrorStateMatcher } from './EmailErrorStateMatcher';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  showQuotesComponent = false;

  password: string = "";

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new EmailErrorStateMatcher();

  constructor(private loginService: LoginService) { }

  loginUser(): void {

    console.log("startLogin");

    if (this.emailFormControl.value !== null && this.password.length !== 0) {
      let authRequest: AuthRequest = new AuthRequest(this.emailFormControl.value, this.password);

      this.loginService.loginUser(authRequest).subscribe(_ => 
        this.showQuotesComponent = (this.loginService.ACCESS_TOKEN.length !== 0)
      );
    }
  }

}
