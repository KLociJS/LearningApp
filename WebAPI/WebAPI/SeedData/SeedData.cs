using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.SeedData;

public class SeedData
{
    public static async Task Init(UserManager<AppUser> userManager, RoleManager<IdentityRole<Guid>> roleManager)
    {
        if (!roleManager.Roles.Any())
        {
            await CreateRole("Admin", roleManager);
            await CreateRole("Moderator", roleManager);
            await CreateRole("Author", roleManager);
            await CreateRole("User", roleManager);
        }

        if (!userManager.Users.Any())
        {
            var adminUser = new AppUser()
            {
                UserName = "Admin",
                Email = "LapAdmin@lap.com"
            };
            await userManager.CreateAsync(adminUser, "Abcd@1234");
            await userManager.AddToRolesAsync(adminUser, new[] { "Admin", "Moderator", "Author", "User" });
        }
    }


    private static async Task CreateRole(string roleName, RoleManager<IdentityRole<Guid>> roleManager)
    {
        // Check if the rol exists
        var roleExists = await roleManager.RoleExistsAsync(roleName);
        if (!roleExists)
        {
            var role = new IdentityRole<Guid>(roleName);
            var result = await roleManager.CreateAsync(role);
            
            if (result.Succeeded)
            {
                Console.WriteLine("Role created!");
            }
            else
            {
                Console.WriteLine("Failed to create role");
            }
        }
        else
        {
            Console.WriteLine("Role already exists!");
        }
    }

    private static async Task CreateUser(string userName, string email, string password, string roleName, RoleManager<IdentityRole<Guid>> roleManager, UserManager<AppUser> userManager)
    {
        // Create the admin user
        var adminUser = new AppUser()
        {
            UserName = userName,
            Email = email
        };

        await userManager.CreateAsync(adminUser, password);

        // Assign the admin role to the admin user
        await AssignRoleToUser(adminUser.Id, roleName, roleManager, userManager);
    }
    
    private static async Task AssignRoleToUser(Guid userId, string roleName, RoleManager<IdentityRole<Guid>> roleManager, UserManager<AppUser> userManager)
    {
        var user = await userManager.FindByIdAsync(userId.ToString());

        if (user != null)
        {
            // Check if the role exists
            var role = await roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                // Create the role if it doesn't exist
                role = new IdentityRole<Guid>(roleName);
                await roleManager.CreateAsync(role);
            }

            // Assign the role to the user
            await userManager.AddToRoleAsync(user, roleName);
        }
    }
}
