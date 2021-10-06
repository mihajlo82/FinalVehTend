$(document).ready(() => {
    loadData();
});

function loadData() {
    let userPromis = $.Deferred();
    let usersDataSource = new DevExpress.data.DataSource({
        key: "Id",
        load: () => {
            $.ajax({
                type: "GET",
                url: "/home/GetTenders",
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
    $("#homeTable").dxDataGrid({
        dataSource: usersDataSource,
        showBorders: true,
        columnAutoWidth: true,
        columns: [
            {
                dataField: "TenderNo",
                cellTemplate: function (container, options) {
                    $("<a href='/Home/TenderUser/" + options.value + "'>" + options.value + "</a>").appendTo(container);
                }
            },
            {
                dataField: "Dealer",
            }, "DealerName", "OpenDate", "CloseDate"],
    }).dxDataGrid("instance");
}