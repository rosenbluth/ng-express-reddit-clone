describe('the ng reddit clone', function() {
  beforeEach(function(){
    browser.get('http://127.0.0.1:8000');
  });

  it('should add a new post', function() {

    element.all(by.repeater("post in posts")).then(function(initPosts){

      var startingLength = initPosts.length;

      element(by.css('[ng-click="view.showPostForm = !view.showPostForm"]')).click()

      var titleProm = element(by.model('view.title')).sendKeys('The Mojave Desert');
      var authorProm = element(by.model('view.author')).sendKeys('Dracula');
      var imgURLProm = element(by.model('view.imageURL')).sendKeys('https://pixabay.com/static/uploads/photo/2013/08/15/12/44/mojave-172769_960_720.jpg');
      var descriptionProm = element(by.model('view.description')).sendKeys('A very dry place.');

      return Promise.all([titleProm, authorProm, imgURLProm, descriptionProm]).then(function(){

        element(by.css('[type="submit"]')).click();

        return element.all(by.repeater("post in posts")).then(function(endPosts){
          expect(endPosts[startingLength]).not.toBeUndefined();

        });
      });
    });
  });

  it('should filter based on search results', function() {
    element(by.model('view.searchQuery')).sendKeys('Mojave').then(function() {
      return element.all(by.repeater("post in posts")).then(function(posts) {
        expect(posts.length).toEqual(1);
      });
    });
  });

  it('should add a vote to a post when upvote is clicked', function() {
    element.all(by.buttonText('up')).then(function(buttons){
      buttons[1].click();
      return element.all(by.binding('post.votes')).then(function(elements) {
        expect(elements[1].getText()).toBe('4');
      });
    });
  });

  it('should subtract a vote from a post when downvote is clicked', function() {
    element.all(by.buttonText('down')).then(function(buttons){
      buttons[1].click();
      return element.all(by.binding('post.votes')).then(function(elements) {
        expect(elements[1].getText()).toBe('2');
      });
    });
  });

  it('should have an option to view the comments', function() {
    element.all(by.buttonText('comments')).then(function(buttons){
      buttons[0].click();
      return element.all(by.binding('post.comments')).then(function(elements) {
        expect(elements[1].getText()).toBe('2');
      });
    });
  });

});
