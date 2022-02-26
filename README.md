# Medication Delivery Robot Application

The web application for this project uses React and will pull "patient information" from a MySQL database. The buttons for this application will signal to the Arduino which room the robot is traveling to. 

## Current Functionality in Progress

* Creating the table within the database that stores patient information
* Pulling patient information from database into web application
* Communication with Arduino using room buttons
* Diplay sensed data
* Deploy to public domain/server or find way to use wifi communicator to connect with Arduino when running the application locally

## Working Components of the Web Application

* Login component (with functional password authentification)

     ![Screen Shot 2022-01-23 at 9 44 42 PM](https://user-images.githubusercontent.com/58226843/150714178-cd759cf2-98d6-4b02-b93a-4c64d8942d68.png)
   * Credentials are "user" for the username and "pass" for the password 
   * Contact Ronni Hartlage (hartlage.7@wright.edu) if you would like credentials specifically made for you

   * Alert box displays an appropriate message if the username or password inputted are incorrect

     ![Screen Shot 2022-01-23 at 9 45 28 PM](https://user-images.githubusercontent.com/58226843/150714977-263d28d5-c1b3-4eb5-8f80-e3d3d675ff87.png)

* Styling has been added to the React application
     
     <img width="416" alt="Screen Shot 2022-02-05 at 2 08 47 PM" src="https://user-images.githubusercontent.com/58226843/152655600-c08eb4f3-a3c6-454d-89fe-4523a9e74899.png">

      

## Getting Started with React App

* git clone https://github.com/MDR-Team-5/medication-delivery-robot-app.git
* cd medication-delivery-robot-app
* npm install
* npm update 
* npm install -g npm-check-updates  
* npm start (application can be run locally)
* node /path/to/nodejs_mysql/server.js ##  This is used for the password authenticator and ORM API

node should be running v16+  
npm should be running v8+  

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
