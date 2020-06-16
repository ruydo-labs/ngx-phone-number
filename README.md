# NgxPhoneNumber

A component for picking phone numbers, that is compatible with Angular Material

## Data source

It is using data from the following sources

```
http://country.io/data/
https://stefangabos.github.io/world_countries/
```

The IP geolocation data is provided by https://www.ip2location.com

## Usage

Copy the assets into your Angular project.

```json
"assets": [
  "src/favicon.ico",
  "src/assets",
  {
    "glob": "**/*",
    "input": "node_modules/@ruydo/ngx-phone-number/assets/images/flags/",
    "output": "assets/images/flags/"
  }
],
```

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
