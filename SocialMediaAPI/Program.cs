using SocialMedia.data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


var builder = WebApplication.CreateBuilder(args);

builder.Services
.AddAuthentication()
.AddJwtBearer(options =>
      {
        // Här används signeringsnyckeln för att verifiera att den inte
        // manipulerats på vägen (av klienten, eller av någon annan som vill
        // attackera/utnyttja API:et)
        var signingKey = Convert.FromBase64String(builder.Configuration["JWT:SigningSecret"]);
        
        options.TokenValidationParameters = new TokenValidationParameters
        {
           ValidateIssuer = false,
           ValidateAudience = false,
           IssuerSigningKey = new SymmetricSecurityKey(signingKey)
        };
    });

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>
    (options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("Default")));

builder.Services.AddCors();

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle



var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapControllers();

app.Run();
