import { browser, element, by } from 'protractor';

export class AngularModelPatternExamplePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ampe-root h1')).getText();
  }
}
