'use strict';

let expect = require('chai').expect;
let Command = require('../../lib/models/command');
let MockUI = require('console-ui/mock');
let MockProject = require('../helpers/mock-project');
let command;
let called = false;

beforeEach(function() {
  let analytics = {
    track() {
      called = true;
    },
  };

  let FakeCommand = Command.extend({
    name: 'fake-command',
    run() {},
  });

  let project = new MockProject();
  project.isEmberCLIProject = function() { return true; };

  command = new FakeCommand({
    ui: new MockUI(),
    analytics,
    project,
  });
});

afterEach(function() {
  command = null;
});

describe('analytics', function() {
  it('track gets invoked on command.validateAndRun()', function() {
    return command.validateAndRun([]).then(function() {
      expect(called, 'expected analytics.track to be called').to.be.true;
    });
  });
});
