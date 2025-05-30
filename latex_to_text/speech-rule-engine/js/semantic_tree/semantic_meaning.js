import * as Alphabet from '../speech_rules/alphabet.js';
var Types;
(function (Types) {
    Types["PUNCTUATION"] = "punctuation";
    Types["FENCE"] = "fence";
    Types["NUMBER"] = "number";
    Types["IDENTIFIER"] = "identifier";
    Types["TEXT"] = "text";
    Types["OPERATOR"] = "operator";
    Types["RELATION"] = "relation";
    Types["LARGEOP"] = "largeop";
    Types["FUNCTION"] = "function";
    Types["ACCENT"] = "accent";
    Types["FENCED"] = "fenced";
    Types["FRACTION"] = "fraction";
    Types["PUNCTUATED"] = "punctuated";
    Types["RELSEQ"] = "relseq";
    Types["MULTIREL"] = "multirel";
    Types["INFIXOP"] = "infixop";
    Types["PREFIXOP"] = "prefixop";
    Types["POSTFIXOP"] = "postfixop";
    Types["APPL"] = "appl";
    Types["INTEGRAL"] = "integral";
    Types["BIGOP"] = "bigop";
    Types["SQRT"] = "sqrt";
    Types["ROOT"] = "root";
    Types["LIMUPPER"] = "limupper";
    Types["LIMLOWER"] = "limlower";
    Types["LIMBOTH"] = "limboth";
    Types["SUBSCRIPT"] = "subscript";
    Types["SUPERSCRIPT"] = "superscript";
    Types["UNDERSCORE"] = "underscore";
    Types["OVERSCORE"] = "overscore";
    Types["TENSOR"] = "tensor";
    Types["TABLE"] = "table";
    Types["MULTILINE"] = "multiline";
    Types["MATRIX"] = "matrix";
    Types["VECTOR"] = "vector";
    Types["CASES"] = "cases";
    Types["ROW"] = "row";
    Types["LINE"] = "line";
    Types["CELL"] = "cell";
    Types["ENCLOSE"] = "enclose";
    Types["INFERENCE"] = "inference";
    Types["RULELABEL"] = "rulelabel";
    Types["CONCLUSION"] = "conclusion";
    Types["PREMISES"] = "premises";
    Types["UNKNOWN"] = "unknown";
    Types["EMPTY"] = "empty";
})(Types || (Types = {}));
export const SemanticType = Object.assign({}, Types);
var Roles;
(function (Roles) {
    Roles["COMMA"] = "comma";
    Roles["SEMICOLON"] = "semicolon";
    Roles["ELLIPSIS"] = "ellipsis";
    Roles["FULLSTOP"] = "fullstop";
    Roles["QUESTION"] = "question";
    Roles["EXCLAMATION"] = "exclamation";
    Roles["QUOTES"] = "quotes";
    Roles["DASH"] = "dash";
    Roles["TILDE"] = "tilde";
    Roles["PRIME"] = "prime";
    Roles["DEGREE"] = "degree";
    Roles["VBAR"] = "vbar";
    Roles["COLON"] = "colon";
    Roles["OPENFENCE"] = "openfence";
    Roles["CLOSEFENCE"] = "closefence";
    Roles["APPLICATION"] = "application";
    Roles["DUMMY"] = "dummy";
    Roles["UNIT"] = "unit";
    Roles["LABEL"] = "label";
    Roles["OPEN"] = "open";
    Roles["CLOSE"] = "close";
    Roles["TOP"] = "top";
    Roles["BOTTOM"] = "bottom";
    Roles["NEUTRAL"] = "neutral";
    Roles["METRIC"] = "metric";
    Roles["LATINLETTER"] = "latinletter";
    Roles["GREEKLETTER"] = "greekletter";
    Roles["OTHERLETTER"] = "otherletter";
    Roles["NUMBERSET"] = "numbersetletter";
    Roles["INTEGER"] = "integer";
    Roles["FLOAT"] = "float";
    Roles["OTHERNUMBER"] = "othernumber";
    Roles["INFTY"] = "infty";
    Roles["MIXED"] = "mixed";
    Roles["MULTIACCENT"] = "multiaccent";
    Roles["OVERACCENT"] = "overaccent";
    Roles["UNDERACCENT"] = "underaccent";
    Roles["UNDEROVER"] = "underover";
    Roles["SUBSUP"] = "subsup";
    Roles["LEFTSUB"] = "leftsub";
    Roles["LEFTSUPER"] = "leftsuper";
    Roles["RIGHTSUB"] = "rightsub";
    Roles["RIGHTSUPER"] = "rightsuper";
    Roles["LEFTRIGHT"] = "leftright";
    Roles["ABOVEBELOW"] = "abovebelow";
    Roles["SETEMPTY"] = "set empty";
    Roles["SETEXT"] = "set extended";
    Roles["SETSINGLE"] = "set singleton";
    Roles["SETCOLLECT"] = "set collection";
    Roles["STRING"] = "string";
    Roles["SPACE"] = "space";
    Roles["ANNOTATION"] = "annotation";
    Roles["TEXT"] = "text";
    Roles["SEQUENCE"] = "sequence";
    Roles["ENDPUNCT"] = "endpunct";
    Roles["STARTPUNCT"] = "startpunct";
    Roles["NEGATIVE"] = "negative";
    Roles["POSITIVE"] = "positive";
    Roles["NEGATION"] = "negation";
    Roles["MULTIOP"] = "multiop";
    Roles["PREFIXOP"] = "prefix operator";
    Roles["POSTFIXOP"] = "postfix operator";
    Roles["LIMFUNC"] = "limit function";
    Roles["INFIXFUNC"] = "infix function";
    Roles["PREFIXFUNC"] = "prefix function";
    Roles["POSTFIXFUNC"] = "postfix function";
    Roles["SIMPLEFUNC"] = "simple function";
    Roles["COMPFUNC"] = "composed function";
    Roles["SUM"] = "sum";
    Roles["INTEGRAL"] = "integral";
    Roles["GEOMETRY"] = "geometry";
    Roles["BOX"] = "box";
    Roles["BLOCK"] = "block";
    Roles["ADDITION"] = "addition";
    Roles["MULTIPLICATION"] = "multiplication";
    Roles["SUBTRACTION"] = "subtraction";
    Roles["IMPLICIT"] = "implicit";
    Roles["DIVISION"] = "division";
    Roles["VULGAR"] = "vulgar";
    Roles["EQUALITY"] = "equality";
    Roles["INEQUALITY"] = "inequality";
    Roles["ARROW"] = "arrow";
    Roles["ELEMENT"] = "element";
    Roles["NONELEMENT"] = "nonelement";
    Roles["REELEMENT"] = "reelement";
    Roles["RENONELEMENT"] = "renonelement";
    Roles["SET"] = "set";
    Roles["DETERMINANT"] = "determinant";
    Roles["ROWVECTOR"] = "rowvector";
    Roles["BINOMIAL"] = "binomial";
    Roles["SQUAREMATRIX"] = "squarematrix";
    Roles["CYCLE"] = "cycle";
    Roles["MULTILINE"] = "multiline";
    Roles["MATRIX"] = "matrix";
    Roles["VECTOR"] = "vector";
    Roles["CASES"] = "cases";
    Roles["TABLE"] = "table";
    Roles["CAYLEY"] = "cayley";
    Roles["PROOF"] = "proof";
    Roles["LEFT"] = "left";
    Roles["RIGHT"] = "right";
    Roles["UP"] = "up";
    Roles["DOWN"] = "down";
    Roles["FINAL"] = "final";
    Roles["SINGLE"] = "single";
    Roles["HYP"] = "hyp";
    Roles["AXIOM"] = "axiom";
    Roles["LOGIC"] = "logic";
    Roles["UNKNOWN"] = "unknown";
    Roles["MGLYPH"] = "mglyph";
})(Roles || (Roles = {}));
export const SemanticRole = Object.assign({}, Roles);
var ExtraFont;
(function (ExtraFont) {
    ExtraFont["CALIGRAPHIC"] = "caligraphic";
    ExtraFont["CALIGRAPHICBOLD"] = "caligraphic-bold";
    ExtraFont["OLDSTYLE"] = "oldstyle";
    ExtraFont["OLDSTYLEBOLD"] = "oldstyle-bold";
    ExtraFont["UNKNOWN"] = "unknown";
})(ExtraFont || (ExtraFont = {}));
export const SemanticFont = Object.assign(Object.assign(Object.assign({}, Alphabet.Font), ExtraFont), Alphabet.Embellish);
var SecondaryEnum;
(function (SecondaryEnum) {
    SecondaryEnum["ALLLETTERS"] = "allLetters";
    SecondaryEnum["D"] = "d";
    SecondaryEnum["BAR"] = "bar";
    SecondaryEnum["TILDE"] = "tilde";
})(SecondaryEnum || (SecondaryEnum = {}));
export const SemanticSecondary = Object.assign(Object.assign({}, Alphabet.Base), SecondaryEnum);
