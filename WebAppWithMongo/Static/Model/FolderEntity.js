function Folder(folder_data) {
    this.name = folder_data.name;
    this.date = folder_data.date;
    this.title = folder_data.title;
    this.description = folder_data.description;
    this._id = folder_data._id;
}

Folder.prototype._id = null;
Folder.prototype.name = null;
Folder.prototype.date = null;
Folder.prototype.title = null;
Folder.prototype.description = null;

Folder.prototype.GetJson = function () {

    return {
        id: this._id,
        name: this.name,
        date: this.date,
        title: this.title,
        description: this.description
    };
};
