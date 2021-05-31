import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName: any;
  confirmCode: boolean = false;
  codeWasConfirmed: boolean = false;

  constructor(private router: Router,
    private amplifyService: AmplifyService,
    private zone: NgZone) { }

  ngOnInit(): void {
    // if(Auth.currentAuthenticatedUser() != null){
    //   this.router.navigate(['/dashboard'], { replaceUrl: true })
    // }
  }

  async register(form: NgForm){
    const email = form.value.email;
    this.userName = email;
    const password = form.value.password;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    try{
      const {user} = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
          given_name: firstName,
          family_name: lastName
        }
      });
      this.confirmCode = true;
      console.log(user);
      
    }catch(error){
      console.log('error confirming sign up ', error);
    }
  }

  async validateAuthCode(form: NgForm) {
    const code = form.value.code;
    try{
      await Auth.confirmSignUp(this.userName, code);
      this.codeWasConfirmed = true;
      this.confirmCode = false;
    }catch(error){
      console.log('error confirming sign up ', error);
    }
    
  }

}
