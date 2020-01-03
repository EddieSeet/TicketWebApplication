using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TicketWebApplication.Model
{
    //for raw json
    //public class Ticket
    //{
    //    [Key]
    //    public int PLU { get; set; }

    //    [Required]
    //    public string FileName{ get; set; }
    //}

    public class Ticket
    {

        [Key]
        public int ID { get; set; }


        [FromForm]
        [Required]
        public string PLU { get; set; }


        [FromForm]
        //[Required]
        public string FileName  { get; set; }


        [NotMapped]
        [FromForm]
        public IFormFile Thefile { get; set; }


    }



}
