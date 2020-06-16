import countriesPhones from "./phones.json";

export type CountryCodeAndPhone = {
    countryCode: string;
    countryPhone: string;
}

// Lista de países y números
export const countriesAndPhones: CountryCodeAndPhone[] = [];

for (const [countryCode, countryPhones] of Object.entries(countriesPhones)) {
    for (const countryPhone of countryPhones) {
        countriesAndPhones.push({
            countryCode: countryCode,
            countryPhone: countryPhone
        });
    }
}

// Ordenar por número telefónico
countriesAndPhones.sort((a, b) => a.countryPhone.localeCompare(b.countryPhone));

// País del número asociado
export function countryCodeOfPhoneCode(phoneCode: string): string {
    const countryAndPhone = countriesAndPhones.find(phoneAndCountry => phoneAndCountry.countryPhone === phoneCode);
    if (countryAndPhone) {
        return countryAndPhone.countryPhone;
    }
    return undefined;
}

export function phoneCodeOfCountryCode(countryCode: string): string {
    const countryAndPhone = countriesAndPhones.find(phoneAndCountry => phoneAndCountry.countryCode === countryCode);
    if (countryAndPhone) {
        return countryAndPhone.countryPhone;
    }
    return undefined;
}

export function countryAndPhoneOfFullPhoneNumber(phoneNumber: string): CountryCodeAndPhone | undefined {
    // Coincidencia
    let matchedCountryAndPhone: CountryCodeAndPhone = undefined;

    // Por cada país y código
    for (const countryAndPhone of countriesAndPhones) {

        // Coincidencia
        if (countryAndPhone.countryPhone === phoneNumber.substr(0, countryAndPhone.countryPhone.length)) {

            // No había coincidencia anterior, o la coincidencia anterior fue de menos caracteres
            if (!matchedCountryAndPhone || countryAndPhone.countryPhone.length > matchedCountryAndPhone.countryPhone.length) {

                // Fijar coincidencia más parecida
                matchedCountryAndPhone = countryAndPhone;
            }
        }
    }

    // Retornar coincidencia
    return matchedCountryAndPhone;
}