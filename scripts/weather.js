var labels = [];
var values = [];
var count = 0;

fetch('http://api.openweathermap.org/data/2.5/weather?lat=-33.958461400650094&lon=18.46010605490699&appid=814d9c59d6943e74e028b195aa83641d&units=metric')
        .then((res) => res.json())
        .then((weather) => {
            console.log(weather);
            displayResults(weather);
        })


function displayResults(weather){
    let now = new Date();
    document.getElementById('today').innerHTML = dateBuilder(now);

    let temp = document.querySelector('.current #temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('hi-low');
    hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}

// ---------------  experiments! --------------------- // 

var ctx = document.getElementById("myChart");
    this.chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: this.dates,
        datasets: [
        {
            label: "Avg. Temp",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgb(54, 162, 235)",
            fill: false,
            data: this.temps
        }
        ]
    },
    options: {
        title: {
        display: true,
        text: "Temperature with Chart.js"
        },
        tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
            var label =
                data.datasets[tooltipItem.datasetIndex].label || "";

            if (label) {
                label += ": ";
            }

            label += Math.floor(tooltipItem.yLabel);
            return label + "°C";
            }
        }
        },
        scales: {
        xAxes: [
            {
            type: "time",
            time: {
                unit: "hour",
                displayFormats: {
                hour: "M/DD @ hA"
                },
                tooltipFormat: "MMM. DD @ hA"
            },
            scaleLabel: {
                display: true,
                labelString: "Date/Time"
            }
            }
        ],
        yAxes: [
            {
            scaleLabel: {
                display: true,
                labelString: "Temperature (°C)"
            },
            ticks: {
                callback: function(value, index, values) {
                return value + "°C";
                }
            }
            }
        ]
        }
    }
    });