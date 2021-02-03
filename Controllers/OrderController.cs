using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using crud_app_take2.Models;
using crud_app_take2.Data;
using Microsoft.AspNetCore.Authorization;
namespace crud_app_take2.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> Index()
        {
            var applicationDbContext = _context.Orders.Include(o => o.applicationUser).ToListAsync();
            return await applicationDbContext;
        }

        // GET: Order/Details/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> Details(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var order = await _context.Orders
                .Include(o => o.applicationUser)
                .FirstOrDefaultAsync(m => m.OrderId == id);
            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // POST: Order/Create
        [HttpPost, ActionName("Create")]
        public async Task<ActionResult<Order>> Create(Order order)
        {
            if (ModelState.IsValid)
            {
                _context.Add(order);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "UserId", order.UserId);
            return order;
        }

        // POST: Order/Edit/5
        [HttpPut, ActionName("Edit")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<Order>> Edit(long id, [Bind("OrderId,UserId,OrderDetails,OrderTotal,Shipped")] Order order)
        {
            if (id != order.OrderId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(order);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OrderExists(order.OrderId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "UserId", order.UserId);
            return order;
        }

        // POST: Order/Delete/5
        [HttpDelete("{id}"), ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id)
        {
            var order = await _context.Orders.FindAsync(id);
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool OrderExists(long id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
