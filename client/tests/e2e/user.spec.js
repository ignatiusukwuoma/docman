import faker from 'faker';
import config from './config';

const name = faker.name.findName();
const editedName = faker.name.findName();
const email = faker.internet.email();
const username = faker.internet.userName().toLowerCase();
const password = faker.internet.password();

export default {
  'Invalid signup': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .setValue('input[name=name]', name)
      .setValue('input[name=email]', email)
      .setValue('input[name=username]', 'wonderwoman')
      .setValue('input[name=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .click('#sign-up-button')
      .waitForElementVisible('.toast-error', '.toast-message')
      .assert.containsText('.toast-message', 'Username already exist')
      .assert.urlEquals('http://localhost:8000/')
      .end(),

  'User signup': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .setValue('input[name=name]', name)
      .setValue('input[name=email]', email)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .click('#sign-up-button')
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.urlContains('/home')
      .assert.containsText('.toast-message', 'You have signed up successfully')
      .end(),

  'Invalid login': (browser) =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('a[href="#sign-in"]')
      .waitForElementVisible('#signin-form')
      .setValue('Input[id=signin-username]', 'scam')
      .setValue('Input[id=signin-password]', 'password')
      .click('#sign-in-button')
      .waitForElementVisible('.toast-error', '.toast-message')
      .assert.containsText('.toast-message', 'User not found')
      .assert.urlEquals('http://localhost:8000/')
      .end(),

  'User login': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('a[href="#sign-in"]')
      .waitForElementVisible('#signin-form')
      .setValue('Input[id=signin-username]', 'wonderwoman')
      .setValue('Input[id=signin-password]', 'password')
      .click('#sign-in-button')
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.urlContains('/home')
      .assert.containsText('.toast-message', 'You are successfully logged in')
      .end(),

  "SuperAdmin can upgrade a user's role'": browser =>
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
      .click('a[href="/manageusers"]')
      .pause(500)
      .assert.containsText('.users-page h3', 'Users')
      .click('a[href="/user/3"]')
      .waitForElementVisible('.edit-profile-button')
      .click('.edit-profile-button')
      .waitForElementVisible('input.select-dropdown')
      .click('input.select-dropdown')
      .click('ul.select-dropdown li:nth-child(2)')
      .pause(500)
      .click('#sign-up-button')
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.containsText('.toast-message', 'Profile updated successfully')
      .end(),

  'A user can update his/her details': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('a[href="#sign-in"]')
      .waitForElementVisible('#signin-form')
      .setValue('Input[id=signin-username]', username)
      .setValue('Input[id=signin-password]', password)
      .click('#sign-in-button')
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.urlContains('/home')
      .assert.containsText('.toast-message', 'You are successfully logged in')
      .pause(500)
      .click('a#profile-page')
      .waitForElementVisible('.edit-profile-button')
      .click('.edit-profile-button')
      .waitForElementVisible('Input[id=signup-name]')
      .assert.value('input[id=signup-name]', name)
      .clearValue('input[id=signup-name]')
      .setValue('input[id=signup-name]', editedName)
      .click('#sign-up-button')
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.containsText('.toast-message', 'Profile updated successfully')
      .end(),

  'Search for a user': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('a[href="#sign-in"]')
      .waitForElementVisible('#signin-form')
      .setValue('Input[id=signin-username]', 'wonderwoman')
      .setValue('Input[id=signin-password]', 'password')
      .click('#sign-in-button')
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.urlContains('/home')
      .assert.containsText('.toast-message', 'You are successfully logged in')
      .click('a[href="/manageusers"]')
      .pause(500)
      .assert.containsText('.users-page h3', 'Users')
      .setValue('input#search-bar', 'batman')
      .keys(browser.Keys.ENTER)
      .pause(500)
      .assert.containsText('table td:nth-child(4)', 'batman')
      .end()
};
