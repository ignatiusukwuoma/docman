import config from './config';

export default {
  'Go to home page': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .assert.title('Docman Pro')
      .end()
};
