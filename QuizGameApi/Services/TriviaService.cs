using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace QuizGameApi;

public class TriviaService
{
    private readonly HttpClient _httpClient;

    public TriviaService(HttpClient httpClient) {
        _httpClient = httpClient;
    }


 public async Task<TriviaQuestion> GetQuestionsAsync(string difficulty)
{
    string url = $"https://opentdb.com/api.php?amount=1&difficulty={difficulty}&type=multiple";
    var response = await _httpClient.GetStringAsync(url);

    // The API still returns a "results" array, so we must extract the first question
    var triviaWrapper = JsonSerializer.Deserialize<TriviaWrapper>(response);

    var question = triviaWrapper?.Results?.FirstOrDefault();

    // Decode HTML entities to fix formatting issues (e.g., &quot; → ")
    if (question != null)
    {
        question.Question = WebUtility.HtmlDecode(question.Question);
    }

    return question;
}

// Helper class to match the JSON structure of the API response
private class TriviaWrapper
{
    [JsonPropertyName("results")] 
     public List<TriviaQuestion> Results { get; set; }
}
}