using DataAccessLayer_DAL;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VehicleTender.Models
{
    public class ViewModelHomeDetail
    {
        public Tender Tender { get; set; }
        public List<Bid> Bid { get; set; }
        public List<Bid> InvitedUser { get; set; }
        public List<TenderStock> TStock { get; set; }
        public List<TenderUser> TUser { get; set; }
        public StockInfo StockInfo { get; set; }
    }
}