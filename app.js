window.addEventListener("load", () => {
  let lon;
  let lat;

  let temperaturaValor = document.getElementById("temperatura-valor");
  let temperaturaDescripcion = document.getElementById(
    "temperatura-descripcion"
  );

  let ubicacion = document.getElementById("ubicacion");
  // let icono= document.getElementById('icono');
  let iconoAnimado = document.getElementById("icono-animado");

  let vientoVelocidad = document.getElementById("viento-velocidad");

  //function para fetch weather data basado en la url

  const fetchWeather = (url) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let temp = Math.round(data.main.temp);
        temperaturaValor.textContent = `${temp}°C`;

        let desc = data.weather[0].description;
        temperaturaDescripcion.textContent = desc.toUpperCase();

        ubicacion.textContent = data.name;

        vientoVelocidad.textContent = `${data.wind.speed} m/s`;

        //para iconos estáticos
        // let iconId= data.weather[0].icon;
        // const urlIcon = `https://openweathermap.org/img/wn/${iconId}.png`

        // let img= document.createElement('img');
        // img.src = urlIcon;
        // icono.textContent = '';
        // icono.appendChild(img);

        //para iconos animados
        switch (data.weather[0].main) {
          case "Clear":
            iconoAnimado.src = "animated/day.svg";
            console.log("LIMPIO");
            break;
          case "Clouds":
            iconoAnimado.src = "animated/cloudy-day-1.svg";
            console.log("CON NUBES");
            break;
          case "Thunderstorm":
            iconoAnimado.src = "animated/thunder.svg";
            console.log("TORMENTA");
            break;
          case "Drizzle":
            iconoAnimado.src = "animated/rainy-2.svg";
            console.log("LLOVIZNA");
            break;
          case "Rain":
            iconoAnimado.src = "animated/rainy-7.svg";
            console.log("LLUVIA");
            break;
          case "Snow":
            iconoAnimado.src = "animated/snowy-6.svg";
            console.log("NIEVE");
            break;
          case "Atmosphere":
            iconoAnimado.src = "animated/weather.svg";
            console.log("ATMOSFERA");
            break;
          default:
            iconoAnimado.src = "animated/cloudy-day-1.svg";
            console.log("por defecto");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //tiempo segun current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      //console.log(posicion.coords.latitude);
      lon = posicion.coords.longitude;
      lat = posicion.coords.latitude;

      //ubicacion actual
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=905603ece103542c1f38b332d691a7b0`;

      fetchWeather(url);
    });
  }

  //tiempo según el nombre de la ciudad
  //ubicacion por ciudad
  //const url = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&lang=es&units=metric&appid=905603ece103542c1f38b332d691a7b0`
  //console.log(url);

  const getWeatherByCity = () => {
    const city = document.getElementById("city").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&units=metric&appid=905603ece103542c1f38b332d691a7b0`;
    fetchWeather(url);
  };

  //añadir event listener para el boton ver tiempo

  document
    .getElementById("botonVerTiempo")
    .addEventListener("click", getWeatherByCity);
});
