from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import pandas as pd
from flask_cors import CORS  # Importing CORS for cross-origin handling
from io import BytesIO
from PIL import Image

app = Flask(__name__)

# Enable CORS
CORS(app)

# Load the hospital dataset
file_path = 'hospital_data.csv'  # Replace with the correct path to your CSV file
hospitals = pd.read_csv(file_path)

# Load the saved model for brain tumor detection
model = tf.keras.models.load_model('brain_tumor_detector2.h5')

# Define class labels for tumor model
class_labels = ['glioma', 'meningioma', 'No Tumor', 'pituitary']

# Function to preprocess and predict tumor type
def predict_image(img_path):
    try:
        img = image.load_img(img_path, target_size=(128, 128))  # Resize as per model input
        img_array = image.img_to_array(img) / 255.0  # Normalize if required by model
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        
        predictions = model.predict(img_array)
        predicted_class = np.argmax(predictions, axis=1)
        predicted_label = class_labels[predicted_class[0]]
        return predicted_label, predictions[0].tolist()
    except Exception as e:
        print(f"Error in prediction: {e}")
        raise

# Function to generate Google Maps link based on hospital name
def generate_map_link(hospital_name):
    base_url = "https://www.google.com/maps/search/?api=1&query="
    query = hospital_name.replace(" ", "+")
    return base_url + query

# Route to predict tumor type
@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file uploaded"}), 400
        
        img_file = request.files['image']
        
        # Save the uploaded file to a temporary location
        img_path = "static/uploads/" + img_file.filename
        img_file.save(img_path)

        # Call the prediction function
        predicted_label, predicted_result = predict_image(img_path)

        # If no tumor is detected, return a custom message
        if predicted_label == "No Tumor":
            return jsonify({
                "predicted_label": predicted_label,
                "predicted_result": predicted_result,
                "message": "No tumor detected. Thank you for visiting!"
            })

        # Otherwise, return prediction results
        return jsonify({
            "predicted_label": predicted_label,
            "predicted_result": predicted_result,
            "message": "Prediction completed successfully."
        })
    
    except Exception as e:
        print(f"Error occurred: {e}")  # Log the error for debugging
        return jsonify({"error": str(e)}), 500

# Route to search hospitals by district
@app.route('/search_hospitals', methods=['GET'])
def search_hospitals():
    district_name = request.args.get('district')
    if not district_name:
        return jsonify({'error': 'District name is required'}), 400

    # Filter hospitals by district name
    results = hospitals[hospitals['Chengalpattu'].str.contains(district_name, case=False, na=False)]
    
    if results.empty:
        return jsonify({'message': f'No hospitals found for the district: {district_name}'}), 404

    hospitals_list = []
    for _, row in results.iterrows():
        hospital_name = row['Govt. Hospital, Thiruporur, Kancheepuram TN.']
        address = row['GOVT HOSPITAL THIRUPORUR, OMR,  ILLALURE,THIRUPORUR TK,KANCHEEPURAM DIST  603110']
        contact_number = row['8778634244']
        map_link = generate_map_link(hospital_name)

        hospitals_list.append({
            'hospital_name': hospital_name,
            'address': address,
            'contact_number': contact_number,
            'location_link': map_link
        })

    return jsonify({'hospitals': hospitals_list})


if __name__ == "__main__":
    app.run(debug=True)
