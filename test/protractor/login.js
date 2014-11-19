
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

describe('KogoAdmin login screen', function () {

  browser.driver.manage().window().maximize();

  it('should have proper page title', function () {

    browser.get('http://kogo-admin.local');

    expect(browser.getTitle()).toEqual('KogoAdmin | Log in');
  });

  it ('should contain login form', function () {

    expect(element(by.model('form.username')).isPresent()).toBe(true);
    expect(element(by.model('form.password')).isPresent()).toBe(true);
    expect(element(by.css('form button')).isPresent()).toBe(true);
  });

  it ('should allow to login with correct details', function () {

    element(by.model('form.username')).sendKeys('fernald.schimmel');
    element(by.model('form.password')).sendKeys('abc');
    element(by.css('form button')).click();

    expect(browser.getTitle()).toEqual('KogoAdmin | Dashboard');
  });

  // it ('shouldn\'t allow to login with incorrect details', function () {

  //   element(by.model('form.username')).sendKeys('incorrect');
  //   element(by.model('form.password')).sendKeys('incorrect');
  //   element(by.css('form button')).click();

  //   expect(browser.getTitle()).toEqual('Kogo | Log in');
  // });
});
