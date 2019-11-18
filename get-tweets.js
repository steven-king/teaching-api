const Twitter = require('twitter');
const config = require('./config.js');
const fs = require('fs');
const path = require('path');
const {Storage} = require('@google-cloud/storage');
const gc = new Storage({
  keyFilename: path.join(__dirname, 'deft-set-256816-75294f2887e6.json'),
  projectId: 'deft-set-256816'
});
const stream     = require('stream'),
      dataStream = new stream.PassThrough(),
      gcFile     = gc.bucket('teaching-api').file('tweets.json')


const T = new Twitter(config);

console.log("Launching twitter-bot script");


//gc.getBuckets().then(x => console.log(x));

const storageBucket = gc.bucket('teaching-api');
//console.log(storageBucket);


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
console.log(__dirname);
console.log(thePath);
var theFile = __dirname + '/tweetsVar.json'
//fs.writeFileSync(theFile, completeData);


dataStream.push(completeData)
dataStream.push(null)

function saveFile(){
  console.log('saving file...');
return new Promise((resolve, reject) => {
  dataStream.pipe(gcFile.createWriteStream({
    resumable  : false,
    validation : false,
    metadata   : {'Cache-Control': 'public, max-age=31536000'}
  }))
  // .on('error', (error : Error) => {
  //   reject(error)
  // })
  // .on('finish', () => {
  //   resolve(true)
  // })
})
}

// fs.writeFile(theFile, completeData, function(err) {
//     console.log(err);
//   });

  // fs.writeFile(theFile, completeData, function(err) {
  //     console.log(err);
  //   });

//console.log(completeData);
saveFile();
console.log("saved to GCS");
console.log("https://storage.cloud.google.com/teaching-api/tweets.json");
// console.log("----- saved as " + theFile + "----- ");
// console.log("----- saved as " + thePath + "/tweetsFile.json ----- ");


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
