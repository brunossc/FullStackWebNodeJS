'use strict';
var DbOperations = require('./DbOperations');

function FolderRepository(dbConn) {
    this.table = dbConn.collection("folder");
    this.dbOperations = DbOperations.Instance();
    var Error = "Error while try {0} in table \"Folder\" in Database.";
}

FolderRepository.prototype.table = null;
FolderRepository.prototype.dbOperations = null;

FolderRepository.prototype.Insert = function (data, cb) {
    if (this.table == null)
    {
        return cb(this.initError.replace("{0}","Insert"));
    }

    this.dbOperations.Insert(data, this.table, cb);
};

FolderRepository.prototype.Delete = function (filter, cb) {

    if (this.table == null) {
        cb(this.initError.replace("{0}", "Delete"));
    }

    this.dbOperations.Delete(filter, this.table, cb);
};

FolderRepository.prototype.Update = function (filter, set, cb) {
    if (this.table == null) {
        cb(this.initError.replace("{0}", "Update"));
    }
    this.dbOperations.update(filter, set, this.table, cb);
};

FolderRepository.prototype.GetAll = function (cb) {
    if (this.table == null) {
        cb(this.initError.replace("{0}", "GetAll"));
    }
    this.dbOperations.GetAll(this.table, cb);
};

FolderRepository.prototype.Find = function (filter, cb) {
    if (this.table == null) {
        cb(this.initError.replace("{0}", "Find"));
    }
    this.dbOperations.Find(filter, this.table, cb);
};

exports.Instance = function (dbConn) {

        return new FolderRepository(dbConn);
    
};

