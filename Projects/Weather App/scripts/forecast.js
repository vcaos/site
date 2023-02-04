// weather api & data retrieval
const key = 'cteCQz29AYYaHqZybQGv8ZE2oeVwphbj';

// async functions: make a request --> returns a promise

// get weather information
const getWeather = async (id) => {
    // resource url
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data;
};

// get city information
const getCity = async (city) => {
    // resource url
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    
    // ? means we are adding a query parameter to the end of the url
    // & means we are adding a second query parameter
    const query = `?apikey=${key}&q=${city}`;

    // wait for the promise to be resolved, then fetch this resource (the full url)
    const response = await fetch(base + query);

    // resolved data is handed to var data
    const data = await response.json();

    // the first array is the closest match so we return that 
    return data[0];
};

/*
getCity('Chicago').then(data => {
    return getWeather(data.Key);
}).then((data) => {
    console.log(data);
}).catch(err => console.log(err));
*/