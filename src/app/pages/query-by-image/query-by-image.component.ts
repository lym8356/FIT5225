import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-query-by-image',
  templateUrl: './query-by-image.component.html',
  styleUrls: ['./query-by-image.component.css']
})
export class QueryByImageComponent implements OnInit {

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
    let params = { Bucket: this.BUCKET_NAME, Key: this.UPLOAD_FOLDER+this.SELECTED_FILE.name, 
      ContentType: this.SELECTED_FILE.type, ACL: 'public-read', Body: this.SELECTED_FILE};
    let body = { fileName: this.SELECTED_FILE.name, fileType: this.SELECTED_FILE.type, user_id: "haha" };
    console.log(body);
    // this.signedUrl = await this.http.post('https://dnfy70d7pk.execute-api.us-east-1.amazonaws.com/default/getPresignedURL', 
    // JSON.stringify(body)).toPromise();
    this.signedUrl = await this.http.post('https://sz3oj9cwjb.execute-api.us-east-1.amazonaws.com/default/testPython', 
    JSON.stringify(body)).toPromise();
    console.log(this.signedUrl.signedUrl);
    const upload = this.http.put(this.signedUrl.signedUrl, this.SELECTED_FILE).toPromise();
    upload.then(data => {
      console.log('=>', data)
    }).catch(err => console.log('error', err))

  }
}
