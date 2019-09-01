# Rocket Api [WIP]

## Overview
After building tons of Node JS api, a pattern began to emerge. There were batteries I immediately 
added to all my projects and there was a pattern to how I added new features to my project. For all my project,
These we my requirements. 

- Have and easy-to-use ORM
- Have a migrations strategy.
- Easy to Setup and Use Validators
- Modular folder structure.
- Integration tests for all my code. 
- Some initial batteries for all new modules.

What I came up with is a generator project onto for creating modular testable apps. 

Batteries include 
- [Sequelize](https://sequelize.org/master/) as an ORM and for migration.
- [Passport](http://www.passportjs.org) for authentication
- [Jest](http://jestjs.io) for Testing
- [Joi](https://github.com/hapijs/joi) for validation
- [Morgan](https://github.com/expressjs/morgan) for logging

## Getting Started

Before you begin make sure you have the [yo scaffolding tool](http://yeoman.io/learning/index.html) installed (As it is part of the Yeoman tool set you might have installed it before). To globally install *yo* you will need to use npm:

```
$ npm install -g yo
```

**Note:** Your user might not have the permissions to install package globally, so use a super user or **sudo**.

Once you have *yo* installed, you will need to install the Rocket Api generator as well:

```
$ npm install -g generator-rocket-api
```

You are now ready to get started with the Rocket Api generator. The generator will help you create a scaffold for your node api.


## Application Generator

The application generator will help you create a fresh copy of a Rocket Api Scaffold in your working folder. To create your a scaffold, navigate to a new project folder, and then use *yo* to generate your application:

```
$ yo rocket-api
```

The generator will ask you a few questions about your new application and will generate it for you. When the installation process is over, you you can peep the script section of your `package.json`
to know the commands available to run

## Folder structure

The initial folder structure of your api application looks like this
```
.
├── package.json
├── src
│   ├── app.js
│   ├── config
│   │   ├── constants.js
│   │   └── passport.js
│   ├── db
│   │   ├── config.js
│   │   ├── index.js
│   │   └── migrations
│   │       └── 20190826183109-user_model.js
│   ├── helpers
│   │   └── test_helpers.js
│   ├── middleware
│   │   ├── catch.js
│   │   └── setup.js
│   ├── modules
│   │   ├── api
│   │   │   └── api.routes.js
│   │   └── user
│   │       ├── test
│   │       │   ├── user.controller.test.js
│   │       │   └── user.routes.test.js
│   │       ├── user.controller.js
│   │       ├── user.model.js
│   │       ├── user.routes.js
│   │       └── user.validation.js
│   └── server.js
└── yarn.lock
```
`src` - folder contains all you code.
`db` - will contain all you db related operations including migrations and seeds.
`helpers` - will contain all utility functions and methods
`middleware` - will contain all routes middle ware logic
`modules` - will contain all the modules on your app.

## The Concept of Modules. 

Think of modules as a container for all the logic that deals with a particular object.
Eg. For an E-commerce platform, Products will be a module. The model definitions, routes, and business logic and tests, will be contained within the module folder.
The module folder contains a `api.routes.js` file which serves as a mini gateway into all your module files. 

### Module Structure 
Modules contain a
-  `<modulename>.model.js` - the Sequelize model definition. For more info on the module definition look [here](https://sequelize.org/master/manual/models-definition.html)
-  `<modulename>.controller.js` - the business login of you app as exported functions.
-  `<modulename>.routes.js` - the gateway for you particular module.
-  `<modulename>.validation.js` - Joi validation schema.
-  `test/<modulename>.routes.test.js` - Integration test for your business logic with entry point in your routes.
-  `test/<modulename>.controller.test.js` - Unit test for your business logic.
-  `test/<modulename>.model.test.js` - Unit test for your model definition expecially if they have any additional functions.

You are free to create and add new module files to your module folder. Please remember to keep the naming conventions so that people who look at your code can easily know what to find 

#### Generate a module
to generate a module scaffold, execute this command in the working directory.
```
yo rocket-api: <modulename>
```

## Other Commands 

### Generate a Migration 

```
yarn migrate:generate <migration_title>
```
This will create a sequelize migration document in `src/db/migrations` of the format `<data_timestam>_migration_name.js`. You can refer to the [Sequelize Migrations Doc]() on how to create migrations.

### Run a migrations

On the test Database
```
yarn sequelize-test db:migrate
```

### Undo a migrations

On the test Database
```
yarn sequelize-test db:migrate:undo
```

### Run Tests 

```
yarn test 
```

### Run Tests Coverage with a File Watcher

```
yarn test:coverage
```


## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




