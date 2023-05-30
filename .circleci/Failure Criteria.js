function calculate() {
  // Get the input values
  const sigma_x = document.getElementById("sigma_x").value;
  const sigma_y = document.getElementById("sigma_y").value;
  const tau_xy = document.getElementById("tau_xy").value;
  const sigma_yield = document.getElementById("sigma_yield").value;
  
  // Basic input validation
  if(!sigma_x || !sigma_y || !tau_xy || !sigma_yield){
      alert("Please fill out all fields.");
      return;
  }
  
  // Get the selected criteria
  const criteria = document.querySelector('input[name="criteria"]:checked').value;
  
  // Calculate the failure stress
  let failure_stress;
  if (criteria === "von_mises") {
    failure_stress = Math.sqrt((sigma_x-sigma_y)**2 + 3*tau_xy**2);
  } else if (criteria === "tresca") {
    failure_stress = Math.sqrt((sigma_x-sigma_y)**2 + 4*tau_xy**2);
  } else if (criteria === "rankine") {
    failure_stress = Math.sqrt(((sigma_x - sigma_y)/2)**2 + tau_xy**2) + 0.5 * sigma_x + 0.5 * sigma_y;
  }
  
  // Calculate the factor of safety
  const factor_of_safety = sigma_yield/failure_stress;

  // Display the result
  document.getElementById("failure_stress").innerHTML = failure_stress.toFixed(2);
  document.getElementById("factor_of_safety").innerHTML = factor_of_safety.toFixed(2);
  GenerateGraph();
}

function updateFormula() {
  var formulaElement = document.getElementById('formula');
  var selectedCriteria = document.querySelector('input[name="criteria"]:checked').value;
  
  // get input values
  const sigma_x = document.getElementById("sigma_x").value || 'σ<sub>x</sub>';
  const sigma_y = document.getElementById("sigma_y").value || 'σ<sub>y</sub>';
  const tau_xy = document.getElementById("tau_xy").value || 'τ<sub>xy</sub>';
  const sigma_yield = document.getElementById("sigma_yield").value || 'S<sub>y</sub>';
  
  var formula;
  switch(selectedCriteria) {
    case 'von_mises':
      formula = '√(' + sigma_x + '² - ' + sigma_x + '*' + sigma_y + ' + ' + sigma_y + '² + 3*' + tau_xy + '²)'; // Von Mises formula
      break;
    case 'tresca':
      formula = '√(0.25(' + sigma_x + ' - ' + sigma_y + ')² + 4*' + tau_xy + '²)'; // Tresca formula
      break;
    case 'rankine':
      formula = '√(0.25(' + sigma_x + ' - ' + sigma_y + ')² + 3*' + tau_xy + '²)'; // Rankine formula
      break;
  }

  formulaElement.innerHTML = 'σ<sub>eq</sub>' + ' = ' + formula + ' = ' + sigma_yield + '/FS';
}

// Call updateFormula when the page loads
window.onload = updateFormula;

// Update the formula when a radio button is clicked
var radioButtons = document.querySelectorAll('input[name="criteria"]');
for (var i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener('click', updateFormula);
}

// Update the formula when an input field changes
var inputFields = document.querySelectorAll('input[type="number"]');
for (var i = 0; i < inputFields.length; i++) {
  inputFields[i].addEventListener('input', updateFormula);
}

function GenerateGraph() {
  // Get the selected criteria
  const sigma_eq = Number(document.getElementById('failure_stress').innerText);
  const criteria = document.querySelector('input[name="criteria"]:checked').value;

  let data;

  switch(criteria) {
    case 'von_mises':
      let steps = 200; // number of points around the circle
      let a = sigma_eq; // semi-major axis
      let b = sigma_eq * 0.5; // semi-minor axis
      let ellipse = Array.from({length: steps}, (_, i) => 2 * Math.PI * i / steps)
      .map((theta) => {
        let x = a * Math.cos(theta);
        let y = b * Math.sin(theta);
        return { x: x*Math.cos(Math.PI/4) - y*Math.sin(Math.PI/4), y: x*Math.sin(Math.PI/4) + y*Math.cos(Math.PI/4) };
      });
      data = [
        {
        x: ellipse.map(point => point.x),
        y: ellipse.map(point => point.y),
        mode: 'lines',
        name: 'Von Mises'
        }
      ];
    break;
    case 'tresca':
      let hexagon = [
        { x: sigma_eq, y: sigma_eq },
        { x: sigma_eq, y: 0 },
        { x: 0, y: -sigma_eq },
        { x: -sigma_eq, y: -sigma_eq },
        { x: -sigma_eq, y: 0 },
        { x: 0, y: sigma_eq },
        { x: sigma_eq, y: sigma_eq }
      ];
      let rotatedHexagon = hexagon.map((point) => {
        return { x: point.x*Math.cos(Math.PI) + point.y*Math.sin(Math.PI), y: -point.x*Math.sin(Math.PI) + point.y*Math.cos(Math.PI) };
      });
      data = [
        {
        x: rotatedHexagon.map(point => point.x),
        y: rotatedHexagon.map(point => point.y),
        mode: 'lines',
        name: 'Tresca'
        }
      ];
    break;
    case 'rankine':
      let diamondRankine = [
        { x: 0, y: -sigma_eq },
        { x: -sigma_eq, y: 0 },
        { x: 0, y: sigma_eq },
        { x: sigma_eq, y: 0 },
        { x: 0, y: -sigma_eq }
      ];
      diamondRankine = diamondRankine.map((point) => {
        return { x: point.x - point.y, y: point.x + point.y };
      });
      data = [
        {
          x: diamondRankine.map(point => point.x),
          y: diamondRankine.map(point => point.y),
          mode: 'lines',
          name: 'Rankine'
        }
      ];
    break;
  }

  // Plot the graph
  let layout = {
    autosize: false,
    width: 600,
    height: 600,
    xaxis: {
      range: [-(sigma_eq + 50), (sigma_eq + 50)],
      scaleratio: 1,
      scaleanchor: 'y'
    },
    yaxis: {
      range: [-(sigma_eq + 50), (sigma_eq + 50)],
    },
    title: 'Failure Criteria Graph'
  };
  
  Plotly.newPlot('graphDiv', data, layout);
}

