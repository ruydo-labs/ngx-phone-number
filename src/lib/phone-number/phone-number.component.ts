import { Component, OnInit, Input, ElementRef, forwardRef, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatFormFieldControl } from '@angular/material/form-field';
import { countryName } from '../names';
import { countryPhone } from '../phone';
import { phoneToCountry } from '../phone-to-country';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatSelectChange } from '@angular/material/select';

const regex = /^[+]{1}[0-9]{1,15}$/;

@Component({
    selector: 'ngx-phone-number',
    templateUrl: './phone-number.component.html',
    styleUrls: ['./phone-number.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => PhoneNumberComponent),
        },
        {
            provide: MatFormFieldControl,
            useExisting: PhoneNumberComponent
        }
    ],
    host: {
        '[class.example-floating]': 'shouldLabelFloat',
        '[attr.aria-describedby]': 'describedBy',
    }
})
export class PhoneNumberComponent extends MatFormFieldControl<string> implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {

    public countryCodes = Object.keys(countryName).sort();
    public countryNames = countryName;
    public countryPhoneNumbers = countryPhone;
    public phoneToCountry = phoneToCountry;

    @Input()
    public defaultCode: string;

    @Input()
    public placeholder: string;

    @Input()
    get required(): boolean { return this._required; }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _required = false;

    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _disabled = false;

    public countryCode: string;
    public phoneCode: string;
    public phoneNumber: string;

    public stateChanges = new Subject<void>();
    public focused = false;
    public describedBy = "";

    public onChange: (_: any) => void = (_: any) => { };
    public onTouched: () => void = () => { };
    public isString = (value: any) => typeof value === 'string';

    public constructor(
        private _focusMonitor: FocusMonitor,
        private _elementRef: ElementRef<HTMLElement>,
    ) {
        super();

        this._focusMonitor.monitor(_elementRef, true).subscribe(origin => {
            if (this.focused && !origin) {
                this.onTouched();
            }
            this.focused = !!origin;
            this.stateChanges.next();
        });

        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }

    public ngOnInit() {

    }

    public ngOnDestroy() {
        this.stateChanges.complete();
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.defaultCode) {
            const defaultCode = changes.defaultCode.currentValue;
            const countryPhoneNumber = countryPhone[defaultCode];

            if (countryPhoneNumber) {
                this.defaultCode = countryPhoneNumber;
                this.countryCode = defaultCode;
                this.phoneCode = countryPhoneNumber;
            }
        }
    }

    public codeChanges(event: MatSelectChange): void {
        if (event.value) {
            // Cambiar código de país
            this.countryCode = phoneToCountry[event.value];

            // Actualizar cambio
            this.updateChanges();
        }
    }

    /**
     * Valor del campo
     */
    public get value(): string | undefined {
        if (this.phoneNumber) {
            return this.phoneCode + this.phoneNumber;
        }
        return undefined;
    }

    public get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    public onNumberInput(event: any): boolean {
        if (event.target.value && event.target.value.length > 0) {
            return regex.test(this.phoneCode + event.target.value);
        }
        return true;
    }

    public setDescribedByIds(ids: string[]): void {
        this.describedBy = ids.join(" ");
    }

    public onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() != 'input') {
            this._elementRef.nativeElement.querySelector('input').focus();
        }
    }

    public updateChanges() {
        this.onChange(this.value);
    }

    public writeValue(value: string): void {

        // Si el valor es un string
        if (typeof value === 'string') {

            // Código del país
            let countryCode = "";
            let phoneCode = "";

            // Por cada código de país
            for (const code of this.countryCodes) {

                // Número del país
                const countryNumber = this.countryPhoneNumbers[code];

                // Si hay número
                if (countryNumber !== undefined) {

                    // Si el número es string
                    if (typeof countryNumber === 'string') {

                        // Si la longitud es mayor que la actual
                        if (countryNumber.length > phoneCode.length) {

                            // Si el código coincide
                            if (value.substr(0, countryNumber.length) === countryNumber) {
                                // Asignar código
                                countryCode = code;
                                phoneCode = countryNumber;
                            }
                        }
                    } else if (Array.isArray(countryNumber)) {

                        // Por cada numero
                        for (const countryNumber2 of countryNumber) {

                            // Si la longitud es mayor que la actual
                            if (countryNumber2.length > phoneCode.length) {

                                // Si el código coincide
                                if (value.substr(0, countryNumber2.length) === countryNumber2) {
                                    // Asignar código
                                    phoneCode = countryNumber2;
                                }
                            }
                        }
                    }
                }
            }

            // Número telefónico
            const phoneNumber = value.substr(phoneCode.length);

            this.countryCode = countryCode;
            this.phoneCode = phoneCode;
            this.phoneNumber = phoneNumber;
        } else {

            // Si el código actual era diferente del código por defecto
            if (this.phoneCode !== this.defaultCode) {
                // Quitar código actual
                this.countryCode = undefined;
                this.phoneCode = undefined;
            }

            // Quitar número
            this.phoneNumber = undefined;
        }

        this.updateChanges();
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

}
