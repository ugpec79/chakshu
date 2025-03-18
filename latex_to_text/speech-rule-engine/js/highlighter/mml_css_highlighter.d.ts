import { CssHighlighter } from './css_highlighter.js';
export declare class MmlCssHighlighter extends CssHighlighter {
    constructor();
    getMactionNodes(node: HTMLElement): HTMLElement[];
    isMactionNode(node: HTMLElement): boolean;
}
