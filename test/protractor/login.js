
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var fs = require('fs');

ROOT_PATH = fs.realpathSync(__dirname + '/../../');

describe('KogoAdmin login screen', function () {

  browser.driver.manage().window().maximize();

  it('should have proper page title', function () {

    browser.get('http://kogo-admin.local');

    expect(browser.getTitle()).toEqual('KogoAdmin | Log in');
  });

  it ('should contain login form', function () {

    expect(element(by.model('form.username')).isPresent()).toBe(true);
    expect(element(by.model('form.password')).isPresent()).toBe(true);
    expect(element(by.css('form .footer button')).isPresent()).toBe(true);

    // error message shouldn't be there
    expect(element(by.css('form .alert')).isDisplayed()).toBe(false);
  });

  it ('shouldn\'t allow to login with incorrect details', function () {

    element(by.model('form.username')).sendKeys('incorrect');
    element(by.model('form.password')).sendKeys('incorrect');
    element(by.css('form .footer button')).click();

    expect(browser.getTitle()).toEqual('KogoAdmin | Log in');

    // error message should be displayed
    expect(element(by.css('form .alert')).isPresent()).toBe(true);
  });

  it ('should allow to login with correct details', function () {

    element(by.model('form.username')).clear();
    element(by.model('form.password')).clear();

    element(by.model('form.username')).sendKeys('admin');
    element(by.model('form.password')).sendKeys('admin');
    element(by.css('form .footer button')).click();

    expect(browser.getTitle()).toEqual('KogoAdmin | Dashboard');
  });
});
