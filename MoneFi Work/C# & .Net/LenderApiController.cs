using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Lenders;
using Sabio.Models.Requests.Lender;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using Sabio.Web.StartUp;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/lenders")]
    [ApiController]
    public class LenderApiController : BaseApiController
    {
        private ILenderService _service = null;
        private IAuthenticationService<int> _authService = null;

        public LenderApiController(ILenderService service, ILogger<LenderApiController> logger, IAuthenticationService<int> authService ) : base(logger)
        {
            _service = service;
            _authService = authService;
        }
        [HttpPost]
        public ActionResult<ItemResponse<int>> Insert(LenderAddRequest model)
        {
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.LenderInsert(model, userId);
                ItemResponse<int> response = new ItemResponse<int>();
                response.Item = id;

                return Created201(response);
            }
            catch (Exception ex) 
            {
                return base.StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> LenderUpdate(LenderUpdateRequest model)
        {
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.LenderUpdate(model, userId);

                SuccessResponse response = new SuccessResponse();


                return Ok(response);
            }
            catch(Exception ex) {
                return base.StatusCode(500, new ErrorResponse(ex.Message));
            }
        }
        [HttpDelete("{id:int}")]
        public ActionResult<ItemResponse<int>> LenderDelete(LenderUpdateRequest model)
        {
            try
            {
                _service.LenderDelete(model);

                SuccessResponse response = new SuccessResponse();


                return Ok(response);
            }
            catch (Exception ex)
            {
                return base.StatusCode(500, new ErrorResponse(ex.Message));
            }
        }


        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Lender>> Get(int id)
        {
            try
            {
                Lender l = _service.GetById(id);
                ItemResponse<Lender> response = new ItemResponse<Lender>();
                response.Item = l;


                if (response.Item == null)
                {
                    return NotFound404(response);
                }
                else
                {
                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                return base.StatusCode(500, new ErrorResponse(ex.Message));
            }


        }
        [HttpGet]
        public ActionResult<ItemsResponse<Lender>> GetAll()
        {
            try
            {
                List<Lender> list = _service.GetAll();
                ItemsResponse<Lender> response = new ItemsResponse<Lender>();
                response.Items = list;
                if (response.Items == null)
                {
                    return NotFound404(response);
                }
                else
                {
                    return Ok(response);
                }
            }
            catch(Exception ex)
            {
                return base.StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpGet("paginated")]
        public ActionResult<ItemResponse<Paged<Lender>>> GetAllPaginated(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<Lender> paged = _service.GetAllPaginated(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Lender>> response = new ItemResponse<Paged<Lender>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }
        [HttpGet("createdBy")]
        public ActionResult<ItemResponse<Paged<Lender>>> LendersGetByCreatedBy(int createdBy, int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<Lender> paged = _service.LendersGetByCreatedBy(createdBy,pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Lender>> response = new ItemResponse<Paged<Lender>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Lender>>> LendersGetAllPaginated( int pageIndex, int pageSize, string searchTerm, string filterTerm)
        {
            ActionResult result = null;
            try
            {
                Paged<Lender> paged = _service.LendersGetAllPaginated(pageIndex, pageSize, searchTerm, filterTerm);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Lender>> response = new ItemResponse<Paged<Lender>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

    }
}
