using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRWithBootstrapAndKendoMVC.Device
{
    public class DefaultDeviceProfiler : IDeviceProfiler
    {
        public virtual String MobileSuffix { get { return "mobile"; } }

        public virtual Boolean IsMobile(String userAgent)
        {
            return HasAnyMobileKeywords(userAgent);
        }

        public virtual String SmartphoneSuffix
        {
            get { return "smartphone"; }
        }

        public virtual Boolean IsSmartphone(String userAgent)
        {
            return IsMobile(userAgent);
        }

        public virtual String TabletSuffix
        {
            get { return "tablet"; }
        }

        public virtual Boolean IsTablet(String userAgent)
        {
            return IsMobile(userAgent) &&
              userAgent.Contains("tablet") || userAgent.Contains("ipad");
        }

        public virtual Boolean IsDesktop(String userAgent)
        {
            return HasAnyDesktopKeywords(userAgent);
        }

        // Private Members
        private Boolean HasAnyMobileKeywords(String userAgent)
        {
            var ua = userAgent.ToLower();

            return (ua.Contains("midp") ||
              ua.Contains("mobile") ||
              ua.Contains("android") ||
              ua.Contains("samsung"));
        }

        private Boolean HasAnyDesktopKeywords(String userAgent)
        {
            var ua = userAgent.ToLower();

            return (ua.Contains("wow64") ||
              ua.Contains(".net clr") ||
              ua.Contains("macintosh"));
        }
    }
}