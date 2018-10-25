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
            var reporteeElements = await DocumentDBRepository<ReporteeElement>.GetItemsAsync(d => !d.IsDeleted);
            return View(reporteeElements);
        }
    }
}
