
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    /**
     * load streetview
     */
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview' + 
        '?size=600x300&location=' + address;
    $body.append('<img class="bgimg" src="' + streetViewUrl + '"/>');

    /**
     * NYTimes data and rendering
     */
    var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytUrl += '?' + $.param({
        'api-key': "8ae608650f8b4e508d3abb94cb3ee105",
        'q': address
    });
    $.getJSON(nytUrl, function(data){
        // todo null checks
        var articles = data.response.docs;
        articles.forEach(function(elem, index){
            var listItem = 
                `<li class="article">
                    <a href=${elem.web_url}>
                        <h1>${elem.headline.main || ''}</h1>
                    </a>
                    <p>${elem.lead_paragraph || ''}</p>
                </li>`;
            $('#nytimes-articles').append(listItem);
        });
    }).done(function(result) {
        console.log(result);
    }).fail(function(err) {
        throw err;
    });

    return false;
};

$('#form-container').submit(loadData);
