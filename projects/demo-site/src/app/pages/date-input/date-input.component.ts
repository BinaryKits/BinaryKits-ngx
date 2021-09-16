import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements OnInit {
  date1 = new FormControl('', { updateOn: 'blur' })
  date2 = new FormControl()
  date3 = new FormControl()

  constructor() { }

  ngOnInit(): void {
    this.date1.valueChanges.subscribe(x => console.log(x))
  }

}
