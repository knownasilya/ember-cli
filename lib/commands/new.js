'use strict';

var fs = require('fs');
var ui = require('../ui');
var skeleton = require('../skeleton');
var stringUtil = require('../utilities/string');
var chalk = require('chalk');

module.exports.run = function run(rawName) {
  if (!rawName) {
    throw new Error(chalk.yellow('The `ember new` command requires an app-name to be specified.' +
                          ' For more details, use `ember help`.\n'));
  }

  var name = stringUtil.dasherize(rawName);

  try {
    fs.mkdirSync(name);
    process.chdir(name);
    ui.write(chalk.green('Created project directory: ' + name + '\n'));

    return skeleton.installInto(process.cwd(), name, false, false);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw new Error(chalk.red('Error: "' + err));
    } else {
      throw new Error(chalk.yellow('Directory \'' + name + '\' already exists'));
    }
  }
};

module.exports.usage = function usage() {
  return 'ember new ' + chalk.yellow('<app-name>');
};
