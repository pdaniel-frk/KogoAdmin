/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var path = require('path');

describe('Boards overview screen', function () {

  it ('should open delete modal after clicking delete board button', function () {

    expect(element(by.css('.sidebar-menu a[href="/projects"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/projects"]')).click();

    // just in case if previous tests didn't clear the search
    element(by.model('search.name')).clear();

    expect(element(by.css('.table.table-hover a[href="/projects/2"]')).isPresent()).toBe(true);
    element(by.css('.table.table-hover a[href="/projects/2"]')).click();

    element(by.model('search.name')).clear();
    element(by.model('search.name')).sendKeys('Over');

    element.all(by.repeater('board in boards | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('board.name')).toBe('Overview');
        expect(arr[0].evaluate('board.description')).toBe('Management team\'s overview board');
        expect(arr[0].evaluate('board.status')).toBe('active');
      });

    element(by.css('.button.delete')).click();

    expect(element(by.css('.modal-dialog')).isPresent()).toBe(true);
    expect(element(by.css('.modal-dialog h4')).getText()).toBe('Delete Board');
  });

  it ('should contain nicely formatted message', function () {
    expect(element(by.css('.modal-body')).getText())
      .toBe('Are you sure that you want to delete(disable) board "Overview"?')
  });

  it ('should display updated board in boards list', function () {

    element(by.css('#deleteBoardButton')).click();

    element.all(by.repeater('board in boards | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('board.name')).toBe('Overview');
        expect(arr[0].evaluate('board.description')).toBe('Management team\'s overview board');
        expect(arr[0].evaluate('board.status')).toBe('deleted');
      });
  });
});
