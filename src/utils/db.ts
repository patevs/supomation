#!/usr/bin/env node

/**
 *	`src/utils/db.ts`
 *
 *	* Supomation CLI Database Helper Functions
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

import { MongoClient } from 'mongodb';
import assert from 'assert';
// const assert = require('assert');

/***************
 * * CONSTANTS *
 ***************/

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'myproject';

/***************
 * * FUNCTIONS *
 ***************/

const connectToDb = () => {
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log('Connected successfully to server');

        // const db =
        client.db(dbName);

        client.close();
    });
};

/*************
 * * EXPORTS *
 *************/

export { connectToDb };

// EOF //
