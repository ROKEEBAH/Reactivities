using Application.Activities.Queries;
using Application.Activities.Commands;


using Microsoft.AspNetCore.Mvc;
using Domain;
using MediatR;
using System;
using Application.Activities.DTOs;


namespace API.Controllers
{

    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new GetActivityList.Query());
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityDetail(string id)
        {
            // throw new Exception("Server test error");
            return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));

        
        }
        [HttpPost]
        public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
        {
             return HandleResult (await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto}));
        }
        
        [HttpPut("{id}")]
        // [HttpPut]
        public async Task<ActionResult> EditActivity(string id, EditActivityDto activity)
        {
             return HandleResult (await Mediator.Send(new EditActivity.Command { ActivityDto = activity }));
            
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(string id)
        {
             return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
           
        }
    }
    }
