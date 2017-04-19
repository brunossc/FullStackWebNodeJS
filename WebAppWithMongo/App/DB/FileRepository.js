'use strict';
var Repository = require('./Repository').Object;

function FileRepository(dbConn) {
    Repository.call(this, dbConn.collection("file"));
}

FileRepository.prototype = Object.create(Repository.prototype);
exports.Object = FileRepository;