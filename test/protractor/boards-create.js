/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var path = require('path');

describe('Boards overview screen', function () {

  it ('should contain create boards button', function () {

    expect(element(by.css('.sidebar-menu a[href="/projects"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/projects"]')).click();

    // just in case if previous tests didn't clear the search
    element(by.model('search.name')).clear();

    expect(element(by.css('.table.table-hover a[href="/projects/2"]')).isPresent()).toBe(true);
    element(by.css('.table.table-hover a[href="/projects/2"]')).click();

    expect(element(by.css('#showCreateBoardModalButton')).isPresent()).toBe(true);

    // just in case - clear filtering
    element(by.model('search.name')).clear();
  });

  it ('should open modal after clicking create board button', function () {

    element.all(by.repeater('board in boards | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(4);

        expect(arr[0].evaluate('board.name')).toBe('Design');
        expect(arr[0].evaluate('board.description')).toBe('Graphic design team\'s board');
        expect(arr[0].evaluate('board.status')).toBe('active');

        expect(arr[1].evaluate('board.name')).toBe('Development');
        expect(arr[1].evaluate('board.description')).toBe('Development team\'s board');
        expect(arr[1].evaluate('board.status')).toBe('active');

        expect(arr[2].evaluate('board.name')).toBe('Overview');
        expect(arr[2].evaluate('board.description')).toBe('Management team\'s overview board');
        expect(arr[2].evaluate('board.status')).toBe('active');

        expect(arr[3].evaluate('board.name')).toBe('Backlog');
        expect(arr[3].evaluate('board.description')).toBe('Ideas incubator');
        expect(arr[3].evaluate('board.status')).toBe('active');
      });

    element(by.css('#showCreateBoardModalButton')).click();
    expect(element(by.css('.modal-dialog')).isPresent()).toBe(true);
    expect(element(by.css('.modal-dialog h4')).getText()).toBe('Add Board');
  });

  it ('should contain all board model fields', function () {

    expect(element(by.model('modalBoard.name')).getAttribute('value')).toBe('');
    expect(element(by.model('modalBoard.description')).getAttribute('value')).toBe('');
    expect(element(by.model('modalBoard.status')).getAttribute('value')).toBe('active');
    expect(element(by.model('modalBoard.projectId')).getAttribute('value')).toBe('1');

  });

  it ('should allow to add board', function () {

    element(by.model('modalBoard.name')).sendKeys('newBoard');
    element(by.model('modalBoard.description')).sendKeys('Some long description of new board');
    element(by.model('modalBoard.status')).sendKeys('pending');

    element(by.css('#createBoardButton')).click();

    element.all(by.repeater('board in boards | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(5);

        expect(arr[0].evaluate('board.name')).toBe('Design');
        expect(arr[0].evaluate('board.description')).toBe('Graphic design team\'s board');
        expect(arr[0].evaluate('board.status')).toBe('active');

        expect(arr[1].evaluate('board.name')).toBe('Development');
        expect(arr[1].evaluate('board.description')).toBe('Development team\'s board');
        expect(arr[1].evaluate('board.status')).toBe('active');

        expect(arr[2].evaluate('board.name')).toBe('Overview');
        expect(arr[2].evaluate('board.description')).toBe('Management team\'s overview board');
        expect(arr[2].evaluate('board.status')).toBe('active');

        expect(arr[3].evaluate('board.name')).toBe('Backlog');
        expect(arr[3].evaluate('board.description')).toBe('Ideas incubator');
        expect(arr[3].evaluate('board.status')).toBe('active');

        expect(arr[4].evaluate('board.name')).toBe('newBoard');
        expect(arr[4].evaluate('board.description')).toBe('Some long description of new board');
        expect(arr[4].evaluate('board.status')).toBe('pending');
      });
  });
});
