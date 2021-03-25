  //setting data for deafult
  $.ajax({
    url: "https://disease.sh/v2/countries/india",
    method: "GET",
    dataType: "json",
    success: function(countryData) {
        $("#country-wise-section .country-flag").attr("src", "" + countryData.countryInfo.flag + "");
        $("#country-wise-section .country-name").text("India");
        $("#country-wise-section .total-cases-count").text(countryData.cases);
        $("#country-wise-section .total-deaths-count").text(countryData.deaths);
        $("#country-wise-section .total-recovered-count").text(countryData.recovered);
        $("#country-wise-section .total-active-count").text(countryData.active);
        $("#country-wise-section .today-cases-count").text(countryData.todayCases);
        $("#country-wise-section .today-deaths-count").text(countryData.todayDeaths);
        $("#country-wise-section .total-cases-per-million-count").text(countryData.casesPerOneMillion);
        $("#country-wise-section .total-deaths-per-million-count").text(countryData.deathsPerOneMillion);
    }
});

 // setting data for countries
 $("#select-country").change(function() {
    setCountryData();
    setCountryWiseGrpahData();
});


var country;

function setCountryData() {
    // add loader
    $(".loader").removeClass("d-none");
    $(".loader").addClass("d-block");

    country = $("#select-country").val();
    $.ajax({
        url: "https://disease.sh/v2/countries/" + country + "",
        method: "GET",
        dataType: "json",
        success: function(countryData) {
            $("#country-wise-section .country-flag").attr("src", "" + countryData.countryInfo.flag + "");
            $("#country-wise-section .country-name").text(country);
            $("#country-wise-section .total-cases-count").text(countryData.cases);
            $("#country-wise-section .total-deaths-count").text(countryData.deaths);
            $("#country-wise-section .total-recovered-count").text(countryData.recovered);
            $("#country-wise-section .total-active-count").text(countryData.active);
            $("#country-wise-section .today-cases-count").text(countryData.todayCases);
            $("#country-wise-section .today-deaths-count").text(countryData.todayDeaths);
            $("#country-wise-section .total-cases-per-million-count").text(countryData.casesPerOneMillion);
            $("#country-wise-section .total-deaths-per-million-count").text(countryData.deathsPerOneMillion);
        }
    });
}


/*.........................................
         create graph for country wise 
  .........................................*/

let countryWise = new Chart(
    document.getElementById('countryWise').getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                    label: 'Total Cases',
                    data: [],
                    borderColor: 'blue',
                    borderWidth: 1,
                    fill: false,
                },
                {
                    label: 'Total Recovered',
                    data: [],
                    borderColor: 'green',
                    borderWidth: 1,
                    fill: false,
                },
                {
                    label: 'Total Deaths',
                    data: [],
                    borderColor: 'red',
                    borderWidth: 1,
                    fill: false,
                }
            ],

        },
        options: {
            legend: {
                responsive: false,
                maintainAspectRatio: false,
                display: true,
                labels: {
                    fontColor: "blue",
                    fontSize: 12,
                    boxWidth: 8
                }
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        fontColor: "blue",
                        labelString: 'No. of Persons'
                    },
                    ticks: {
                        fontColor: "blue",
                        fontSize: 10
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        fontColor: "blue",
                        labelString: 'Date'
                    },
                    ticks: {
                        fontColor: "blue",
                        fontSize: 10
                    }
                }]
            }
        }
    }
);

// setting data for country wise graph for default india
$.ajax({
    url: "https://disease.sh/v2/historical/india",
    method: "GET",
    dataType: "json",
    success: function(countryWiseData) {
        countryWise.data.labels = Object.keys(countryWiseData.timeline.cases);
        countryWise.data.datasets[0].data = Object.values(countryWiseData.timeline.cases);
        countryWise.data.datasets[1].data = Object.values(countryWiseData.timeline.recovered);
        countryWise.data.datasets[2].data = Object.values(countryWiseData.timeline.deaths);
        countryWise.update();
    }
});

// setting graph data for all countries
function setCountryWiseGrpahData() {
    $.ajax({
        url: "https://disease.sh/v2/historical/" + country + "",
        method: "GET",
        dataType: "json",
        success: function(countryWiseData) {
            countryWise.data.labels = Object.keys(countryWiseData.timeline.cases);
            countryWise.data.datasets[0].data = Object.values(countryWiseData.timeline.cases);
            countryWise.data.datasets[1].data = Object.values(countryWiseData.timeline.recovered);
            countryWise.data.datasets[2].data = Object.values(countryWiseData.timeline.deaths);
            countryWise.update();

            // remove loader
            $(".loader").addClass("d-none");
            $(".loader").removeClass("d-block");
        }
    });
}