# ngx-mat-datepicker-simple-formatting


## Installing

    npm install @binarykits/ngx-mat-datepicker-simple-formatting

## Usage

Use this library together with Angular Material's [datepicker](https://material.angular.io/components/datepicker/overview), when you do want to:

- Avoid using the big `moment.js` and `MomentDateAdapter`
- Use `day.js` but avoid copying the code from a [customized adapter](https://github.com/tabuckner/material-dayjs-adapter/blob/master/projects/material-dayjs-adapter/src/lib/adapter/dayjs-date-adapter.ts)
- Freely set date format per field, instead of a root format injection
- User one `input` for datepicker, and another one for masked formcontrol input (with `@binarykits/ngx-mask-date`)


## Demo site

[Demo](https://stackblitz.com/edit/angular-material-date-5srxwu?file=src/app/app.component.html).
