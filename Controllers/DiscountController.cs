using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using crud_app_take2.Data;
using crud_app_take2.Models;

namespace crud_app_take2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DiscountController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Discount
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Discount>>> GetDiscount()
        {
            return await _context.Discount.ToListAsync();
        }

        // GET: api/Discount/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Discount>> GetDiscount(long id)
        {
            var discount = await _context.Discount.FindAsync(id);

            if (discount == null)
            {
                return NotFound();
            }

            return discount;
        }

        // PUT: api/Discount/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDiscount(long id, Discount discount)
        {
            if (id != discount.DiscountId)
            {
                return BadRequest();
            }

            _context.Entry(discount).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiscountExists(id))
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

        // POST: api/Discount
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Discount>> PostDiscount(Discount discount)
        {
            _context.Discount.Add(discount);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDiscount", new { id = discount.DiscountId }, discount);
        }

        // DELETE: api/Discount/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiscount(long id)
        {
            var discount = await _context.Discount.FindAsync(id);
            if (discount == null)
            {
                return NotFound();
            }

            _context.Discount.Remove(discount);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DiscountExists(long id)
        {
            return _context.Discount.Any(e => e.DiscountId == id);
        }
    }
}
