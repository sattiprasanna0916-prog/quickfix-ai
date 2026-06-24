import requests
import os
import json
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")


def analyze_situation(user_input: str):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"

    prompt = f"""
Analyze this urgent situation.

Return ONLY JSON:

{{
  "situation_type": "",
  "urgency_level": "",
  "action_plan": "",
  "checklist": "",
  "avoid_list": ""
}}

User input:
{user_input}
"""

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }

    response = requests.post(url, json=payload)

    data = response.json()
    print("Gemini Response:", data)

    if "candidates" not in data:
        return {
           "error": data
        }

    text = data["candidates"][0]["content"]["parts"][0]["text"]

    cleaned = text.replace("```json", "").replace("```", "").strip()

    return json.loads(cleaned)