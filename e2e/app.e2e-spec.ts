import { FriendsCastPage } from './app.po';

describe('friends-cast App', () => {
  let page: FriendsCastPage;

  beforeEach(() => {
    page = new FriendsCastPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
