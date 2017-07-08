import faker from 'faker';
import config from './config';
const documentTitle = faker.lorem.words();
const editedTitle = faker.lorem.words();


export default {
  'Create document': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('a[href="#sign-in"]')
      .waitForElementVisible('#signin-form')
      .setValue('Input[id=signin-username]', 'wonderwoman')
      .setValue('Input[id=signin-password]', 'password')
      .click('#sign-in-button')
      .waitForElementVisible('.home-page .headers h3')
      .assert.containsText('.home-page .headers h3', 'All Documents')
      .waitForElementVisible('a[href="/document/new"]')
      .click('a[href="/document/new"]')
      .waitForElementVisible('.mce-i-code')
      .setValue('Input[name=title]', documentTitle)
      .click('.mce-i-code')
      .setValue('.mce-textbox', faker.lorem.paragraphs())
      .click('.mce-floatpanel .mce-container-body button')
      .waitForElementVisible('input.select-dropdown')
      .click('input.select-dropdown')
      .click('ul.select-dropdown li:nth-child(2)')
      .waitForElementVisible('#create-document-button')
      .click('#create-document-button')
      .waitForElementVisible('.home-page .headers h3')
      .assert.containsText('.card .card-title', documentTitle)
      .end(),

  'Open document': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('a[href="#sign-in"]')
      .waitForElementVisible('#signin-form')
      .setValue('Input[id=signin-username]', 'wonderwoman')
      .setValue('Input[id=signin-password]', 'password')
      .click('#sign-in-button')
      .waitForElementVisible('.home-page .headers h3')
      .click('.read-link')
      .waitForElementVisible('.view-document')
      .assert.containsText('.view-document h4', documentTitle)
      .end(),

  'Search for a document': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('a[href="#sign-in"]')
      .waitForElementVisible('#signin-form')
      .setValue('Input[id=signin-username]', 'wonderwoman')
      .setValue('Input[id=signin-password]', 'password')
      .click('#sign-in-button')
      .waitForElementVisible('.headers .searchbar input#search-bar')
      .setValue('input#search-bar', documentTitle)
      .keys(browser.Keys.ENTER)
      .waitForElementVisible('.home-page .headers h3')
      .assert.containsText('span.card-title', documentTitle)
      .end(),

  'Edit document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('a[href="#sign-in"]')
      .waitForElementVisible('#signin-form')
      .setValue('Input[id=signin-username]', 'wonderwoman')
      .setValue('Input[id=signin-password]', 'password')
      .click('#sign-in-button')
      .waitForElementVisible('.home-page .headers h3')
      .click('.read-link')
      .waitForElementVisible('.view-document')
      .click('.btn-edit')
      .waitForElementVisible('.mce-i-code')
      .clearValue('Input[name=title]')
      .setValue('Input[name=title]', editedTitle)
      .click('#edit-document-button')
      .waitForElementVisible('.view-document');
    browser.expect.element('.view-document h4').text.to.equal(editedTitle);
    browser.expect.element('.view-document h6 #document-rights')
        .to.have.css('text-transform').which.equals('capitalize');
    browser.end();
  },

  'Delete document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('a[href="#sign-in"]')
      .waitForElementVisible('#signin-form')
      .setValue('Input[id=signin-username]', 'wonderwoman')
      .setValue('Input[id=signin-password]', 'password')
      .click('#sign-in-button')
      .waitForElementVisible('.home-page .headers h3')
      .click('.read-link')
      .waitForElementVisible('.view-document')
      .assert.containsText('.view-document h4', editedTitle)
      .click('.btn-delete')
      .pause(1000)
      .click('button.swal2-confirm')
      .pause(1000)
      .click('button.swal2-confirm')
      .waitForElementVisible('.home-page .headers h3');
    browser
      .expect.element('span.card-title').text.to.not.equal(editedTitle);
    browser.end();
  }
};
