using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AltinnCore.Runtime.Models;
using Microsoft.AspNetCore.Mvc;


namespace AltinnCore.Runtime.Controllers
{
    public class ReporteeElementController : Controller
    {
        // GET: /<controller>/
        [ActionName("Index")]
        public async Task<ActionResult> IndexAsync()
        {
            var reporteeElements = await DocumentDBRepository<ReporteeElement>.GetItemsAsync(d => d.ReporteeElementType == "reporting");
            List<ReporteeElement> reporteeelementList = reporteeElements.ToList();
            ViewBag.ReporteeElementList = reporteeelementList;
            return View(reporteeelementList);
        }


        [HttpPost]
        [ActionName("Save")]
        public async Task<ReporteeElement> SaveAsync([FromBody] ReporteeElement reporteeElement)
        {
            if (ModelState.IsValid)
            {
                await DocumentDBRepository<ReporteeElement>.CreateItemAsync(reporteeElement);
                return reporteeElement;
            }

            return null;
        }
    }
}
