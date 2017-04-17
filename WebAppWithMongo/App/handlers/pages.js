exports.version = "0.1.0";

var fs = require('fs');
var helpers = require('./helpers');

exports.server_page = function (req, res)
{
    var page_name = req.params.page_name;
    var controller = req.params.controller_name;
    fs.readFile('./Static/Views/' + controller + '/' + page_name, 'utf8', function (err, contents)
    {
        if (helpers.has_error(err, res))
            return;

        helpers.send_success_html(res, contents.replace("{{PAGE_NAME}}", page_name));
    });
}