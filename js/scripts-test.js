$( document ).ready(function() {
  console.log("running")
    loadData();
});



function loadData(){
console.log('loadData')
    $.ajax({
            type:"GET",
            url:"https://storage.googleapis.com/storage/v1/b/teaching-api/tweets.json",
            dataType:"json",
            success: parseData
});


}

function parseData(data){
  console.log(data);
  $("#data-area").html(data);
  }
