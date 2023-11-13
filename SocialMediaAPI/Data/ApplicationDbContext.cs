using Microsoft.EntityFrameworkCore;
using SocialMedia.Entities;

namespace SocialMedia.data;

public class ApplicationDbContext : DbContext
{
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
     : base(options)
  { }

  public DbSet<Post> Posts { get; set; }
  public DbSet<User> Users {get; set;}
} 

