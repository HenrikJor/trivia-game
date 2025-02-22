
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace QuizGameApi;


[Route("api/trivia")]
[ApiController]
public class TriviaController : ControllerBase
{
    private readonly TriviaService _triviaService;

    public TriviaController(TriviaService triviaService){
        _triviaService = triviaService; 
    }


    [HttpGet("questions")]
    public async Task<IActionResult> GetQuestionAsync(string difficulty = "medium"){
        var question = await _triviaService.GetQuestionsAsync(difficulty);
        if (question == null){
            return NotFound("No question found");
        }
        return Ok(question);
    }

}
