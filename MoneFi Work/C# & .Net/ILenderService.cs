using Sabio.Models;
using Sabio.Models.Domain.Lenders;
using Sabio.Models.Requests.Lender;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface ILenderService
    {
        int LenderInsert(LenderAddRequest model, int userId);
        void LenderUpdate(LenderUpdateRequest model, int userId);
        void LenderDelete(LenderUpdateRequest model);
        Lender GetById(int id);
        List<Lender> GetAll();
        Paged<Lender> GetAllPaginated(int pageIndex, int pageSize);
        Paged<Lender> LendersGetByCreatedBy(int createdBy,int pageIndex, int pageSize);
        Paged<Lender> LendersGetAllPaginated( int pageIndex, int pageSize, string searchTerm, string filterTerm);


    }
}
