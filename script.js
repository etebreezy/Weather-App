const app = {};


// Get weather information
app.getWeatherInfo = function(search) {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        method:'GET',
        dataType: 'json',
        data: {
            q: search,
            appid: `918085842ab2f14a921443e407b9d539`, 
            units: 'standard'   
        }
    }).then((result) => {

        const feelsLike = Math.floor(result.main.feels_like - 273.15)

        const humidity = result.main.humidity

        const pressure = result.main.pressure

        const temperature = Math.floor(result.main.temp - 273.15)

        const name = result.name

        const country = result.sys.country

        const main = result.weather[0].main

        const description = result.weather[0].description 


        // Get country Flag
        app.getCountryFlags(country)

        $('.country-image').attr("alt", `${country} flag`);

        $('.temperature').html(`${temperature} °C `);

        $('.weather-info-1').html(`Feels like: ${feelsLike} °C  | Humidity: ${humidity}%  | Pressure: ${pressure} hPa`);

        $('.weather-info-2').html(`${main}  | ${description}`);


        // Conditions to display the weather image
        if (main == 'Clear') {
            $('.weather-image').attr("src", 'clear.png');
            $('.weather-image').attr("alt", 'clear weather image');

        } else if (main == 'Snow') {
            $('.weather-image').attr("src", 'snow.png');
            $('.weather-image').attr("alt", 'snow weather image'); 

        } else if (main == 'Rain') {
            $('.weather-image').attr("src", 'rainy.png'); 
            $('.weather-image').attr("alt", 'rainy weather image');

        } else if (main == 'Clouds') {
            $('.weather-image').attr("src", 'sunny.png');
            $('.weather-image').attr("alt", 'sunny weather image');

        } else {
            $('.weather-image').attr("src", 'weather.png'); 
            $('.weather-image').attr("alt", 'weather image'); 
        }

    })
} 

// Get country flag
app.getCountryFlags = (result) => {
        $.ajax({
            url: `https://restcountries.eu/rest/v2/name/${result}?fullText=true`,
            method: 'GET',
            dataType: 'json',
            
        }).then((response) => {

            const flagImage = response[0].flag

            const region = response[0].subregion

            const cityCOuntry = response[0].name

            $('.city').append(`${cityCOuntry}`);

            $('.country-image').attr("src", flagImage);

            $('.region').html(`Region: ${region}`);

    
        })
 
};


// Init function
app.init = function() {

    $('.weather-div').hide();

    $('.search-again').hide();

    $('#form').on('submit', function(e) {
        
        const city = $('#search-keywords').val().trim()

        if (city.length != 0) {
            e.preventDefault();

            $('.weather-div').show();

            $('.search-again').show();

            $('.form-div').hide();
        }

        if (city !== '' ) {

            $('.city').prepend(`${city}, `);

            $('#search-keywords').val('');

            app.getWeatherInfo(city);  
        }  
    })

    // Clear information when search again is clicked
    $('.search-again').on('click', function() {

        $('.city').html(``);

        $('.country-image').attr("src", '');
        $('.country-image').attr("alt", '');

        $('.temperature').html('');

        $('.weather-info-1').html('');

        $('.weather-info-2').html('');

        $('.weather-image').attr("src", '');
        $('.weather-image').attr("alt", '');


        $('.region').html('');

        $('.form-div').show();

        $('.weather-div').hide();

        if ($('.form-div').show()) {
            $('.search-again').hide()
        }


    })
}
    

// Document ready
$(function() {
    app.init();
});
