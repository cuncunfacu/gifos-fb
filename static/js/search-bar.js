const searchBarComponent = (divsId) => {
    let searchDiv = document.createElement('div');
    searchDiv.id = 'search-div-'+ divsId;

    let searchBarDiv = document.createElement('div');
    searchBarDiv.id = 'search-bar-div-' + divsId;
    
    let resultsDiv = document.createElement('div');
    resultsDiv.id = 'results-div-'+ divsId;

    let input = document.createElement('input');
    input.type = 'text';
    
}
