import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ngx-mat-datepicker-simple-formatting-demo',
  templateUrl: './ngx-mat-datepicker-simple-formatting-demo.component.html',
  styleUrls: ['./ngx-mat-datepicker-simple-formatting-demo.component.scss']
})
export class NgxMatDatepickerSimpleFormattingDemoComponent implements OnInit {
  date1 = new FormControl()
  date2 = new FormControl()

  constructor() { }

  ngOnInit(): void {
  }

}
