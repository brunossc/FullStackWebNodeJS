'use strict';
var Repository = require('./Repository').Object;

function FolderRepository(dbConn) {
    Repository.call(this, dbConn.collection("folder"));
}

FolderRepository.prototype = Object.create(Repository.prototype);
exports.Object = FolderRepository;