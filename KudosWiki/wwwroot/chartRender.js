var myChart;

window.renderGraph = function (jsonData) {
    var canvas = document.getElementById('chartCanvas');

    var data = JSON.parse(jsonData);

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(canvas, {
        type: data.type,
        data: {
            labels: data.labels,
            datasets: data.datasets
        },
        options: data.options
    });
};
    /*var ctx = canvas.getContext('2d');*/

    /*new Chart(canvas, JSON.parse(graphData));*/