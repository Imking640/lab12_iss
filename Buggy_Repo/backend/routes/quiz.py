from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import random

router = APIRouter(tags=["quiz"])

# Questions data
questions = [
    {
        "id": 1,
        "text": "What command lists directory contents?",
        "options": ["ls", "cd", "rm", "pwd"],
        "correct": "ls"
    },
    {
        "id": 2,
        "text": "Which command searches for text in files?",
        "options": ["find", "grep", "locate", "cat"],
        "correct": "grep"
    },
    {
        "id": 3,
        "text": "What changes file permissions?",
        "options": ["chmod", "chown", "mv", "cp"],
        "correct": "chmod"
    },
    {
        "id": 4,
        "text": "Which command displays the current directory?",
        "options": ["dir", "pwd", "path", "where"],
        "correct": "pwd"
    },
    {
        "id": 5,
        "text": "What removes a file?",
        "options": ["rm", "del", "erase", "unlink"],
        "correct": "rm"
    }
]

# Game state
game_state = {"high_score": 0}

# Pydantic model for answer submission
class AnswerSubmission(BaseModel):
    id: int
    answer: str
    score: int = 0

@router.get("/question")
async def get_question():
    """Fetch a random question."""
    question = random.choice(questions)  # Randomly select a question
    return {
        "id": question["id"],
        "text": question["text"],
        "options": question["options"]
    }

@router.post("/answer")  #changed get to post
async def submit_answer(data: AnswerSubmission):
    """Submit an answer and calculate the score."""
    question = next((q for q in questions if q["id"] == data.id), None)
    if not question:
        raise HTTPException(status_code=400, detail="Invalid question ID")  # Return proper error

    is_correct = data.answer == question["correct"]
    score = data.score
    if is_correct:
        score += 10
        if score > game_state["high_score"]:
            game_state["high_score"] = score

    return {
        "is_correct": is_correct,
        "correct_answer": question["correct"],
        "score": score,
        "high_score": game_state["high_score"]
    }

@router.get("/highscore")
async def get_highscore():
    """Fetch the current high score."""
    return {"high_score": game_state["high_score"]}
