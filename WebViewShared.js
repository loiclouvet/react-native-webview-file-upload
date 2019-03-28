/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * NB: This has been added to the project as WebViewShared is not exported
 * by react-native itself, so we have to shim it in
 * 
 * @format
 * @flow
 */

'use strict';

import escapeStringRegexp from 'escape-string-regexp';

const WebViewShared = {
  defaultOriginWhitelist: ['http://*', 'https://*'],
  extractOrigin: (url: string): ?string => {
    const result = /^[A-Za-z0-9]+:(\/\/)?[^/]*/.exec(url);
    return result === null ? null : result[0];
  },
  originWhitelistToRegex: (originWhitelist: string): string => {
    return escapeStringRegexp(originWhitelist).replace(/\\\*/g, '.*');
  },
};

module.exports = WebViewShared;