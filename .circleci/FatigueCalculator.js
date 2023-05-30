function calculateKa() {
  const method = document.getElementById('method').value;
  const sigma_uts = parseFloat(document.getElementById('sigma_uts').value);
  const otherKaInput = document.getElementById('other-ka');
  const otherKaLabel = document.querySelector('.ka-label');

  const methodCoefficients = {
    machined_and_cold_drawn: { a: 4.51, b: -0.265 },
    hot_rolled: { a: 57.7, b: -0.718 },
    forged: { a: 272, b: -0.995 },
    ground: { a: 1.58, b: -0.085 },
    polished: { a: 1, b: 0 },
  };

  if (method === 'other') {
    otherKaInput.style.display = 'block';
    otherKaLabel.style.display = 'inline';
    return parseFloat(otherKaInput.value);
  } else {
    otherKaLabel.style.display = 'none';
    otherKaInput.style.display = 'none';
    const { a, b } = methodCoefficients[method];
    const ka = a * Math.pow(sigma_uts, b);
    return ka;
  }
}

function calculateKb() {
  const diameter = parseFloat(document.getElementById('diameter').value);

  if (diameter <= 7.5) {
    return 1;
  } else if (diameter <= 50) {
    return 0.85;
  } else {
    return 0.75;
  }
}

function calculateKc() {
  const load = document.getElementById('load').value;

  const loadCoefficients = {
    bending: 1,
    axial: 0.85,
    torsion: 0.59,
  };

  return loadCoefficients[load];
}

function calculateKd() {
  const temperature = parseFloat(document.getElementById('temperature').value);

  if (temperature >= 450) {
    return 1 - (0.00576 * temperature + 27.74);
  } else {
    return 1;
  }
}

function calculateKe() {
  const reliability = parseFloat(document.getElementById('reliability').value);

  const reliabilityCoefficients = {
    50: 1,
    90: 0.897,
    95: 0.868,
    99: 0.814,
    99.9: 0.753,
    99.99: 0.702,
    99.999: 0.659,
  };

  return reliabilityCoefficients[reliability];
}

function calculateSe1() {
  const material = document.getElementById('material').value;
  const sigma_uts = parseFloat(document.getElementById('sigma_uts').value);

  const materialCoefficients = {
    steel: 0.5,
    cast_iron: 0.4,
    cast_aluminium: 0.3,
  };

  return materialCoefficients[material] * sigma_uts;
}

function Se() {
  const Ka = calculateKa();
  const Kb = calculateKb();
  const Kc = calculateKc();
  const Kd = calculateKd();
  const Ke = calculateKe();
  const Se1 = calculateSe1();

  const Se = Ka * Kb * Kc * Kd * Ke * Se1;
  document.getElementById('output').textContent = Se.toFixed(2) + "[MPa]";
}