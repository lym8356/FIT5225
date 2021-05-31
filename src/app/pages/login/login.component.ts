import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailVerificationMessage: boolean = false;

  constructor(private _router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  async onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    try{
      const user = await Auth.signIn(email, password);
      const token = await (await Auth.currentSession()).getIdToken().getJwtToken();
      this._router.navigateByUrl('/dashboard');
      
    }catch(error){
      console.log('error signing in', error);
      this.emailVerificationMessage = true;
    }
  }

}

      // // this._router.navigateByUrl('/dashboard');
      // console.log(token);
      // this.http.get<any>('https://ndag0l94w4.execute-api.us-east-1.amazonaws.com/test/testAuth', {
      //   responseType: 'json',
      //   headers: new HttpHeaders({
      //     // 'Content-Type': 'application/json',
      //     Authorization: token
      //   })
      // }).subscribe(
      //   response => {
      //     console.log(response);
      //   },
      //   error => {
      //     console.log(error)
      //   }
      // )
