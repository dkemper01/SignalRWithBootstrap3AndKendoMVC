var kendo = kendo || {}; // kendo parent namespace
kendo.data = kendo.data || {}; // kendo.data namespace

kendo.data.Operations = (function () {
    "use strict";

    var crudServiceBaseUrl = "/Home";
    var editNotificationHub;
    var $personGrid = null;

    editNotificationHub = $.connection.editNotificationHub;
    editNotificationHub.client.editNotification = onEditNotification;

    $.connection.hub.start();

    function onEditNotification(cId, editMessage) {

        var showCurrentUserEditSwitchValue = $('#show-current-user-updates-switch').prop('checked');

        if (showCurrentUserEditSwitchValue) {

            kendoConsole.log(editMessage);
        } else if ($.connection.hub.id != cId) {

            kendoConsole.log(editMessage);
        }

    }

    function onPersonEdit(arg) {

        // get the model of the selected object, not just its HTML
        //
        var currentRow = arg.model;
        var currentEdit = arg.sender.select().attr("data-uid");

        editNotificationHub.server.sendEditMessage({ "Id": currentRow.Id, "FirstName": currentRow.FirstName, "LastName": currentRow.LastName, "Email": currentRow.Email });

    }

    function onPersonSave(arg) {

        // get the model of the selected object, not just its HTML
        //
        var currentRow = arg.model;
        var currentEdit = arg.sender.select().attr("data-uid");

        editNotificationHub.server.sendUserCommitMessage({ "Id": currentRow.Id, "FirstName": currentRow.FirstName, "LastName": currentRow.LastName, "Email": currentRow.Email });
    }

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: crudServiceBaseUrl + "/FetchPersonData",
                contentType: "application/json; charset=utf-8", // tells the web service to serialize JSON
                type: "GET", //use HTTP POST request as the default GET is not allowed for ASMX
                dataType: "json"
            },
            update: {
                url: crudServiceBaseUrl + "/EditPersonData",
                contentType: "application/json; charset=utf-8", // tells the web service to serialize JSON
                type: "POST", //use HTTP POST request as the default GET is not allowed for ASMX
                dataType: "json"
            },
            parameterMap: function (options, operation) {
                if (operation !== "read" && options) {
                    return kendo.stringify({ editedPerson: options });
                }
            }
        },
        pageSize: 20,
        schema: {
            /* data: "d", // ASMX services return JSON in the following format { "d": <result> }. Specify how to get the result. */
            total: function (result) {
                result = result.d || result;

                if (result != null) {
                    return result.length;
                }
            },
            model: {
                id: "Id",
                fields: {
                    Id: { type: "number", editable: false, nullable: false, validation: { required: true } },
                    FirstName: { type: "string", validation: { required: true } },
                    LastName: { type: "string", validation: { required: true } },
                    PostalCode: { type: "string" },
                    Email: { type: "string", validation: { required: true } }
                }
            }
        }
    });

    var initPersonGrid = function () {

        $personGrid = $("#person-grid");

        if ($personGrid.length > 0) {

            $("#person-grid").kendoGrid({
                edit: onPersonEdit,
                save: onPersonSave,
                dataSource: kendo.data.Operations.PeopleDataSource,
                pageable: true,
                sortable: {
                    mode: "single",
                    allowUnsort: false
                },
                selectable: "row",
                height: 430,
                columns: [
                    "Id",
                    { field: "FirstName", title: "First Name" },
                    { field: "LastName", title: "Last Name" },
                    { field: "PostalCode", title: "Zip" },
                    { field: "Email", title: "Email" },
                    { command: ["edit"], title: "Actions", width: "200px" }],
                editable: "inline"
            });
        }
    };

    // accessible to consumer ...
    //
    return {
        PersonGridInit: initPersonGrid,
        PeopleDataSource: dataSource
    };
})();