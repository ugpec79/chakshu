import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { AbstractEnrichCase } from './abstract_enrich_case.js';
export declare class CaseLimit extends AbstractEnrichCase {
    mml: Element;
    static test(semantic: SemanticNode): boolean;
    private static walkTree_;
    constructor(semantic: SemanticNode);
    getMathml(): Element;
}
