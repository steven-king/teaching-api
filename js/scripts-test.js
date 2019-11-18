$( document ).ready(function() {
  console.log("running")
    loadData();
});



function loadData(){
console.log('loadData')
    $.ajax({
            type:"GET",
            url:"https://storage.googleapis.com/teaching-api/tweets.json",
            dataType:"json",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            crossDomain: true,
            success: parseData
});


}

function parseData(data){
  console.log(data);
  $("#data-area").html(data);
  }
