
exports.version = '0.1.0';


exports.make_error = function (err, msg) {
    var e = new Error(msg);
    e.code = err;
    return e;
}

exports.has_error = function (err, res)
{
    if (err != null) {
        exports.send_failure(res, 503, err);
        return true;
    }
}

exports.send_success = function (res, data) {
    res.writeHead(200, { "Content-Type": "application/json" });
    var output = { error: null, data: data };
    res.end(JSON.stringify(output) + "\n");
}

exports.send_success_html = function (res, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
}


exports.send_failure = function (res, http_code, err) {
    var code = (err.code) ? err.code : err.name;
    res.writeHead(http_code, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: code, message: err.message }) + "\n");
}


exports.invalid_resource = function () {
    return exports.make_error("invalid_resource",
        "the requested resource does not exist.");
}

exports.no_such_album = function () {
    return exports.make_error("no_such_album",
        "The specified album does not exist");
}

exports.nothing_found = function(req, res) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(exports.invalid_resource()) + "\n");
}