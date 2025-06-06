import * as DomUtil from '../common/dom_util.js';
export var MMLTAGS;
(function (MMLTAGS) {
    MMLTAGS["ANNOTATION"] = "ANNOTATION";
    MMLTAGS["ANNOTATIONXML"] = "ANNOTATION-XML";
    MMLTAGS["MACTION"] = "MACTION";
    MMLTAGS["MALIGNGROUP"] = "MALIGNGROUP";
    MMLTAGS["MALIGNMARK"] = "MALIGNMARK";
    MMLTAGS["MATH"] = "MATH";
    MMLTAGS["MENCLOSE"] = "MENCLOSE";
    MMLTAGS["MERROR"] = "MERROR";
    MMLTAGS["MFENCED"] = "MFENCED";
    MMLTAGS["MFRAC"] = "MFRAC";
    MMLTAGS["MGLYPH"] = "MGLYPH";
    MMLTAGS["MI"] = "MI";
    MMLTAGS["MLABELEDTR"] = "MLABELEDTR";
    MMLTAGS["MMULTISCRIPTS"] = "MMULTISCRIPTS";
    MMLTAGS["MN"] = "MN";
    MMLTAGS["MO"] = "MO";
    MMLTAGS["MOVER"] = "MOVER";
    MMLTAGS["MPADDED"] = "MPADDED";
    MMLTAGS["MPHANTOM"] = "MPHANTOM";
    MMLTAGS["MPRESCRIPTS"] = "MPRESCRIPTS";
    MMLTAGS["MROOT"] = "MROOT";
    MMLTAGS["MROW"] = "MROW";
    MMLTAGS["MS"] = "MS";
    MMLTAGS["MSPACE"] = "MSPACE";
    MMLTAGS["MSQRT"] = "MSQRT";
    MMLTAGS["MSTYLE"] = "MSTYLE";
    MMLTAGS["MSUB"] = "MSUB";
    MMLTAGS["MSUBSUP"] = "MSUBSUP";
    MMLTAGS["MSUP"] = "MSUP";
    MMLTAGS["MTABLE"] = "MTABLE";
    MMLTAGS["MTD"] = "MTD";
    MMLTAGS["MTEXT"] = "MTEXT";
    MMLTAGS["MTR"] = "MTR";
    MMLTAGS["MUNDER"] = "MUNDER";
    MMLTAGS["MUNDEROVER"] = "MUNDEROVER";
    MMLTAGS["NONE"] = "NONE";
    MMLTAGS["SEMANTICS"] = "SEMANTICS";
})(MMLTAGS || (MMLTAGS = {}));
const LEAFTAGS = [
    MMLTAGS.MO,
    MMLTAGS.MI,
    MMLTAGS.MN,
    MMLTAGS.MTEXT,
    MMLTAGS.MS,
    MMLTAGS.MSPACE
];
const IGNORETAGS = [
    MMLTAGS.MERROR,
    MMLTAGS.MPHANTOM,
    MMLTAGS.MALIGNGROUP,
    MMLTAGS.MALIGNMARK,
    MMLTAGS.MPRESCRIPTS,
    MMLTAGS.ANNOTATION,
    MMLTAGS.ANNOTATIONXML
];
const EMPTYTAGS = [
    MMLTAGS.MATH,
    MMLTAGS.MROW,
    MMLTAGS.MPADDED,
    MMLTAGS.MACTION,
    MMLTAGS.NONE,
    MMLTAGS.MSTYLE,
    MMLTAGS.SEMANTICS
];
const DISPLAYTAGS = [
    MMLTAGS.MROOT,
    MMLTAGS.MSQRT
];
const directSpeechKeys = ['aria-label', 'exact-speech', 'alt'];
export function hasMathTag(node) {
    return !!node && DomUtil.tagName(node) === MMLTAGS.MATH;
}
function hasLeafTag(node) {
    return !!node && LEAFTAGS.indexOf(DomUtil.tagName(node)) !== -1;
}
export function hasIgnoreTag(node) {
    return !!node && IGNORETAGS.indexOf(DomUtil.tagName(node)) !== -1;
}
export function hasEmptyTag(node) {
    return !!node && EMPTYTAGS.indexOf(DomUtil.tagName(node)) !== -1;
}
export function hasDisplayTag(node) {
    return !!node && DISPLAYTAGS.indexOf(DomUtil.tagName(node)) !== -1;
}
export function isOrphanedGlyph(node) {
    return (!!node &&
        DomUtil.tagName(node) === MMLTAGS.MGLYPH &&
        !hasLeafTag(node.parentNode));
}
export function purgeNodes(nodes) {
    const nodeArray = [];
    for (let i = 0, node; (node = nodes[i]); i++) {
        if (node.nodeType !== DomUtil.NodeType.ELEMENT_NODE) {
            continue;
        }
        const tagName = DomUtil.tagName(node);
        if (IGNORETAGS.indexOf(tagName) !== -1) {
            continue;
        }
        if (EMPTYTAGS.indexOf(tagName) !== -1 && node.childNodes.length === 0) {
            continue;
        }
        nodeArray.push(node);
    }
    return nodeArray;
}
export function isZeroLength(length) {
    if (!length) {
        return false;
    }
    const negativeNamedSpaces = [
        'negativeveryverythinmathspace',
        'negativeverythinmathspace',
        'negativethinmathspace',
        'negativemediummathspace',
        'negativethickmathspace',
        'negativeverythickmathspace',
        'negativeveryverythickmathspace'
    ];
    if (negativeNamedSpaces.indexOf(length) !== -1) {
        return true;
    }
    const value = length.match(/[0-9.]+/);
    if (!value) {
        return false;
    }
    return parseFloat(value[0]) === 0;
}
export function addAttributes(to, from) {
    if (from.hasAttributes()) {
        const attrs = from.attributes;
        for (let i = attrs.length - 1; i >= 0; i--) {
            const key = attrs[i].name;
            if (key.match(/^ext/)) {
                to.attributes[key] = attrs[i].value;
                to.nobreaking = true;
            }
            if (directSpeechKeys.indexOf(key) !== -1) {
                to.attributes['ext-speech'] = attrs[i].value;
                to.nobreaking = true;
            }
            if (key.match(/texclass$/)) {
                to.attributes['texclass'] = attrs[i].value;
            }
            if (key.toLowerCase() === 'data-latex') {
                to.attributes['latex'] = attrs[i].value;
            }
            if (key === 'href') {
                to.attributes['href'] = attrs[i].value;
                to.nobreaking = true;
            }
        }
    }
}
export function getEmbellishedInner(node) {
    if (node && node.embellished && node.childNodes.length > 0) {
        return getEmbellishedInner(node.childNodes[0]);
    }
    return node;
}
export function sliceNodes(nodes, pred, opt_reverse) {
    if (opt_reverse) {
        nodes.reverse();
    }
    const head = [];
    for (let i = 0, node; (node = nodes[i]); i++) {
        if (pred(node)) {
            if (opt_reverse) {
                return {
                    head: nodes.slice(i + 1).reverse(),
                    div: node,
                    tail: head.reverse()
                };
            }
            return { head: head, div: node, tail: nodes.slice(i + 1) };
        }
        head.push(node);
    }
    if (opt_reverse) {
        return { head: [], div: null, tail: head.reverse() };
    }
    return { head: head, div: null, tail: [] };
}
export function partitionNodes(nodes, pred) {
    let restNodes = nodes;
    const rel = [];
    const comp = [];
    let result = null;
    do {
        result = sliceNodes(restNodes, pred);
        comp.push(result.head);
        rel.push(result.div);
        restNodes = result.tail;
    } while (result.div);
    rel.pop();
    return { rel: rel, comp: comp };
}
