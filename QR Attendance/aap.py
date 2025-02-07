from flask import Flask, render_template, request, jsonify
import mysql.connector
import datetime
import os

app = Flask(__name__)

# Database Connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="sql@jbn_my02",  # Update with your MySQL password
    database="attendance_db"
)
cursor = conn.cursor()

@app.route('/')
def home():
    """Render Scanner Page"""
    return render_template('index.html')

@app.route('/mark_attendance', methods=['POST'])
def mark_attendance():
    """Receive scanned QR data and mark attendance"""
    try:
        data = request.json
        scanned_data = data.get('qr_data')

        if not scanned_data:
            return jsonify({"error": "No data received"}), 400

        user_id, name = scanned_data.split(',')  
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Insert attendance record
        cursor.execute("INSERT INTO attendance (user_id, name, timestamp) VALUES (%s, %s, %s)",
                       (user_id, name, timestamp))
        conn.commit()

        return jsonify({"message": f"✅ Attendance marked for {name} (ID: {user_id})", "timestamp": timestamp})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/admin')
def admin_dashboard():
    """Fetch all attendance records for admin view, sorted by user_id"""
    cursor.execute("SELECT id, user_id, name, timestamp FROM attendance ORDER BY user_id ASC")
    records = cursor.fetchall()
    return render_template("admin.html", records=records)


@app.route('/delete/<int:user_id>', methods=['POST'])
def delete_entry(user_id):
    """Delete an entry from the database"""
    try:
        cursor.execute("DELETE FROM attendance WHERE id = %s", (user_id,))
        conn.commit()
        return jsonify({"success": True, "message": "Entry deleted successfully!"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
