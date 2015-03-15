using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRWithBootstrapAndKendoMVC.Device
{
    public interface IDeviceProfiler
    {
        Boolean IsDesktop(String userAgent);
        String MobileSuffix { get; }
        Boolean IsMobile(String userAgent);
        String SmartphoneSuffix { get; }
        Boolean IsSmartphone(String userAgent);
        String TabletSuffix { get; }
        Boolean IsTablet(String userAgent);
    }
}
