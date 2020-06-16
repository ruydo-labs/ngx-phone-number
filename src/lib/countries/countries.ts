import countries from "./countries.json";

export type LanguageCode = "AF" | "AM" | "AR" | "AZ" | "BE" | "BG" | "BN" | "BO" | "CA" | "CS" | "CY" | "DA" | "DE" | "EE" | "EL" | "EN" | "EO" | "ES" | "ET" | "EU" | "FA" | "FI" | "FO" | "FR" | "GA" | "GL" | "GU" | "HE" | "HI" | "HR" | "HU" | "HY" | "IA" | "ID" | "IS" | "IT" | "JA" | "KA" | "KI" | "KM" | "KN" | "KO" | "LG" | "LO" | "LT" | "LV" | "MK" | "ML" | "MR" | "MS" | "MT" | "MY" | "NB" | "NE" | "NL" | "NN" | "NO" | "OR" | "PL" | "PT" | "RM" | "RO" | "RU" | "SE" | "SK" | "SL" | "SN" | "SQ" | "SR" | "SV" | "TA" | "TE" | "TH" | "TI" | "TL" | "TR" | "UK" | "UR" | "VI" | "ZH-CN" | "ZH-TW";
export const languageCodes: LanguageCode[] = ["AF", "AM", "AR", "AZ", "BE", "BG", "BN", "BO", "CA", "CS", "CY", "DA", "DE", "EE", "EL", "EN", "EO", "ES", "ET", "EU", "FA", "FI", "FO", "FR", "GA", "GL", "GU", "HE", "HI", "HR", "HU", "HY", "IA", "ID", "IS", "IT", "JA", "KA", "KI", "KM", "KN", "KO", "LG", "LO", "LT", "LV", "MK", "ML", "MR", "MS", "MT", "MY", "NB", "NE", "NL", "NN", "NO", "OR", "PL", "PT", "RM", "RO", "RU", "SE", "SK", "SL", "SN", "SQ", "SR", "SV", "TA", "TE", "TH", "TI", "TL", "TR", "UK", "UR", "VI", "ZH-CN", "ZH-TW"];

// Country data type
export type CountryData = {
    alpha2: string;
    name: string;
}

// Countries data type
export type CountriesData = CountryData[];

// Countries in various languages
export const countriesData = countries as CountryData[];

// Countries names
export const countriesNames = {} as { [key in LanguageCode]: string };

for (const country of countries) {
    countriesNames[country.alpha2] = country.name;
}

// List of country codes
export const countriesAlpha2: string[] = countries.map(country => country.alpha2);