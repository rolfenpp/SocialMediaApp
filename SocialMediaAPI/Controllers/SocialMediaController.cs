using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
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


[HttpGet("user/{id}")]
public ActionResult<UserDto> GetUser(int id)
{
    var user = context.Users.FirstOrDefault(u => u.Id == id);

    if (user == null)
    {
        return NotFound("User not found"); 
    }
    

    return Ok(user);
}

// Get all posts "https://localhost:7000/SocialMedia"
[HttpGet("post")]
/* [Authorize] */
public IEnumerable<PostDto> GetPosts()
{
    var localPosts = context.Posts
        .Include(post => post.User)
        .OrderByDescending(post => post.CreatedAt)
        .ToList();


    var postDto = localPosts.Select(x => new PostDto
    {
        Id = x.Id,
        Message = x.Message,
        Liked = x.Liked,
        FirstName = x.User.FirstName,
        LastName = x.User.LastName,
        CreatedAt = x.CreatedAt
        
    });

    return postDto;
}

// Get specific posts "https://localhost:7000/SocialMedia/33"
[HttpGet("post/{id}")]
    /* [Authorize] */
    public ActionResult<PostDto> GetPost(int id)
    {
        var post = context.Posts.FirstOrDefault(x => x.Id == id);
        /* var user = context.Users.FirstOrDefault(x => x.Id == id); */
    
        if (post is null)
            return NotFound(); // 404 Not Found

        var postDto = new PostDto 
        {
            Id = post.Id,
            Message = post.Message,
        };

        return postDto; // 200 OK
    }

// Create POST "https://localhost:7000/SocialMedia/post"
[HttpPost("post")]
public ActionResult<PostDto> CreatePost(CreatePostRequest createPostRequest)
{
    // Find user by userId
    var user = context.Users.FirstOrDefault(u => u.Id == createPostRequest.UserId);
    

    if (user == null)
    {
        return NotFound("User not found");
    }

    var post = new Post
    {
        Message = createPostRequest.Message,
        Liked = createPostRequest.Liked,
        UserId = user.Id,
        CreatedAt = DateTime.Now
    };

    // Save post in database
    context.Posts.Add(post);
    context.SaveChanges();

    // Create a comment if comment text is provided
    // Return the PostDto to the caller
    /* var postDto = new PostDto
    {
        Id = post.Id,
        Message = post.Message,
        Liked = post.Liked,
        FirstName = user.FirstName,
        LastName = user.LastName
    }; */

    return Created("", post);
}

// -----------------------------

[HttpPost("comment")]
public ActionResult CreateComment(CreateCommentRequest createCommentRequest)
{
    var user = context.Users.FirstOrDefault(u => u.Id == createCommentRequest.UserId);
    var post = context.Posts.FirstOrDefault(u => u.Id == createCommentRequest.PostId);

    if (user == null)
    {
        return NotFound("User not found");
    }

    if (post == null)
    {
        return NotFound("User not found");
    }

    var comment = new Comment
    {
        Text = createCommentRequest.Text,
        UserId = user.Id,
        PostId = post.Id,
        FirstName = user.FirstName,
        LastName = user.LastName,
    };

    // Save post in database
    context.Comments.Add(comment);
    context.SaveChanges();

    return Created("", comment);
}
[HttpGet("comment")]
public ActionResult<IEnumerable<Comment>> GetComments()
{
    var comments = context.Comments.ToList();
    return Ok(comments);
}


[HttpDelete("comment/{id}")]
public IActionResult DeleteComment(int id)
{
    var comment = context.Comments.Find(id);

    if (comment == null)
    {
        return NotFound("Comment not found");
    }

    context.Comments.Remove(comment);
    context.SaveChanges();

    return NoContent(); // Returns a 204 No Content response
}

 [HttpPost("{id}")]
    /* [Authorize] */
    public ActionResult<PostDto> LikeCommentPost(int id)
    {
        var post = context.Posts.FirstOrDefault(x => x.Id == id);
        /* var user = context.Users.FirstOrDefault(x => x.Id == id); */

        if (post is null)
            return NotFound(); // 404 Not Found

        var postDto = new PostDto
        {
            Id = post.Id,
            Message = post.Message,
            Liked = post.Liked,
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
        post.Liked = updateRequest.Liked;
        context.SaveChanges();

        var postDto = new PostDto 
        {
            Id = post.Id,
            Message = post.Message,
            Liked = post.Liked,
           
        };

        return Ok(postDto);
    }
}  

public class PostDto
{
    public int Id {get; set;}
    public string Message {get; set;}
    public int Liked {get; set;}
    public string FirstName {get; set;}
    public string LastName {get; set;}
    public DateTime CreatedAt { get; set; }
    
}
public class UpdateLikedCountRequest
{
    [Required]
    public int Liked { get; set; }
}

public class CreateCommentRequest 
{
    public string Text {get; set;}
    public int UserId {get; set;}
    public int PostId {get; set;}
    
}

// Skapa Post
public class CreatePostRequest
{
    [Required]
    public string Message {get; set;}
    [Required]
    public int Liked {get; set;}
    [Required]
    public int UserId { get; set; }

    public DateTime CreatedAt { get; set; }
}
