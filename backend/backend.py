from flask import Flask, request, jsonify
import re
import imaplib
import email
from bs4 import BeautifulSoup
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

phishing_keywords = ['account', 'bank', 'verify', 'password', 'click', 'login', 'update', 'security']

# Function to check suspicious URLs in email content
def contains_suspicious_url(email_content):
    url_pattern = re.compile(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+')
    urls = re.findall(url_pattern, email_content)
    for url in urls:
        if "yourcompany.com" not in url:
            return True
    return False

# Function to check phishing content based on keywords
def contains_phishing_content(email_content):
    for keyword in phishing_keywords:
        if keyword in email_content.lower():
            return True
    return False

# Function to detect phishing
def detect_phishing(email_subject, email_body):
    if contains_suspicious_url(email_body) or contains_phishing_content(email_subject) or contains_phishing_content(email_body):
        return "Phishing Detected"
    else:
        return "No Phishing Detected"

# Function to fetch email content from inbox
def fetch_emails(user_email, user_password):
    imap_url = 'imap.gmail.com'
    mail = imaplib.IMAP4_SSL(imap_url)
    mail.login(user_email, user_password)
    mail.select('Inbox')

    # Fetch all emails
    status, email_ids = mail.search(None, 'ALL')
    email_list = email_ids[0].split()

    phishing_results = []

    # Check the most recent 5 emails
    for email_id in email_list[-1:]:
        status, data = mail.fetch(email_id, '(RFC822)')
        for response_part in data:
            if isinstance(response_part, tuple):
                msg = email.message_from_bytes(response_part[1])
                email_subject = msg.get('subject', '')
                email_body = ""
                
                if msg.is_multipart():
                    for part in msg.walk():
                        content_type = part.get_content_type()
                        content_disposition = str(part.get("Content-Disposition"))
                        if "attachment" not in content_disposition:
                            payload = part.get_payload(decode=True)
                            if payload:
                                email_body += payload.decode()
                else:
                    email_body = msg.get_payload(decode=True).decode()
                soup=BeautifulSoup(email_body,'html.parser')
                email_body_text=soup.get_text()
                # Perform phishing detection
                result = detect_phishing(email_subject, email_body_text)
                phishing_results.append({
                    'subject': email_subject,
                    'result': result
                })
    
    mail.logout()
    return phishing_results

# API endpoint to detect phishing
@app.route('/check-emails', methods=['POST'])
def check_emails():
    data = request.get_json()
    user_email = data.get('email')
    user_password = data.get('password')
    print("Got the mail req")
    if not user_email or not user_password:
        return jsonify({'error': 'Missing email or password'}), 400

    try:
        # Fetch emails and perform phishing detection
        phishing_results = fetch_emails(user_email, user_password)
        print(phishing_results)
        return jsonify({'emails': phishing_results})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

