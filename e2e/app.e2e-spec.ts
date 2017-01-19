import { AdbcdlivemoviePage } from './app.po';

describe('adbcdlivemovie App', function() {
  let page: AdbcdlivemoviePage;

  beforeEach(() => {
    page = new AdbcdlivemoviePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
