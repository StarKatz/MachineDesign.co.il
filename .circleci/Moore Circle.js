function update() {
    const sigmaX = Number(document.getElementById('sigma-x').value) || 'σ<sub>x</sub>';
    const sigmaY = Number(document.getElementById('sigma-y').value) || 'σ<sub>y</sub>';
    const tauXY = parseFloat(document.getElementById('tau-xy').value) || 'τ<sub>xy</sub>';
    if (isNaN(sigmaX) || isNaN(sigmaY) || isNaN(tauXY)) {
      return;
    }
    const sigmaMax = (sigmaX + sigmaY) / 2 + Math.sqrt(Math.pow((sigmaX - sigmaY) / 2, 2) + Math.pow(tauXY, 2));
    const sigmaMin = (sigmaX + sigmaY) / 2 - Math.sqrt(Math.pow((sigmaX - sigmaY) / 2, 2) + Math.pow(tauXY, 2));
    const tauMax = Math.sqrt(Math.pow((sigmaX - sigmaY) / 2, 2) + Math.pow(tauXY, 2));
    const tauMin = -tauMax;
    const phiP = Math.atan(2 * tauXY / (sigmaX - sigmaY)) * 180 / Math.PI / 2;
    const phiS = Math.atan(-(sigmaX - sigmaY) / (2 * tauXY)) * 180 / Math.PI / 2;
    document.getElementById('sigma-max').value = sigmaMax.toFixed(2) + "[MPa]";
    document.getElementById('sigma-max').nextElementSibling.innerHTML = '= (' + sigmaX + '+' + sigmaY + ') / 2 + √[(' + sigmaX + ' - ' + sigmaY + ') / 2]<sup>2</sup> + ' + tauXY + '<sup>2</sup>';
    document.getElementById('sigma-min').value = sigmaMin.toFixed(2) + "[MPa]";
    document.getElementById('sigma-min').nextElementSibling.innerHTML = '= (' + sigmaX + '+' + sigmaY + ') / 2 - √[(' + sigmaX + ' - ' + sigmaY + ') / 2]<sup>2</sup> + ' + tauXY + '<sup>2</sup>';
    document.getElementById('tau-max').value = tauMax.toFixed(2) + "[MPa]";
    document.getElementById('tau-max').nextElementSibling.innerHTML = '= √[(' + sigmaX + ' - ' + sigmaY + ') / 2]<sup>2</sup> + ' + tauXY + '<sup>2</sup>';
    document.getElementById('tau-min').value = tauMin.toFixed(2) + "[MPa]";
    document.getElementById('tau-min').nextElementSibling.innerHTML = '= -√[(' + sigmaX + ' - ' + sigmaY + ') / 2]<sup>2</sup> + ' + tauXY + '<sup>2</sup>';
    document.getElementById('phi-p').value = phiP.toFixed(2);
    document.getElementById('phi-p').nextElementSibling.innerHTML = '= tan<sup>-1</sup>(2' + tauXY + ' / (' + sigmaX + ' - ' + sigmaY + ')) / 2';
    document.getElementById('phi-s').value = phiS.toFixed(2);
    document.getElementById('phi-s').nextElementSibling.innerHTML = '= tan<sup>-1</sup>((' + sigmaX + ' - ' + sigmaY + ') / (2' + tauXY + ')) / 2';
}
document.getElementById('sigma-x').addEventListener('input', update);
document.getElementById('sigma-y').addEventListener('input', update);
document.getElementById('tau-xy').addEventListener('input', update);
update();

function updatePlotly() {
  const sigmaX = parseFloat(document.getElementById('sigma-x').value);
  const sigmaY = parseFloat(document.getElementById('sigma-y').value);
  const tauXY = parseFloat(document.getElementById('tau-xy').value);
  const sigmaMax = (sigmaX + sigmaY) / 2 + Math.sqrt(Math.pow((sigmaX - sigmaY) / 2, 2) + Math.pow(tauXY, 2));
  const sigmaMin = (sigmaX + sigmaY) / 2 - Math.sqrt(Math.pow((sigmaX - sigmaY) / 2, 2) + Math.pow(tauXY, 2));
  const tauMax = Math.sqrt(Math.pow((sigmaX - sigmaY) / 2, 2) + Math.pow(tauXY, 2));
  const tauMin = -tauMax;
  const phiP = Math.atan(2 * tauXY / (sigmaX - sigmaY)) * 180 / Math.PI / 2;
  const phiS = Math.atan(-(sigmaX - sigmaY) / (2 * tauXY)) * 180 / Math.PI / 2;

  // Calculate the center and radius of the Mohr circle
  const sd = sigmaX - sigmaY;
  const center = (sigmaX + sigmaY) / 2;
  const radius = Math.sqrt((sd ** 2 + tauXY ** 2) / 4);

  // Calculate the coordinates of the center and sigmaMax
  const c = { x: center, y: 0 };
  const sMax = { x: center + radius, y: tauXY / 2 };
  const sMin = { x: center - radius, y: -tauXY / 2 };
  const tMax = { x: center, y: tauMax };
  const tMin = { x: center, y: tauMin };
  // create the coordinates for the circle
  let theta = [];
  for (let i = 0; i < 360; i++) {
      theta.push(i);
  }

  let circleX = theta.map(angle => c.x + radius * Math.cos(Math.PI / 180 * angle));
  let circleY = theta.map(angle => c.y + radius * Math.sin(Math.PI / 180 * angle));

  // Create circle trace
  let trace1 = {
      x: circleX,
      y: circleY,
      mode: 'lines',
      name: 'Circle',
      line: {
          color: 'blue',
      }
  };

  // Create points trace
  let trace2 = {
      x: [c.x, sMax.x, sMin.x, c.x, c.x],
      y: [0, 0, 0, tMax.y, tMin.y],
      mode: 'markers',
      name: 'Points',
      text: ['C', 'σmax', 'σmin', 'τmax', 'τmin'],
      textposition: 'top right',
      marker: {
          color: 'black',
          size: 8
      }
  };

  let data = [trace1, trace2];

  let layout = {
      title: 'Mohr Circle',
      xaxis: {
          title: 'σ',
          zeroline: true
      },
      yaxis: {
          title: 'τ',
          scaleanchor: "x",
          scaleratio: 1,
      },
      showlegend: false,
  };

  // create the plot
  Plotly.newPlot('plotlyDiv', data, layout);
}

// Add event listeners
document.getElementById('sigma-x').addEventListener('input', updatePlotly);
document.getElementById('sigma-y').addEventListener('input', updatePlotly);
document.getElementById('tau-xy').addEventListener('input', updatePlotly);
// Initial calculation and drawing
updatePlotly();
