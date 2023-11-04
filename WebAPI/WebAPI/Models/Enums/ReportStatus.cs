using System.Text.Json.Serialization;

namespace WebAPI.Models.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ReportStatus
{
    Pending,
    ActionTaken,
    Dismissed
}