# https://python.langchain.com/docs/integrations/chat/ollama/

from langchain_ollama import ChatOllama
from langchain_core.messages import AIMessage

llm = ChatOllama(
    model="deepseek-r1",
    temperature=0,
)


messages = [
    (
        "system",
        "You are a helpful assistant that translates English to Korean. Translate the user sentence.",
    ),
    ("human", "I love programming."),
]
ai_msg = llm.invoke(messages)
print(ai_msg.content)