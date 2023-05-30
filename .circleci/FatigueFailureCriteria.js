function calculate() {
    // Get user inputs
    let sigma_a = document.getElementById("sigma_a").value;
    let sigma_m = document.getElementById("sigma_m").value;
    let sigma_uts = document.getElementById("sigma_uts").value;
    let sigma_yield = document.getElementById("sigma_yield").value;
    let Se = document.getElementById("Se").value;
    let FS = document.getElementById("FS").value;

    let x_values = [];
    for (let i = 0; i <= sigma_uts; i++) {
        x_values.push(i);
    }

    let y_goodman = x_values.map(x => ((-Se / sigma_uts) * x + (Se / FS)));
    console.log(x_values)
    let y_gerber = x_values.map(x => ((-Se / (Math.pow(sigma_uts, 2))) * Math.pow(x, 2) + (Se / FS)));
    console.log(x_values)
    let y_soderberg = x_values.map(x => ((-Se / sigma_yield) * x + (Se / FS)));
    console.log(x_values)
    let y_failure = x_values.map(x => -x + (sigma_yield / FS));
    console.log(x_values)
    

    let goodman = {
        x: x_values,
        y: y_goodman,
        mode: 'lines',
        name: 'קו גודמן',
        line: {
            color: 'blue'
        }
    };

    let gerber = {
        x: x_values,
        y: y_gerber,
        mode: 'lines',
        name: 'קו גרבר',
        line: {
            color: 'orange'
        }
    };

    let soderberg = {
        x: x_values,
        y: y_soderberg,
        mode: 'lines',
        name: 'קו סודרברג',
        line: {
            color: 'green'
        }
    };

    let failure = {
        x: x_values,
        y: y_failure,
        mode: 'lines',
        name: 'קו כניעה',
        line: {
            color: 'red'
        }
    };

    let data = [goodman, gerber, soderberg, failure];

    let layout = {
        title: 'גרף קריטריוני כשל להתעייפות',
        xaxis: {
            title: 'x',
            range: [0, sigma_uts] 
        },
        yaxis: {
            title: 'y',
            range: [0, sigma_uts]
        },
        legend: {
            x: 0.5,
            y: -0.1,
            xanchor: 'center',
            yanchor: 'top',
            orientation: 'h'
        }
    };
    

    Plotly.newPlot('myDiv', data, layout);
}
