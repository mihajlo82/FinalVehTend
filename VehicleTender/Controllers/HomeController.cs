using BusinessLogic;
using BusinessLogic.DataTransferObjects;
using DataAccessLayer_DAL;
using DataAccessLayer_DAL.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using VehicleTender.Models;

namespace VehicleTender.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private MainBLL mainBLL = new MainBLL();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetTenders()
        {
            try
            {
                var allTenders = mainBLL.HomeTable();
                return Json(allTenders, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                throw;
            }
        }

     //admin view tender details
        public ActionResult Tender(string id)
        {
            //    var k  = Url.RequestContext.RouteData.Values["id"];
            ApplicationDbContext db = new ApplicationDbContext();
            ViewModelHomeDetail det = new ViewModelHomeDetail();

            //tender info
            var singleTenderDetails = db.Tender.FirstOrDefault(x => x.TenderNo == id);
            det.Tender = singleTenderDetails;

            //list stocks of specific tender
            List<TenderStock> stocks = db.TenderStock.Where(x => x.TenderId == singleTenderDetails.Id).ToList();
            det.TStock = stocks;

            //List<Bid> usersInvited = db.Bid.Where(x => x.TenderStockId == singleTenderDetails.Id).Where(x=>x.User.Id==x.TenderUserId).ToList();
            //det.InvitedUser = usersInvited;
            //List<TenderUser> usersInvited = db.TenderUser.Where(x => x.TenderId == singleTenderDetails.Id).ToList();
            //det.TUser = usersInvited;

            // var TUser = db.TenderUser.Where(x=> x.TenderId == singleTenderDetails.Id);
    //        List<Bid> allBid = db.Bid.Where(x=> x.Stock.Tender.TenderNo == singleTenderDetails.TenderNo).Where(x=>x.TenderUserId == x.User.Id).ToList();
          //  det.Bid  = allBid;

            List<Bid> finUse = db.Bid.Where(x => x.Stock.Tender.Id == singleTenderDetails.Id).ToList();
            det.Bid = finUse;
            

            return View(det);
        }


        public JsonResult GetStockInfoDetails() {
            try
            {
                var stockinfo = mainBLL.DetailStockInfos();
                return Json(stockinfo, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                throw;
            }
        }


        //index user home/////
        public ActionResult IndexUser()
        {
            return View();
        }

        //admin view tender details
        public ActionResult TenderUser(string id)
        {
            //    var k  = Url.RequestContext.RouteData.Values["id"];
            ApplicationDbContext db = new ApplicationDbContext();
            ViewModelHomeDetail det = new ViewModelHomeDetail();

            //tender info
            var singleTenderDetails = db.Tender.FirstOrDefault(x => x.TenderNo == id);
            det.Tender = singleTenderDetails;

            //list stocks of specific tender
            List<TenderStock> stocks = db.TenderStock.Where(x => x.TenderId == singleTenderDetails.Id).ToList();
            det.TStock = stocks;

            //List<TenderUser> usersInvited = db.TenderUser.Where(x => x.TenderId == singleTenderDetails.Id).ToList();
            //det.TUser = usersInvited;
            // var TUser = db.TenderUser.Where(x=> x.TenderId == singleTenderDetails.Id);

            return View(det);
        }

        public ActionResult MyData() {
            return View();
        }

        [HttpPost]//Updating IsWinningPrice On Finish Button Click
        public void MyDataJson(BidFinishDTO[] dataForSending)
        {
            try {
                ApplicationDbContext db = new ApplicationDbContext();
                var bids = db.Bid.ToList();

                foreach (var item in dataForSending) {
                    var edi =bids.Find(x => x.Id == item.Id);
                    edi.IsWinningPrice = true;
                    var spcfT = item.Id;
                    edi.Stock.Tender.StatusId=4;
                 //   k.Where(x => item.Id == edi.Stock.Tender.Id);
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}