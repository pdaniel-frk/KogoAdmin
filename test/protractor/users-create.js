/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var path = require('path');

describe('Users overview screen', function () {

  it ('should contain create user button', function () {

    expect(element(by.css('.sidebar-menu a[href="/users"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/users"]')).click();

    expect(element(by.css('#showCreateUserModalButton')).isPresent()).toBe(true);

    // just in case - clear filtering
    element(by.model('search.username')).clear();
  });

  it ('should open modal after clicking create user button', function () {

    element(by.css('#showCreateUserModalButton')).click();
    expect(element(by.css('.modal-dialog')).isPresent()).toBe(true);
    expect(element(by.css('.modal-dialog h4')).getText()).toBe('Add User');
  });

  it ('should contain all user model fields', function () {

    expect(element(by.model('modalUser.username')).isPresent()).toBe(true);

    expect(element(by.model('modalUser.username')).getAttribute('value')).toBe('');
    expect(element(by.model('modalUser.password')).getAttribute('text')).toBe(null);
    expect(element(by.model('modalUser.email')).getAttribute('value')).toBe('');
    expect(element(by.model('modalUser.firstName')).getAttribute('value')).toBe('');
    expect(element(by.model('modalUser.middleName')).getAttribute('value')).toBe('');
    expect(element(by.model('modalUser.lastName')).getAttribute('value')).toBe('');
    expect(element(by.model('modalUser.roleId')).getAttribute('value')).toBe('3');
    expect(element(by.model('modalUser.status')).getAttribute('value')).toBe('active');
    expect(element(by.model('modalUser.avatar')).getAttribute('value')).toBe('');
  });

  it ('should allow to add user', function () {

    element(by.model('modalUser.username')).sendKeys('newUser');
    element(by.model('modalUser.password')).sendKeys('secretPassword');
    element(by.model('modalUser.email')).sendKeys('newUser@hedonsoftware.com');
    element(by.model('modalUser.firstName')).sendKeys('newUserFirstName');
    element(by.model('modalUser.middleName')).sendKeys('newUserMiddleName');
    element(by.model('modalUser.lastName')).sendKeys('newUserLasto\'Name');

    var relPath = '/public/images/avatars/15.png';
    var fileToUpload = ROOT_PATH + relPath;
    $('input[type="file"]').sendKeys(fileToUpload);

    element(by.css('#createUserButton')).click();

    element.all(by.repeater('user in users | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(104);

        expect(arr[103].evaluate('user.username')).toBe('newUser');
        expect(arr[103].evaluate('user.firstName')).toBe('newUserFirstName');
        expect(arr[103].evaluate('user.lastName')).toBe('newUserLasto\'Name');
        expect(arr[103].evaluate('user.status')).toBe('active');
      });
  });

  it ('should display the same user details after clicking on username', function () {

    element(by.model('search.username')).clear();
    element(by.model('search.username')).sendKeys('newUser');

    element(by.css('.info-link')).click();

    expect(element(by.css('.username')).getText()).toBe('newUser');
    expect(element(by.binding('user.email')).getText()).toBe('newUser@hedonsoftware.com');
    expect(element(by.binding('user.firstName')).getText()).toBe('newUserFirstName');
    expect(element(by.binding('user.middleName')).getText()).toBe('newUserMiddleName');
    expect(element(by.binding('user.lastName')).getText()).toBe('newUserLasto\'Name');
    expect(element(by.binding('user.status')).getText()).toBe('active');
    expect(element(by.css('.avatar')).getAttribute('src')).not.toBe('');
  });
});
