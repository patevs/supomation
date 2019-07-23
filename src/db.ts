#!/usr/bin/env node

/**
 *  `src/db.ts`
 *
 *  * Supomation Database Connection
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// const MongoClient = require("mongodb").MongoClient;
import { MongoClient } from "mongodb";

/***************
 * * CONSTANTS *
 ***************/

const uri =
    "mongodb+srv://patevs:F0rtunes@cluster0-t7g5a.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

/***************
 * * FUNCTIONS *
 ***************/

// Connect to database
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

// EOF //
