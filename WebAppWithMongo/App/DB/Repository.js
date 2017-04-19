'use strict';
var mongodb = require('mongodb');

function Repository(table)
{
    this.table = table;
}

Repository.prototype.BaseInsert = function (data, cb) {

    this.table.insert(data, { safe: true }, cb);
};

Repository.prototype.BaseDelete = function (filter, cb) {

    this.table.remove(filter, true, cb);
};

Repository.prototype.BaseDeleteById = function (id, cb) {

    this.table.deleteOne({ _id: new mongodb.ObjectID(id._id) }, cb);
};

Repository.prototype.BaseUpdate = function (filter, set, cb) {

    this.table.update({ _id: new mongodb.ObjectID(filter._id) }, {$set : set}, { safe: true }, cb);
};

Repository.prototype.BaseGetAll = function (cb) {

    this.table.find().toArray(cb);
};

Repository.prototype.BaseFind = function (filter, cb) {

    this.table.find(filter).toArray(cb);
};

Repository.prototype.BaseFindById = function (id, cb) {

    this.table.find({ _id: new mongodb.ObjectID(id._id) }).toArray(cb);
};

//exports.Instance = function () { return new DbOperations(); };
exports.Object = Repository;