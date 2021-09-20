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
  date3 = new FormControl('2012-02-15')

  constructor() { }

  ngOnInit(): void {
    this.date1.valueChanges.subscribe(x => this.log('date1', x))
    this.date2.valueChanges.subscribe(x => this.log('date2', x))
    this.date3.valueChanges.subscribe(x => this.log('date3', x))
  }

  log(name: string, value: any): void {
    console.log(name, value)
  }
}
