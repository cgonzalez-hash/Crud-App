using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using crud_app_take2.Data;
using crud_app_take2.Models;

namespace crud_app_take2.Controllers
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

        // GET: Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Products>>> Index()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: Products/Details/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> Details(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var products = await _context.Products
                .FirstOrDefaultAsync(m => m.ProductsId == id);
            if (products == null)
            {
                return NotFound();     
            }

            return Ok(products);
        }
 

        // POST: Products/Create
        [HttpPost]
        public async Task<ActionResult<Products>> Create(Products products)
        {
            
            
                _context.Add(products);
                await _context.SaveChangesAsync();
                 return CreatedAtAction("Details", new { id = products.ProductsId }, products);
            
            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(long id, Products products)
        {
            if (id != products.ProductsId)
            {
                return BadRequest();
            }

          _context.Entry(products).State = EntityState.Modified;

            try
            {
              await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("Details", new { id = products.ProductsId }, products);
        }


        // POST: Products/Delete/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Products>> DeleteProduct(long id)
        {
            var products = await _context.Products.FindAsync(id);
            if (products == null) {
                return NotFound();
            }
            _context.Products.Remove(products);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ProductsExists(long id)
        {
            return _context.Products.Any(e => e.ProductsId == id);
        }
    }
}
