using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Lender
{
    public class LenderUpdateRequest : LenderAddRequest
    {
        public int Id { get; set; }
    }
}
