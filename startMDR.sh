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
        windows_init
    else
        ## One can only pray you have Linux commands
        echo "Initializing Unix System Start Up Protocols . . ."
        unix_init
    fi
}

windows_init(){
    #  Maybe a work in progress
    ##  Team Discussion!
    echo "Functionality is still a work in progress"
    echo "Perhaps run this on a Unix shell"

}

unix_init(){
    dir=$PWD
    echo " "
    echo "Currently working within directory: "
    echo $dir    
    if [[ $EUID -eq 0  ]] ;then
        echo " "
        echo "Running script as root admin . . ."
        echo " "
        echo "Have you ran the script before? "
        echo "[y] for yes"
        echo "[n] for no"
        read -r userPrompt
        if [[ $userPrompt == "n" ]] ;then 
            echo " "
            echo "Preparing for installation of components. . ."
            unix_component_install $dir
            unix_createDB $dir
        fi
        echo " "
        unix_mySQL $dir
        unix_serviceLayer $dir
        unix_webApp $dir
        echo " "
        echo "All installation and configuration completed!"       
    else   
        echo " "
        echo "This script requires root privileges to install and configure the device."
    fi
}

unix_component_install(){
    echo " "
    echo "Updating and Upgrading current system. . ."
    sudo apt-get upgrade -y > /dev/null
    sudo apt-get update -y > /dev/null
    sudo apt install screen -y > /dev/null
    #  Install database components
    echo " "
    echo "Installing necessary components for database . . ."
    sudo apt-get install mariadb-server -y > /dev/null
    # Install websocket server components
    echo " "
    echo "Installing necessary components for websocket server . . ."
    cd $1/nodejs_websocket
    sudo node install ws
    # Install service layer components
    echo " "
    echo "Installing necessary components for service layer. . ."
    cd $1/nodejs_mysql
    npm install express sequelize mysql2 cors --save > /dev/null
    # Install web appication components
    echo " "
    echo "Installing necessary components for Web Application. . ."
    cd $1/medication-delivery-robot-app
    npm install > /dev/null
    npm install axios > /dev/null
    npm update > /dev/null
    npm install -g npm-check-updates > /dev/null         
}

unix_createDB(){
    echo " "
    echo "Creating Medication_Delivery_Database . . ."
    # Pass SQL CREATE/INSERT commands quietly (asides for some error messages)
    ##  Script create Database and Tables
    if [[ -f $1/medication-delivery-robot-SQL-table/mdrCreateTable.sql ]] ;then
        echo " "
        echo "Running script to create Database and Tables for Medication_Delivery_Database. . ."
        sudo mysql -e "source $1/medication-delivery-robot-SQL-table/mdrCreateTable.sql" > /dev/null
    fi
    ##  Script insert Data to Tables
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

unix_mySQL(){
    echo " "
    echo "Starting MYSQL service . . ."
    sudo service mysql start > /dev/null
    echo "Opening MYSQL Port . . ."
    sudo ufw allow 3306/tcp > /dev/null
    #  Uncomment below to confirm Port 3306 is open
    #netstat -tuplen
}

unix_serviceLayer(){
    echo " " 
    echo "Running Service Layer Server. . ."
    cd $1/nodejs_mysql
    sudo screen -dm -S servicelayerscn node server.js
}

unix_websocketserver(){
    echo " "
    echo "Running Websocket Server. . ."
    cd $1/nodejs_websocket
    sudo screen -dm -S websocketscn node server.js

}

unix_webApp(){
    echo " "
    echo "Running Web Application. . ."
    cd $1/medication-delivery-robot-app
    sudo screen -dm -S webappscn npm start
}

init(){
    validateDirectory=true
    if [[ -d .git ]] ;then
        cd ..
    fi 
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
    #  NodeJS WebSocket Server Repository
    if [[ -d $PWD/nodejs_websocket ]] ;then
        echo "  WebSocket Server Configuration Files Available"
    else
        echo "  WebSocket Server Configuration Files Unavailable"
        echo "  git clone the necessary NodeJS WebSocket Server repository"
        validateDirectory=false
    fi

    if [[ $validateDirectory = true ]] ;then
        echo " "
        echo "Deciding which operating system is running . . ."
        startUp_system
    else
        echo "One of the Configurations are missing."
        echo " "
        echo "Script did not run."
    fi
}

#  Move Script up a layer

    init  
    echo " "
    echo "Script ending. . ."
