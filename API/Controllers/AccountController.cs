using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTO;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;
        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper
        )
        {
            this.mapper = mapper;
            this.tokenService = tokenService;
            this.signInManager = signInManager;
            this.userManager = userManager;

        }
        
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {

            var user = await userManager.FindByEmailFromClaimsPrinciple(User);

            return new UserDto {
                UserName = user.UserName,
                Token = tokenService.CreateToken(user),
                Email =  user.Email,

            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDTO>> GetUserAddress()
        {            
            var user = await userManager.FindUserByClaimsPrincipalWithAddressAsync(User);

            return mapper.Map<Address, AddressDTO>(user.Address);
        }
        
        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDTO>> UpdateUserAddress(AddressDTO address)
        {
            var user = await userManager.FindUserByClaimsPrincipalWithAddressAsync(User);

            user.Address = mapper.Map<AddressDTO, Address>(address);

            var res = await userManager.UpdateAsync(user);

            if(res.Succeeded) return Ok(mapper.Map<Address, AddressDTO>(user.Address));

            return BadRequest("Impossible to update the user");
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);

            if(user == null) return Unauthorized(new ApiResponse(401));

            var result = await signInManager.CheckPasswordSignInAsync(user ,loginDto.Password, false);

            if(!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto {
                Email = user.Email,
                Token = tokenService.CreateToken(user),
                UserName = user.DisplayName 
            };
            
        } 
        
        [HttpPost("Register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) 
        {
            if(CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse{Errors = new []{"Email address already exists"}});
            }
            var user = new AppUser {
                Email = registerDto.Email,
                DisplayName = registerDto.UserName,
                UserName = registerDto.Email,
            };

            var result = await userManager.CreateAsync(user, registerDto.Password);

            if(!result.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto {
                UserName = registerDto.UserName,
                Token = tokenService.CreateToken(user),
                Email =  registerDto.Email,

            };
        }
    }
}