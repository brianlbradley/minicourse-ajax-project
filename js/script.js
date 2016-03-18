
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetValue = $("#street").val();
    var cityVal =    $("#city").val();
    var address = streetValue +  cityValue;

    $greeting.text('So, you want to live at ' + address + '?');

    //load streetview
    var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class = "bgimg"  src = "' + streetViewUrl + '">');




    //   Ny Times Article Search

     var nytimesURL =  'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityValue + '&sort=newest&api-key=e7230f27d3ae1a10f2c601cd3b93a0e3:8:74740630';
     $.getJSON( nytimesURL, function( data ) {

        $nytHeaderElem.text('New York Times Articles About ' + cityValue);

        articles = data.response.docs;  //response.docs is in the Response section JS
        for (var i =0; i < articles.length; i++) {
            var article = articles [i];
            $nytElem.append('<li class ="article">' +
             '<a href = "'+article.web_url+'">' + article.headline.main+'</a>' +
                 '<p>' + article.snippet + '</p>' +
                 '</li>');
         };

      }).error(function(e) {
        $nytHeaderElem.text("New Your Times Could Not be Loaded");
      });



     // Load Wikipedia
       var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);
