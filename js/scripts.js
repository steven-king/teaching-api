$( document ).ready(function() {
    loadData();
});



function loadData(){

    $.ajax({
            type:"GET",
            url:"https://newsapi.org/v1/sources",
            dataType:"json",
            success: parseData
});


}

function parseData(data){
  console.log(data);
  var sources = [];
  var tempPath = data["sources"];
  var html = "";

  for (var i = 0, len = tempPath.length; i < len; ++i) {
        //console.log(i);
         //sets data to arrays
         //sources.push(tempPath[i]["name"]);
         sources.push(tempPath[i]);
         console.log(sources[0]["name"]);

         html += '<li><a href="#" onclick="loadArticles(\''  + sources[i]["id"] + '\')">' + sources[i]["name"] + '</a></li>';

        //html += '<li><a href="#" onclick="loadArticles(\''  + sources[i]["id"] + '\')">' + sources[i]["name"] + '</a></li>'
          //html += '<li class="nav-item"><a class="nav-link" href="#" onclick="loadArticles('  + String(sources[i]["id"]) + ')">' + sources[i]["name"] + '</a></li>'

  }
  $("#sources-area").html(html);


}

function loadArticles(source){
    console.log(source);


    $.ajax({
            type:"GET",
            url:"https://newsapi.org/v1/articles?source=" + source + "&sortBy=top&apiKey=b33a41de4be74829a057f2248c0a40dc",
            dataType:"json",
            success: parseArticles
});


}

function parseArticles(data){
  console.log(data);

  var articles = [];
  var tempPath = data["articles"];
  var html = "";

  for (var i = 0, len = tempPath.length; i < len; ++i) {
    articles.push(tempPath[i]);
    console.log(articles[i]["title"]);
    console.log(tempPath[i]["title"]);


    html += '<div><h3><a href="' + articles[i]["url"] + '">' + articles[i]["title"] + '</a></h3>';
    html += '<p>' + articles[i]["description"]  + '</p></div>';


  }
  $("#feed-area").html(html);



}





//https://newsapi.org/v1/articles?source=techcrunch&apiKey=b33a41de4be74829a057f2248c0a40dc
//b33a41de4be74829a057f2248c0a40dc
