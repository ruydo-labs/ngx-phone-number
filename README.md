# NgxPhoneNumber

A component for picking phone numbers, that is compatible with Angular Material

## Usage

Import the module

```typescript
import { NgxPhoneNumberModule } from "@ruydo/ngx-phone-number";
```

Use it in the view

```html
<mat-form-field class="w-full" appearance="outline">
  <mat-label>
    {{ "phoneNumber" | translate }}
  </mat-label>
  <ngx-phone-number
    name="phoneNumber"
    [(ngModel)]="model.phoneNumber"
    (onChange)="phoneNumberChanges($event)"
    placeholder="{{ '$phoneNumberPlaceholder' | translate }}"
    defaultCode="CL"
  ></ngx-phone-number>
</mat-form-field>
```
