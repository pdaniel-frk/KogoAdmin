
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

describe('Boards list screen', function () {

  it ('should list all boards', function () {

    expect(element(by.css('.sidebar-menu a[href="/projects"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/projects"]')).click();

    // just in case if previous tests didn't clear the search
    element(by.model('search.name')).clear();

    expect(element(by.css('.table.table-hover a[href="/projects/1"]')).isPresent()).toBe(true);
    element(by.css('.table.table-hover a[href="/projects/1"]')).click();

    element.all(by.repeater('board in boards | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(3);
        expect(arr[0].evaluate('board.name')).toBe('Frontend');
        expect(arr[0].evaluate('board.status')).toBe('active');
        expect(element(by.css('.table.table-hover a[href="/projects/1/boards/1"]')).isPresent()).toBe(true);

        expect(arr[1].evaluate('board.name')).toBe('API');
        expect(arr[1].evaluate('board.status')).toBe('active');
        expect(element(by.css('.table.table-hover a[href="/projects/1/boards/2"]')).isPresent()).toBe(true);

        expect(arr[2].evaluate('board.name')).toBe('Backlog');
        expect(arr[2].evaluate('board.status')).toBe('active');
        expect(element(by.css('.table.table-hover a[href="/projects/1/boards/3"]')).isPresent()).toBe(true);
      });
  });

  it ('should provide search utility', function () {

    expect(element(by.model('search.name')).isPresent()).toBe(true);

    // -------------------------------------------------------------

    element(by.model('search.name')).sendKeys('Front');

    element.all(by.repeater('board in boards | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);
        expect(arr[0].evaluate('board.name')).toBe('Frontend');
        expect(element(by.css('.table.table-hover a[href="/projects/1/boards/1"]')).isPresent()).toBe(true);
        expect(element(by.css('.table.table-hover a[href="/projects/1/boards/2"]')).isPresent()).toBe(false);
        expect(element(by.css('.table.table-hover a[href="/projects/1/boards/3"]')).isPresent()).toBe(false);
      });

    // -------------------------------------------------------------

    element(by.model('search.name')).clear();
    element(by.model('search.name')).sendKeys('AP');

    element.all(by.repeater('board in boards | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);
        expect(arr[0].evaluate('board.name')).toBe('API');
        expect(element(by.css('.table.table-hover a[href="/projects/1/boards/1"]')).isPresent()).toBe(false);
        expect(element(by.css('.table.table-hover a[href="/projects/1/boards/2"]')).isPresent()).toBe(true);
        expect(element(by.css('.table.table-hover a[href="/projects/1/boards/3"]')).isPresent()).toBe(false);
      });

    // -------------------------------------------------------------

    element(by.model('search.name')).clear();
    element(by.model('search.name')).sendKeys('NonExisting');

    element.all(by.repeater('board in boards | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(0);
        expect(element(by.css('.table.table-hover a[href="/projects/1/boards/1"]')).isPresent()).toBe(false);
        expect(element(by.css('.table.table-hover a[href="/projects/1/boards/2"]')).isPresent()).toBe(false);
        expect(element(by.css('.table.table-hover a[href="/projects/1/boards/3"]')).isPresent()).toBe(false);
      });
  });
});
