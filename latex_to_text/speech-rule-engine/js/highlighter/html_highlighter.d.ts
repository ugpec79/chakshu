import { AbstractHighlighter, Highlight } from './abstract_highlighter.js';
export declare class HtmlHighlighter extends AbstractHighlighter {
    constructor();
    highlightNode(node: HTMLElement): Highlight;
    unhighlightNode(info: Highlight): void;
}
