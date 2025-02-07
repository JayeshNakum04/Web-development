import qrcode
import os

# Ensure QR directory exists
QR_DIR = "qr_codes"
os.makedirs(QR_DIR, exist_ok=True)

def generate_qr(user_id, name):
    """Generate QR Code storing User ID & Name"""
    data = f"{user_id},{name}"  
    qr = qrcode.make(data)
    
    qr_filename = f"{QR_DIR}/{user_id}.png"
    qr.save(qr_filename)
    
    print(f"✅ QR Code saved as {qr_filename} with data: {data}")

# Example Users
generate_qr("1001", "Jayesh")
generate_qr("1002", "Sunil")
generate_qr("1003", "Aditya")
generate_qr("1004", "Dillip")
generate_qr("1005", "Devansh")
