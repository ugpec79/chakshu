import * as DomUtil from '../common/dom_util.js';
import * as XpathUtil from '../common/xpath_util.js';
import { ColorPicker } from './color_picker.js';
import { SvgHighlighter } from './svg_highlighter.js';
export class SvgV3Highlighter extends SvgHighlighter {
    constructor() {
        super();
        this.mactionName = 'maction';
    }
    highlightNode(node) {
        let info;
        if (this.isHighlighted(node)) {
            info = {
                node: node,
                background: this.colorString().background,
                foreground: this.colorString().foreground
            };
            return info;
        }
        if (node.tagName === 'svg' || node.tagName === 'MJX-CONTAINER') {
            info = {
                node: node,
                background: node.style.backgroundColor,
                foreground: node.style.color
            };
            node.style.backgroundColor = this.colorString().background;
            node.style.color = this.colorString().foreground;
            return info;
        }
        const rect = DomUtil.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('sre-highlighter-added', 'true');
        const padding = 40;
        const bbox = node.getBBox();
        rect.setAttribute('x', (bbox.x - padding).toString());
        rect.setAttribute('y', (bbox.y - padding).toString());
        rect.setAttribute('width', (bbox.width + 2 * padding).toString());
        rect.setAttribute('height', (bbox.height + 2 * padding).toString());
        const transform = node.getAttribute('transform');
        if (transform) {
            rect.setAttribute('transform', transform);
        }
        rect.setAttribute('fill', this.colorString().background);
        node.setAttribute(this.ATTR, 'true');
        node.parentNode.insertBefore(rect, node);
        info = { node: node, foreground: node.getAttribute('fill') };
        if (node.nodeName === 'rect') {
            const picker = new ColorPicker({ alpha: 0, color: 'black' });
            node.setAttribute('fill', picker.rgba().foreground);
        }
        else {
            node.setAttribute('fill', this.colorString().foreground);
        }
        return info;
    }
    unhighlightNode(info) {
        const previous = info.node.previousSibling;
        if (previous && previous.hasAttribute('sre-highlighter-added')) {
            info.foreground
                ? info.node.setAttribute('fill', info.foreground)
                : info.node.removeAttribute('fill');
            info.node.parentNode.removeChild(previous);
            return;
        }
        info.node.style.backgroundColor = info.background;
        info.node.style.color = info.foreground;
    }
    isMactionNode(node) {
        return node.getAttribute('data-mml-node') === this.mactionName;
    }
    getMactionNodes(node) {
        return Array.from(XpathUtil.evalXPath(`.//*[@data-mml-node="${this.mactionName}"]`, node));
    }
}
