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
const url =
    'mongodb+srv://patevs:<password>@cluster0-t7g5a.mongodb.net/test?retryWrites=true&w=majority';
// Database Name
const dbName = 'myproject';

/***************
 * * FUNCTIONS *
 ***************/

const connectToDb = () => {
    const client = new MongoClient(url, { useNewUrlParser: true });
    // Use connect method to connect to the server
    client.connect(function(err) {
        assert.equal(null, err);
        console.log('Connected successfully to server');

        // const db =
        client.db(dbName);

        client.close();

        process.exit(0);
    });
};

/*************
 * * EXPORTS *
 *************/

export { connectToDb };

// EOF //
