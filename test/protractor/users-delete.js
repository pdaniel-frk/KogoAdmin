/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var path = require('path');

describe('Users overview screen', function () {

  it ('should open delete modal after clicking delete user button', function () {

    expect(element(by.css('.sidebar-menu a[href="/users"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/users"]')).click();

    element(by.model('search.username')).clear();
    element(by.model('search.username')).sendKeys('Elia');

    element.all(by.repeater('user in users | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('user.username')).toBe('elia.levin');
        expect(arr[0].evaluate('user.firstName')).toBe('Elia');
        expect(arr[0].evaluate('user.lastName')).toBe('Levin');
        expect(arr[0].evaluate('user.status')).toBe('active');
      });

    element(by.css('.button.delete')).click();

    expect(element(by.css('.modal-dialog')).isPresent()).toBe(true);
    expect(element(by.css('.modal-dialog h4')).getText()).toBe('Delete User');
  });

  it ('should contain nicely formatted message', function () {
    expect(element(by.css('.modal-body')).getText())
      .toBe('Are you sure that you want to delete(disable) user "elia.levin"?')
  });

  it ('should updated user in users list', function () {

    element(by.css('#deleteUserButton')).click();

    element.all(by.repeater('user in users | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('user.username')).toBe('elia.levin');
        expect(arr[0].evaluate('user.firstName')).toBe('Elia');
        expect(arr[0].evaluate('user.lastName')).toBe('Levin');
        expect(arr[0].evaluate('user.status')).toBe('deleted');
      });
  });

  it ('should display the same user details after clicking on username', function () {

    element(by.css('.info-link')).click();

    expect(element(by.css('.username')).getText()).toBe('elia.levin');
    expect(element(by.binding('user.email')).getText()).toBe('elialevin@hedonsoftware.com');
    expect(element(by.binding('user.firstName')).getText()).toBe('Elia');
    expect(element(by.binding('user.middleName')).getText()).toBe('');
    expect(element(by.binding('user.lastName')).getText()).toBe('Levin');
    expect(element(by.binding('user.status')).getText()).toBe('deleted');
    expect(element(by.css('.avatar')).getAttribute('src')).not.toBe('');
  });
});
