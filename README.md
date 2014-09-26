rest-express-seed
=================

REST API seed project with node.js and express.js with BDD/TDD approach

## Directory Layout
    
    app.js              --> express app
    bin/                --> excutable binary file
      www               --> for starting the server
    config/             --> configuration files
      index.js          --> application configuration
      routes            --> route configuration
    models/             --> all ORM models (mongoose Schemas)
      user.js           --> sample user model
    controllers/        --> contains all controllers
      userController.js --> sample user controller
    lib/                --> custom classes/functions/modules for application that doesn't belong to models or controllers
      errorHandler.js   --> sample error handler function
    test/                       --> all test spec files
      controllers/              --> specs for controller
        userController.spec.js  --> sample userController spec
      lib/                      --> specs for lib files
        errorHandler.spec.js    --> sample errorHandler spec
      models/                   --> specs for model files
        user.spec.js            --> sample user spec
      acceptance.spec.js        --> sample acceptance spec
      dbHelper.js               --> helper for bootstraping db connection and mogoose for testing
    package.json        --> for npm
    .gitignore          --> gitignore file
    .jshintrc           --> jshint configuration file
    Makefile            --> for running tests
