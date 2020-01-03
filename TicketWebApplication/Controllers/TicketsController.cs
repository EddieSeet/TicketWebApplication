using System;
using System.Collections.Generic;
using System.IO;


using System.Threading.Tasks;





using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using TicketWebApplication.Model;
using TicketWebApplication.Models;

namespace TicketWebApplication.Controllers
{


    //[Route("api/[controller]")]
    //[Produces("application/json")]
    //[ApiController]
    //public class BlogPostsController : ControllerBase
    //{
    //    private readonly TicketContext _context;

    //    public BlogPostsController(TicketContext context)
    //    {
    //        _context = context;
    //    }

    //    // GET: api/BlogPosts
    //    [HttpGet]
    //    public async Task<ActionResult<IEnumerable<Ticket>>> GetBlogPost()
    //    {
    //        return await _context.Ticket.ToListAsync();
    //    }

    //    // GET: api/BlogPosts/5
    //    [HttpGet("{id}")]
    //    public async Task<ActionResult<Ticket>> GetBlogPost(int id)
    //    {
    //        var blogPost = await _context.Ticket.FindAsync(id);

    //        if (blogPost == null)
    //        {
    //            return NotFound();
    //        }

    //        return blogPost;
    //    }

    //    // PUT: api/BlogPosts/5
    //    [HttpPut("{id}")]
    //    public async Task<IActionResult> PutBlogPost(int id, Ticket blogPost)
    //    {
    //        if (id != blogPost.PLU)
    //        {
    //            return BadRequest();
    //        }

    //        _context.Entry(blogPost).State = EntityState.Modified;

    //        try
    //        {
    //            await _context.SaveChangesAsync();
    //        }
    //        catch (DbUpdateConcurrencyException)
    //        {
    //            if (!BlogPostExists(id))
    //            {
    //                return NotFound();
    //            }
    //            else
    //            {
    //                throw;
    //            }
    //        }

    //        return NoContent();
    //    }

    //    // POST: api/BlogPosts
    //    [HttpPost]
    //    public async Task<ActionResult<Ticket>> PostBlogPost(Ticket blogPost)
    //    {
    //        _context.Ticket.Add(blogPost);
    //        await _context.SaveChangesAsync();

    //        return CreatedAtAction("GetBlogPost", new { id = blogPost.PLU }, blogPost);
    //    }

    //    // DELETE: api/BlogPosts/5
    //    [HttpDelete("{id}")]
    //    public async Task<ActionResult<Ticket>> DeleteBlogPost(int id)
    //    {
    //        var blogPost = await _context.Ticket.FindAsync(id);
    //        if (blogPost == null)
    //        {
    //            return NotFound();
    //        }

    //        _context.Ticket.Remove(blogPost);
    //        await _context.SaveChangesAsync();

    //        return blogPost;
    //    }

    //    private bool BlogPostExists(int id)
    //    {
    //        return _context.Ticket.Any(e => e.PLU == id);
    //    }
    //}


    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {


        private readonly TicketContext _context;

        public TicketsController(TicketContext context)
        {
            _context = context;
        }


        // GET: api/Tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTicket()
        {
            return await _context.Ticket.ToListAsync();
        }




        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _context.Ticket.FindAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }


        // PUT: api/Tickets/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, Ticket ticket)
        {
            if (id != ticket.ID)
            {
                return BadRequest();
            }

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool TicketExists(int id)
        {
            throw new NotImplementedException();
        }




        // POST: api/Tickets
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]

        //for raw json
        //        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)

        //for form-data 
        public async Task<ActionResult<Ticket>> PostTicket([FromForm]Ticket ticketModel)
        {
            //processing request 
            if (ModelState.IsValid)
            {

                System.Diagnostics.Debug.WriteLine("ModelState is valid");

                Ticket newTicket = new Ticket
                {

                    PLU = ticketModel.PLU

                };

                //   string uniqueFileName = null;
                if (ticketModel.Thefile != null)
                {
                    System.Diagnostics.Debug.WriteLine("File is not null");

                    var pa = @"C:\Users\User\source\repos\TicketWebApplication\TicketWebApplication\Resources\folder";


                    // uniqueFileName = Guid.NewGuid().ToString() + "_" + ticketModel.Thefile.FileName;
                    string filePath = Path.Combine(pa, ticketModel.Thefile.FileName);

                    if (System.IO.File.Exists(filePath) == true)
                    {
                       
                        System.Diagnostics.Debug.WriteLine("have the file");
                        return Conflict();
                    }
                    else
                    {
                        ticketModel.Thefile.CopyTo(
                            new FileStream(filePath, FileMode.Create)
                        );



                        newTicket.FileName = ticketModel.Thefile.FileName;
                        _context.Ticket.Add(newTicket);

                    }



                }



                await _context.SaveChangesAsync();

                return CreatedAtAction("GetTicket", new { id = newTicket.PLU }, newTicket);

            }
            else
            {
                System.Diagnostics.Debug.WriteLine("fuk");

                return BadRequest(ModelState);
            }


            //end


        }


        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ticket>> DeleteTicket(int id)
        {
            var ticket = await _context.Ticket.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Ticket.Remove(ticket);
            await _context.SaveChangesAsync();

            return ticket;
        }



    }
}
