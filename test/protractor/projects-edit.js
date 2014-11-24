/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var path = require('path');

describe('Projects overview screen', function () {

  it ('should open edit modal after clicking edit project button', function () {

    expect(element(by.css('.sidebar-menu a[href="/projects"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/projects"]')).click();

    element(by.model('search.name')).clear();
    element(by.model('search.name')).sendKeys('newProject');

    element.all(by.repeater('project in projects | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('project.name')).toBe('newProject');
        expect(arr[0].evaluate('project.code')).toBe('NEWPRO');
        expect(arr[0].evaluate('project.description')).toBe('Some long description of new project');
        expect(arr[0].evaluate('project.status')).toBe('pending');
      });

    element(by.css('.button.edit')).click();

    expect(element(by.css('.modal-dialog')).isPresent()).toBe(true);
    expect(element(by.css('.modal-dialog h4')).getText()).toBe('Edit Project');
  });

  it ('should contain all project model fields', function () {

    expect(element(by.model('modalProject.name')).getAttribute('value')).toBe('newProject');
    expect(element(by.model('modalProject.code')).getAttribute('value')).toBe('NEWPRO');
    expect(element(by.model('modalProject.description')).getAttribute('value')).toBe('Some long description of new project');
    expect(element(by.model('modalProject.status')).getAttribute('value')).toBe('pending');
  });

  it ('should allow to edit project', function () {

    element(by.model('modalProject.name')).clear();
    element(by.model('modalProject.name')).sendKeys('updatedProject');

    element(by.model('modalProject.code')).clear();
    element(by.model('modalProject.code')).sendKeys('UPPRO');

    element(by.model('modalProject.description')).clear();
    element(by.model('modalProject.description')).sendKeys('Some UPDATED long description of new project');

    element(by.model('modalProject.status')).sendKeys('active');

    element(by.css('#updateProjectButton')).click();

    element(by.model('search.name')).clear();
    element(by.model('search.name')).sendKeys('updatedProject');

    element.all(by.repeater('project in projects | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('project.name')).toBe('updatedProject');
        expect(arr[0].evaluate('project.code')).toBe('UPPRO');
        expect(arr[0].evaluate('project.description')).toBe('Some UPDATED long description of new project');
        expect(arr[0].evaluate('project.status')).toBe('active');
      });
  });
});
