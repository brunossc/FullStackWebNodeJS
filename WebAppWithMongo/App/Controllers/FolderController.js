'use strict'
exports.version = '0.0.1'

var FolderBusiness = require('../Business/FolderBusiness'),
    helpers = require('../handlers/helpers'),
    url = require('url');

var _folderBusiness = FolderBusiness.Instance();

exports.DoAction = function (req, res) {
    var action = req.params.action;
    var formValues = req.body;
    switch (action.toLowerCase()) {
        case "save":
            if (!formValues.id) {
                _folderBusiness.Save(formValues, function (err, result) {
                    if (err != null) {
                        helpers.send_failure(res, 501, err);
                        return;
                    }

                    helpers.send_success(res, result);
                });
            }
            else {
                var filter = { '_id': formValues.id };
                delete formValues["id"];
                var set = formValues;

                _folderBusiness.Update(filter, set, function (err, result) {
                    if (err != null) {
                        helpers.send_failure(res, 501, err);
                        return;
                    }

                    helpers.send_success(res, result);
                });
            }
            break;
        case "delete":
            _folderBusiness.Delete(formValues, function (err, result) {
                if (err != null) {
                    helpers.send_failure(res, 501, err);
                    return;
                }

                helpers.send_success(res, result);
            });
            break;
        case "deletebyid":
            _folderBusiness.DeleteById(formValues, function (err, result) {
                if (err != null) {
                    helpers.send_failure(res, 501, err);
                    return;
                }

                helpers.send_success(res, result);
            });
            break;
        case "findbyid":
            _folderBusiness.FindById(formValues, function (err, result) {
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

exports.RestCall = function (req, res) {
    var action = req.params.action;
    var formValues = req.body;
    switch (action.toLowerCase()) {
        case "getall":
            _folderBusiness.GetAll(function (err, result) {
                if (err != null) {
                    helpers.send_failure(res, 501, err);
                    return;
                }

                helpers.send_success(res, result);
            });
            break;
        case "findsearch":
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            var reg = query.name;

            var filter = { "name": new RegExp(reg)};

            _folderBusiness.Find(filter, function (err, result) {
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
}

