/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var path = require('path');

describe('Lane overview screen', function () {

  it ('should open edit modal after clicking edit lane button', function () {

    expect(element(by.css('.sidebar-menu a[href="/projects"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/projects"]')).click();

    // just in case if previous tests didn't clear the search
    element(by.model('search.name')).clear();

    expect(element(by.css('.table.table-hover a[href="/projects/2"]')).isPresent()).toBe(true);
    element(by.css('.table.table-hover a[href="/projects/2"]')).click();

    // just in case if previous tests didn't clear the search
    element(by.model('search.name')).clear();

    expect(element(by.css('.table.table-hover a[href="/projects/2/boards/7"]')).isPresent()).toBe(true);
    element(by.css('.table.table-hover a[href="/projects/2/boards/7"]')).click();

    element(by.css('#lane-24 img.edit-button')).click();

    expect(element(by.css('.modal-dialog')).isPresent()).toBe(true);
    expect(element(by.css('.modal-dialog h4')).getText()).toBe('Edit Lane');
  });

  it ('should contain all lane model fields', function () {

    expect(element(by.model('modalLane.name')).getAttribute('value')).toBe('newLan\'e');
    expect(element(by.model('modalLane.description')).getAttribute('value')).toBe('Some long description of new lane');
    expect(element(by.model('modalLane.status')).getAttribute('value')).toBe('pending');
  });

  it ('should allow to edit lane', function () {

    element(by.model('modalLane.name')).clear();
    element(by.model('modalLane.name')).sendKeys('updated \'Lane');

    element(by.model('modalLane.description')).clear();
    element(by.model('modalLane.description')).sendKeys('Some UPDATED long description of new lane');

    element(by.model('modalLane.status')).sendKeys('inactive');

    element(by.css('#updateLaneButton')).click();

    element.all(by.repeater('lane in lanes track by lane.id'))
      .then(function(arr) {

        expect(arr.length).toBe(5);

        expect(arr[0].evaluate('lane.name')).toBe('Must');
        expect(arr[0].evaluate('lane.description')).toBe('Must be done in next sprint');
        expect(arr[0].evaluate('lane.status')).toBe('active');

        expect(arr[1].evaluate('lane.name')).toBe('Should');
        expect(arr[1].evaluate('lane.description')).toBe('Should be done in next sprint');
        expect(arr[1].evaluate('lane.status')).toBe('active');

        expect(arr[2].evaluate('lane.name')).toBe('Could');
        expect(arr[2].evaluate('lane.description')).toBe('Could be done in next sprint');
        expect(arr[2].evaluate('lane.status')).toBe('active');

        expect(arr[3].evaluate('lane.name')).toBe('Won\'t');
        expect(arr[3].evaluate('lane.description')).toBe('Won\'t be done in next sprint');
        expect(arr[3].evaluate('lane.status')).toBe('active');

        expect(arr[4].evaluate('lane.name')).toBe('updated \'Lane');
        expect(arr[4].evaluate('lane.description')).toBe('Some UPDATED long description of new lane');
        expect(arr[4].evaluate('lane.status')).toBe('inactive');
      });
  });
});
