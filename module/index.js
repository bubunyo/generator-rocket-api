'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('module', { type: String, required: true });

    this.log(`Add new Rocket-Api module: ${this.options.module}`);
  }


  writing() {
    const table = this.options.module.toLowerCase();
    const module = table.charAt(0).toUpperCase() + table.substr(1);


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
      this.templatePath('./_module_migration.js'),
        this.destinationPath(`./src/db/migration/${y}${f(m + 1)}${f(dd)}${f(h)}${f(mm)}${f(s)}-${table}_model.js`),
        { module, table },
    );


    this.destinationRoot(`./src/modules/${table}`);

    this.fs.copyTpl(
    this.templatePath('./_module_model.js'),
        this.destinationPath(`${table}.model.js`),
        { module, table },
    );
    this.fs.copyTpl(
    this.templatePath('./_module_controller.js'),
        this.destinationPath(`${table}.controller.js`),
        { module, table },
    );
    this.fs.copyTpl(
    this.templatePath('./_module_routes.js'),
        this.destinationPath(`${table}.routes.js`),
        { module, table },
    );
    this.fs.copyTpl(
    this.templatePath('./_module_validation.js'),
        this.destinationPath(`${table}.validation.js`),
        { module, table },
    );
    this.fs.copyTpl(
    this.templatePath('./_module_routes_test.js'),
        this.destinationPath(`./test/${table}.routes.test.js`),
        { module, table },
    );
    this.fs.copyTpl(
    this.templatePath('./_module_controller_test.js'),
        this.destinationPath(`./test/${table}.controller.test.js`),
        { module, table },
    );
  }

  updateFiles() {
    this.log('>>> log the system');
  }
};
