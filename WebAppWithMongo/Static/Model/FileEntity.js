function File(file_data) {
    this.name = file_data.name;
    this.date = file_data.date;
    this.title = file_data.title;
    this.description = file_data.description;
    this.extension = file_data.extension;
    this.folderId = file_data.folderId;
    this._id = file_data._id;
}

File.prototype._id = null;
File.prototype.extension = null;
File.prototype.name = null;
File.prototype.date = null;
File.folderId = null;
File.prototype.title = null;
File.prototype.description = null;

File.prototype.GetJson = function () {

    return {
        name: this.name + "." + this.extension,
        date: this.date,
        title: this.title,
        description: this.description,
        folderId: this.folderId
    };
};
