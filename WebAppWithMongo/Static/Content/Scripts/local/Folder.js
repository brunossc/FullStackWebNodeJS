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
                        else
                        {
                            Folder.InitGrid();
                        }
                    });
                });
            });
        });

        $.get("/folders/Filter.html", function (result) {
            $("#filter").html(result);
        });

        $.get("/folders/Create.html", function (result) {
            $("#addNewFolderPopup").html(result).promise().done(function ()
            {
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

    "InitGrid": function ()
    {
        var tmpl = null,
            tdata = null;

        $.get("/folders/Grid.html", function (result) {
            tmpl = result;
        });

        $.getJSON("/v1/folders/GetAll", function (result) {
            tdata = result.data;
            //$.each(tdata.folders, function (i, item) {
            //    $.getJSON("/v1/folders/" + item.folder_name + ".json", function (files) {
            //        tdata.folders[i] = files.data.folders;
            //    });
            //});
        });

        $(document).ajaxStop(function () {
            var renderedPage = Mustache.to_html(tmpl, { folders: tdata });
            $("#folderGrid").html(renderedPage).promise().done(function () {
                //$.each(tdata.folders, function (i, item) {
                //    $("#" + item.folder_name + "_link").click(function () {
                //        $(this).parent().find("ul").toggle();
                //    });
                //});
            });
        });
    },

    //A better place for this function is a helpers class, util class or something like this.
    "SetPopUpPosition": function (selector)
    {
        debugger;
        $("#" + selector).offset(
            {
                left: ($(window).innerWidth() / 2) - parseInt($("#" + selector).css("width")) / 2,
                top: ($(window).innerHeight() / 2) - parseInt($("#" + selector).css("height")) / 2
            });
    }
}