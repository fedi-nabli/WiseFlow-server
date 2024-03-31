from flask import Flask, request, jsonify
import pickle
import numpy as np
from datetime import datetime

app = Flask(__name__)

# Load the Polynomial Regression model
with open('./prediction/model.pkl', 'rb') as f:
  polynomial_model = pickle.load(f)

# Define a route for making predictions
@app.route('/predict', methods=['POST'])
def predict():
  # Get input data from the request
  data = request.get_json()

  # Process input data: Convert date string to features
  date_string = data['input']
  date_features = extract_date_features(date_string)

  # Ensure that date_features has the correct shape
  if len(date_features) != 6:
    return jsonify({'error': 'Date string must be in a valid format.'}), 400

  # Convert date_features to numpy array and reshape it
  input_data = np.array(date_features).reshape(1, -1)

  # Make predictions using the Polynomial Regression model
  predictions = polynomial_model.predict(input_data)

  # Format predictions as needed
  predictions = predictions.tolist()

  # Return predictions as JSON response
  return jsonify({'predictions': predictions})

def extract_date_features(date_string):
  # Example: Convert date string to year, month, day, etc.
  date = datetime.strptime(date_string, '%Y-%m-%d')  # Adjust the format as needed
  year = date.year
  month = date.month
  day = date.day
  hour = date.hour
  minute = date.minute
  second = date.second
  return [year, month, day, hour, minute, second]

if __name__ == '__main__':
  app.run(debug=False, port=5002)
