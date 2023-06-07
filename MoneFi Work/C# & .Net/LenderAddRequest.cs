using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Lender
{
    public class LenderAddRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int LenderTypeId { get; set; }
        public int LoanTypeId { get; set; }
        public string Logo { get; set; }
        public string Website { get; set; }
        public int LocationId { get; set; }
        public int StatusId { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
    }
}
