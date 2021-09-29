$(document).ready(() => {
    console.log("sdas");
    loadData();
});

function loadData() {
    if ($("#tenderInfoAdmin")) {
        LoadAdminTenderData();
    } else {
        LoadTenderData();
    }
}
function LoadAdminTenderData() {
    console.log("loadedd");
}

function LoadTenderData() {
    console.log("loadeduserrr");
}