
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

describe('Planning - projects/boards/sprints planning screen', function () {

  it ('should contain all models required by planning', function () {

    expect(element(by.css('.sidebar-menu a[href="/planning"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/planning"]')).click();

    expect(element(by.model('sourceProjectSelector')).isPresent()).toBe(true);
    expect(element(by.model('sourceBoardSelector')).isPresent()).toBe(true);
    expect(element(by.model('sourceSprintSelector')).isPresent()).toBe(true);

    expect(element(by.model('targetProjectSelector')).isPresent()).toBe(true);
    expect(element(by.model('targetBoardSelector')).isPresent()).toBe(true);
    expect(element(by.model('targetSprintSelector')).isPresent()).toBe(true);
  });

  it ('should list projects from source and target containing all projects', function () {

    element.all(by.repeater('project in projects'))
      .then(function(arr) {
        expect(arr.length).toBe(6);

        expect(arr[0].evaluate('project.name')).toBe('Universe');
        expect(arr[1].evaluate('project.name')).toBe('Galaxy');
        expect(arr[2].evaluate('project.name')).toBe('Atom');
      });
  });

  it ('should list boards from source and target project containing all boards', function () {

    // ------------- SOURCE ----------------

    element(by.model('sourceProjectSelector')).click().sendKeys('Universe');

    element.all(by.repeater('board in sourceBoardOptions'))
      .then(function(arr) {
        expect(arr.length).toBe(3);

        expect(arr[0].evaluate('board.name')).toBe('Frontend');
        expect(arr[1].evaluate('board.name')).toBe('API');
        expect(arr[2].evaluate('board.name')).toBe('Backlog');
      });

    element(by.model('sourceProjectSelector')).click().sendKeys('Galaxy');

    element.all(by.repeater('board in sourceBoardOptions'))
      .then(function(arr) {
        expect(arr.length).toBe(4);

        expect(arr[0].evaluate('board.name')).toBe('Design');
        expect(arr[1].evaluate('board.name')).toBe('Development');
        expect(arr[2].evaluate('board.name')).toBe('overview');
        expect(arr[3].evaluate('board.name')).toBe('Backlog');
      });

    element(by.model('sourceProjectSelector')).click().sendKeys('Atom');

    element.all(by.repeater('board in sourceBoardOptions'))
      .then(function(arr) {
        expect(arr.length).toBe(0);
      });

    // ------------- TARGET ----------------

    element(by.model('targetProjectSelector')).click().sendKeys('Universe');

    element.all(by.repeater('board in targetBoardOptions'))
      .then(function(arr) {
        expect(arr.length).toBe(3);

        expect(arr[0].evaluate('board.name')).toBe('Frontend');
        expect(arr[1].evaluate('board.name')).toBe('API');
        expect(arr[2].evaluate('board.name')).toBe('Backlog');
      });

    element(by.model('targetProjectSelector')).click().sendKeys('Galaxy');

    element.all(by.repeater('board in targetBoardOptions'))
      .then(function(arr) {
        expect(arr.length).toBe(4);

        expect(arr[0].evaluate('board.name')).toBe('Design');
        expect(arr[1].evaluate('board.name')).toBe('Development');
        expect(arr[2].evaluate('board.name')).toBe('overview');
        expect(arr[3].evaluate('board.name')).toBe('Backlog');
      });

    element(by.model('targetProjectSelector')).click().sendKeys('Atom');

    element.all(by.repeater('board in targetBoardOptions'))
      .then(function(arr) {
        expect(arr.length).toBe(0);
      });
  });

  it ('should list boards from source and target project/boards containing all sprints', function () {

    element(by.model('sourceProjectSelector')).click().sendKeys('Universe');
    element(by.model('sourceBoardSelector')).click().sendKeys('API');

    element.all(by.repeater('sprint in sourceSprintOptions'))
      .then(function(arr) {
        expect(arr.length).toBe(3);

        expect(arr[0].evaluate('sprint.name')).toBe('Sprint 1.0.0');
        expect(arr[1].evaluate('sprint.name')).toBe('Sprint 1.0.1');
        expect(arr[2].evaluate('sprint.name')).toBe('Test sprint');
      });
  });
});
