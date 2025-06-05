#!/bin/bash

PROJECT_DIR=/home/cadmin
export LD_LIBRARY_PATH="/usr/local/lib"

cd /home/cadmin
source /home/cadmin/miniconda3/bin/activate
conda activate venv_workshop
cd /home/cadmin/WorkshoP/mysite/mysite
gunicorn /home/cadmin/WorkshoP/mysite/mysite.wsgi:application --bind 0.0.0.0:9091


