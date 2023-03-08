import React from 'react'
import './style.css'

function NewFlashcardForm({question, answer, setQuestion, setAnswer, category, setCategory}) {

    function handleCategory(e) {
        setCategory(e.target.value)
    }

    function handleQuestion(e) {
        setQuestion(e.target.value)
    }

    function handleAnswer(e) {
        setAnswer(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (question.length > 0 && answer.length > 0) {
            fetch('http://localhost:3000/api/flashcards', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        "user_id" : 1,
                        "question" : question, 
                        "answer" : answer, 
                        "category_name" : category 
                    }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                
            })
            .then((res) => res.json())
            .then((data) => {
                alert('Flashcard added successfully.', data);
                // setTimeout(() => {
                //     setMessage('')
                // }, 5000)
            })
            .catch((err) => {
                console.log(err.message);
                alert('There was a problem in creating your flashcard.');
                // setTimeout(() => {
                //     setMessage('')
                // }, 5000)
            });
        }
        console.log(question, answer)
        setAnswer('')
        setQuestion('')
    }

  return (
    <div className="form">
        <form action="submit">
            <div className="form-section">
               <label htmlFor="category">Choose a category:</label>
                <select id="category" name="category" onChange={handleCategory}>
                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                </select> 
            </div>
            <div className="form-section">
                <label htmlFor="question">Question</label>
                <input type="text" value={question} id="question" onChange={handleQuestion}/>  
            </div>
            <div className="form-section">
               <label htmlFor="answer">Answer</label>
                <input type="text" value={answer} id="answer" onChange={handleAnswer}/> 
            </div>
            <button onClick={handleSubmit}>Add flashcard</button>
        </form>
    </div>
  )
}

export default NewFlashcardForm
