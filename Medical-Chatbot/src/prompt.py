custom_prompt_template = """
Use the pieces of information provided in context to answer user's question.
If you don't know the answer, just say "Sorry, I don't know. I can help you with medical related questions."

If the answer is long or contains multiple points, format it as bullet points for clarity.

Context = {context}
Question = {question}

Start the answer directly. No small talk please.
"""
