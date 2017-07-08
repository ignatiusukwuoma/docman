import faker from 'faker';
import config from './config';

const newRole = faker.lorem.word();
const editedRole = faker.lorem.word();

export default {
  'Create role': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('a[href="#sign-in"]')
      .waitForElementVisible('#signin-form')
      .setValue('Input[id=signin-username]', 'superman')
      .setValue('Input[id=signin-password]', 'password')
      .click('#sign-in-button')
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.urlContains('/home')
      .assert.containsText('.toast-message', 'You are successfully logged in')
      .waitForElementNotPresent('.toast-message')
      .click('a[href="/manageroles"]')
      .waitForElementVisible('input#new-role')
      .setValue('input#new-role', newRole)
      .keys(browser.Keys.ENTER)
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.containsText('.toast-message', 'Role added successfully')
      .assert.containsText('table tr:last-child td:nth-child(2)', newRole)
      .end(),

  'Edit role': browser =>
    browser
      .resizeWindow(1280, 800)
      .url(config.url)
      .waitForElementVisible('body')
      .click('a[href="#sign-in"]')
      .waitForElementVisible('#signin-form')
      .setValue('Input[id=signin-username]', 'superman')
      .setValue('Input[id=signin-password]', 'password')
      .click('#sign-in-button')
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.urlContains('/home')
      .assert.containsText('.toast-message', 'You are successfully logged in')
      .click('a[href="/manageroles"]')
      .waitForElementVisible('table tr:last-child a:first-child')
      .click('table tr:last-child a:first-child .material-icons')
      .waitForElementVisible('.modal-content h3')
      .assert.containsText('.modal-content h3', 'Edit Role')
      .clearValue('input[id="update-role"]')
      .setValue('input[id="update-role"]', editedRole)
      .keys(browser.Keys.ENTER)
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.containsText('.toast-message', 'Role updated successfully')
      .assert.containsText('table tr:last-child td:nth-child(2)', editedRole)
      .end(),

  'Delete role': (browser) => {
    browser
      .resizeWindow(1280, 800)
      .url(config.url)
      .waitForElementVisible('body')
      .click('a[href="#sign-in"]')
      .waitForElementVisible('#signin-form')
      .setValue('Input[id=signin-username]', 'superman')
      .setValue('Input[id=signin-password]', 'password')
      .click('#sign-in-button')
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.urlContains('/home')
      .assert.containsText('.toast-message', 'You are successfully logged in')
      .click('a[href="/manageroles"]')
      .waitForElementVisible('table tr:last-child a:first-child')
      .assert.containsText('table tr:last-child td:nth-child(2)', editedRole)
      .click('table tr:last-child a:last-child .material-icons')
      .pause(1000)
      .click('button.swal2-confirm')
      .pause(1000)
      .click('button.swal2-confirm')
      .waitForElementVisible('table tr:last-child a:first-child');
    browser.expect.element('table tr:last-child td:nth-child(2)')
      .text.to.not.equal(editedRole);
    browser.end();
  }
};
