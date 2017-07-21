import { AsyncIssuePage } from './app.po';

describe('async-issue App', () => {
  let page: AsyncIssuePage;

  beforeEach(() => {
    page = new AsyncIssuePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
