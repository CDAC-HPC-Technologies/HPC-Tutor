# HPC An Interactive Learning Platform

HPC Tutor is an A Unique Web-Enabled Platform for Facilitating Remote Hands-on High-Performance Computing (HPC) Training.

HPC Tutor solves a key challenge in online HPC education: the separation between lecture material and the shell environment. Our platform integrates learning content (PDFs, PPTs, videos) with direct terminal access to real HPC systems through a single, unified browser window. This allows students to learn concepts and immediately practice commands without switching contexts or managing complex logins, lowering the barrier to entry for future HPC practitioners.

## ✨ Features

- **Integrated Learning Environment:** View tutorials and run commands on integrated HPC resources side-by-side in a single browser tab
- **HPC-Focused Pedagogy:** Content tailored for students and researchers transitioning to supercomputing
- **Practical, Hands-On Exercises:** Direct, cloud-based, or on-prem HPC shell access for applied learning
- **Multi-Resource Integration:** Configure shells for multiple HPC facilities to meet diverse computing needs
- **Modular & Customizable:** Self-paced courses with beginner-to-advanced tiers. Easily customize content via Django CMS
- **Community-Driven:** We accept contributions for new tutorials, tools, and learning modules


## 📦 Tech Stack

- Django CMS
- Bootstrap 3 & 5
- jQuery
- Apache or Gunicorn + Nginx (recommended for production)

## 🛠️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/vardhman11/HPC_Tutor.git/
cd mysite

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Rename and configure your settings
cp settings.py settings.py
# Now edit `settings.py` to include your DB and secret keys
# Make the changes in enviorment variables
# For terminal we have used cockpit open source terminal for installation follow https://cockpit-project.org/running
# Make changes in the terminal url in the enviorment and settings.py file

# Migrate and run
python manage.py migrate
python manage.py runserver

