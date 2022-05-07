using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        public IBasketRepository basketRepository { get; }
        private readonly IMapper mapper;
        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            this.mapper = mapper;
            this.basketRepository = basketRepository;
        }

        [HttpGet]

        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await basketRepository.GetBasketAsync(id);

            return Ok(basket ?? new CustomerBasket(id));
            
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
        {
            var CustomerBasket = mapper.Map<CustomerBasketDto,CustomerBasket>(basket);

            var updateBasket = await basketRepository.UpdateBasketAsync(CustomerBasket);

            return Ok(updateBasket);
        }

        [HttpDelete]
        public async Task DeleteBasket(string id){
            await basketRepository.DeleteBasketAsync(id);
        }
    }
}