using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AltinnCore.Runtime.Models
{
    public class ReporteeElement
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        public string ReporteeElementId { get; set; }
        public string UserId { get; set; }
        public string ReporteeId { get; set; }
        public string ReporteeElementType { get; set; }
        public string ReporteeElementStatus { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
        public DateTime LastChangedDateTime { get; set; }
        public string LastChangedBy { get; set; }
        public DateTime DueDateTime { get; set; }
        public DateTime VisibleDateTime { get; set; }
        public string Title { get; set; }
        public string ServiceOwner { get; set; }
        public string ServiceId { get; set; }
        public string ExternalSystemReference { get; set; }
        public string VisisbleDateTime { get; set; }
        public string WorkflowId { get; set; }
        public string CurrentWorkflowStep { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsArchived { get; set; }
        public int NumberOfForms { get; set; }
        public string[] FormId { get; set; }
        public FormAttachment REAttachment { get; set; }
        public Correspondence Message { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }

    public class FormAttachment
    {
        public string AttachmentId { get; set; }
        public string ContentType { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
    }

    public class Correspondence
    {
        public string MessageTitle { get; set; }
        public string MessageSummary { get; set; }
        public string MessageBody { get; set; }
        public string CustomMessage { get; set; }
    }
}
