window.addEventListener('load', () => {
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
  
   

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`;
  
          fetch(api)
            .then(response => response.json())
            .then(data => {
              console.log(data);
  
              // Dohvaćanje podataka
                const temperatures = data.hourly.temperature_2m;
                const temperaturess = data.hourly_units.temperature_2m;
                const timezone = data.timezone;

              
                const firstTemperature = temperatures[0];
  
              // Definiranje
                const temperatureString = `Temperature: ${firstTemperature} ${temperaturess}`;
  
              
                temperatureDegree.textContent = temperatureString;
                locationTimezone.textContent = `Timezone: ${timezone}`;


            })
            .catch(error => {
              console.log('Error:', error);
            });
        },
        error => {
          console.log('Geolocation error:', error);
        }
      );
    }
  });
  
