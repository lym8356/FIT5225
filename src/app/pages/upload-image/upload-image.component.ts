import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  private S3: any;
  private UPLOAD_FOLDER = 'test/';
  private BUCKET_NAME = ''
  private SELECTED_FILE: any;
  private EXPIRE = 3600;
  private signedUrl: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.S3 = new AWS.S3();
  }

  public async onFileSelected(event:any) {
    this.SELECTED_FILE = <File> event.target.files[0];
  }

  async onUpload() {

    const token = await (await Auth.currentSession()).getIdToken().getJwtToken();
    const currentUser = await Auth.currentAuthenticatedUser();
    // console.log(currentUser.username);
    let headers = new HttpHeaders({
      'Authorization': token
    });
    let options = {headers: headers}
    let body = { fileName: this.SELECTED_FILE.name, fileType: this.SELECTED_FILE.type, user_id: currentUser.username };
    // console.log(body);
    // this.signedUrl = await this.http.post('https://dnfy70d7pk.execute-api.us-east-1.amazonaws.com/default/getPresignedURL', 
    // JSON.stringify(body)).toPromise();
    this.signedUrl = await this.http.post('https://ekno7nx585.execute-api.us-east-1.amazonaws.com/dev/upload-image',
    JSON.stringify(body), options).toPromise();
    console.log(this.signedUrl.signedUrl);
    // const upload = this.http.put(this.signedUrl.signedUrl, this.SELECTED_FILE, {headers: new HttpHeaders({
    //   'Content-Type': this.SELECTED_FILE.type
    // })}).toPromise();
    const upload = this.http.put(this.signedUrl.signedUrl, this.SELECTED_FILE, options).toPromise();
    upload.then(data => {
      console.log('=>', data)
    }).catch(err => console.log('error', err))

  }

}