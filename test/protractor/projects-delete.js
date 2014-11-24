/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var path = require('path');

describe('Projects overview screen', function () {

  it ('should open delete modal after clicking delete project button', function () {

    expect(element(by.css('.sidebar-menu a[href="/projects"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/projects"]')).click();

    element(by.model('search.name')).clear();
    element(by.model('search.name')).sendKeys('Gal');

    element.all(by.repeater('project in projects | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('project.name')).toBe('Galaxy');
        expect(arr[0].evaluate('project.code')).toBe('GAL');
        expect(arr[0].evaluate('project.description')).toBe('Galaxy is a massive project ...');
        expect(arr[0].evaluate('project.status')).toBe('active');
      });

    element(by.css('.button.delete')).click();

    expect(element(by.css('.modal-dialog')).isPresent()).toBe(true);
    expect(element(by.css('.modal-dialog h4')).getText()).toBe('Delete Project');
  });

  it ('should contain nicely formatted message', function () {
    expect(element(by.css('.modal-body')).getText())
      .toBe('Are you sure that you want to delete(disable) project "Galaxy"?')
  });

  it ('should updated project in project list', function () {

    element(by.css('#deleteProjectButton')).click();

    element.all(by.repeater('project in projects | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('project.name')).toBe('Galaxy');
        expect(arr[0].evaluate('project.code')).toBe('GAL');
        expect(arr[0].evaluate('project.description')).toBe('Galaxy is a massive project ...');
        expect(arr[0].evaluate('project.status')).toBe('deleted');
      });
  });
});
