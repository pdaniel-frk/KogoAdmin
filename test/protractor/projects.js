
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

describe('Projects list screen', function () {

  it ('should list all projects', function () {

    expect(element(by.css('.sidebar-menu a[href="/projects"]')).isPresent()).toBe(true);

    element(by.css('.sidebar-menu a[href="/projects"]')).click();

    element.all(by.repeater('project in projects | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(3);
        expect(arr[0].evaluate('project.name')).toBe('Universe');
        expect(arr[0].evaluate('project.status')).toBe('active');
        expect(element(by.css('.table.table-hover a[href="/projects/1"]')).isPresent()).toBe(true);

        expect(arr[1].evaluate('project.name')).toBe('Galaxy');
        expect(arr[1].evaluate('project.status')).toBe('active');
        expect(element(by.css('.table.table-hover a[href="/projects/2"]')).isPresent()).toBe(true);

        expect(arr[2].evaluate('project.name')).toBe('Atom');
        expect(arr[2].evaluate('project.status')).toBe('active');
        expect(element(by.css('.table.table-hover a[href="/projects/3"]')).isPresent()).toBe(true);
      });
  });

  it ('should provide search utility', function () {

    expect(element(by.model('search.name')).isPresent()).toBe(true);

    // -------------------------------------------------------------

    element(by.model('search.name')).sendKeys('Uni');

    element.all(by.repeater('project in projects | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);
        expect(arr[0].evaluate('project.name')).toBe('Universe');
        expect(element(by.css('.table.table-hover a[href="/projects/1"]')).isPresent()).toBe(true);
        expect(element(by.css('.table.table-hover a[href="/projects/2"]')).isPresent()).toBe(false);
        expect(element(by.css('.table.table-hover a[href="/projects/3"]')).isPresent()).toBe(false);
      });

    // -------------------------------------------------------------

    element(by.model('search.name')).clear();
    element(by.model('search.name')).sendKeys('Gal');

    element.all(by.repeater('project in projects | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);
        expect(arr[0].evaluate('project.name')).toBe('Galaxy');
        expect(element(by.css('.table.table-hover a[href="/projects/1"]')).isPresent()).toBe(false);
        expect(element(by.css('.table.table-hover a[href="/projects/2"]')).isPresent()).toBe(true);
        expect(element(by.css('.table.table-hover a[href="/projects/3"]')).isPresent()).toBe(false);
      });

    // -------------------------------------------------------------

    element(by.model('search.name')).clear();
    element(by.model('search.name')).sendKeys('NonExisting');

    element.all(by.repeater('project in projects | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(0);
        expect(element(by.css('.table.table-hover a[href="/projects/1"]')).isPresent()).toBe(false);
        expect(element(by.css('.table.table-hover a[href="/projects/2"]')).isPresent()).toBe(false);
        expect(element(by.css('.table.table-hover a[href="/projects/3"]')).isPresent()).toBe(false);
      });

    element(by.model('search.name')).clear();
  });
});
