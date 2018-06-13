## React with User Login, Token, Cookies and Form Authentication

### Documentation

This Project allows the user to interact with a React website that persists data with Sluggram back-end database maintained with MongoDB. The user can register and have their information stored in the DB so that they can log in at a later point in time. If the user does not submit the correct type of information to the submit form field then error messages will show up. If the user stays logged in with a cookie in their browser the user will remain logged in.


## Installation
In order to use this project the user will need to clone the project and install the dependencies. 
To use the project the user will have to make a file ```.env``` and include the enviroment variables needed for this project to function. Use the following for the back end, note: for this project that IS Sluggram:

```
NODE_ENV=development
PORT=3000 
DEBUG=true
CORS_ORIGINS=http://localhost:8080 
MONGODB_URI=mongodb://localhost/testing
SECRET=1234
```

The same process will need tp be implemented for the front end however the contents of the
 ```
 .env
 ``` 
 file will be the following:

```
API_URL=http://localhost:3000
NODE_ENV=development
```


## Tests
Currently only the back end is testable. This is done using the following commands in the CLI

In one tab: 
```
npm run dbon
```

And in another tab:
```
npm run test
```

This process will validate the routes and logic implemented in the sluggram folder.

## How to use?
In order to use the application the user must do the following 3 steps:

1. run the database while in the back-end folder:
```
npm run dbon
```

2. start the server:
```
node index.js
```

3. run the application:
Start by navigating to the front-end folder
run the following command:  
```
npm run watch
```

## License

MIT © [Sean Miller]()