'use strict';
var Repository = require('./Repository').Object;

function FolderRepository(dbConn) {
    Repository.call(this, dbConn.collection("folder"));
}

FolderRepository.prototype = Object.create(Repository.prototype);

FolderRepository.prototype.Insert = function (data, cb) {
    this.BaseInsert(data, cb);
};

FolderRepository.prototype.Delete = function (filter, cb) {
    this.BaseDelete(filter, cb);
};

FolderRepository.prototype.DeleteById = function (id, cb) {
    this.BaseDeleteById(id, cb);
};

FolderRepository.prototype.Update = function (filter, set, cb) {
    this.BaseUpdate(filter, set, cb);
};

FolderRepository.prototype.GetAll = function (cb) {
    this.BaseGetAll(cb);
};

FolderRepository.prototype.Find = function (filter, cb) {
    this.BaseFind(filter, cb);
};

FolderRepository.prototype.FindById = function (id, cb) {
    this.BaseFindById(id, cb);
};

exports.Object = FolderRepository;