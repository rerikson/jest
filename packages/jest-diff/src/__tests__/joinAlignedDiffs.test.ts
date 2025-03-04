/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT, Diff} from '../cleanupSemantic';
import {INVERTED_COLOR} from '../printDiffs';
import {
  joinAlignedDiffsExpand,
  joinAlignedDiffsNoExpand,
} from '../joinAlignedDiffs';
import {normalizeDiffOptions} from '../normalizeDiffOptions';

const diffsCommonStartEnd = [
  new Diff(DIFF_EQUAL, ''),
  new Diff(DIFF_EQUAL, 'common 2 preceding A'),
  new Diff(DIFF_EQUAL, 'common 1 preceding A'),
  new Diff(DIFF_DELETE, 'delete line'),
  new Diff(DIFF_DELETE, ['change ', INVERTED_COLOR('expect'), 'ed A'].join('')),
  new Diff(DIFF_INSERT, ['change ', INVERTED_COLOR('receiv'), 'ed A'].join('')),
  new Diff(DIFF_EQUAL, 'common 1 following A'),
  new Diff(DIFF_EQUAL, 'common 2 following A'),
  new Diff(DIFF_EQUAL, 'common 3 following A'),
  new Diff(DIFF_EQUAL, 'common 4 following A'),
  new Diff(DIFF_EQUAL, 'common 4 preceding B'),
  new Diff(DIFF_EQUAL, 'common 3 preceding B'),
  new Diff(DIFF_EQUAL, 'common 2 preceding B'),
  new Diff(DIFF_EQUAL, 'common 1 preceding B'),
  new Diff(DIFF_DELETE, ['change ', INVERTED_COLOR('expect'), 'ed B'].join('')),
  new Diff(DIFF_INSERT, ['change ', INVERTED_COLOR('receiv'), 'ed B'].join('')),
  new Diff(DIFF_INSERT, 'insert line'),
  new Diff(DIFF_EQUAL, 'common 1 following B'),
  new Diff(DIFF_EQUAL, 'common 2 following B'),
  new Diff(DIFF_EQUAL, 'common 3 between B and C'),
  new Diff(DIFF_EQUAL, 'common 2 preceding C'),
  new Diff(DIFF_EQUAL, 'common 1 preceding C'),
  new Diff(DIFF_DELETE, ['change ', INVERTED_COLOR('expect'), 'ed C'].join('')),
  new Diff(DIFF_INSERT, ['change ', INVERTED_COLOR('receiv'), 'ed C'].join('')),
  new Diff(DIFF_EQUAL, 'common 1 following C'),
  new Diff(DIFF_EQUAL, 'common 2 following C'),
  new Diff(DIFF_EQUAL, 'common 3 following C'),
  new Diff(DIFF_EQUAL, ''),
  new Diff(DIFF_EQUAL, 'common 5 following C'),
];

const diffsChangeStartEnd = [
  new Diff(DIFF_DELETE, 'delete'),
  new Diff(DIFF_EQUAL, 'common following delete'),
  new Diff(DIFF_EQUAL, 'common preceding insert'),
  new Diff(DIFF_INSERT, 'insert'),
];

describe('joinAlignedDiffsExpand', () => {
  test('first line is empty common', () => {
    const options = normalizeDiffOptions();
    expect(
      joinAlignedDiffsExpand(diffsCommonStartEnd, options),
    ).toMatchSnapshot();
  });
});

describe('joinAlignedDiffsNoExpand', () => {
  test('patch 0 with context 1 and change at start and end', () => {
    const options = normalizeDiffOptions({contextLines: 1, expand: false});
    expect(
      joinAlignedDiffsNoExpand(diffsChangeStartEnd, options),
    ).toMatchSnapshot();
  });

  test('patch 0 with context 5 and first line is empty common', () => {
    const options = normalizeDiffOptions({expand: false});
    expect(
      joinAlignedDiffsNoExpand(diffsCommonStartEnd, options),
    ).toMatchSnapshot();
  });

  test('patch 1 with context 4 and last line is empty common', () => {
    const options = normalizeDiffOptions({contextLines: 4, expand: false});
    expect(
      joinAlignedDiffsNoExpand(diffsCommonStartEnd, options),
    ).toMatchSnapshot();
  });

  test('patch 2 with context 3', () => {
    const options = normalizeDiffOptions({contextLines: 3, expand: false});
    expect(
      joinAlignedDiffsNoExpand(diffsCommonStartEnd, options),
    ).toMatchSnapshot();
  });

  test('patch 3 with context 2 and omit excess common at start', () => {
    const options = normalizeDiffOptions({contextLines: 2, expand: false});
    expect(
      joinAlignedDiffsNoExpand(diffsCommonStartEnd, options),
    ).toMatchSnapshot();
  });
});
