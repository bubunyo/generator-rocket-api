'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.log(`Creating new Rocket-Api project: ${this.appname}`);
  }

  _getDialect(dbms) {
    switch (dbms) {
      case 'MySQL': return 'mysql';
      case 'MariaDB' : return 'mariadb';
      case 'Sqlite3' : return 'sqlite3';
      case 'Tedious' : return 'tedious';
      default: return 'postgres';
    }
  }

  async prompts() {
    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'pm',
        message: 'Package manager',
        choices: [
          'Yarn',
          'NPM',
        ],
      }, {
        type: 'list',
        name: 'dbms',
        message: 'Database',
        choices: [
          'Postgres',
          'MySQL',
          'MariaDB',
          'Sqlite3',
          'Tedious',
        ],
      }, {
        type: 'input',
        name: 'author',
        message: 'Authors',
      },
    ]);
    this.config.set({
      pm: this.answers.pm === 'Yarn' ? 'yarn' : 'npm',
      dialect: this._getDialect(this.answers.dbms),
    });
  }

  writing() {
    if (this.config.get('dialect') === 'sqlite3') {
      this.fs.copyTpl(
      this.templatePath('./_sqlite3_db.js'),
        this.destinationPath('./src/db/index.js'),
    );
    } else {
      this.fs.copyTpl(
      this.templatePath('./_db.js'),
        this.destinationPath('./src/db/index.js'),
        { dialect: this.config.get('dialect') },
    );
    }
    this.fs.copyTpl(
      this.templatePath('./_passport.js'),
      this.destinationPath('./src/config/passport.js'),
    );
    this.fs.copyTpl(
      this.templatePath('./_db_config.js'),
        this.destinationPath('./src/db/config.js'),
      { dialect: this.config.get('dialect'),
        appname: this.appname },
    );
    const d = new Date();
    const y = d.getFullYear();
    const m = d.getMonth();
    const dd = d.getDate();
    const mm = d.getMinutes();
    const h = d.getHours();
    const s = d.getSeconds();
    function f(x) {
      return x < 10 ? `0${x}` : `${x}`;
    }
    this.fs.copyTpl(
      this.templatePath('./_user_migration.js'),
      this.destinationPath(`./src/db/migrations/${y}${f(m + 1)}${f(dd)}${f(h)}${f(mm)}${f(s)}-user_model.js`),
    );
    this.fs.copyTpl(
      this.templatePath('./_user_module'),
      this.destinationPath('./src/modules/user'),
    );
    this.fs.copyTpl(
      this.templatePath('./_test_helpers.js'),
      this.destinationPath('./src/helpers/test_helpers.js'),
    );
    this.fs.copyTpl(
      this.templatePath('./_api_routes.js'),
      this.destinationPath('./src/modules/api/api.routes.js'),
    );
    this.fs.copyTpl(
      this.templatePath('./_catch.js'),
        this.destinationPath('./src/middleware/catch.js'),
    );
    this.fs.copyTpl(
      this.templatePath('./_setup.js'),
        this.destinationPath('./src/middleware/setup.js'),
    );
    this.fs.copyTpl(
      this.templatePath('./_app.js'),
        this.destinationPath('./src/app.js'),
    );
    this.fs.copyTpl(
      this.templatePath('./_server.js'),
        this.destinationPath('./src/server.js'),
    );
    this.fs.copyTpl(
      this.templatePath('./_babelrc'),
      this.destinationPath('.babelrc'),
    );
    this.fs.copyTpl(
      this.templatePath('./_constants.js'),
        this.destinationPath('./src/config/constants.js'),
    );
    this.fs.copyTpl(
      this.templatePath('./_editorconfig'),
      this.destinationPath('.editorconfig'),
    );
    this.fs.copyTpl(
      this.templatePath('./_eslintrc'),
      this.destinationPath('.eslintrc'),
    );
    this.fs.copyTpl(
      this.templatePath('./_gitignore'),
      this.destinationPath('.gitignore'),
    );
    this.fs.copyTpl(
      this.templatePath('./_sequelizerc'),
      this.destinationPath('.sequelizerc'),
    );

    this.fs.copyTpl(
      this.templatePath('./package.json'),
      this.destinationPath('package.json'),
      {
        appname: this.appname.replace(/ /g, '-'),
        pm: this.config.get('pm'),
        db: this.config.get('dialect'),
        author: this.answers.author,
      },
    );
  }
  install() {

        const deps = [
            'axios',
            'babel-cli',
            'eslint',
            'babel-plugin-transform-object-rest-spread',
            'babel-preset-env',
            'bcrypt-nodejs',
            'body-parser',
            'cors',
            'cross-env',
            'errorhandler',
            'express',
            'express-jwt',
            'express-validation',
            'http-status',
            'joi',
            'jsonwebtoken',
            'meteor-random',
            'method-override',
            'methods',
            'moment',
            'morgan',
            'passport',
            'passport-jwt',
            'sequelize',
            'sequelize-cli',
            'source-map-support',
            'validator',
        ]

    if (this.config.get('dbms') === 'postgres') {
        deps = [
            ...deps,
            'pg',
            'pg-hstore',
        ]
    }
    if (this.config.get('dbms') === 'mysql') {
        deps = [
            ...deps,
            'mysql2',
        ]
    }
    if (this.config.get('dbms') === 'mariadb') {
        deps = [
            ...deps,
            'mariadb',
        ]
    }
    if (this.config.get('dbms') === 'mariadb') {
        deps = [
            ...deps,
            'sqlite3',
        ]
    }
    if (this.config.get('dbms') === 'tedious') {
        deps = [
            ...deps,
            'tedious',
        ]
    }



    if (this.config.get('pm') === 'yarn') {
        this.yarnInstall(deps);

    } else {
        this.npmInstall(deps);
    }
  }

  installDevDeps() {

        const devDeps = [
            'babel-core',
            'babel-jest',
            'eslint',
            'eslint-config-airbnb',
            'eslint-config-es5',
            'eslint-plugin-import',
            'eslint-plugin-jsx-ally',
            'jest',
            'nodemon',
            'rimraf',
            'supertest',
        ]


    if (this.config.get('pm') === 'yarn') {
        this.yarnInstall(devDeps, { 'dev': true })
    } else {
        this.npmInstall(devDeps, { 'dev': true });
    }
  }
};
