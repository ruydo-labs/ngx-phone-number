import { Component, OnInit, Input, ElementRef, forwardRef, SimpleChanges, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatSelectChange } from '@angular/material/select';
import { countriesNames } from "../countries/countries";
import { CountryCodeAndPhone, countriesAndPhones, countryAndPhoneOfFullPhoneNumber } from "../countries-and-phones";
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

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

    public countryNames = countriesNames;
    public countriesAndPhones = countriesAndPhones;

    @Input()
    public defaultCode: string;

    @Input()
    get showCountriesNames(): boolean { return this._showCountriesNames; }
    set showCountriesNames(value: boolean) {
        this._showCountriesNames = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _showCountriesNames = true;

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

    public countryCodeAndPhone: CountryCodeAndPhone;
    public phoneNumber: string;

    public stateChanges = new Subject<void>();
    public focused = false;
    public describedBy = "";

    public onChange: (_: any) => void = (_: any) => { };
    public onTouched: () => void = () => { };
    public isString = (value: any) => typeof value === 'string';

    @ViewChild(CdkVirtualScrollViewport)
    public cdkVirtualScrollViewport: CdkVirtualScrollViewport;

    public constructor(
        private _focusMonitor: FocusMonitor,
        private _elementRef: ElementRef<HTMLElement>
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

    public ngOnInit(): void {
        // Emitir primer valor
        this.updateChanges();
    }

    public ngOnDestroy(): void {
        this.stateChanges.complete();
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.defaultCode) {
            // Código por defecto
            const defaultCode = changes.defaultCode.currentValue;

            // Buscar país y número asociado al código
            this.countryCodeAndPhone = countriesAndPhones.find(countryAndPhone => countryAndPhone.countryCode === defaultCode);
        }
    }

    public codeChanges(event: MatSelectChange): void {
        if (event.value) {
            // Actualizar cambio
            this.updateChanges();
        }
    }

    /**
     * Valor del componente
     */
    public get value(): string | undefined {
        if (this.countryCodeAndPhone && this.phoneNumber && this.phoneNumber.length > 0) {
            return this.countryCodeAndPhone.countryPhone + this.phoneNumber;
        }
        return null;
    }

    public get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    public onKeyPress(event: any): boolean {
        // Carácter agregado
        const char = String.fromCharCode(event.which);

        // Si hay caracter
        if (char) {

            // Longitud de número de pais
            const phoneCodeLength = this.countryCodeAndPhone ? this.countryCodeAndPhone.countryPhone.length : 0;
            const phoneNumberLength = this.phoneNumber ? this.phoneNumber.length : 0;

            // Si es un número y la longitud es menor o igual a 16
            if (/^\d+$/.test(char) && (phoneCodeLength + phoneNumberLength + char.length) <= 16) {
                // Agregar caracter
                return true;
            }

            // Impedir agregar caracter
            return false;
        }

        return true;
    }

    public onInput(event: InputEvent) {
        // Al escribir, actualizar valor
        this.updateChanges();
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
        if (typeof value === 'string' && value.length > 0) {

            // Código del país
            let countryAndPhone = countryAndPhoneOfFullPhoneNumber(value);

            // Si se encontró el país y el número
            if (countryAndPhone) {
                // Fijar país y número
                this.countryCodeAndPhone = countryAndPhone;

                // Fijar número
                this.phoneNumber = value.substr(this.countryCodeAndPhone.countryPhone.length);
            }

        } else if (typeof value === "undefined") {

            // Si el código actual era diferente del código por defecto
            if (this.countryCodeAndPhone.countryCode !== this.defaultCode) {
                // Quitar código actual
                this.countryCodeAndPhone = undefined;
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

    public openChange($event: boolean) {
        // Mostrar virtual scroll
        this.cdkVirtualScrollViewport.checkViewportSize();
        this.cdkVirtualScrollViewport.scrollToIndex(Math.max(countriesAndPhones.indexOf(this.countryCodeAndPhone) - 2, 0));
    }

}
