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
            return new JsonResult { Data = ViewModelPerson.PersonDataCollection, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult EditPersonData(KendoDataModel editedPerson)
        {
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

        public JsonResult FetchDemoTooltipContent(string entry)
        {
            string htmlToReturn = "<p>You didn't enter anything in this field yet.</p>";

            // Simulate long running task here ...
            //
            System.Threading.Thread.Sleep(500);

            if (!String.IsNullOrEmpty(entry))
            {
                htmlToReturn = String.Format("<p>On {0} at {1}, you entered: </p> <p></p> <p>{2}</p>", System.DateTime.Now.Date.ToShortDateString(), System.DateTime.Now.ToShortTimeString(), HttpUtility.HtmlAttributeEncode(entry));
            }

            return new JsonResult {Data = htmlToReturn, JsonRequestBehavior = JsonRequestBehavior.AllowGet};
        }
    }
}
