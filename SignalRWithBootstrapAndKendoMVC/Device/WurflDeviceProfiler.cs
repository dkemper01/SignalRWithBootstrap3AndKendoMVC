using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRWithBootstrapAndKendoMVC.Device
{
    /// <summary>
    /// WURFL device profiler which uses virtual device capabilities described in [ http://wurfl.sourceforge.net/dotnet_index.php ].  
    /// </summary>
    public class WurflDeviceProfiler : DefaultDeviceProfiler
    {
        public override bool IsMobile(String ua)
        {
            var device = Startup.WurflContainer.GetDeviceForRequest(ua);
            var isMobile = Convert.ToBoolean(device.GetVirtualCapability("is_mobile"));

            return isMobile;
        }

        public override bool IsTablet(String ua)
        {
            var resultFlag = false;
            var device = Startup.WurflContainer.GetDeviceForRequest(ua);

            var isTouch = ToFlag(device.GetVirtualCapability("is_touchscreen"));
            var isSmartPhone = ToFlag(device.GetVirtualCapability("is_smartphone"));
            var isAndroid = ToFlag(device.GetVirtualCapability("is_android"));
            var isIos = ToFlag(device.GetVirtualCapability("is_ios"));
            var isLargeScreen = ToFlag(device.GetVirtualCapability("is_largescreen"));

            if (isSmartPhone.HasValue && isAndroid.HasValue && isIos.HasValue && isTouch.HasValue &&
                isLargeScreen.HasValue)
            {
                if (!isSmartPhone.Value && (isAndroid.Value || isIos.Value) && isTouch.Value && isLargeScreen.Value)
                {
                    resultFlag = true;
                }
            }

            return resultFlag;
        }

        public override bool IsSmartphone(String ua)
        {
            var resultFlag = false;
            var device = Startup.WurflContainer.GetDeviceForRequest(ua);

            var isSmartPhone = ToFlag(device.GetVirtualCapability("is_smartphone"));

            if (isSmartPhone.HasValue)
            {
                resultFlag = (IsMobile(ua) && isSmartPhone.Value);
            }

            return resultFlag;
        }

        public bool? ToFlag(string potentialBool)
        {
            bool? flag = null;
            bool flagOut;

            if (Boolean.TryParse(potentialBool.ToLower(), out flagOut))
            {
                flag = flagOut;
            }

            return flag;
        }
    }
}