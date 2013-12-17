using System;
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
            ViewBag.Message = "An app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "A contact page.";

            return View();
        }

        public JsonResult FetchPersonData()
        {
            return new JsonResult { Data = ViewModelPerson.PersonDataCollection, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult EditPersonData(KendoDataModel editedPerson)
        {
            return new JsonResult { Data = ViewModelPerson.EditPerson(editedPerson), JsonRequestBehavior = JsonRequestBehavior.DenyGet };
        }
    }
}
