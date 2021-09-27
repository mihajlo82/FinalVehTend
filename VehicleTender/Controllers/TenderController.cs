﻿using BusinessLogic;
using DataAccessLayer_DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VehicleTender.Controllers
{
    [Authorize]
    public class TenderController : Controller
    {
        private MainBLL mainBLL = new MainBLL();
        public ActionResult Tenders()
        {
            return View();
        }

        [HttpGet]

        public JsonResult TenderEntries()
        {
            try
            {
                var tenderList = mainBLL.TenderEntries();
                return Json(tenderList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        public void CreateTender(Tender tenderData)
        {
            try
            {
                mainBLL.CreateTender(tenderData);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]

        public void EditTender(Tender tenderModel)
        {
            try
            {
                mainBLL.EditTender(tenderModel);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DeleteTender(int Id)
        {
            try
            {
                mainBLL.DeleteTender(Id);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public JsonResult TenderStatusDropdown()
        {
            try
            {
                var statusDropdown = mainBLL.GetTenderStatusType();
                return Json(statusDropdown, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}