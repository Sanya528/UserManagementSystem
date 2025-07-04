from flask import Flask, request, jsonify
import pandas as pd
import re
from flask_cors import CORS
from models import db, User  # Assuming SQLAlchemy

app = Flask(__name__)
CORS(app)

@app.route('/api/users/bulk-upload', methods=['POST'])
def bulk_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    try:
        df = pd.read_excel(file)
    except Exception as e:
        return jsonify({'error': 'Invalid file format'}), 400

    required_columns = ['first', 'last', 'email', 'phone', 'pan']
    missing = [col for col in required_columns if col not in df.columns]
    if missing:
        return jsonify({'error': f'Missing columns: {", ".join(missing)}'}), 400

    errors = []
    valid_rows = []

    email_regex = r'^\S+@\S+\.\S+$'
    phone_regex = r'^\d{10}$'
    pan_regex = r'^[A-Z]{5}[0-9]{4}[A-Z]$'

    for idx, row in df.iterrows():
        row_num = idx + 2
        if pd.isna(row['first']) or pd.isna(row['last']) or pd.isna(row['email']) or pd.isna(row['phone']) or pd.isna(row['pan']):
            errors.append(f"Row {row_num}: Missing required fields.")
            continue
        if not re.match(email_regex, str(row['email'])):
            errors.append(f"Row {row_num}: Invalid email.")
        if not re.match(phone_regex, str(row['phone'])):
            errors.append(f"Row {row_num}: Invalid phone number.")
        if not re.match(pan_regex, str(row['pan'])):
            errors.append(f"Row {row_num}: Invalid PAN format.")
        else:
            valid_rows.append(row)

    if errors:
        return jsonify({'errors': errors}), 400

    # Save all rows
    for row in valid_rows:
        user = User(
            first=row['first'],
            last=row['last'],
            email=row['email'],
            phone=str(row['phone']),
            pan=row['pan']
        )
        db.session.add(user)

    db.session.commit()
    return jsonify({'message': f'{len(valid_rows)} users uploaded successfully.'})
