import { ClientOFPage } from './app.po';

describe('client-of App', () => {
  let page: ClientOFPage;

  beforeEach(() => {
    page = new ClientOFPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
