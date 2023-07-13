using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace WebAPI.Utility;

public interface ITokenProvider
{
    JwtSecurityToken GetJwtSecurityToken(List<Claim> authClaims);
}