import { Injectable } from '@angular/core';
import { Hub, Auth } from 'aws-amplify';



@Injectable({
  providedIn: 'root'
})

export class CognitoService {

  constructor() { }

  isLoggedIn() {
    // return false;
    return Auth.currentAuthenticatedUser().then(user => {
      if(user){
        console.log("user logged in");
        return true;
      }else {
        console.log("user not logged in");
        return false;
      }
    });
  }

  async getAuthenticatedUser() {
    return await Auth.currentAuthenticatedUser();
  }
}
