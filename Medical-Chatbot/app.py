from flask import Flask, render_template, jsonify,request
from src.helper import download_hugging_face_embeddings,load_llm
from langchain_pinecone import PineconeVectorStore
from langchain.chains import RetrievalQA

from langchain_core.prompts import PromptTemplate

from src.prompt import *



app =Flask(__name__)
index_name = "medicalbot"
huggingface_repo_id = "mistralai/Mistral-7B-Instruct-v0.3"
embeddings  = download_hugging_face_embeddings()

docsearch = PineconeVectorStore.from_existing_index(
    index_name = index_name,
    embedding = embeddings,
)

retriever = docsearch.as_retriever(search_type ="similarity", search_kwargs = {"k":3})

prompt = PromptTemplate(template=custom_prompt_template,input_variables=["context","question"])
qa_chain = RetrievalQA.from_chain_type(
    llm = load_llm(huggingface_repo_id),
    chain_type ="stuff",
    retriever =retriever,
    return_source_documents = True,
    chain_type_kwargs ={'prompt':prompt}

)

@app.route("/")
def index():
    return render_template('chat.html')

@app.route("/get",methods=["GET","POST"])

def chat():
    msg = request.form["msg"]
    input = msg
    print(input)
    response = qa_chain.invoke({'query':msg})
    print("Response: ", response['result'])
    return str(response['result'])

if __name__=='__main__':
    app.run(host="0.0.0.0",port = 8080, debug = True)
















