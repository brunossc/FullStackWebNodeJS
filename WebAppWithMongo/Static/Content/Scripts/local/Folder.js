var Folder = {

    "InitIndex": function () {
        $(window).resize(function () {
            Folder.SetPopUpPosition("addNewFolderPopup");
        });

        $.get("/folders/Grid.html", function (result) {
            $("#grid").html(result).promise().done(function () {
                Folder.InitGrid();
                $("#addNewFolder").on('click', function () {
                    $("#addNewFolderPopup").toggle(0, function () {
                        if ($("#addNewFolderPopup").css('display') == 'block') {
                            Folder.SetPopUpPosition("addNewFolderPopup");
                        }
                        else {
                            Folder.InitGrid();
                        }
                    });
                });
            });
        });

        $.get("/folders/Filter.html", function (result) {
            $("#filter").html(result).promise().done(function ()
            {
                $("#search").click(function ()
                {
                    var tmpl = null,
                        tdata = null,
                        value = $("#nameFilter").val();

                    if (value != "") {

                        $.get("/folders/Grid.html", function (result) {
                            tmpl = result;
                        });

                        $.getJSON("/v1/folder/FindSearch?name=" + value, function (result) {
                            tdata = result.data;
                        });

                        $(document).ajaxStop(function () {
                            Folder.BindingDataOnGrid(tmpl, tdata)
                        });
                    }
                    else
                    {
                        alert("Please enter a value to search!!");
                    }
                });
            });
        });

        $.get("/folders/Create.html", function (result) {
            $("#addNewFolderPopup").html(result).promise().done(function () {
                Folder.InitCreate();
            });
        });

    },

    "InitCreate": function () {
        $("#createFolder").submit(function (event) {
            // Stop form from submitting normally
            event.preventDefault();

            var jsonObject =
                {
                    id: $(this).find("input[name='id']").val(),
                    name: $(this).find("input[name='name']").val(),
                    date: $(this).find("input[name='date']").val(),
                    title: $(this).find("input[name='title']").val(),
                    description: $(this).find("input[name='description']").val()
                };

            $.post("/folder/save", jsonObject).done(function (result) {
                if (result.error != null) {
                    alert(JSON.stringify(result.error));
                }
                else {
                    $("#addNewFolderPopup").toggle();
                    Folder.InitGrid();
                }
            });
        });
    },

    "InitGrid": function () {
        var tmpl = null,
            tdata = null;

        $.get("/folders/Grid.html", function (result) {
            tmpl = result;
        });

        $.getJSON("/v1/folder/GetAll", function (result) {
            tdata = result.data;
            //$.each(tdata.folders, function (i, item) {
            //    $.getJSON("/v1/folders/" + item.folder_name + ".json", function (files) {
            //        tdata.folders[i] = files.data.folders;
            //    });
            //});
        });

        $(document).ajaxStop(function () {
            Folder.BindingDataOnGrid(tmpl, tdata)
        });
    },

    //A better place for this function is a helpers class, util class or something like this.
    "SetPopUpPosition": function (selector) {
        $("#" + selector).offset(
            {
                left: ($(window).innerWidth() / 2) - parseInt($("#" + selector).css("width")) / 2,
                top: ($(window).innerHeight() / 2) - parseInt($("#" + selector).css("height")) / 2
            });
    },

    "BindingDataOnGrid": function (tmpl, tdata)
    {
        var renderedPage = Mustache.to_html(tmpl, { folders: tdata });
        $("#folderGrid").html(renderedPage).promise().done(function () {
            //$.each(tdata.folders, function (i, item) {
            //    $("#" + item.folder_name + "_link").click(function () {
            //        $(this).parent().find("ul").toggle();
            //    });
            //});

            $("input[id='remove']").click(function () {
                $.post("/folder/deleteById", { _id: $(this).attr("objectId") }).done(function (result) {
                    if (result.error != null) {
                        alert(JSON.stringify(result.error));
                    }
                    else {
                        Folder.InitGrid();
                    }
                });
            });

            $("input[id='edit']").click(function () {
                $.post("/folder/findbyid", { _id: $(this).attr("objectId") }).done(function (result) {
                    if (result.error != null) {
                        alert(JSON.stringify(result.error));
                    }
                    else {
                        $("#addNewFolder").click();

                        var folder = result.data[0];

                        $("#createFolder").find("input[name='id']").val(folder._id);
                        $("#createFolder").find("input[name='name']").val(folder.name);
                        $("#createFolder").find("input[name='date']").val(folder.date);
                        $("#createFolder").find("input[name='title']").val(folder.title);
                        $("#createFolder").find("input[name='description']").val(folder.description);
                    }
                });
            });
        });
    }

}