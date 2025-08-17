from setuptools import find_packages, setup

setup(
    name = 'Medical Chatbot',
    version= '0.0.1',
    author= 'Shivdutt Tiwari',
    author_email= 'shivdutt041102@gmail.com',
    packages= find_packages(),
    install_requires = [
  'sentence-transformers',
'langchain',
'flask',
'pypdf',
'python-dotenv',
'pinecone[grpc]',
'langchain-pinecone',
'langchain_community',
'langchain_openai',
'langchain_experimental',


    ]

)