import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-query-by-tag',
  templateUrl: './query-by-tag.component.html',
  styleUrls: ['./query-by-tag.component.css']
})
export class QueryByTagComponent implements OnInit {

  cocoNames = [
    "person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat", "traffic light", "fire hydrant",
    "stop sign", "parking meter", "bench", "bird", "cat", "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra",
    "giraffe", "backpack", "umbrella", "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite",
    "baseball bat", "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup", "fork", "knife",
    "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake", "chair",
    "sofa", "pottedplant", "bed", "diningtable", "toilet", "tvmonitor", "laptop", "mouse", "remote", "keyboard", "cell phone",
    "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors", "teddy bear", "hair driertoothbrush"
  ]

  myForm:FormGroup | any;
  disabled = false;
  ShowFilter = true;
  limitSelection = false;
  tags: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  selectedTags: any = {};
  responseURL: any = [];
  constructor(private fb: FormBuilder,
    private http: HttpClient) {}

  ngOnInit() {

      for (let index = 0; index < this.cocoNames.length; index++) {
        this.tags[index] = {item_id: index, item_text: this.cocoNames[index]}
      }
      this.dropdownSettings = {
          singleSelection: false,
          idField: 'item_id',
          textField: 'item_text',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 5,
          allowSearchFilter: this.ShowFilter
      };
      this.myForm = this.fb.group({
          tags: [this.selectedItems]
      });
  }

  onItemSelect(item: any) {
      console.log('onItemSelect', item);
  }
  onSelectAll(items: any) {
      console.log('onSelectAll', items);
  }
  toogleShowFilter() {
      this.ShowFilter = !this.ShowFilter;
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  handleLimitSelection() {
      if (this.limitSelection) {
          this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
      } else {
          this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
      }
  }

  async onSubmit(){
    // this.selectedItems = JSON.stringify(this.myForm.value.tags.map((v: { item_text: any; })=> v.item_text));
    this.selectedItems ={"tags": this.myForm.value.tags.map((v: { item_text: any; })=> v.item_text)};
    // console.log(this.selectedItems);
    const token = await (await Auth.currentSession()).getIdToken().getJwtToken();
    // console.log(token);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let options = {headers: headers}

    this.http.post<any>('https://ekno7nx585.execute-api.us-east-1.amazonaws.com/dev/query-by-tags', this.selectedItems, options).subscribe(
    response => {
      this.responseURL = JSON.parse(response.body);
      console.log(this.responseURL.links);
    },
    error => {
      console.log(error)
    })
  }
}
