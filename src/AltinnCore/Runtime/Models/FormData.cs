using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AltinnCore.Runtime.Models
{
    public class FormData
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        public string ReporteeElementId { get; set; }
        public string UserId { get; set; }
        public string ReporteeId { get; set; }
        public string FormDataXml { get; set; }
    }
}
