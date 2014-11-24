
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

describe('Users list screen', function () {

  it ('should list all users', function () {

    expect(element(by.css('.sidebar-menu a[href="/users"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/users"]')).click();

    element.all(by.repeater('user in users | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(103);
        expect(arr[0].evaluate('user.username')).toBe('unknown');
        expect(arr[0].evaluate('user.firstName')).toBe('Unknown');
        expect(arr[0].evaluate('user.lastName')).toBe('Unknown');
        expect(arr[0].evaluate('user.status')).toBe('active');
        expect(element(by.css('.table.table-hover a[href="/users/1"]')).isPresent()).toBe(true);

        expect(arr[1].evaluate('user.username')).toBe('fernald.schimmel');
        expect(arr[1].evaluate('user.firstName')).toBe('Fernald');
        expect(arr[1].evaluate('user.lastName')).toBe('Schimmel');
        expect(arr[1].evaluate('user.status')).toBe('active');
        expect(element(by.css('.table.table-hover a[href="/users/2"]')).isPresent()).toBe(true);

        expect(arr[2].evaluate('user.username')).toBe('dalla.lehmbeck');
        expect(arr[2].evaluate('user.firstName')).toBe('Dalla');
        expect(arr[2].evaluate('user.lastName')).toBe('Lehmbeck');
        expect(arr[2].evaluate('user.status')).toBe('active');
        expect(element(by.css('.table.table-hover a[href="/users/3"]')).isPresent()).toBe(true);
      });
  });

  it ('should provide search utility', function () {

    expect(element(by.model('search.username')).isPresent()).toBe(true);

    // -------------------------------------------------------------

    element(by.model('search.username')).sendKeys('Ad');

    element.all(by.repeater('user in users | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(4);

        expect(arr[0].evaluate('user.username')).toBe('mina.hernadi');
        expect(arr[1].evaluate('user.username')).toBe('horgan.madore');
        expect(arr[2].evaluate('user.username')).toBe('adrian.chestnut');
        expect(arr[3].evaluate('user.username')).toBe('admin');
      });

    // -------------------------------------------------------------

    element(by.model('search.username')).clear();
    element(by.model('search.username')).sendKeys('X');

    element.all(by.repeater('user in users | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);
        expect(arr[0].evaluate('user.username')).toBe('coxson.streiff');
      });

    // -------------------------------------------------------------

    element(by.model('search.username')).clear();
    element(by.model('search.username')).sendKeys('NonExisting');

    element.all(by.repeater('user in users | filter:search'))
      .then(function(arr) {
        expect(arr.length).toBe(0);
      });
  });
});
