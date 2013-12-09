using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Objects.DataClasses;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace SignalRWithBootstrapAndKendoMVC.Models
{
    public class KendoDataModel : EntityObject
    {
        private string id;
        [JsonProperty("Id")]
        public string Id
        {
            get
            {
                return id;
            }

            set
            {
                if (id != value)
                {
                    this.ReportPropertyChanging("Id");
                    id = value;
                    this.ReportPropertyChanged("Id");
                }
            }
        }

        private string firstName;
        [JsonProperty("FirstName")]
        public string FirstName
        {
            get
            {
                return firstName;
            }

            set
            {
                if (firstName != value)
                {
                    this.ReportPropertyChanging("FirstName");
                    firstName = value;
                    this.ReportPropertyChanged("FirstName");
                }
            }
        }

        private string lastName;
        [JsonProperty("LastName")]
        public string LastName
        {
            get
            {
                return lastName;
            }

            set
            {
                if (lastName != value)
                {
                    this.ReportPropertyChanging("LastName");
                    lastName = value;
                    this.ReportPropertyChanged("LastName");
                }
            }
        }

        private string email;
        [JsonProperty("Email")]
        public string Email
        {
            get
            {
                return email;
            }

            set
            {
                if (email != value)
                {
                    this.ReportPropertyChanging("Email");
                    email = value;
                    this.ReportPropertyChanged("Email");
                }
            }
        }

        private string postalCode;
        [JsonProperty("PostalCode")]
        public string PostalCode
        {
            get
            {
                return postalCode;
            }

            set
            {
                if (postalCode != value)
                {
                    this.ReportPropertyChanging("PostalCode");
                    postalCode = value;
                    this.ReportPropertyChanged("PostalCode");
                }
            }
        }
    }
}