const apiKey = 'OVDHescShzSfinO0enbW7OHW3JZXiB4AV92j4kyL';

const parksUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    // object.keys, concat all queries 
    // and add them to the end of our endpoint url
    // query params {limit=10&q=indiana&api_key}

    const queryItems = Object.keys(params).map(key =>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    $('#results-list').empty();

    for (let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(`<li><h3>${responseJson.data[i].name}</h3>
        <p>${responseJson.data[i].description}</p>
        <p>${responseJson.data[i].weatherInfo}</p>
        <a href="${responseJson.data[i].url}"> Visit the park website here! </a></li>`)};

        $('#results').removeClass('hidden');
};

function getParks(query, maxResults=10){
    const params = {
        limit: maxResults,
        q: query,
        api_key: apiKey,
    };
    const queryString = formatQueryParams(params)
    const url = parksUrl + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getParks(searchTerm, maxResults);
    });
}

$(watchForm)