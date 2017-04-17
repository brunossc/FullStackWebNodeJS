'use strict';
exports.version = "0.0.1";
var DB = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : 27017;

exports.GetDbConn = function (cb)
{
    var db = new DB('FilesManager',
        new Server(host, port,
            {
                auto_reconnect: true,
                poolSize: 20
            }),
        { w: 1 });

    db.open(cb);
}