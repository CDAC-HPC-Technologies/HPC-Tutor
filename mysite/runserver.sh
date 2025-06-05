#!/bin/bash

PROJECT_DIR="Project Path"
export LD_LIBRARY_PATH="/usr/local/lib"
export sys_path="mysite Path"
export Tutor_LOGPATH=/var/log/WorkshoP/

cd "mysite Path"

gunicorn mysite.wsgi:application --bind 0.0.0.0:9091 --certfile= --keyfile= \
--log-config /home/cadmin/WorkshoP/mysite/log.conf
