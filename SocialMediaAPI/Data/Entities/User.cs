using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace SocialMedia.Entities;

[Index(nameof(UserName), IsUnique = true)]
public class User
{
    public int Id {get; set;}

    [MaxLength(15)]
    public required string UserName {get; set;}
    [MaxLength(50)]
    public required string Password {get; set;}
    public string FirstName {get; set;}
    public string LastName {get; set;}

    public string ImageUrl { get; set; }
   /*  [MaxLength(50)]
    public string? Name {get; set;}
    [MaxLength(50)]
    public string? LastName {get; set;} */
}