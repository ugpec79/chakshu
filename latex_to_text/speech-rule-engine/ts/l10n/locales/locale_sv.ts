//
// Copyright 2021-22 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @file Swedish message file.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { createLocale, Locale } from '../locale.js';
import { nestingToString } from '../locale_util.js';
import { NUMBERS } from '../numbers/numbers_sv.js';
import * as tr from '../transformers.js';

let locale: Locale = null;

/**
 * @returns The Swedish locale.
 */
export function sv(): Locale {
  if (!locale) {
    locale = create();
  }
  // TODO: Initialise the grammar methods here?
  return locale;
}

/**
 * @returns The Swedish locale.
 */
function create(): Locale {
  const loc = createLocale();
  loc.NUMBERS = NUMBERS;
  loc.FUNCTIONS.radicalNestDepth = nestingToString;
  loc.FUNCTIONS.fontRegexp = function (font: string) {
    return new RegExp('((^' + font + ' )|( ' + font + '$))');
  };
  loc.ALPHABETS.combiner = tr.Combiners.prefixCombiner;
  loc.ALPHABETS.digitTrans.default = NUMBERS.numberToWords;
  loc.CORRECTIONS.correctOne = (num: string) => num.replace(/^ett$/, 'en');
  return loc;
}
