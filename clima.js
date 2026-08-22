const inputCiudad = document.querySelector("#inputCiudad");
const btnBuscar = document.querySelector("#btnBuscar");
const imgClima = document.querySelector("#imgClima");
const temperatura = document.querySelector("#temperatura");
const nombreCiudad = document.querySelector("#nombreCiudad");
const humedad = document.querySelector("#humedad");
const viento = document.querySelector("#viento");

const fondosClima = {
    Clear: "imagenes/despejado.jpg",
    Clouds: "imagenes/nublado.jpg",
    Rain: "imagenes/lluvioso.jpg",
    Drizzle: "imagenes/llovizna.jpg",
    Thunderstorm: "imagenes/tormentaElectrica.jpg",
    Snow: "imagenes/nieve.jpg",
    Mist: "imagenes/neblina.jpg",
    Fog: "imagenes/nieblaDensa.jpg",
    Haze: "imagenes/calima.jpg"
};

const API_KEY = "9547b31032baf76436ddbc5fcc530ae9";

btnBuscar.addEventListener("click", () => {
    const ciudad = inputCiudad.value.trim();

    if (ciudad === "") {
        return;
    }

    buscarClima(ciudad);
});

function buscarClima(ciudad) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

    fetch(url)
        .then(response => response.json())
        .then(data => mostrarClima(data))
        .catch(error => console.log("Error:", error));
}

function mostrarClima(data) {
    temperatura.textContent = `${Math.round(data.main.temp)}°C`;
    nombreCiudad.textContent = data.name;
    humedad.textContent = `${data.main.humidity}%`;
    viento.textContent = `${data.wind.speed} km/h`;

    const codigoIcono = data.weather[0].icon;
    imgClima.src = `https://openweathermap.org/img/wn/${codigoIcono}@2x.png`;
    const estadoClima = data.weather[0].main;
    const urlFondo = fondosClima[estadoClima];
    document.body.style.backgroundImage = `url(${urlFondo})`;
}
inputCiudad.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        const ciudad = inputCiudad.value.trim();

        if (ciudad === "") {
            return;
        }

        buscarClima(ciudad);
    }
});
