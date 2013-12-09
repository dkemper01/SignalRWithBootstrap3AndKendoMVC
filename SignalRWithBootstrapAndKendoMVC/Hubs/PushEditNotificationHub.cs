using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using SignalRWithBootstrapAndKendoMVC.Models;

namespace SignalRWithBootstrapAndKendoMVC.Hubs
{
    [HubName("editNotificationHub")]
    public class PushEditNotificationHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }

        public void SendEditMessage(KendoDataModel editRecord)
        {
            string notificationMessage = String.Format("Requested edit on record with Id = {0}, First Name = {1}, Last Name = {2}, and Email = {3}.", 
                editRecord.Id, editRecord.FirstName, editRecord.LastName, editRecord.Email);

            Clients.All.editNotification(Context.ConnectionId, notificationMessage);
        }

        public void SendUserCommitMessage(KendoDataModel editRecord)
        {
            string notificationMessage = String.Format("Requested save on record with Id = {0}, First Name = {1}, Last Name = {2}, and Email = {3}.",
                editRecord.Id, editRecord.FirstName, editRecord.LastName, editRecord.Email);

            Clients.All.editNotification(Context.ConnectionId, notificationMessage);
        }
    }
}