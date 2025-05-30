import { Alphabets, Functions, Messages, Numbers, SubIso } from './messages.js';
import * as tr from './transformers.js';
export interface Locale {
    FUNCTIONS: Functions;
    MESSAGES: Messages;
    ALPHABETS: Alphabets;
    NUMBERS: Numbers;
    COMBINERS?: {
        [key: string]: tr.Combiner;
    };
    CORRECTIONS?: {
        [key: string]: (a: string) => string;
    };
    SUBISO: SubIso;
}
export declare const LOCALE: Locale;
export declare function createLocale(): Locale;
