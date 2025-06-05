# HPC Learning Portal

A web-based portal built using Django CMS for learning High-Performance Computing (HPC) concepts like OpenMP, MPI, and system architecture. It includes structured content, interactive examples, and a terminal interface for hands-on learning.

## 🚀 Features

- CMS-driven content management (Django CMS)
- Embedded terminal access
- Course-wise content organization
- Admin panel for workshop/course registration
- Bootstrap-based responsive UI

## 📦 Tech Stack

- Django CMS
- Bootstrap 3 & 5
- jQuery
- Apache or Gunicorn + Nginx (recommended for production)

## 🛠️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/your-org/hpc-portal.git
cd hpc-portal

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Rename and configure your settings
cp settings_template.py settings.py
# Now edit `settings.py` to include your DB and secret keys

# Migrate and run
python manage.py migrate
python manage.py runserver

