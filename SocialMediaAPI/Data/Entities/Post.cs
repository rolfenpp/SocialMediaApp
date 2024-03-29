namespace SocialMedia.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

public class Post 
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public int Liked { get; set; }
        /* public string FirstName {get; set;}
        public string LastName {get; set;} */

        public DateTime CreatedAt { get; set; }

        // Foreign key prop
        public int UserId { get; set; }
        public User User { get; set; }
        /* public ICollection<Comment> Comments {get; set;} */
    }