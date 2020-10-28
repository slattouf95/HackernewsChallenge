import firebase from 'firebase';

const app = firebase.initializeApp({
  authDomain: "hacker-news.firebaseio.com",
  databaseURL: "https://hacker-news.firebaseio.com",
});
const ref = app.database().ref('/v0');

const getArticle = (articleID) => {
  ref.child(`item/${articleID}`).once("value", function(snapshot) {
    console.log(snapshot.val(),"testawi");
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
};

const bookmarkArticle = (articleID) => {
  ref.child(`item/${articleID}`).on("value", function(snapshot) {
    console.log("new comment has been posted")
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
};

export {bookmarkArticle,getArticle,ref};