using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Diagnostics.Eventing.Reader;
using System.Security.Cryptography;
using System.Xml.Schema;

using Web_Api.Data;
using Web_Api.DTO;
using Web_Api.Models;

namespace Web_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BrandController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("AllBrands")]
        public IActionResult GetBrands()
        {
            var brand = _context.Brands.ToList();
            return Ok(brand);
        }

        [HttpPost("AddBrand")]
        public IActionResult AddBrand(BrandDTO brand)
        {
            var Brands = new Brand()
            {
                Name = brand.Name,
                Description = brand.Description
            };

            _context.Brands.Add(Brands);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("Filter/{id}")]
        public IActionResult GetBrandById(int id)
        {
            var brands = _context.Brands.Where(x => x.Id == id).ToList();
            return Ok(brands);
        }

        [HttpGet("Search/{query}")]
        public IActionResult SearchBrand(string query)
        {
            //var brands = _context.Brands.Where(x => x.Name == query || 
            //x.Description == query ).ToList(); //Exact Match

            //return Ok(brands);
            var brands = _context.Brands.Where(x => x.Name.Contains(query) ||
            x.Description.Contains(query)).ToList(); //Partial match
            return Ok(brands);
        }

        [HttpGet("GetUpdatedata /{id}")]
        public IActionResult Editbrand(int id)
        {
            if (id != null)
            {
                var data = _context.Brands.FirstOrDefault(x => x.Id == id);
                if (data != null)
                {
                    return Ok(data);

                }
                else
                {

                    return NotFound("Brand Not Found");

                }
            }
            else
            {
                return NotFound("Please provide brand ID to get details");
            }

        }

        [HttpPut("Update")]
        public IActionResult Editbrand(BrandDTO brand)
        {
            var data = _context.Brands.FirstOrDefault(x => x.Id == brand.Id);
            if (data != null)
            {
                data.Name = brand.Name;
                data.Description = brand.Description;

                var EditQuery = _context.Brands.Update(data);
                _context.SaveChanges();
                return Ok(EditQuery.Entity);
            }
            else
            {
                return BadRequest("Invalid Id");
            }
        }

        [HttpDelete("Delete/{Id}")]
        public IActionResult DeleteBrand(int Id)
        {
            var data = _context.Brands.FirstOrDefault(x => x.Id == Id);
            if (data != null)
            {
                var DeleteQuery = _context.Brands.Remove(data);
                _context.SaveChanges();
                return Ok(DeleteQuery.Entity);
            }
            else
            {
                return BadRequest("Invalid Id");
            }
        }

    }
}
