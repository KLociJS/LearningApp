using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Models;
using WebAPI.SeedData;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDataContext>( options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DataContext")));

builder.Services.AddIdentity<AppUser, IdentityRole<Guid>>()
    .AddRoles<IdentityRole<Guid>>()
    .AddEntityFrameworkStores<AppDataContext>();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Seed roles and admin user 
// using (var scope = app.Services.CreateScope())
// {
//     var services = scope.ServiceProvider;
//     
//     var context = services.GetRequiredService<AppDataContext>();
//     context.Database.Migrate();
//
//     var userManager = services.GetRequiredService<UserManager<AppUser>>();
//     var roleManager = services.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
//
//     await SeedData.Init(userManager, roleManager, context);
// }

app.Run();