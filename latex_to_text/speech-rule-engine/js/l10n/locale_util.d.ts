import { Combiner } from './transformers.js';
export declare function nestingToString(count: number): string;
export declare function combinePostfixIndex(postfix: string, index: string): string;
export declare function localFont(font: string): string;
export declare function localRole(role: string): string;
export declare function localEnclose(enclose: string): string;
export declare function localeFontCombiner(font: string | [string, string]): {
    font: string;
    combiner: Combiner;
};
