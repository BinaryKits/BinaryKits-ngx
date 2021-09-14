import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ngx-mask-date-demo',
  templateUrl: './ngx-mask-date-demo.component.html',
  styleUrls: ['./ngx-mask-date-demo.component.scss']
})
export class NgxMaskDateDemoComponent implements OnInit {
  date1 = new FormControl('', Validators.required)
  date2 = new FormControl('', Validators.required)

  constructor() { }

  ngOnInit(): void {
  }

}
