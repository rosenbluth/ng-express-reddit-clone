var app = angular.module('reddit-clone', []);

app.controller('reddit', ['$scope', function($scope){
  $scope.view = {},
  $scope.view.showPostForm = false;
  $scope.view.maxImgHeight = "175px";
  $scope.view.maxImgWidth = "175px";
  $scope.view.commentAuthor = '';
  $scope.view.commentText = '';

  $scope.posts = [{
    title : "The Mojave Desert",
    author : "Dracula",
    imageURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVi8l_8kTtJWW4OC8ALS_flugQW6JFTRFglKPaHm2JTmEvuetFxA',
    description : 'A very dry place.',
    votes: 3,
    dateTime : new Date('October 27, 2016 03:24:00'),
    comments : [{
      author : 'Markula',
      text : 'Watch out for giant spiders.'
    }],
    commentShow : false,
    commenting : false,
  },{
    title : "Plandome Fire Dept.",
    author : "John Runge",
    imageURL : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Plandome_FD_long_red_line_jeh.jpg/1920px-Plandome_FD_long_red_line_jeh.jpg",
    description :  "Plandome Fire Department on parade.",
    votes : 5,
    dateTime : new Date('October 19, 2016 018:53:21'),
    comments : [{
      author : 'Brian Kenny',
      text : 'I barely rememeber this.',
    },{
      author : 'Teddy Henderson',
      text : 'I\'m surprised you remember it at all.',
    }],
    commentShow : false,
    commenting : false,
  }];

  $scope.submitPost = function() {
    var newPost = {};
    newPost.dateTime = new Date();
    newPost.votes = 0;
    newPost.commentShow = false;
    newPost.title = this.view.title;
    newPost.author = this.view.author;
    newPost.imageURL = this.view.imageURL;
    newPost.description = this.view.description;
    this.posts.push(newPost);
    this.view.title = '';
    this.view.author = '';
    this.view.imageURL = '';
    this.view.description = '';
    this.view.showPostForm = false;
  };

  $scope.upvote = function(post) {
    ++post.votes;
  };

  $scope.downvote = function(post) {
    --post.votes;
  };

  $scope.showComments = function(post) {
    post.commentShow = true;
  };

  $scope.commenting = function(post) {
    post.commentShow = true;
    post.commenting = true;
  };

  $scope.submitComment = function(post) {
    var newComment = {};
    newComment.author = this.view.commentAuthor;
    newComment.text = this.view.commentText;

    post.comments.push(newComment);

    this.view.commentAuthor = '';
    this.view.commentText = '';
    post.commentShow = false;
    post.commenting = false;
  };

}]);
