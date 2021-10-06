$(document).ready(() => {
    console.log("workd my data");
    $.ajax({
        type: "POST",
        url: "/Home/MyDataJson",
        contentType: "application/json; charset=utf-8",
/*        data:"{}"*/
        success: (data) => {
            console.log(data);
            window.location.href = "/Home";
        },
        error: (err) => {
            console.log(err);
        }
    });
});