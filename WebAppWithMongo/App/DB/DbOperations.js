'use strict';
function DbOperations()
{ }

DbOperations.prototype.Insert = function (data, table, cb) {

    table.insert(data, { safe: true }, cb);
};

DbOperations.prototype.Delete = function (filter, table, cb) {

    table.remove(filter, { safe: true }, cb);
};

DbOperations.prototype.Update = function (filter, set, table, cb) {

    table.update(filter, {$set : set}, { safe: true }, cb);
};

DbOperations.prototype.GetAll = function (table, cb) {

    table.find().toArray(cb);
};

DbOperations.prototype.Find = function (filter, table, cb) {

    table.find(filter).toArray(cb);
};

exports.Instance = function () { return new DbOperations(); };