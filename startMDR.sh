#! /bin/bash
## Directory management
if [[ ! -e ~/home ]]; then
    mkdir ~/home
fi

if [[ ! -e ~/home/MDR_T5 ]]; then
    mkdir ~/home/MDR_T5
fi

cd ~/home/MDR_T5
## Manage web app
cd medication-delivery-robot-app
screen -dm  node server.js
screen -dm npm start
## Manage MySQL
sudo service mysql start
cd ../nodejs_mysql
screen -dm node server.js