//'use strict';

//var DbOperations = require('./DbOperations');

//function FileRepository(dbConn) {
//    this.table = dbConn.collection("files");
//    this.dbOperations = DbOperations.Instance();
//    var Error = "Error while try get table \"File\" in Database.";
//}

//FileRepository.prototype.table = null;
//FileRepository.prototype.dbOperations = null;

//FileRepository.prototype.Insert = function (data, cb) {
//    if (this.table == null)
//    {
//        return cb(this.Error);
//    }

//    this.dbOperations.Insert(data, this.table, cb);
//};

//FileRepository.prototype.Delete = function (filter, cb) {

//    if (this.table == null) {
//        cb(this.Error);
//    }

//    this.dbOperations.Delete(filter, this.table, cb);
//};

//FileRepository.prototype.Update = function (filter, set, cb) {
//    if (this.table == null) {
//        cb(this.Error);
//    }
//    this.dbOperations.update(filter, set, this.table, cb);
//};

//FileRepository.prototype.GetAll = function (cb) {
//    if (this.table == null) {
//        cb(this.Error);
//    }
//    this.dbOperations.GetAll(this.table, cb);
//};

//FileRepository.prototype.Find = function (filter, cb) {
//    if (this.table == null) {
//        cb(this.Error);
//    }
//    this.dbOperations.Find(filter, this.table, cb);
//};

//exports.Instance = function (dbConn) { return new FileRepository(dbConn); };