# HPC An Interactive Learning Platform

HPC Tutor is an innovative web based unified learning platform, meticulously crafted to equip novice users with practical experience in the field of High-Performance Computing (HPC). This platform expertly combines theoretical knowledge with hands-on application, offering an engaging and comprehensive educational experience in the HPC field. With its interactive learning environment, it seamlessly connects theory and practice by providing real-time supercomputing shell access, code samples, and a variety of presentation materials. Whether you're an educator, researcher, HPC practitioner, or technology developer, this tool is indispensable for sharing your technologies effectively through real-time experiences in the dynamic world of HPC. 

This tool facilitates the extensive distribution of continuously evolving technologies by providing real-time experiences within the HPC sector


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

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- Python (3.8 or higher)
- Django
- A Database: SQLite (for development) or PostgreSQL/MySQL (for production)

## 🛠️ Local Development Setup

Follow these steps to get HPC Tutor running on your local machine for development and testing.
1. Clone the Repository

```
On Windows:

1. Visit the repository: https://github.com/CDAC-HPC-Technologies/HPC-Tutor
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the downloaded ZIP file
5. Rename the folder from HPC-Tutor-master to HPC-Tutor
6. cd HPC-Tutor

On Linux/macOS:
git clone https://github.com/CDAC-HPC-Technologies/HPC-Tutor.git
cd HPC-Tutor


```


2. Set Up a Python Virtual Environment
```
Create an isolated Python environment to manage dependencies.

On Linux/macOS:


python3 -m venv venv
source venv/bin/activate

On Windows:


python -m venv venv
.\venv\Scripts\activate.bat

Your command prompt should now show (venv).
```
3. Install Python Dependencies
```
pip install -r requirements.txt
```
4. Configure Environment Settings
```
    Duplicate the example environment file:
    

    cp .env.example .env

    Edit the .env file with your favorite text editor. You must change the following values:

        SECRET_KEY: Generate a long, random, unique string. (Do not use the default one in production!)

        DEBUG: Set to True for development.

        Configure your database settings (e.g., DATABASE_URL). For simplicity with SQLite, you can often leave the default.

        TERMINAL_IFRAME_URL: Set this after completing the terminal shell integration step below.(For e.g http://localhost:9090)
```
5. Apply Database Migrations
```
cd mysite/

This step sets up the necessary database tables.


python manage.py migrate
```
6. Create a Superuser (Optional)
```
Create an admin account to access the Django CMS admin interface.


python manage.py createsuperuser

Follow the prompts to set a username, email, and password.
```
7. Run the Development Server
``` 

python manage.py runserver

Open your web browser and go to http://127.0.0.1:8000 to see the application.
Then enter the Title and Content and save it.
The admin panel is at http://127.0.0.1:8000/admin.
```
## 🌐 Terminal Shell Integration

HPC Tutor requires a web-based terminal backend. We provide two options:
Option A: For Linux/macOS Hosts (Recommended for Production)

We recommend using Cockpit for robust terminal access to Linux-based HPC resources.

    Install Cockpit on your target Linux machine (e.g., your training cluster's login node):
   ``` 
Step1:- wget https://github.com/cockpit-project/cockpit/releases/download/235/cockpit-235.tar.xz
Step2:- tar xf cockpit-235.tar.xz
Step3:- cd cockpit-235
Step4:- ./configure
Step5:- make -j$(nproc)
Step6:- sudo make install
Step7:- vi /etc/pam.d/cockpit
and enter following lines
auth       include      system-auth
account    include      system-auth
password   include      system-auth
session    include      system-auth
Step8:- systemctl start cockpit


Start and enable the service:


    sudo systemctl enable --now cockpit.socket
```
Configure HPC Tutor: In your .env file, set the TERMINAL_IFRAME_URL to point to your Cockpit instance (e.g., TERMINAL_IFRAME_URL=http://localhost:9090).

Official Documentation: https://cockpit-project.org/running

Option B: For Windows Hosts (Local Development/Testing)

To provide a shell on a Windows machine, we use a Node.js backend with node-pty.
Windows Terminal Backend Setup

    Install Node.js: Download and install the LTS version from https://nodejs.org.

    Navigate to the Windows terminal backend directory:
``` 

cd terminal/win-backend

Install the required Node.js modules:


npm install express express-ws node-pty

Create the server file (server.js): Create a file named server.js in the win-backend directory with the following content:
javascript

const express = require('express');
const expressWs = require('express-ws');
const pty = require('node-pty');
const app = express();
expressWs(app);

// Serve static files if needed (e.g., a test page)
app.use(express.static('public'));

// Handle WebSocket connections for the terminal
app.ws('/shell', (ws, req) => {
    // Spawn PowerShell on Windows
    const shell = pty.spawn('powershell.exe', [], {
        name: 'xterm-256color',
        cols: 80,
        rows: 30,
        cwd: process.env.USERPROFILE, // Use Windows user profile directory
        env: process.env
    });

    // Send output from the shell to the websocket
    shell.onData((data) => {
        try {
            ws.send(data);
        } catch (error) {
            // Handle errors, e.g., if WebSocket is not open
        }
    });

    // Send input from the websocket to the shell
    ws.on('message', (msg) => {
        shell.write(msg);
    });

    // Handle cleanup on disconnect
    ws.on('close', () => {
        shell.kill();
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Windows Terminal Backend running on http://localhost:${port}`);
});

Run the terminal server:


    node server.js

    You should see: Windows Terminal Backend running on http://localhost:3000.
```
Configure HPC Tutor for Windows Terminal

    In your HPC Tutor .env file, set the terminal URL:
    

   ```
TERMINAL_IFRAME_URL=http://localhost:3000
```
    Ensure the Windows terminal server is running before starting your Django development server.

## 🚀 Production Deployment

For a production server, we highly recommend the following:

    Use a Production Web Server: Do not use Django's built-in runserver. Use Gunicorn (or uWSGI) behind a reverse proxy like Nginx.

    Use a Production Database: Use PostgreSQL or MySQL instead of SQLite.

    Set DEBUG=False: Always set DEBUG = False in your production .env file.

    Set Up Static Files: Configure your web server (Nginx) to serve static files directly for performance. Use python manage.py collectstatic to gather them.

    Use HTTPS: Secure your site with SSL/TLS certificates (e.g., from Let's Encrypt).




