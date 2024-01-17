namespace SocialMedia.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;


public class Comment
{
    public int Id { get; set; }
    public string Text { get; set; }
    public int UserId {get; set;}
    public int PostId {get; set;}

    public string FirstName {get; set;}
    public string LastName {get; set;}
    // Add other properties like UserId, DatePosted, etc.

    // Foreign key to WallPost
    /* public int WallPostId { get; set; } */
    /* public Wallpost Post { get; set; } */
}