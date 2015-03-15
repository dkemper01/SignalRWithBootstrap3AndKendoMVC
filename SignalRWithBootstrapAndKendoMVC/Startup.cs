using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Owin;
using Microsoft.Owin;
using WURFL;
using WURFL.Aspnet.Extensions.Config;

[assembly: OwinStartup(typeof(SignalRWithBootstrapAndKendoMVC.Startup))]
namespace SignalRWithBootstrapAndKendoMVC
{
    public class Startup
    {
        public static IWURFLManager WurflContainer;

        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();

            // Wurfl registration
            //
            var configurer = new ApplicationConfigurer();
            WurflContainer = WURFLManagerBuilder.Build(configurer);
        }
    }
}