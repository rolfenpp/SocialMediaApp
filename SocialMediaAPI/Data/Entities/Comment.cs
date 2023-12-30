namespace SocialMedia.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

public class Comment
{
    public int Id { get; set; }
    public int PostId { get; set; }
    public int UserId { get; set; }
    public string Text { get; set; }
}