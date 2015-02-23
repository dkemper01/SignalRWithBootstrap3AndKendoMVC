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

        var showCurrentUserEditSwitchValue = $('[name="show-current-user-updates-switch"]').prop('checked');

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
        var numeric = arg.container.find("input[name=Id]").data("kendoNumericTextBox");

        numeric.enable(false);

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

                return null;
            }
        },
        pageSize: 20,
        schema: {
            /* data: "d", // ASMX services return JSON in the following format { "d": <result> }. Specify how to get the result. */
            total: function (result) {

                result = result.d || result;
                return result.length;
            },
            model: {
                id: "Id",
                fields: {
                    Id: { type: "number", nullable: false },
                    FirstName: { type: "string", validation: { required: true } },
                    LastName: { type: "string", validation: { required: true } },
                    PostalCode: { type: "string" },
                    Email: { type: "email", validation: { required: true } }
                }
            }
        }
    });

    var numericEditor = function (container, options) {

        $('<input name="Id" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoNumericTextBox({
                decimals: 0,
                min: 0,
                format: '#'
            });
    };

    var initPersonGrid = function () {

        $personGrid = $("#person-grid");
        var staticSm = "75px";
        var staticMed = "135px";
        var adaptiveFlag = $(document).width() <= 970 ? "phone" : false; // currently not in use due to nesting issues ...

        if ($personGrid.length > 0) {

            $("#person-grid").kendoGrid({
                edit: onPersonEdit,
                save: onPersonSave,
                dataSource: kendo.data.Operations.PeopleDataSource,
                pageable: true,
                scrollable: {
                    virtual: true
                },
                sortable: {
                    mode: "single",
                    allowUnsort: false
                },
                selectable: "row",
                height: 430,
                columns: [
                    { field: "Id", editor: numericEditor, title: "Id", width: staticSm },
                    { field: "FirstName", title: "First Name", width: staticMed },
                    { field: "LastName", title: "Last Name", width: staticMed },
                    { field: "PostalCode", title: "Zip", width: staticSm },
                    { field: "Email", title: "Email", width: "200px" },
                    { command: ["edit"], title: "Actions", width: "100px" }],
                editable: "popup"
            });
        }
    };

    /*  
    * @method refreshPersonGrid
    * Handles the Safari rendering issue: http://www.telerik.com/forums/web-ui-grid-display-problem-in-ipad-safari-(ios-7-)
    * @return This method does not return an object or value.
    */
    var refreshPersonGrid = function() {

        $("#person-grid").data("kendoGrid").one("dataBound", function (e) {

            var that = this;
            that.tbody[0].style.zoom = 1.1;

            setTimeout(function () {
                that.tbody[0].style.zoom = 1;
            });
        });

    };

    // accessible to consumer ...
    //
    return {
        PersonGridInit: initPersonGrid,
        PeopleDataSource: dataSource,
        RefreshGrid: refreshPersonGrid
    };
})();