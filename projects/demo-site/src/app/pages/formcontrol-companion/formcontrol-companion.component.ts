import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { iterateAllChildControls } from 'ngx-formcontrol-companion';

@Component({
  selector: 'app-formcontrol-companion',
  templateUrl: './formcontrol-companion.component.html',
  styleUrls: ['./formcontrol-companion.component.scss']
})
export class FormcontrolCompanionComponent implements OnInit {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    addresses: this.fb.array([this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
      aliases: this.fb.array([
        this.fb.control(''),
        this.fb.control('')
      ]),
    }), this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    })])
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    for (const c of iterateAllChildControls(this.form)) {
      console.log(c)
    }
  }
}
