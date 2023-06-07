using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Lenders
{
    public class BaseLender
    {
        public string Name { get; set; }      
        public string Logo { get; set; }
        public string Website { get; set; }
        public int StatusId { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
    }
}
