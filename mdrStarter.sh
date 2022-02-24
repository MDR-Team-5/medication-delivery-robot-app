#!/bin/bash
#!/usr/bin/bash
#!/Windows/System32/bash
##  /bin/bash for *nix
##  /usr/bin/bash for other *nix
##  /Windows/System32/bash for Windows

startUp_system(){
    currOS=$OSTYPE
    if [[ "$currOS" == "win32" ]] ;then
        echo "Initializing Windows Start Up Protocols . . ."
        #echo windows_init
    else
        ## One can only pray you have Linux commands
        echo "Initializing Unix System Start Up Protocols . . ."
        #  Uncomment when ready to install
        unix_init
    fi
}

windows_init(){
    #  Maybe a work in progress
    ##  Team Discussion!
    echo "Perhaps run this on a Unix shell"

}

unix_init(){
    echo " "
    echo "Currently working within directory: "
    echo $1    
    if [[ $EUID -eq 0  ]] ;then
        echo " "
        echo "Running script as root admin . . ."
        dir=$PWD
        echo " "
        echo "Updating and Upgrading current system. . ."
        sudo apt-get upgrade -y > /dev/null
        sudo apt-get update -y > /dev/null
        unix_mySQL_init $dir
        unix_ServiceLayer $dir
        unix_webApp $dir
        echo " "
        echo "All installation and configuration completed!"
    else   
        echo " "
        echo "This script requires root privileges to install and configure the device."
    fi
}

unix_mySQL_init(){
    echo " "
    #  install DB Application
    echo "Installing necessary components for database . . ."
    sudo apt-get install mariadb-server -y > /dev/null
    echo "Starting MYSQL service . . ."
    sudo service mysql start > /dev/null
    echo "Opening MYSQL Port . . ."
    sudo ufw allow 3306/tcp > /dev/null
    #  Uncomment below to confirm Port 3306 is open
    #netstat -tuplen 
    echo " "
    echo "Creating Medication_Delivery_Database . . ."
    # Pass SQL CREATE/INSERT commands quietly (asides for some error messages)
    ##  Create Database and Tables
    if [[ -f $1/medication-delivery-robot-SQL-table/mdrCreateTable.sql ]] ;then
        echo " "
        echo "Running script to create Database and Tables for Medication_Delivery_Database. . ."
        sudo mysql -e "source $1/medication-delivery-robot-SQL-table/mdrCreateTable.sql" > /dev/null
    fi
    ##  Insert Data to Tables
    if [[ -f $1/medication-delivery-robot-SQL-table/mdrInsertScript.sql ]] ;then
        echo " "
        echo "Running script to insert information for Medication_Delivery_Database. . ."
        sudo mysql -e "source $1/medication-delivery-robot-SQL-table/mdrInsertScript.sql" > /dev/null
    fi
    ##  User Creation for Service Layer
    echo " "
    echo "Creating Privileged User for Service Layer. . ."
    sudo mysql -e "CREATE USER 'mdrbot'@'localhost' IDENTIFIED BY 'password';"
    sudo mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'mdrbot'@'localhost' IDENTIFIED BY 'password';"
    echo " "
    echo "Medication_Delivery_Database is ready for use."
}

unix_ServiceLayer(){
    echo " " 
    echo "Running Service Layer Server. . ."
    cd $1/nodejs_mysql
    npm install express sequelize mysql2 cors --save > /dev/null
    screen -dm node server.js
}

unix_webApp(){
    echo " "
    echo "Installing necessary components for Web Application. . ."
    cd $1/medication-delivery-robot-app
    npm install > /dev/null
    npm install axios > /dev/null
    npm update > /dev/null
    npm install -g npm-check-updates > /dev/null
    screen -dm npm start
}

init(){
    validateDirectory=true
    echo "Checking accessibility to: "
    #  MySQL Repository
    if [[ -d $PWD/medication-delivery-robot-SQL-table/ ]] ;then
        echo "  SQL Configuration Files Available"
    else
        echo "  SQL Configuration Files Unavailable"
        echo "  git clone the necessary SQL repository"
        validateDirectory=false
    fi
    #  WebApp Repository
    if [[ -d $PWD/medication-delivery-robot-app ]] ;then
        echo "  Web Application Configuration Files Available"
    else
        echo "  Web Application Configuration Files Unavailable"
        echo "  git clone the necessary Web Application repository"
        validateDirectory=false
    fi  
    #  NodeJS Service Layer Repository
    if [[ -d $PWD/nodejs_mysql ]] ;then
        echo "  Service Layer Configuration Files Available"
    else
        echo "  Service Layer Configuration Files Unavailable"
        echo "  git clone the necessary NodeJS Service Layer repository"
        validateDirectory=false
    fi

    if [[ $validateDirectory = true ]] ;then
        echo " "
        echo "Deciding which operating system is running . . ."
        startUp_system
    else
        echo "One of the Configurations are missing."
        echo " "
        echo "The script file must be in the parent directory where the git clone command is ran."
        echo "Attempt to move the script if it is located inside any of the application repositories,"
        echo "which retrieved the script from a git clone command."
        echo " "
        echo "Script did not run."
    fi
}

init