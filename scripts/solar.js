var labels = [];
var values = [];
var count = 0;

fetch('GetWeatherSiteEstimatedActuals.json')
// fetch('https://api.solcast.com.au/weather_sites/1020-07c4-61c0-630e/forecasts?format=json&api_key=1A6psl8osltiuWPalqxrUbIF4fPTwx5U', { mode: 'no-cors'})
        .then((res) => res.json())
        .then((data) => {
            data.forEach(element => {
                if (count < 301){
                    count += 1;
                    values.unshift(element.Ghi);
                    if(count%2==0){
                        labels.unshift(element.period_end.substring(5,10));
                    }
                    else{
                        labels.unshift('');
                    }
                
                }
            });

            document.getElementById('output').innerHTML = output;
        })

console.log(labels);
console.log(values);

var ctx = document.getElementById('solar').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Ghi',
            data: values,
            backgroundColor: [
                '#111111',
            ],
            borderColor: [
                '#111111',
            ],
            borderWidth: 3
        }]
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

