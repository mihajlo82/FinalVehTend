$(document).ready(() => {
    let arr = [];
    var inpVal;
    let isEmpty = true;

    function checkIsEmpty() {
        isEmpty = true;
        $(".bidVal").each(function (el, item) {
            let a = $(item).val();
            console.log(a.length);
            if (a.length > 0) {
                isEmpty = false;
            }
        });

        //console.log(isEmpty);


$(".review").on("click", function () {
   checkIsEmpty();
    if (!isEmpty) {
        $(".error-msg").css('display', "none");
        arr = [];
        $(".bidVal").each(function (el, item) {
            let a = $(item).val();
            arr.push(a);

            $(".inputsTransfer").each(function (el, item) {
                let td = $(item).children();
                $(td).each(function (ele, it) {
                    if ($(it).hasClass('finalBid')) {
                        inpVal = arr[el];
                        $(it).text(inpVal);
                    }
                })
            });

            $(".beforeReview").css("display", "none");
            $(".review").css("display", "none");
            $(".afterReview").css("display", "block");
        });
    } else {  
        showError()
        setTimeout(function () {
            $(".error-msg").css('display', "none");
        }, 1700);
       // return;
    }
    });

    function showError() {
        $(".error-msg").css("display", "block");
        $(".error-msg").text("Must have min one bid");
    }
    
    //after back btn
    $(".backBtn").on("click", function () {
        $(".beforeReview").css("display", "block");
        $(".review").css("display", "block");
        $(".afterReview").css("display", "none");
    });

    //submit btn
    $(".submitBidBtn").on("click", function () {
        console.log("sub");
    })

});



