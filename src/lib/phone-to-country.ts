import { countryPhone } from './phone';
import { isArray } from 'util';

export const phoneToCountry = {};

for (const [countryCode, phoneNumber] of Object.entries(countryPhone)) {

    if (typeof phoneNumber === "string") {
        // Si el número es un string, asignar código del país
        phoneToCountry[phoneNumber] = countryCode;
    } else if (isArray(phoneNumber)) {
        // Si son varios números
        for (const phoneNumber2 of phoneNumber as any) {
            // Asignar código del país
            phoneToCountry[phoneNumber2] = countryCode;
        }
    }
}