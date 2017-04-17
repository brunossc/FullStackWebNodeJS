'use strict'
exports.version = '0.0.1'

var FolderBusiness = require('../Business/FolderBusiness'),
    helpers = require('../handlers/helpers');

var _folderBusiness = FolderBusiness.Instance();

exports.DoAction = function (req, res) {
    var action = req.params.action;
    switch (action) {
        case "save":
            _folderBusiness.Save(req.body, function (err, result) {
                if (err != null) {
                    helpers.send_failure(res, 501, err);
                    return;
                }

                helpers.send_success(res, result);
            });
            break;
        default:
            helpers.nothing_found(req, res);
            return;
    }
};

exports.GetAll_Folders = function (req, res)
{

    _folderBusiness.GetAll(function (err, result) {
        if (err != null) {
            helpers.send_failure(res, 501, err);
            return;
        }

        helpers.send_success(res, result);
    });
}

