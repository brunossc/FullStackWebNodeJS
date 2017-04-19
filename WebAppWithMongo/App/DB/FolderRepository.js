'use strict';
var Repository = require('./Repository').Object;

function FolderRepository(dbConn) {
    Repository.call(this, dbConn.collection("folder"));
    var Error = "Error while try {0} in table \"Folder\" in Database.";
}

FolderRepository.prototype = Object.create(Repository.prototype);

FolderRepository.prototype.Insert = function (data, cb) {
    //if (this.table == null)
    //{
    //    return cb(this.initError.replace("{0}","Insert"));
    //}

    this.BaseInsert(data, cb);
};

FolderRepository.prototype.Delete = function (filter, cb) {

    //if (this.table == null) {
    //    cb(this.initError.replace("{0}", "Delete"));
    //}

    this.BaseDelete(filter, cb);
};

FolderRepository.prototype.DeleteById = function (id, cb) {

    //if (this.table == null) {
    //    cb(this.initError.replace("{0}", "Delete By Id"));
    //}

    this.BaseDeleteById(id, cb);
};

FolderRepository.prototype.Update = function (filter, set, cb) {
    //if (this.table == null) {
    //    cb(this.initError.replace("{0}", "Update"));
    //}
    this.BaseUpdate(filter, set, cb);
};

FolderRepository.prototype.GetAll = function (cb) {
    //if (this.table == null) {
    //    cb(this.initError.replace("{0}", "GetAll"));
    //}

    this.BaseGetAll(cb);
};

FolderRepository.prototype.Find = function (filter, cb) {
    //if (this.table == null) {
    //    cb(this.initError.replace("{0}", "Find"));
    //}
    this.BaseFind(filter, cb);
};

FolderRepository.prototype.FindById = function (id, cb) {
    //if (this.table == null) {
    //    cb(this.initError.replace("{0}", "Find"));
    //}
    this.BaseFindById(id, cb);
};
exports.Object = FolderRepository;