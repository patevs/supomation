#!/usr/bin/env node

/**
 *  `src/__tests__/supomation.test.js`
 *
 *  * Supomation Tests
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

describe('Supomation', () => {
    it('Has a test', () => {
        assert(true, 'Supomation should have a test!');
    });
});

// EOF //
