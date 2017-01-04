let stringUtil = require('ember-cli-string-utils');
let path = require('path');
let inflector = require('inflection');
let SilentError = require('silent-error');

module.exports = {
  description: 'Generates an import wrapper.',
  beforeInstall(options) {
    if (options.originBlueprintName === 'addon-import') {
      throw new SilentError('You cannot call the addon-import blueprint directly.');
    }
  },

  fileMapTokens() {
    return {
      __name__(options) {
        if (options.pod && options.hasPathToken) {
          return options.locals.blueprintName;
        }
        return options.dasherizedModuleName;
      },
      __path__(options) {
        if (options.pod && options.hasPathToken) {
          return path.join(options.podPath, options.dasherizedModuleName);
        }
        return inflector.pluralize(options.locals.blueprintName);
      },
      __root__(options) {
        if (options.inRepoAddon) {
          return path.join('lib', options.inRepoAddon, 'app');
        }
        return 'app';
      },
    };
  },
  locals(options) {
    let addonRawName = options.inRepoAddon ? options.inRepoAddon : options.project.name();
    let addonName = stringUtil.dasherize(addonRawName);
    let fileName = stringUtil.dasherize(options.entity.name);
    let blueprintName = options.originBlueprintName;
    let modulePathSegments = [addonName, inflector.pluralize(options.originBlueprintName), fileName];

    if (blueprintName.match(/-addon/)) {
      blueprintName = blueprintName.substr(0, blueprintName.indexOf('-addon'));
      modulePathSegments = [addonName, inflector.pluralize(blueprintName), fileName];
    }

    if (options.pod) {
      modulePathSegments = [addonName, fileName, blueprintName];
    }

    return {
      modulePath: modulePathSegments.join('/'),
      blueprintName,
    };
  },
};
