import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { PhoneNumberComponent } from './phone-number/phone-number.component';

@NgModule({
    declarations: [
        PhoneNumberComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ScrollingModule
    ],
    exports: [
        PhoneNumberComponent
    ]
})
export class NgxPhoneNumberModule { }
