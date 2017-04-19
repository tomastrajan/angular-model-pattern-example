import { AngularModelPatternExamplePage } from './app.po';

describe('angular-model-pattern-example App', () => {
  let page: AngularModelPatternExamplePage;

  beforeEach(() => {
    page = new AngularModelPatternExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Angular Model Pattern');
  });
});
