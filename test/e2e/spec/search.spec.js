describe('Github Search page', () => {
  // before each 'it' of the following describe:
  beforeEach(() => {
    // go to page (if not yet)
    goToUrl('/#/github');
  });
  it('should have a correct title', () => {
    expect(browser.getTitle()).toEqual('Topheman - react-es6-redux');
  });
  describe('Scenario - "original"', () => {
    it('should have the correct message when form untouched', () => {
      const text = element.all(by.css('form ~ p')).first().getText();
      expect(text).toEqual('Just search for a Github user or organization ... or access directly to my profile.');
    });
  });
  describe('Scenario - "No results"', () => {
    it('should output "No results" when searching for "other"', () => {
      const username = browser.findElement(by.id('user-name'));
      username.sendKeys('other', protractor.Key.ENTER).then(() => {
        const text = element.all(by.css('form ~ div')).first().getText();
        expect(text).toEqual('No results.');
      });
    });
  });
  describe('Scenario - "One result"', () => {
    beforeEach((done) => {
      const username = browser.findElement(by.id('user-name'));
      username.sendKeys('topheman', protractor.Key.ENTER).then(done);
    });
    it('should output only one result when searching for "topheman" - with correct header', () => {
      const resultHeader = element.all(by.css('form ~ div div.panel-heading')).first().getText();
      expect(resultHeader).toEqual('Total result : 1 / showing : 1');
    });
    it('should output only one result when searching for "topheman" - with correct body', () => {
      element.all(by.css('form ~ div div.list-group a')).getText().then((resultLine) => {
        expect(resultLine[0]).toEqual('topheman');
      });
    });
  });
  describe('Scenario - "Multiple results"', () => {
    beforeEach((done) => {
      const username = browser.findElement(by.id('user-name'));
      username.sendKeys('tophe', protractor.Key.ENTER).then(done);
    });
    it('should output multiple results when searching for "tophe" - with correct header', () => {
      const resultHeader = element.all(by.css('form ~ div div.panel-heading')).first().getText();
      expect(resultHeader).toEqual('Total results : 270 / showing : 30');
    });
    it('should output multiple results when searching for "tophe" - with correct body', () => {
      element.all(by.css('form ~ div div.list-group a')).getText().then((resultLine) => {
        expect(resultLine[0]).toEqual('tophe');
        expect(resultLine[3]).toEqual('topheman');
      });
    });
  });
  describe('Click on a result', () => {
    beforeEach((done) => {
      const username = browser.findElement(by.id('user-name'));
      username.sendKeys('topheman', protractor.Key.ENTER).then(done);
    });
    it('should redirect to profile page when clicking on list item', () => {
      browser.findElement(by.css('form ~ div div.list-group a')).click().then(() => {
        expect(browser.getCurrentUrl()).toMatch(/\/#\/github\/user\/topheman/);
      });
    });
  });
});
