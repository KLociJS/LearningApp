using System.Text.Json.Serialization;
using WebAPI.Models.Enums;

namespace WebAPI.Models.ResultModels;

public class Result
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public ErrorType? ErrorType { get; set; }
    public string Description { get; set; } = string.Empty;
}