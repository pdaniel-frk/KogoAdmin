/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var path = require('path');

describe('Users overview screen', function () {

  it ('should open edit modal after clicking edit user button', function () {

    expect(element(by.css('.sidebar-menu a[href="/users"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/users"]')).click();

    element(by.model('search.username')).clear();
    element(by.model('search.username')).sendKeys('newUser');

    element.all(by.repeater('user in users | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('user.username')).toBe('newUser');
        expect(arr[0].evaluate('user.firstName')).toBe('newUserFirstName');
        expect(arr[0].evaluate('user.lastName')).toBe('newUserLasto\'Name');
        expect(arr[0].evaluate('user.status')).toBe('active');
      });

    element(by.css('.button.edit')).click();

    expect(element(by.css('.modal-dialog')).isPresent()).toBe(true);
    expect(element(by.css('.modal-dialog h4')).getText()).toBe('Edit User');
  });

  it ('should contain all user model fields', function () {

    expect(element(by.model('modalUser.username')).isPresent()).toBe(true);

    expect(element(by.model('modalUser.username')).getAttribute('value')).toBe('newUser');
    expect(element(by.model('modalUser.password')).getAttribute('text')).toBe(null);
    expect(element(by.model('modalUser.email')).getAttribute('value')).toBe('newUser@hedonsoftware.com');
    expect(element(by.model('modalUser.firstName')).getAttribute('value')).toBe('newUserFirstName');
    expect(element(by.model('modalUser.middleName')).getAttribute('value')).toBe('newUserMiddleName');
    expect(element(by.model('modalUser.lastName')).getAttribute('value')).toBe('newUserLasto\'Name');
    expect(element(by.model('modalUser.roleId')).getAttribute('value')).toBe('3');
    expect(element(by.model('modalUser.status')).getAttribute('value')).toBe('active');
    expect(element(by.model('modalUser.avatar')).getAttribute('value')).toBe('');
  });

  it ('should allow to edit user', function () {

    element(by.model('modalUser.username')).clear();
    element(by.model('modalUser.username')).sendKeys('updatedUser');

    element(by.model('modalUser.email')).clear();
    element(by.model('modalUser.email')).sendKeys('updatedUser@hedonsoftware.com');

    element(by.model('modalUser.firstName')).clear();
    element(by.model('modalUser.firstName')).sendKeys('updatedUserFirstName');

    element(by.model('modalUser.middleName')).clear();
    element(by.model('modalUser.middleName')).sendKeys('updatedUserMiddleName');

    element(by.model('modalUser.lastName')).clear();
    element(by.model('modalUser.lastName')).sendKeys('updatedUserLasto\'Name');

    element(by.model('modalUser.roleId')).sendKeys('admin');

    element(by.model('modalUser.status')).sendKeys('pending');

    element(by.css('#updateUserButton')).click();

    element(by.model('search.username')).clear();
    element(by.model('search.username')).sendKeys('updatedUser');

    element.all(by.repeater('user in users | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('user.username')).toBe('updatedUser');
        expect(arr[0].evaluate('user.firstName')).toBe('updatedUserFirstName');
        expect(arr[0].evaluate('user.lastName')).toBe('updatedUserLasto\'Name');
        expect(arr[0].evaluate('user.status')).toBe('pending');
      });
  });

  it ('should display the same user details after clicking on username', function () {

    element(by.css('.info-link')).click();

    expect(element(by.css('.username')).getText()).toBe('updatedUser');
    expect(element(by.binding('user.email')).getText()).toBe('updatedUser@hedonsoftware.com');
    expect(element(by.binding('user.firstName')).getText()).toBe('updatedUserFirstName');
    expect(element(by.binding('user.middleName')).getText()).toBe('updatedUserMiddleName');
    expect(element(by.binding('user.lastName')).getText()).toBe('updatedUserLasto\'Name');
    expect(element(by.binding('user.status')).getText()).toBe('pending');
    expect(element(by.css('.avatar')).getAttribute('src')).not.toBe('');
  });
});
