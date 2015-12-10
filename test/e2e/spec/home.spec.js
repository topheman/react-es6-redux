describe('Home page', () => {
  // before each 'it' of the following describe:
  beforeEach(() => {
    // go to page (if not yet)
    goToUrl('/#/');
  });
  it('should have a correct title', () => {
    expect(browser.getTitle()).toEqual('Topheman - react-es6-redux');
  });
});
