/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var path = require('path');

describe('Boards overview screen', function () {

  it ('should open edit modal after clicking edit board button', function () {

    expect(element(by.css('.sidebar-menu a[href="/projects"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/projects"]')).click();

    // just in case if previous tests didn't clear the search
    element(by.model('search.name')).clear();

    expect(element(by.css('.table.table-hover a[href="/projects/2"]')).isPresent()).toBe(true);
    element(by.css('.table.table-hover a[href="/projects/2"]')).click();

    element(by.model('search.name')).clear();
    element(by.model('search.name')).sendKeys('newBoard');

    element.all(by.repeater('board in boards | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('board.name')).toBe('newBoard');
        expect(arr[0].evaluate('board.description')).toBe('Some long description of new board');
        expect(arr[0].evaluate('board.status')).toBe('pending');
      });

    element(by.css('.button.edit')).click();

    expect(element(by.css('.modal-dialog')).isPresent()).toBe(true);
    expect(element(by.css('.modal-dialog h4')).getText()).toBe('Edit Board');
  });

  it ('should contain all board model fields', function () {

    expect(element(by.model('modalBoard.name')).getAttribute('value')).toBe('newBoard');
    expect(element(by.model('modalBoard.description')).getAttribute('value')).toBe('Some long description of new board');
    expect(element(by.model('modalBoard.status')).getAttribute('value')).toBe('pending');
    expect(element(by.model('modalBoard.projectId')).getAttribute('value')).toBe('1');
  });

  it ('should allow to edit board', function () {

    element(by.model('modalBoard.name')).clear();
    element(by.model('modalBoard.name')).sendKeys('updatedBoard');

    element(by.model('modalBoard.description')).clear();
    element(by.model('modalBoard.description')).sendKeys('Some UPDATED long description of new board');

    element(by.model('modalBoard.status')).sendKeys('inactive');

    element(by.css('#updateBoardButton')).click();

    element(by.model('search.name')).clear();
    element(by.model('search.name')).sendKeys('updatedBoard');

    element.all(by.repeater('board in boards | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('board.name')).toBe('updatedBoard');
        expect(arr[0].evaluate('board.description')).toBe('Some UPDATED long description of new board');
        expect(arr[0].evaluate('board.status')).toBe('inactive');
      });
  });

  it ('should remove board from list if project was changed', function () {

    element(by.model('search.name')).clear();
    element(by.model('search.name')).sendKeys('Development');

    element(by.css('.button.edit')).click();

    element(by.model('modalBoard.projectId')).sendKeys('Uni');

    element(by.css('#updateBoardButton')).click();

    element(by.model('search.name')).clear();

    element.all(by.repeater('board in boards | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(4);

        expect(arr[0].evaluate('board.name')).toBe('Design');
        expect(arr[0].evaluate('board.description')).toBe('Graphic design team\'s board');
        expect(arr[0].evaluate('board.status')).toBe('active');

        expect(arr[1].evaluate('board.name')).toBe('Overview');
        expect(arr[1].evaluate('board.description')).toBe('Management team\'s overview board');
        expect(arr[1].evaluate('board.status')).toBe('active');

        expect(arr[2].evaluate('board.name')).toBe('Backlog');
        expect(arr[2].evaluate('board.description')).toBe('Ideas incubator');
        expect(arr[2].evaluate('board.status')).toBe('active');

        expect(arr[3].evaluate('board.name')).toBe('updatedBoard');
        expect(arr[3].evaluate('board.description')).toBe('Some UPDATED long description of new board');
        expect(arr[3].evaluate('board.status')).toBe('inactive');
      });
  });
});
