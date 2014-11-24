
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'login.js',

    'users-filter.js',
    'users-create.js',
    'users-edit.js',
    'users-delete.js',

    'projects-filter.js',
    'projects-create.js',
    'projects-edit.js',
    'projects-delete.js',

    'boards-filter.js',
    'boards-create.js',
    'boards-edit.js',
    'boards-delete.js',

    'lanes-create.js',
    'lanes-edit.js',
    'lanes-delete.js',

  ],
  capabilities : {
    browserName : 'chrome',
    'chromeOptions': {
        args: ['--test-type']
    }
  }
};
