new Vue({
  el: '#mainContent',
  data: {
    apiURL: "http://api.openweathermap.org/data/2.5/weather",
    results: [],
    displayedData: '',
    zip: '',
    locationName: '',
    valid: false,
    showCelsius: false,
    showFahrenheit: false,
    temperature: ''
  },
  methods: {
    getApiData: function() {
      axios.get(this.getURL).then(response => {
        this.results = response.data;
        this.valid = true;
        this.parseBasicWeather();
      }).catch(function (error) {
        alert('Please enter a valid US zip code');
      });
    },
    parseBasicWeather: function() {
      if (this.results.main.temp > 0) {
        this.temperature = this.results.main.temp.toFixed(1);
      }
      if (this.results.name.length > 0) {
        this.locationName = this.results.name;
      } else {
        this.locationName = this.zip;
      }
    },
    reset: function() {
      this.valid = false;
      this.zip = '';
      this.locationName = '';
      this.showFahrenheit = false;
      this.showCelsius = false;
    }
  },
  computed: {
    getURL: function() {
      return this.apiURL + '?zip=' + this.zip + '&APPID=6715cddd7921ba500b0af9cd1f5a4b27';
    },
    getFormattedLocationStringWithUSTemperature: function() {
      return 'The temperature in ' + this.locationName + ' is ' + this.temperature;
    },
    getTemperatureInCelsius: function() {
      return (this.temperature - 273.15).toFixed(1);
    },
    getTemperatureInFahrenheit: function() {
      return (9/5 * (this.temperature - 273 ) + 32).toFixed(1);
    }
  }
});
