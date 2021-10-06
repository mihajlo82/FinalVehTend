$(document).ready(() => {
    let TendID = $(".tendid").children()[1];
    let tenderID = TendID.value;

    let checkoxInps = [];
    let clickedLinks = [];
    $(".regNoLink").on("click", function () {
        let a = $(".userBidDet0");
    });

    //extracting inputs
    $(".userBidDet").each(function (el, item) {
        let ll = $(item);
        clickedLinks.push(ll);
        let row = $(item).children().children();

        $(row).each(function (el, it) {
            if ($(it).children().length > 1) {
                let inp = $(it).children()[1];
                checkoxInps.push(inp);
            }
        });
    })


    //toggling finish button on chekbox click
    let chno;
    let oneStockAllChecksHolder;
    let singleStockChecks = [];
    $(checkoxInps).each(function (el, item) {
        let doubleCheck = false;
        $(item).on('click', function () {    
           chno = checkerCB();
           oneStockAllChecksHolder = $(item).parent().parent().parent();
    
            $(oneStockAllChecksHolder).each(function (el, m) {
                let ll = $(m);
               // clickedlinks.push(ll);
                let row = $(m).children().children();

                $(row).each(function (el, it) {
                    if ($(it).children().length > 1)
                    {
                        let inp = $(it).children()[1];
                        $(inp).prop('checked', false);
                       // singlestockchecks.push(inp);
                    }
                });
            })


            if (chno>0) {
                $('.finishBtn').css("display", "block");
            } else {
                $('.finishBtn').css("display", "none");
            }
            
            if (!doubleCheck) {
                $(item).prop('checked', true);
                doubleCheck = true;
            } else {
                $(item).prop('checked', false);
                doubleCheck = false;
            }
        });
    });
    
    //is checked any checkbox 
    function checkerCB() {
        let count = 0;
        $(checkoxInps).each(function (el, item) {
            if (item.checked) {
                count++;
            }
        });
        return count;
    }

    //extract single stock check fields

    //reset all cheboxes
    function resetAllCheckboxes() {
        $(checkoxInps).each(function (el, m) {
            $(m).on("click", function () {
                let k = $(this).parent().parent().parent().children().children();

                $(k).each(function (el, it) {
                    if ($(it).children().length > 1)
                    {
                        let inp = $(it).children()[1];

                       // console.log(inp);
                        $(inp).prop('checked', false);
                    }
                })
            });
        });
    }

    //treeview list 
    $(clickedLinks).each(function (el, item) {
            let a = $(this).prev().children().children()[0];
            $(a).on("click", function () {
                $(item).toggle();
            });
    });

    //pushing all elements to one array
    let allElems = [];
    $(".userBidDet").each(function (el, ele) {
        let a = $(ele).children().children();
    $(a).each(function (subel, subele) {
        allElems.push(subele);
        })
    });

    //on click finish btn
    let dataForSending = [];
    $("#finbtn").on("click", function () {
        $(checkoxInps).each(function (e, ele) {
            if (ele.checked) {
                let priceHolder = $(ele).parent().children()[0];
                let Price = priceHolder.innerHTML;

                let unameHolder = $(ele).parent().prev().prev().prev().prev().prev().children()[0];
                let uname = unameHolder.innerHTML;

                let TenderUserIdHolder = $(ele).parent().prev().prev().prev().prev().prev().prev().children()[0];
                let TenderUserId = TenderUserIdHolder.value;

                let BidIdHolder = $(ele).parent().prev().prev().prev().prev().prev().prev().children()[1];
                let BidId = BidIdHolder.value;

                let TenderStockIdHolder = $(ele).parent().prev().prev().prev().prev().prev().prev().children()[2];
                let TenderStockId = TenderStockIdHolder.value;

                let stockDetailSingleRow = $(ele).parent().parent().parent().prev().children().children();
                let IsWinningPrice = true;

             //   console.log("Id: " + BidId);
             //   console.log("uname: " + uname);
             //   console.log("price: " + Price);
             ////   console.log("stockregno: " + stockRegNo);
             //   console.log("tenderstockid: " + TenderStockId);
             ////   console.log("tenderid: " + tenderid);
             //   console.log("tenduserid: " + TenderUserId);
             //   console.log("iswninning: " + IsWinningPrice)
             //   console.log("----------------------");

                let singleData = {
                    Id: BidId,
                    Price,
                    TenderStockId,
                    TenderUserId,
                    IsWinningPrice,
                }
                dataForSending.push(singleData);
            }
        })
        $.ajax({
            url: "/Home/MyDataJson",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ dataForSending: dataForSending }), 
            success: (data) => {
                window.location = "/";
            },
            error: (err) => {
                window.location = "/";
            }
        });
    })
});

