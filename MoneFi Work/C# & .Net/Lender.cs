using Sabio.Models.Domain.Lenders.LenderPlaceholderModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Lenders
{
    public class Lender 
    {
        public int Id { get; set; }
        public LookUp LenderType { get; set; }
        public LookUp LoanType { get; set; }
        public LookUp StatusType { get; set; }
        public Location Location { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }
        public string Website { get; set; }
       
        public BaseUser CreatedBy { get; set; }
        public BaseUser ModifiedBy { get; set; }

    }
}
