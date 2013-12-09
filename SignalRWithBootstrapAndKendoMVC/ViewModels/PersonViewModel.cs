using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SignalRWithBootstrapAndKendoMVC.Models;

namespace SignalRWithBootstrapAndKendoMVC.ViewModels
{
    public class PersonViewModel
    {
        public List<KendoDataModel> PersonDataCollection { get; set; }

        public PersonViewModel()
        {
            if (PersonDataCollection == null)
            {
                PersonDataCollection = new List<KendoDataModel>();

                PersonDataCollection.Add(new KendoDataModel { Id = "987", Email = "normanosborne@oscorp.com", FirstName = "Norman", LastName = "Osborne", PostalCode = "29873" });
                PersonDataCollection.Add(new KendoDataModel { Id = "1284", Email = "harryosborne@oscorp.com", FirstName = "Harry", LastName = "Osborne", PostalCode = "29873" });
                PersonDataCollection.Add(new KendoDataModel { Id = "1301", Email = "curtisconnors@oscorp.com", FirstName = "Curtis", LastName = "Connors", PostalCode = "28875" });
                PersonDataCollection.Add(new KendoDataModel { Id = "1357", Email = "williambaker@gmail.com", FirstName = "William", LastName = "Baker", PostalCode = "27312" });
            }
        }

        public List<KendoDataModel> EditPeople(List<KendoDataModel> personEditCollection)
        {
            if ((personEditCollection != null) && (personEditCollection.Count > 0))
            {
                var matchResult = from p in PersonDataCollection
                                  join e in personEditCollection on p.Id equals e.Id
                                  select e;

                foreach (var personResult in matchResult)
                {
                    if ((!String.IsNullOrEmpty(personResult.FirstName)) && (!String.IsNullOrEmpty(personResult.LastName)))
                    {
                        KendoDataModel personToRemove = PersonDataCollection.Where(psn => psn.Id == personResult.Id).First();

                        PersonDataCollection.Remove(personToRemove);
                        PersonDataCollection.Add(personResult);
                    }
                }
            }

            return PersonDataCollection;
        }

        public KendoDataModel EditPerson(KendoDataModel editedPerson)
        {
            KendoDataModel personToRemove = PersonDataCollection.Where(psn => psn.Id == editedPerson.Id).First();  

            if ((!String.IsNullOrEmpty(editedPerson.FirstName)) && (!String.IsNullOrEmpty(editedPerson.LastName)) && (editedPerson.Email.Contains('@')))
            {
                PersonDataCollection.Remove(personToRemove);
                PersonDataCollection.Add(editedPerson);
            }

            return editedPerson;
        }
    }
}