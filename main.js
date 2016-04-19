var $symbol;
var $name;
var $exchange;
$(function(){
  $(".stockInfo").submit(getStock);
  $('.people').on('click', '.card', saveStock);

var i = $(this).closest('.card').index();
console.log(' i ', i);

  // retriveStock();
})


function getStock(e){
  e.preventDefault();
  var stockName = $('.stockID').val();
  console.log(stockName);
  $.getJSON(`http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=${stockName}&callback=?`)
  .done(function(data){
  //  console.log(data);
   var $stockCard = data.map(makeCard);
  // console.log($stockCard)
$('.people').append($stockCard);
  //$('.people').append($stockCard[i]);
  })
  .fail(function(err){
    console.error(err);
  })

}


function makeCard(stockObj){
  // console.log(stockObj[0]);
  var $card = $('<div>').addClass("card").attr('sss-symbol', `${stockObj.Symbol}`);
  var $symbol = $('<p>').text(`Symbol: ${stockObj.Symbol}`)
  var $name = $('<p>').text(`Name: ${stockObj.Name}`)
  var $exchange = $("<p>").text(`Exchange:${stockObj.Exchange}`)

  $card.append($symbol,$name,$exchange)
  return $card;
}
function makeStockInfoCard(stockObj){
  // console.log(stockObj[0]);
  var $card2 = $('<tr>').addClass("card").attr('sss-symbol', `${stockObj.Symbol}`);
  var $symbol2 = $('<td>').text(`Symbol:${stockObj.Symbol}`)
  var $name2 = $('<td>').text(`Name:${stockObj.Name}`)
  var $high = $("<td>").text(`High:${stockObj.High}`)
  var $low = $("<td>").text(`Low:${stockObj.Low}`)

  $card2.append($symbol2,$name2,$high,$low)
  return $card2;
}

var nameStorage = {
  get:function(){
    try{
      var names = JSON.parse(localStorage.names);
    }
    catch(err){
      var names = [];
    }
    return names;
  },
  write: function(names){
    localStorage.names = JSON.stringify(names)
  }
};

function saveStock() {

var i = $(this).remove();
console.log(' i ', i);

  var clicked = $(this).find('p').first().text().trim();
  var arr = clicked.split(' ');
  var stockStorage = nameStorage.get();
  stockStorage.push(arr[1]);
  nameStorage.write(stockStorage);


  retriveStock(clicked);
  // console.log('retriveStock');
}

var name2 = nameStorage.get();


name2.push()

//
function retriveStock(clicked){

  console.log('function retriveStock', clicked);

  // debugger;
  // var clicked = clicked;

  if (clicked === undefined) {
      clicked = '';
  }

  var array = clicked.split(' ');
  var symbol = array[1];

  console.log('symbol', symbol);

  // var clicked = clicked.toString().trim();

// debugger;

  var currentStocks = nameStorage.get();
  // console.log(currentStocks);
  $.getJSON(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=${symbol}&callback=?`)
  .done(function(data){
    console.log('retriveStock', data)
  //  var $stockCard2 = data.map(makeStockInfoCard);
   var $stockCard2 = makeStockInfoCard(data);
  // console.log($stockCard)
//$('.table').append($stockCard);
  //$('.people').append($stockCard[i]);
  $(".table").append($stockCard2)
  })
  .fail(function(err){
    console.error(err);
  })

}
