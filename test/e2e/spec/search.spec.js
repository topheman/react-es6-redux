describe('Github Search page', () => {
  // before each 'it' of the following describe:
  beforeEach(() => {
    // go to page (if not yet)
    goToUrl('#/github');
    // don't start test before the page is ready
    browser.driver.wait(() => {
      return browser.driver.isElementPresent(by.id('user-name'));
    }, 4000);
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
      const username = element(by.id('user-name'));
      username.click().then(() => {
        username.sendKeys('other', protractor.Key.ENTER).then(() => {
          const text = element.all(by.css('form ~ div')).first().getText();
          expect(text).toEqual('No results.');
        });
      });
    });
  });
  describe('Scenario - "One result"', () => {
    beforeEach(() => {
      const username = element(by.id('user-name'));
      username.click().then(() => {
        username.sendKeys('topheman', protractor.Key.ENTER).then(() => {
          expect(username.getAttribute('value')).toEqual('topheman');
          browser.driver.wait(() => {
            return browser.driver.isElementPresent(by.css('div.list-group'));
          }, 4000);
        });
      });
    });
    it('should output only one result when searching for "topheman" - with correct header', () => {
      const resultHeader = element.all(by.css('div.panel-heading')).first().getText();
      expect(resultHeader).toEqual('Total result : 1 / showing : 1');
    });
    it('should output only one result when searching for "topheman" - with correct body', () => {
      element.all(by.css('div.list-group a')).getText().then((resultLine) => {
        expect(resultLine[0]).toEqual('topheman');
      });
    });
  });
  describe('Scenario - "Multiple results"', () => {
    beforeEach(() => {
      const username = element(by.id('user-name'));
      username.click().then(() => {
        username.sendKeys('tophe', protractor.Key.ENTER).then(() => {
          expect(username.getAttribute('value')).toEqual('tophe');
          browser.driver.wait(() => {
            return browser.driver.isElementPresent(by.css('div.list-group'));
          }, 4000);
        });
      });
    });
    it('should output multiple results when searching for "tophe" - with correct header', () => {
      const resultHeader = element.all(by.css('div.panel-heading')).first().getText();
      expect(resultHeader).toEqual('Total results : 270 / showing : 30');
    });
    it('should output multiple results when searching for "tophe" - with correct body', () => {
      element.all(by.css('div.list-group a')).getText().then((resultLine) => {
        expect(resultLine[0]).toEqual('tophe');
        expect(resultLine[3]).toEqual('topheman');
      });
    });
  });
  describe('Click on a result', () => {
    beforeEach(() => {
      const username = element(by.id('user-name'));
      username.click().then(() => {
        username.sendKeys('topheman', protractor.Key.ENTER).then(() => {
          expect(username.getAttribute('value')).toEqual('topheman');
          browser.driver.wait(() => {
            return browser.driver.isElementPresent(by.css('div.list-group'));
          }, 4000);
        });
      });
    });
    it('should redirect to profile page when clicking on list item', () => {
      element(by.css('div.list-group a')).click().then(() => {
        expect(browser.getCurrentUrl()).toMatch(/\/#\/github\/user\/topheman/);
      });
    });
  });
});
