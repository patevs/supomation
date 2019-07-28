#!/usr/bin/env node

/**
 *  `src/__tests__/supomation.test.js`
 *
 *  * Supomation Tests
 *  https://devhints.io/jest
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

const assert = require('assert');

/****************
 * * TEST CASES *
 ****************/

/*
test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

describe('My work', () => {
    test('works', () => {
        expect(2).toEqual(2);
    });
});
*/

// BDD style test case
describe('Supomation', () => {
    // `it` is an alias for `test`.
    it('Has a test', () => {
        assert(true, 'Supomation should have a test!');
    });
});

// EOF //
