using System.IdentityModel.Tokens.Jwt;
using SocialMedia.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SocialMedia.data;

namespace SocialMedia.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController: ControllerBase 
{
    private readonly ApplicationDbContext context;
    private readonly IConfiguration config;
    public AuthController(ApplicationDbContext context, IConfiguration config)
    {
        this.context = context;
        this.config = config;
    }
    [HttpGet("{id}")]
    /* [Authorize] */
    public ActionResult<UserDto> GetUser(int id)
    {
        var user = context.Users.FirstOrDefault(x => x.Id == id);
        /* var user = context.Users.FirstOrDefault(x => x.Id == id); */

        if (user is null)
        /* if (user is null) */
            return NotFound(); // 404 Not Found

        var userDto = new UserDto
        {
            Id = user.Id,
            UserName = user.UserName,
            FirstName = user.FirstName,
            LastName = user.LastName
        
           /*  Beskrivning = product.Beskrivning, */
        };

        return userDto; // 200 OK
    }
    [HttpPost("register")]
    public ActionResult<UserDto> CreateUser([FromBody] CreateUserRequest createUserRequest) 
    {
        if (createUserRequest == null || string.IsNullOrWhiteSpace(createUserRequest.UserName) ||
        string.IsNullOrWhiteSpace(createUserRequest.Password) ||
        string.IsNullOrWhiteSpace(createUserRequest.FirstName) ||
        string.IsNullOrWhiteSpace(createUserRequest.LastName))
    {
        return BadRequest("Invalid request data");
    }
         var user = new User
    {
        UserName = createUserRequest.UserName,
        Password = createUserRequest.Password, // You should hash and salt the password for security
        FirstName = createUserRequest.FirstName,
        LastName = createUserRequest.LastName
    };

    context.Users.Add(user);
    context.SaveChanges();

    var userDto = new UserDto
    {
        Id = user.Id,
        UserName = user.UserName,
        FirstName = user.FirstName,
        LastName = user.LastName
    };

    return CreatedAtAction(nameof(GetUser), new { id = user.Id }, userDto); // 201 Created
    }

    [HttpPost]
    public ActionResult<TokenDto> Authenticate(AuthenticateRequest authenticateRequest) 
    {
        // 1 - kontrollera om användaren finns (användarnamn + lösenord) 
        var user = context
        .Users
        .FirstOrDefault(x => x.UserName == authenticateRequest.UserName
            && x.Password == authenticateRequest.Password);

        // 1:1 - Om användaren inte finns, returnera 401 Unauthorized

        if (user is null)
        {
            return Unauthorized(); // 401 Unauthorized
        }

        // 1:2 - Om användaren finns, generera token (JWT = JSON Web Token) och returnera denna
        var tokenDto = GenerateToken(user); // Token "åkband"
        return tokenDto;
    }


    private TokenDto GenerateToken(User user) // Token kan innehålla info om användare är admin eller inte
    {
        // Använder signeringsnyckel för att generera en signatur för token
        // skulle användaren manipulera token kommer det upptäckas genom att signaturen förändras.
        var signingKey = Convert.FromBase64String(config["JWT:SigningSecret"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(signingKey),
                SecurityAlgorithms.HmacSha256Signature)
        };
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = jwtTokenHandler
        .CreateJwtSecurityToken(tokenDescriptor);

        var token = new TokenDto
        {
            //Generera token
            Token = jwtTokenHandler.WriteToken(jwtSecurityToken),
            UserId = user.Id,
        };
        return token;
    }

}
public class TokenDto 
{
    public string Token {get; set;}
    public int UserId {get; set;} // nytt
}
public class AuthenticateRequest
{
    public string UserName {get; set;}
    public string Password {get; set;}
}
public class CreateUserRequest
{
    public string UserName { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}

public class UserDto
{
     public int Id {get; set;}
    public string UserName {get; set;}
    public string FirstName {get; set;}
    public string LastName {get; set;}
   /*  public int Password {get; set;} */
}