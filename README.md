# HPC Learning Portal

HPC Tutor is an A Unique Web Enabled Platform for Facilitating Remote Hands-on HPC training. In order to proliferate usage of High-Performance Computing (HPC) among research and education community, it is important to prepare and develop diverse community of HPC practitioners. Absence of an adequate teaching and learning ecosystem for HPC inhibits its widespread use and results in inefficient usage of its facilities. The hands-on sessions are one of the significant elements of HPC training in addition to theory/concept.  However, it becomes challenging to accomplish it, in the online method. HPC Tutor provides presentation of learning material and shell access through a single screen. The shell is designed in such a way that users can practice hands-on assignment on a supercomputing facility without a need to login into it. Integration of shells on multiple HPC facilities is provided to ease the user in use of the HPC facility as per their computing requirements.
The presentation part of Tutor can be customized to provide integration of contents in PPT, PDF format, Audio-visual, web content, reference guide related to HPC as well as role-based tailored contents. 
This tool aims to enhance user capability to apply parallel programming techniques for development of advanced software algorithm related to their compute intensive workload in HPC environment.

## 🚀 Features

•	HPC-Focused Pedagogy: Tailored for students/researchers transitioning to supercomputing.
•	Practical Exercises: Cloud-based or on-prem HPC access for applied learning.
•	Modular Design: Self-paced courses with beginner-to-advanced tiers.
•	Community-Driven: Accepts contributions for new tutorials/tools.


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

