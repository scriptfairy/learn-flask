import openai
from config import get_openai_config


def init_openai():
    openai_config = get_openai_config()
    openai.api_key = openai_config["api_key"]


def chat_completion(content):
    init_openai()

    model = "gpt-3.5-turbo"
    messages = [{"role": "user", "content": content}]
    temperature = 0.7

    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=temperature,
    )

    return response
