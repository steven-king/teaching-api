const Twitter = require('twitter');
const config = require('./config.js');
const fs = require('fs');
const T = new Twitter(config);

console.log("Launching twitter-bot script");


// Set up your search parameters
const params = {
  q: 'unc',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

// Initiate your search using the above paramaters
T.get('search/tweets', params, (err, data, response) => {
  // If there is no error, proceed
  if(err){
    return console.log(err);
  }

var tweets = [];
  for(var i = 0; i < data.statuses.length; i++){
      // Get the tweet Id from the returned data
      tweets.push({id: data.statuses[i].id_str, text: data.statuses[i].text});
      var id = { id: data.statuses[i].id_str }
      //console.log(tweets);
    };

//JSON.stringify({array: tweets});
//console.log(JSON);
completeData = JSON.stringify(tweets);
var thePath = __dirname;
fs.writeFileSync(thePath + '/tweets2.json', completeData);
console.log(completeData);
console.log("----- saved as " + thePath + "/tweets2.json ----- ");


  // Loop through the returned tweets
  // const tweetsId = data.statuses
  //   .map(tweet => ({ id: tweet.id_str }));
  //
  // tweetsId.map(tweetId => {
  //   T.post('favorites/create', tweetId, (err, response) => {
  //     if(err){
  //       return console.log(err[0].message);
  //     }
  //
  //     const username = response.user.screen_name;
  //     const favoritedTweetId = response.id_str;
  //     console.log(`Favorited: https://twitter.com/${username}/status/${favoritedTweetId}`);
  //
  //   });
  //
  // });
    //console.log(tweetsDesc);
})
