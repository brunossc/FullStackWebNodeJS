'use strict';
var mongodb = require('mongodb');

function Repository(table)
{
    this.table = table;
}

Repository.prototype.Insert = function (data, cb) {

    this.table.insert(data, { safe: true }, cb);
};

Repository.prototype.Delete = function (filter, cb) {

    this.table.remove(filter, true, cb);
};

Repository.prototype.DeleteById = function (id, cb) {

    this.table.deleteOne({ _id: new mongodb.ObjectID(id._id) }, cb);
};

Repository.prototype.Update = function (filter, set, cb) {

    this.table.update({ _id: new mongodb.ObjectID(filter._id) }, {$set : set}, { safe: true }, cb);
};

Repository.prototype.GetAll = function (cb) {

    this.table.find().toArray(cb);
};

Repository.prototype.Find = function (filter, cb) {

    this.table.find(filter).toArray(cb);
};

Repository.prototype.FindById = function (id, cb) {

    this.table.find({ _id: new mongodb.ObjectID(id._id) }).toArray(cb);
};

//exports.Instance = function () { return new DbOperations(); };
exports.Object = Repository;