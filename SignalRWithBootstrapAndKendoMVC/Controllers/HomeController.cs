﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SignalRWithBootstrapAndKendoMVC.Models;
using SignalRWithBootstrapAndKendoMVC.ViewModels;

namespace SignalRWithBootstrapAndKendoMVC.Controllers
{
    public class HomeController : Controller
    {
        public static PersonViewModel ViewModelPerson { get; set; }
        
        public HomeController() 
        {
            if (ViewModelPerson == null)
            {
                ViewModelPerson = new PersonViewModel();
            }
        }

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to a SignalR demo, a demonstration of Microsoft's SignalR push framework for web applications.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Love it or ... well, hate is such a strong word.  Let me know anyway!";

            return View();
        }

        public JsonResult FetchPersonData()
        {
            // Setting no-cache resolved the issue with safari.
            //
            Response.Cache.SetCacheability(HttpCacheability.NoCache);

            return new JsonResult { Data = ViewModelPerson.PersonDataCollection, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult EditPersonData(KendoDataModel editedPerson)
        {
            // Setting no-cache resolved the issue with safari.
            //
            Response.Cache.SetCacheability(HttpCacheability.NoCache);

            return new JsonResult { Data = ViewModelPerson.EditPerson(editedPerson), JsonRequestBehavior = JsonRequestBehavior.DenyGet };
        }

        public JsonResult FetchTooltipContent()
        {
            string htmlToReturn = "<p>Toggle the display of updates you choose to make, vs. those of others.</p>";

            // Simulate long running task here ...
            //
            System.Threading.Thread.Sleep(1000);

            return new JsonResult {Data = htmlToReturn, JsonRequestBehavior = JsonRequestBehavior.AllowGet};
        }
    }
}
