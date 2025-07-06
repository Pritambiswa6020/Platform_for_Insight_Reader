from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
 
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
 
# Initialize the client
client = OpenAI(
  base_url="https://integrate.api.nvidia.com/v1",
  api_key="_"
)
 

# we had to add a get to fetch





@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    user_context = data.get('prompt', '')
 
    try:
        # Read the document (replace with your local folder to keep a file in this location
        with open(r'C:\Users\biswa\my-app\src\rag.txt', "r", encoding="utf-8") as file:
            file_content = file.read()
 
        # Create prompt
        prompt = f"{user_context}\n\n{file_content}"
 
        # Generate completion
        completion = client.chat.completions.create(
            model="writer/palmyra-creative-122b",
            messages=[{'role': 'user', 'content': prompt}],
            temperature=0.5,
            top_p=1,
            max_tokens=1024,
            stream=False  # turn off streaming for simplicity
        )
 
        response_text = completion.choices[0].message.content
        return jsonify({'response': response_text})
 
    except Exception as e:
        return jsonify({'error': str(e)}), 500
 
if __name__ == '__main__':
    app.run(port=5000, debug=True)
