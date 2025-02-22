using System.Text.Json;

namespace QuizGameApi;

public class TriviaService
{
    private readonly HttpClient _httpClient;

    public TriviaService(HttpClient httpClient) {
        _httpClient = httpClient;
    }


    public async Task<object> GetQuestionsAsync(int amount , string difficulty) {
        string url = $"https://opentdb.com/api.php?amount={amount}&difficulty={difficulty}"; 
        var response = await _httpClient.GetStringAsync(url);
        return JsonSerializer.Deserialize<object>(response);
    }
}
