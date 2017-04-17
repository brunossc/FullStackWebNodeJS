'use strict';
var db = require('../DB/DbContext'),
    FolderRepository = require('../DB/FolderRepository'),
    FileRepository = require('../DB/FileRepository'),
    async = require('async');

var _self = null;

function FolderBusiness() {
    _self = this;
};

FolderBusiness.prototype.Repository = null;
FolderBusiness.prototype.RepositoryFile = null;
FolderBusiness.prototype.dbConn = null;

FolderBusiness.prototype.objectError = "Invalid data while trying {0} object."

// Folder Methods
FolderBusiness.prototype.Save = function (folder, callback) {
    if (!_self.validateFolder(folder)) {
        cb(objectError.replace("{0}", "Save Folder"));
        return;
    }

    async.waterfall([
        function (cb)
        {
            db.GetDbConn(cb);
        },
        function (conn, cb)
        {
            _self.Repository = FolderRepository.Instance(conn);
            //_self.RepositoryFile = FileRepository.Instance(conn);
            _self.dbConn = conn;
            cb(null);
        },
        function (cb) {
            _self.Repository.Insert(folder,cb);
        }
    ], function (err, results) {
        _self.Dispose();
        callback(err, results);
    });
};

FolderBusiness.prototype.Delete = function (filter, cb) {
    if (!_self.validateFilter(filter)) {
        cb(objectError.replace("{0}", "Delete Folder"));
        return;
    }

    _self.Repository.Delete(filter, function (err, results) {
        _self.dbConn.close();
        cb(err, results);
    });
};

FolderBusiness.prototype.Update = function (filter, set, cb) {
    if (!_self.validateFilter(filter, set)) {
        cb(objectError.replace("{0}", "Update Folder"));
        return;
    }

    _self.Repository.Update(filter, set, function (err, results) {
        _self.dbConn.close();
        cb(err, results);
    });
};

FolderBusiness.prototype.Find = function (filter, cb) {
    if (!_self.validateFilter(filter)) {
        cb(objectError.replace("{0}", "Find Folder"));
        return;
    }

    _self.Repository.Find(filter, function (err, results) {
        _self.dbConn.close();
        cb(err, results);
    });
};

FolderBusiness.prototype.FindWithFiles = function (filter, cb) {
    if (!_self.validateFilter(filter)) {
        cb(objectError.replace("{0}", "Find Folder"));
        return;
    }

    _self.Repository.Find(filter, function (err, results) {
        _self.dbConn.close();
        cb(err, results);
    });
};

FolderBusiness.prototype.GetAll = function (callback) {

    async.waterfall([
        function (cb) {
            db.GetDbConn(cb);
        },
        function (conn, cb) {
            _self.Repository = FolderRepository.Instance(conn);
            //_self.RepositoryFile = FileRepository.Instance(conn);
            _self.dbConn = conn;
            cb(null);
        },
        function (cb) {
            _self.Repository.GetAll(cb);
        }
    ], function (err, results) {
        _self.Dispose();
        callback(err, results);
    });
};

FolderBusiness.prototype.GetAllWithFiles = function (cb) {
    _self.Repository.GetAll(function (err, results) {
        _self.dbConn.close();
        cb(err, results);
    });
};

// Files Methods
FolderBusiness.prototype.SaveFile = function (file, cb) {
    if (!_self.validateFile(file)) {
        cb(objectError.replace("{0}", "Save File"));
        return;
    }

    _self.RepositoryFile.Insert(file, function (err, results) {
        _self.dbConn.close();
        cb(err, results);
    });
};

FolderBusiness.prototype.DeleteFile = function (filter, cb) {
    if (!_self.validateFileFilter(filter)) {
        cb(objectError.replace("{0}", "Delete File"));
        return;
    }

    _self.RepositoryFile.Delete(filter, function (err, results) {
        _self.dbConn.close();
        cb(err, results);
    });
};

FolderBusiness.prototype.Update = function (filter, set, cb) {
    if (!_self.validateFileFilter(filter, set)) {
        cb(objectError.replace("{0}", "Update File"));
        return;
    }

    _self.RepositoryFile.Update(filter, set, function (err, results) {
        _self.dbConn.close();
        cb(err, results);
    });
};

FolderBusiness.prototype.Find = function (filter, cb) {
    if (!_self.validateFileFilter(filter)) {
        cb(objectError.replace("{0}", "Find File"));
        return;
    }

    _self.RepositoryFile.Find(filter, function (err, results) {
        _self.dbConn.close();
        cb(err, results);
    });
};

FolderBusiness.prototype.FindWithFiles = function (filter, cb) {
    if (!_self.validateFileFilter(filter)) {
        cb(objectError.replace("{0}", "Find File"));
        return;
    }

    _self.RepositoryFileRepositoryFile.Find(filter, function (err, results) {
        _self.dbConn.close();
        cb(err, results);
    });
};

FolderBusiness.prototype.GetAllFiles = function (cb) {
    _self.RepositoryFile.GetAll(function (err, results) {
        _self.dbConn.close();
        cb(err, results);
    });
};

FolderBusiness.prototype.GetAllWithFiles = function (cb) {
    _self.RepositoryFile.GetAll(function (err, results) {
        _self.dbConn.close();
        cb(err, results);
    });
};

FolderBusiness.prototype.validateFolder = function (folder) {
    return true;
};

FolderBusiness.prototype.validateFilter = function (filter, set) {
    return true;
};

FolderBusiness.prototype.validateFile = function (file) {
    return true;
};

FolderBusiness.prototype.validateFileFilter = function (filter, set) {
    return true;
};

FolderBusiness.prototype.Dispose = function () {

    _self.dbConn.close();
    _self.dbConn = null;
    _self.Repository = null;
    _self.RepositoryFile = null;

};

exports.version = "0.0.1";
exports.Instance = function () { return new FolderBusiness(); };