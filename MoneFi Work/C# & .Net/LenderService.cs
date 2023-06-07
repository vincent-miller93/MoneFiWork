using Sabio.Data.Providers;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Requests.Lender;
using Sabio.Data;
using Newtonsoft.Json;
using System.Reflection;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Lenders.LenderPlaceholderModels;
using Sabio.Models.Domain.Lenders;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Sabio.Services
{
    public class LenderService : ILenderService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;
        IBaseUserMapper _baseUserMapper = null;
        
        public LenderService(IDataProvider data, ILookUpService lookUpService, IBaseUserMapper baseUserMapper)
        {
            _data = data;
            _lookUpService = lookUpService;
            _baseUserMapper = baseUserMapper;
        }

        public int LenderInsert(LenderAddRequest model, int userId)
        {
            int id = 0;
                  
            string procName = "[dbo].[Lenders_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            { 
                            
                AddCommonParams(model, col);
                col.AddWithValue("@CreatedBy", userId);
                col.AddWithValue("@ModifiedBy", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                
                col.Add(idOut);
                                                                                
            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
                
            });
            return id;

        }
        public List<Lender> GetAll()
        {
            string procName = "[dbo].[Lenders_SelectAll]";
            List<Lender> list = null;
            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set) // Single Record Mapper
            {
                int startingIndex = 0;
                Lender Lender = MapSingleLender(reader, ref startingIndex);

                if (list == null) { list = new List<Lender>(); }
                list.Add(Lender);
            }
            );
            return list;
        }
        public Lender GetById(int id)
        {
            string procName = "[dbo].[Lenders_SelectById]";
            Lender lender = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set) // Single Record Mapper
            {
                int startingIndex = 0;
                lender = MapSingleLender(reader, ref startingIndex);
            }
            ); ;

            return lender;
        }


        public Paged<Lender> GetAllPaginated(int pageIndex, int pageSize)
        {
            Paged<Lender> pagedList = null;
            List<Lender> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("[Lenders_SelectAllPaginated]", (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            }, (reader, recordSetIndex) =>
            {
                int startingIndex = 0;
                Lender lender = MapSingleLender(reader, ref startingIndex);
                totalCount = reader.GetSafeInt32(0);
                if (list == null)
                {
                    list = new List<Lender>();
                }
                list.Add(lender);
            });

            if (list != null)
            {
                pagedList = new Paged<Lender>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }


        public Paged<Lender> LendersGetByCreatedBy(int createdBy, int pageIndex, int pageSize)
        {
            Paged<Lender> pagedList = null;
            List<Lender> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[Lenders_SelectByCreatedBy]", (param) =>
            {
                param.AddWithValue("@CreatedBy", createdBy);
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            }, (reader, recordSetIndex) =>
            {
                if (recordSetIndex == 0)
                {
                    int startIndex = 0;
                    Lender lender = MapSingleLender(reader, ref startIndex);
                    if (list == null)
                    {
                        list = new List<Lender>();
                    }
                    list.Add(lender);

                    totalCount++;
                }
                else if (recordSetIndex == 1)
                {
                    totalCount = reader.GetSafeInt32(0);
                }
            });

            if (list != null)
            {
                pagedList = new Paged<Lender>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public Paged<Lender> LendersGetAllPaginated(int pageIndex, int pageSize, string searchTerm, string filterTerm)
        {
            Paged<Lender> pagedList = null;
            List<Lender> list = null;
            int totalCount = 0;
           

            _data.ExecuteCmd("[dbo].[Lenders_SearchAllPaginated]", (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
                param.AddWithValue("@SearchTerm", searchTerm);
                param.AddWithValue("@FilterTerm", filterTerm);
            }, (reader, recordSetIndex) =>
            {
                int startingIndex = 0;
                Lender lender = MapSingleLender(reader, ref startingIndex);
                
                if (list == null)
                {
                    list = new List<Lender>();
                }
                list.Add(lender);
                totalCount = reader.GetSafeInt32(startingIndex);



            });

            if (list != null)
            {
                pagedList = new Paged<Lender>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }





        public void LenderUpdate(LenderUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Lenders_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", model.Id);
                AddCommonParams(model, col);
                col.AddWithValue("@ModifiedBy", userId);
            }, returnParameters: null);
        }

        public void LenderDelete(LenderUpdateRequest model)
        {
            string procName = "[dbo].[Lenders_Delete]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@ModifiedBy", model.ModifiedBy);
            }, returnParameters: null);
        }

        private static void AddCommonParams(LenderAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@LenderTypeId", model.LenderTypeId);
            col.AddWithValue("@LoanTypeId", model.LoanTypeId);
            col.AddWithValue("@Logo", model.Logo);
            col.AddWithValue("@Website", model.Website);
            col.AddWithValue("@LocationId", model.LocationId);
            col.AddWithValue("@StatusId", model.StatusId);

        }
        private Lender MapSingleLender(IDataReader reader, ref int startIndex)
        {
            Lender lender = new Lender();
            lender.Id = reader.GetSafeInt32(startIndex++);
            lender.Name = reader.GetSafeString(startIndex++);
            lender.Description = reader.GetSafeString(startIndex++);
            lender.LenderType = _lookUpService.MapSingleLookUp(reader, ref startIndex);

            lender.LoanType = _lookUpService.MapSingleLookUp(reader, ref startIndex);
            lender.StatusType = _lookUpService.MapSingleLookUp(reader, ref startIndex);   
          


            Location location = new Location();
            location.Id = reader.GetSafeInt32(startIndex++);
            location.LocationTypeId = reader.GetSafeInt32(startIndex++);
            location.LineOne = reader.GetSafeString(startIndex++);
            location.LineTwo = reader.GetSafeString(startIndex++);
            location.City = reader.GetSafeString(startIndex++);
            location.Zip = reader.GetSafeString(startIndex++);
            location.State = reader.GetSafeString(startIndex++);
            location.Latitude = reader.GetSafeDouble(startIndex++);
            location.Longitude = reader.GetSafeDouble(startIndex++);
            location.DateCreated = reader.GetSafeDateTime(startIndex++);
            location.DateModified = reader.GetSafeDateTime(startIndex++);
            location.CreatedBy = reader.GetSafeInt32(startIndex++);
            location.ModifiedBy = reader.GetSafeInt32(startIndex++);
            location.IsDeleted = reader.GetSafeBool(startIndex++);
            lender.Location = location;

            lender.Logo = reader.GetSafeString(startIndex++);
            lender.Website = reader.GetSafeString(startIndex++);
            lender.DateCreated = reader.GetSafeDateTime(startIndex++);
            lender.DateModified = reader.GetSafeDateTime(startIndex++);
            lender.CreatedBy = _baseUserMapper.MapBaseUser(reader, ref startIndex);
            lender.ModifiedBy = _baseUserMapper.MapBaseUser(reader, ref startIndex);

            return lender;
        }



    }
}
