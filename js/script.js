
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
    $.getJSON(nytUrl)
    .done(function(data) {
        // todo null checks
        var articles = data.response.docs;
        $nytHeaderElem.text(`New York Times articles for ${address}.`);
        articles.forEach(function(elem, index) {
            var listItem = 
                `<li class="article">
                    <a href=${elem.web_url}>
                        ${elem.headline.main || ''}
                    </a>
                    <p>${elem.snippet || ''}</p>
                </li>`;
            $nytElem.append(listItem);
        });
    }).fail(function(error) {
        console.error(error)
        $nytHeaderElem.text(`New York Times articles could not be loaded.`);
    });

    return false;
};

$('#form-container').submit(loadData);
