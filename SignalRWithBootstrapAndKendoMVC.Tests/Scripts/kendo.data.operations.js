$(document).ready(function () {

    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "/Home/FetchPersonData",
                contentType: "application/json; charset=utf-8", // tells the web service to serialize JSON
                type: "GET", //use HTTP POST request as the default GET is not allowed for ASMX
                dataType: "json"
            },
            parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                    return kendo.stringify({ dataDictionaryRows: options.models });
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
                    Id: { type: "string", editable: false, nullable: false, validation: { required: true } },
                    FirstName: { type: "string" },
                    LastName: { type: "string" },
                    PostalCode: { type: "number" },
                    PhoneNumber: { type: "string" },
                }
            }
        }
    });

    $("#person-grid").kendoGrid({
        dataSource: dataSource,
        pageable: true,
        height: 430,
        columns: [
            "Id",
            { field: "FirstName", title: "First Name"},
            { field: "LastName", title: "Last Name" },
            { field: "PostalCode", title: "Zip" },
            { field: "PhoneNumber", title: "Phone" },
            { command: ["edit"], title: "&nbsp;", width: "170px" }],
        editable: "inline"
    });
});