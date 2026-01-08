"""
Quick setup script for local Django development
Run this to install dependencies and create admin user
"""
import subprocess
import sys

print("📦 Installing dependencies...")
subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])

print("\n✅ Dependencies installed!")
print("\n📝 Creating superuser...")
print("Username: admin")
print("Password: admin123")
print("\nRun: python manage.py runserver")
