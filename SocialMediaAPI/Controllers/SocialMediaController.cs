using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialMedia.data;
using SocialMedia.Entities;

namespace SocialMedia.Controllers;

[ApiController]
[Route("[controller]")]
public class SocialMediaController : ControllerBase 
{
    private readonly ApplicationDbContext context;
    public SocialMediaController(ApplicationDbContext context)
    {
        this.context = context;
    }

[HttpGet]
public IEnumerable<PostDto> GetPosts()
{
    var localPosts = context.Posts
        .Include(post => post.User)
        .ToList();

    var postDto = localPosts.Select(x => new PostDto
    {
        Id = x.Id,
        Message = x.Message,
        Liked = x.Liked,
        FirstName = x.User.FirstName, // Access User property here
        LastName = x.User.LastName // Access User property here
    });

    return postDto;
}

    [HttpGet("{id}")]
    /* [Authorize] */
    public ActionResult<PostDto> GetPost(int id)
    {
        var post = context.Posts.FirstOrDefault(x => x.Id == id);
        /* var user = context.Users.FirstOrDefault(x => x.Id == id); */

        if (post is null)
        /* if (user is null) */
            return NotFound(); // 404 Not Found

        var postDto = new PostDto
        {
            Id = post.Id,
            Message = post.Message,
            Liked = post.Liked,
            FirstName = post.FirstName,
            LastName = post.LastName
        
           /*  Beskrivning = product.Beskrivning, */
        };

        return postDto; // 200 OK
    }
    [HttpPut("{id}/like")]
    public ActionResult<PostDto> UpdateLikedCount(int id, [FromBody] UpdateLikedCountRequest updateRequest)
    {
        var post = context.Posts.FirstOrDefault(x => x.Id == id);

        if (post is null)
        {
            return NotFound("Post not found");
        }

        // Update the liked count with the value from the request
        post.Liked = updateRequest.Liked;

        // Save changes to the database
        context.SaveChanges();

        var postDto = new PostDto 
        {
            Id = post.Id,
            Message = post.Message,
            Liked = post.Liked,
            FirstName = post.FirstName,
            LastName = post.LastName
        };

        return Ok(postDto);
    }
    [HttpPost("{id}")]
    /* [Authorize] */
    public ActionResult<PostDto> LikeCommentPost(int id)
    {
        var post = context.Posts.FirstOrDefault(x => x.Id == id);
        /* var user = context.Users.FirstOrDefault(x => x.Id == id); */

        if (post is null)
        /* if (user is null) */
            return NotFound(); // 404 Not Found

        var postDto = new PostDto
        {
            Id = post.Id,
            Message = post.Message,
            Liked = post.Liked,
            FirstName = post.FirstName,
            LastName = post.LastName
        
           /*  Beskrivning = product.Beskrivning, */
        };

        return postDto; // 200 OK
    }




    [HttpPost]
    
    public ActionResult<PostDto> CreatePost(CreatePostRequest createPostRequest)
    {
        var user = context.Users.FirstOrDefault(u => u.Id == createPostRequest.UserId);
        if (user == null)
    {
        // Handle the case where the user is not found, return a suitable response
        return NotFound("User not found");
    }

        var post = new Post 
        {
            Message = createPostRequest.Message,
            Liked = createPostRequest.Liked,
            UserId = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName
        };
        // Save post in database
        context.Posts.Add(post);
        context.SaveChanges();

        // Return the PostDto to the caller
        var postDto = new PostDto 
        {
            Id = post.Id,
            Message = post.Message,
            Liked = post.Liked,
            FirstName = user.FirstName,
            LastName = user.LastName
        };
        return Created("", postDto);
    }
}

public class PostDto
{
    public int Id {get; set;}
    public string Message {get; set;}
    public int Liked {get; set;}
    public string FirstName {get; set;}
    public string LastName {get; set;}
}
public class UpdateLikedCountRequest
{
    [Required]
    public int Liked { get; set; }
}

public class CreatePostRequest
{
    [Required]
    public string Message {get; set;}
    [Required]
    public int Liked {get; set;}
    [Required]
    public int UserId { get; set; }
}