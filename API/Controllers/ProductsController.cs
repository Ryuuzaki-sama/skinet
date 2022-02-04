using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using API.Errors;
using Microsoft.AspNetCore.Http;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : BaseApiController
    {
        private readonly IgenericRepository<Product> productsRepo;
        private readonly IgenericRepository<ProductBrand> brandsRepo;
        private readonly IgenericRepository<ProductType> typesRepo;
        private readonly IMapper mapper;
        
        public ProductsController(
            IgenericRepository<Product> productsRepo, 
            IgenericRepository<ProductBrand> brandsRepo,
            IgenericRepository<ProductType> typesRepo,
            IMapper mapper )
        {
            this.productsRepo = productsRepo;
            this.brandsRepo = brandsRepo;
            this.typesRepo = typesRepo;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts([FromQuery]ProductSpecParams productParams) 
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
            var products = await productsRepo.ListAsync(spec);
            return Ok( mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var product = await productsRepo.GetEntityWithSpec(spec);
            
            if(product == null) return NotFound(new ApiResponse(404));
            
            return mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<ProductBrand>> GetProductBrands()
        {
            return Ok(await brandsRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<ProductType>> GetProductTypes()
        {
            return Ok(await typesRepo.ListAllAsync());
        }
        
    }
}