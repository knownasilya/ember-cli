'use strict';

var assert = require('assert');
var rimraf = require('rimraf');
var fs = require('fs-extra');
var mkdirSync = fs.mkdirSync;
var command = require('../../../lib/commands/new');

describe('new command', function() {
  var root;

  beforeEach(function() {
    root = process.cwd();
    mkdirSync('tmp');
    process.chdir('./tmp');
  });

  afterEach(function() {
    process.chdir(root);
    rimraf.sync('tmp');
  });

  it('app-name not specified should error', function() {
    assert.throws(command.run, /requires an app-name to be specified/, 'expects app-name');
  });

  it('folder already exists throws error', function() {
    assert.doesNotThrow(command.run('my-new-app'), 'valid name runs with no problems');
    assert.throws(command.run('my-new-app'), /'my-new-app' already exists/, 'throws error if folder exists');
  });
});
