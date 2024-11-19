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
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("AllProducts")]
        public IActionResult GetProducts()
        {
            var products = _context.Products.Include(o => o.Brands).ToList();
            return Ok(products);
        }

        [HttpPost("AddProduct")]
        public IActionResult AddProducts(ProductDTO prod)
        {
            var Products = new Product()
            {
                Name = prod.Name,
                Description = prod.Description,
                Price = prod.Price,
                BrandId = prod.BrandId,
            };

            var res =_context.Products.Add(Products);
            _context.SaveChanges();
            return Ok(res.Entity);
        }

        [HttpGet("Filter/{bid}")]
        public IActionResult GetProductsByBrand(int bid)
        {
            var products = _context.Products.Include(o => o.Brands).Where(x => x.BrandId == bid).ToList();
            return Ok(products);
        }

        [HttpGet("Search/{query}")]
        public IActionResult SearchProduct(string query)
        {
            //var products = _context.Products.Include(o => o.Brands).Where(x => x.Name == query || 
            //x.Description == query || x.Brands.Name == query).ToList(); //Exact Match

            //return Ok(products);
            var products = _context.Products.Include(o => o.Brands).Where(x => x.Brands.Name.Contains(query) ||
            x.Name.Contains(query) ||
            x.Description.Contains(query)).ToList(); //Partial match
            return Ok(products);
        }

        [HttpGet("GetUpdatedata /{id}")]
        public IActionResult Editproduct(int id)
        {
            if (id != null)
            {
                var data = _context.Products.Include(x => x.Brands).FirstOrDefault(x => x.Id == id);
                if (data != null)
                {
                    return Ok(data);

                }
                else
                {

                    return NotFound("Product Not Found");

                }
            }
            else
            {
                return NotFound("Please provide product ID to get details");
            }

        }

        [HttpPut("Update")]
        public IActionResult EditProduct(ProductDTO product)
        {
            var data = _context.Products.FirstOrDefault(x => x.Id == product.Id);
            if (data != null)
            {
                data.Name = product.Name;
                data.Price = product.Price;
                data.Description = product.Description;
                data.BrandId = product.BrandId;

                var EditQuery = _context.Products.Update(data);
                _context.SaveChanges();
                return Ok(EditQuery.Entity);
            }
            else
            {
                return BadRequest("Invalid Id");
            }
        }

        [HttpDelete("Delete/{Id}")]
        public IActionResult DeleteProduct(int Id)
        {
            var data = _context.Products.FirstOrDefault(x => x.Id == Id);
            if (data != null)
            {
                var DeleteQuery = _context.Products.Remove(data);
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
