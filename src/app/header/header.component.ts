import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { CognitoService } from '../cognito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router,
    public _auth: CognitoService) { }

  ngOnInit(): void {
  }

  async logout(){
    try{
      await Auth.signOut({global:true});
      this._router.navigateByUrl('/login');
      console.log("logged out");
    }catch (error){
      console.log('error signing out: ', error);
    }
  }

}
