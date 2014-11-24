/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var path = require('path');

describe('Projects overview screen', function () {

  it ('should contain create project button', function () {

    expect(element(by.css('.sidebar-menu a[href="/projects"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/projects"]')).click();

    expect(element(by.css('#showCreateProjectModalButton')).isPresent()).toBe(true);

    // just in case - clear filtering
    element(by.model('search.name')).clear();
  });

  it ('should open modal after clicking create project button', function () {

    element.all(by.repeater('project in projects | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(3);

        expect(arr[0].evaluate('project.name')).toBe('Universe');
        expect(arr[0].evaluate('project.code')).toBe('UNI');
        expect(arr[0].evaluate('project.description')).toBe('Universe is project separated from Galaxy ...');
        expect(arr[0].evaluate('project.status')).toBe('active');

        expect(arr[1].evaluate('project.name')).toBe('Galaxy');
        expect(arr[1].evaluate('project.code')).toBe('GAL');
        expect(arr[1].evaluate('project.description')).toBe('Galaxy is a massive project ...');
        expect(arr[1].evaluate('project.status')).toBe('active');

        expect(arr[2].evaluate('project.name')).toBe('Atom');
        expect(arr[2].evaluate('project.code')).toBe('ATM');
        expect(arr[2].evaluate('project.description')).toBe('Atom is a chemical project ...');
        expect(arr[2].evaluate('project.status')).toBe('active');
      });

    element(by.css('#showCreateProjectModalButton')).click();
    expect(element(by.css('.modal-dialog')).isPresent()).toBe(true);
    expect(element(by.css('.modal-dialog h4')).getText()).toBe('Add Project');
  });

  it ('should contain all project model fields', function () {

    expect(element(by.model('modalProject.name')).getAttribute('value')).toBe('');
    expect(element(by.model('modalProject.code')).getAttribute('value')).toBe('');
    expect(element(by.model('modalProject.description')).getAttribute('value')).toBe('');
    expect(element(by.model('modalProject.status')).getAttribute('value')).toBe('active');
  });

  it ('should allow to add project', function () {

    element(by.model('modalProject.name')).sendKeys('newProject');
    element(by.model('modalProject.code')).sendKeys('NEWPRO');
    element(by.model('modalProject.description')).sendKeys('Some long description of new project');
    element(by.model('modalProject.status')).sendKeys('pending');

    element(by.css('#createProjectButton')).click();

    element.all(by.repeater('project in projects | filter:search'))
      .then(function(arr) {

        expect(arr.length).toBe(4);

        expect(arr[0].evaluate('project.name')).toBe('Universe');
        expect(arr[0].evaluate('project.code')).toBe('UNI');
        expect(arr[0].evaluate('project.description')).toBe('Universe is project separated from Galaxy ...');
        expect(arr[0].evaluate('project.status')).toBe('active');

        expect(arr[1].evaluate('project.name')).toBe('Galaxy');
        expect(arr[1].evaluate('project.code')).toBe('GAL');
        expect(arr[1].evaluate('project.description')).toBe('Galaxy is a massive project ...');
        expect(arr[1].evaluate('project.status')).toBe('active');

        expect(arr[2].evaluate('project.name')).toBe('Atom');
        expect(arr[2].evaluate('project.code')).toBe('ATM');
        expect(arr[2].evaluate('project.description')).toBe('Atom is a chemical project ...');
        expect(arr[2].evaluate('project.status')).toBe('active');

        expect(arr[3].evaluate('project.name')).toBe('newProject');
        expect(arr[3].evaluate('project.code')).toBe('NEWPRO');
        expect(arr[3].evaluate('project.description')).toBe('Some long description of new project');
        expect(arr[3].evaluate('project.status')).toBe('pending');
      });
  });
});
