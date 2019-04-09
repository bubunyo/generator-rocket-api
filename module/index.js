'use strict';

const Generator = require('yeoman-generator');
const recast = require('recast');

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

  append() {
    const table = this.options.module.toLowerCase();
    const module = table.charAt(0).toUpperCase() + table.substr(1);


    this.destinationRoot();

    const apiRouterPath = 'src/modules/api/api.routes.js';

    const text = this.fs.read(apiRouterPath);
    const ast = recast.parse(text);

    let lastImportLine = 0;
    let lastApiRouterine = 0;

    for (let i = 0; i < ast.program.body.length; i += 1) {
      const item = ast.program.body[i];
      if (item.type === 'ImportDeclaration') { lastImportLine = i; }
      if (item.type === 'ExpressionStatement') { lastApiRouterine = i; }
    }


    const importItem = recast.parse(`import ${module}Router from '../${table}/${table}.routes'`);
    ast.program.body.splice(lastImportLine + 1, 0, importItem.program.body[0]);

    const routerItem = recast.parse(`apiRouter.use('/${table}', ${module}Router)`);
    ast.program.body.splice(lastApiRouterine + 2, 0, routerItem.program.body[0]);

    const output = recast.prettyPrint(ast, { tabWidth: 2 }).code;

    this.fs.write(apiRouterPath, output.replace(/"/g, "'"));
  }
};
