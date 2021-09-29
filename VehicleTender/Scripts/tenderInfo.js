$(document).ready(() => {
    loadData();
});

function loadData() {
    console.log("founddd tender info")
    let userPromis = $.Deferred();
    let usersDataSource = new DevExpress.data.DataSource({
        key: "Id",
        load: () => {
            $.ajax({
                type: "GET",
                url: "/Home/GetStockInfoDetails",
                contentType: "application/json",
                success: (data) => {
                    console.log(data);
                    userPromis.resolve(data);
                },
                error: (data) => {
                    userPromis.reject(data);
                }
            });
            return userPromis.promise();
        }
    })
    $("#tenderInfoAdmin").dxDataGrid({
        dataSource: usersDataSource,
        showBorders: true,
        columnAutoWidth: true,
        columns: [
            {
                dataField: "RegNo",
                //cellTemplate: function (container, options) {
                //    $("<a href='/Home/Tender/" + options.value + "'>" + options.value + "</a>").appendTo(container);
                //}
            },
            "Make", "Carline", "Model", "Mileage", "Cost", "Comment", "Location"],
    }).dxDataGrid("instance");
}
function LoadAdminTenderData() {
    console.log("a");
}

function LoadTenderData() {
    console.log("a");
}