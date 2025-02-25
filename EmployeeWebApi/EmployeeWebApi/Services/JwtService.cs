using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EmployeeWebApi.Services
{
    public class JwtService
    {
        private readonly string _secretKey;
        private readonly int _expiryDuration;

        public JwtService(IConfiguration configuration)
        {
            _secretKey = configuration["Jwt:Key"]!;
            _expiryDuration = int.Parse(configuration["Jwt:ExpireMinutes"]!);
        }

        public string GenerateToken(string username)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username)
            };

            var token = new JwtSecurityToken(
                issuer: "EmployeeWebApi",
                audience: "EmployeeWebApi",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_expiryDuration),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
