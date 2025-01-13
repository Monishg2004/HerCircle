# # app.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import google.generativeai as genai
# import os
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()

# app = Flask(__name__)
# CORS(app)

# # Configure Gemini API
# GOOGLE_API_KEY = "AIzaSyAGZjWwUMTUea8KZUiwaJpHgnt-2IRkCcU"
# genai.configure(api_key=GOOGLE_API_KEY)
# model = genai.GenerativeModel('gemini-pro')

# # Define context for the health assistant
# SYSTEM_PROMPT = """
# You are a knowledgeable and empathetic health assistant specializing in menstrual health. 
# Provide accurate, helpful information about periods, menstrual health, and related topics. 
# Keep responses concise, friendly, and informative while maintaining professional medical boundaries. 
# If a question requires medical attention, always advise consulting a healthcare provider.
# """

# @app.route('/chat', methods=['POST'])
# def chat():
#     try:
#         data = request.json
#         message = data.get('message', '')
        
#         if not message:
#             return jsonify({'error': 'No message provided'}), 400
        
#         # Combine system prompt with user message
#         full_prompt = f"{SYSTEM_PROMPT}\nUser: {message}\nAssistant:"
        
#         # Generate response using Gemini
#         response = model.generate_content(full_prompt)
        
#         return jsonify({'response': response.text})
    
#     except Exception as e:
#         print(f"Error: {str(e)}")
#         return jsonify({
#             'error': 'An error occurred while processing your request',
#             'details': str(e)
#         }), 500

# if __name__ == '__main__':
#     if not GOOGLE_API_KEY:
#         print("Warning: GOOGLE_API_KEY not found in environment variables")
#     app.run(debug=True)





# app.py
import pathway as pw
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import json
from datetime import datetime
import asyncio
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure Gemini
GOOGLE_API_KEY = "AIzaSyAGZjWwUMTUea8KZUiwaJpHgnt-2IRkCcU"
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize Gemini model
model = genai.GenerativeModel('gemini-pro')

# Define health context
HEALTH_CONTEXT = """
You are a knowledgeable health assistant specializing in menstrual health and women's wellness.
Provide accurate, helpful information about:
1. Menstrual cycles and symptoms
2. Period tracking and health monitoring
3. Common menstrual health issues
4. General women's health topics

Keep responses concise and informative. For medical concerns, recommend consulting healthcare providers.
"""

class PathwayHealthEngine:
    def __init__(self):
        self._init_pathway()
        self.response_cache = {}

    def _init_pathway(self):
        # Define schema for health data processing
        self.input_schema = pw.Schema(
            query=pw.column_definition(str),
            context=pw.column_definition(str, default=HEALTH_CONTEXT),
            timestamp=pw.column_definition(datetime, default=pw.this_click.time),
        )

        # Create input table
        self.input_table = pw.io.python.write(
            pw.Table.empty(schema=self.input_schema)
        )

        # Define pipeline
        @pw.udf
        def generate_response(query: str, context: str) -> str:
            try:
                prompt = f"{context}\nUser: {query}\nAssistant:"
                response = model.generate_content(prompt)
                return response.text
            except Exception as e:
                logger.error(f"Error generating response: {e}")
                return "I apologize, but I encountered an error. Please try again."

        # Process queries
        self.output_table = self.input_table.select(
            query=pw.this.query,
            response=generate_response(pw.this.query, pw.this.context),
            timestamp=pw.this.timestamp,
        )

        # Store results
        self.results = pw.io.python.read(self.output_table)

    async def process_query(self, query: str) -> dict:
        try:
            # Generate unique ID for this query
            query_id = f"{query}_{datetime.now().timestamp()}"
            
            # Add to input table
            self.input_table.write([{
                'query': query,
                'context': HEALTH_CONTEXT,
                'timestamp': datetime.now()
            }])

            # Wait for processing
            await asyncio.sleep(0.1)  # Small delay for processing

            # Get response from output
            response = await self._get_latest_response()
            
            return {
                'status': 'success',
                'response': response,
                'timestamp': datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error processing query: {e}")
            return {
                'status': 'error',
                'error': str(e),
                'timestamp': datetime.now().isoformat()
            }

    async def _get_latest_response(self) -> str:
        try:
            latest = list(self.results)[-1] if self.results else None
            return latest['response'] if latest else "No response generated"
        except Exception as e:
            logger.error(f"Error getting response: {e}")
            return "Error retrieving response"

# Initialize Pathway engine
engine = PathwayHealthEngine()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route('/chat', methods=['POST'])
async def chat():
    try:
        data = request.json
        query = data.get('message', '')
        
        if not query:
            return jsonify({'error': 'No message provided'}), 400

        result = await engine.process_query(query)
        return jsonify(result)

    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({
            'status': 'error',
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }), 500

if __name__ == '__main__':
    # Start Pathway engine
    try:
        pw.run()
        app.run(debug=True, port=5000)
    except Exception as e:
        logger.error(f"Error starting application: {e}")