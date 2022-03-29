using MapAYakApi.Interfaces;
using MapAYakApi.Models;
using MapAYakApi.Models.Repositories;
using MapAYakApi.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

//==============================================================================
// Services
//==============================================================================

var builder = WebApplication.CreateBuilder(args);

// Holds connection string and email credentials.
builder.Configuration.AddJsonFile("secrets.json", true);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services
    .AddDefaultIdentity<IdentityUser>(options =>
    {
        options.SignIn.RequireConfirmedAccount = true;
        options.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddScoped<IRouteRepository, RouteRepository>();
builder.Services.AddScoped<ILocationRepository, LocationRepository>();
builder.Services.AddScoped<IEmailService, EmailService>();

//==============================================================================
// Middleware
//==============================================================================

var app = builder.Build();

if (!app.Environment.IsDevelopment())
    app.UseHsts();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
    app.MapControllerRoute(name: "default", pattern: "api/{controller}/{action}");
else
    app.MapControllerRoute(name: "default", pattern: "{controller}/{action}");

app.Run();
