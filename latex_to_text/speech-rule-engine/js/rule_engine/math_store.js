import * as BaseUtil from '../common/base_util.js';
import { LOCALE } from '../l10n/locale.js';
import { activate } from '../semantic_tree/semantic_annotations.js';
import { BaseRuleStore } from './base_rule_store.js';
import { Action, OutputError, SpeechRule } from './speech_rule.js';
export class MathStore extends BaseRuleStore {
    constructor() {
        super();
        this.annotators = [];
        this.parseMethods['Alias'] = this.defineAlias;
        this.parseMethods['SpecializedRule'] = this.defineSpecializedRule;
        this.parseMethods['Specialized'] = this.defineSpecialized;
    }
    initialize() {
        if (this.initialized) {
            return;
        }
        this.annotations();
        this.initialized = true;
    }
    annotations() {
        for (let i = 0, annotator; (annotator = this.annotators[i]); i++) {
            activate(this.domain, annotator);
        }
    }
    defineAlias(name, prec, ...args) {
        const fullPrec = this.parsePrecondition(prec, args);
        if (!fullPrec) {
            console.error(`Precondition Error: ${prec} ${args}`);
            return;
        }
        const condition = this.preconditions.get(name);
        if (!condition) {
            console.error(`Alias Error: No precondition by the name of ${name}`);
            return;
        }
        condition.addFullCondition(fullPrec);
    }
    defineRulesAlias(name, query, ...args) {
        const rules = this.findAllRules(function (rule) {
            return rule.name === name;
        });
        if (rules.length === 0) {
            throw new OutputError('Rule with name ' + name + ' does not exist.');
        }
        const keep = [];
        const findKeep = (rule) => {
            const cstr = rule.dynamicCstr.toString();
            const action = rule.action.toString();
            for (let i = 0, k; (k = keep[i]); i++) {
                if (k.action === action && k.cstr === cstr) {
                    return false;
                }
            }
            keep.push({ cstr: cstr, action: action });
            return true;
        };
        rules.forEach((rule) => {
            if (findKeep(rule)) {
                this.addAlias_(rule, query, args);
            }
        });
    }
    defineSpecializedRule(name, oldDynamic, newDynamic, opt_action) {
        const dynamicCstr = this.parseCstr(oldDynamic);
        const rule = this.findRule((rule) => rule.name === name && dynamicCstr.equal(rule.dynamicCstr));
        const newCstr = this.parseCstr(newDynamic);
        if (!rule && opt_action) {
            throw new OutputError('Rule named ' + name + ' with style ' + oldDynamic + ' does not exist.');
        }
        const action = opt_action ? Action.fromString(opt_action) : rule.action;
        const newRule = new SpeechRule(rule.name, newCstr, rule.precondition, action);
        this.addRule(newRule);
    }
    defineSpecialized(name, _old, dynamic) {
        const cstr = this.parseCstr(dynamic);
        if (!cstr) {
            console.error(`Dynamic Constraint Error: ${dynamic}`);
            return;
        }
        const condition = this.preconditions.get(name);
        if (!condition) {
            console.error(`Alias Error: No precondition by the name of ${name}`);
            return;
        }
        condition.addConstraint(cstr);
    }
    evaluateString(str) {
        const descs = [];
        if (str.match(/^\s+$/)) {
            return descs;
        }
        let num = this.matchNumber(str);
        if (num && num.length === str.length) {
            descs.push(this.evaluateCharacter(num.number));
            return descs;
        }
        const split = BaseUtil.removeEmpty(str.replace(/\s/g, ' ').split(' '));
        for (let i = 0, s; (s = split[i]); i++) {
            if (s.length === 1) {
                descs.push(this.evaluateCharacter(s));
            }
            else if (s.match(new RegExp('^[' + LOCALE.MESSAGES.regexp.TEXT + ']+$'))) {
                descs.push(this.evaluateCharacter(s));
            }
            else {
                let rest = s;
                while (rest) {
                    num = this.matchNumber(rest);
                    const alpha = rest.match(new RegExp('^[' + LOCALE.MESSAGES.regexp.TEXT + ']+'));
                    if (num) {
                        descs.push(this.evaluateCharacter(num.number));
                        rest = rest.substring(num.length);
                    }
                    else if (alpha) {
                        descs.push(this.evaluateCharacter(alpha[0]));
                        rest = rest.substring(alpha[0].length);
                    }
                    else {
                        const chars = Array.from(rest);
                        const chr = chars[0];
                        descs.push(this.evaluateCharacter(chr));
                        rest = chars.slice(1).join('');
                    }
                }
            }
        }
        return descs;
    }
    parse(ruleSet) {
        super.parse(ruleSet);
        this.annotators = ruleSet['annotators'] || [];
    }
    addAlias_(rule, query, cstrList) {
        const prec = this.parsePrecondition(query, cstrList);
        const newRule = new SpeechRule(rule.name, rule.dynamicCstr, prec, rule.action);
        newRule.name = rule.name;
        this.addRule(newRule);
    }
    matchNumber(str) {
        const locNum = str.match(new RegExp('^' + LOCALE.MESSAGES.regexp.NUMBER));
        const enNum = str.match(new RegExp('^' + MathStore.regexp.NUMBER));
        if (!locNum && !enNum) {
            return null;
        }
        const isEn = enNum && enNum[0] === str;
        const isLoc = (locNum && locNum[0] === str) || !isEn;
        if (isLoc) {
            return locNum ? { number: locNum[0], length: locNum[0].length } : null;
        }
        const num = enNum[0]
            .replace(new RegExp(MathStore.regexp.DIGIT_GROUP, 'g'), 'X')
            .replace(new RegExp(MathStore.regexp.DECIMAL_MARK, 'g'), LOCALE.MESSAGES.regexp.DECIMAL_MARK)
            .replace(/X/g, LOCALE.MESSAGES.regexp.DIGIT_GROUP.replace(/\\/g, ''));
        return { number: num, length: enNum[0].length };
    }
}
MathStore.regexp = {
    NUMBER: '((\\d{1,3})(?=(,| ))((,| )\\d{3})*(\\.\\d+)?)|^\\d*\\.\\d+|^\\d+',
    DECIMAL_MARK: '\\.',
    DIGIT_GROUP: ','
};
