function Kf() {
    var Kf = 1 + parseFloat(document.getElementById("q").value) * (parseFloat(document.getElementById("Kt").value) - 1);
    document.getElementById("Kf_result").innerHTML = Kf.toFixed(2);
}

function Kfs() {
    var Kfs = 1 + parseFloat(document.getElementById("qs").value) * (parseFloat(document.getElementById("Kts").value) - 1);
    document.getElementById("Kfs_result").innerHTML = Kfs.toFixed(2);
}

function calculate() {
    var MaxMinMA = document.querySelector('input[name="MaxMinMA"]:checked').value;
    var KtKf = document.querySelector('input[name="KtKf"]:checked').value;
    if (MaxMinMA == "MaxMin_chack"){
        var Tm = (parseFloat(document.getElementById("Tmax").value) + parseFloat(document.getElementById("Tmin").value))/2;
        var Ta = (parseFloat(document.getElementById("Tmax").value) - parseFloat(document.getElementById("Tmin").value))/2;
        var Mm = (parseFloat(document.getElementById("Mmax").value) + parseFloat(document.getElementById("Mmin").value))/2;
        var Ma = (parseFloat(document.getElementById("Mmax").value) - parseFloat(document.getElementById("Mmin").value))/2;
    }else if (MaxMinMA == "MA_check"){
        var Tm = parseFloat(document.getElementById("Tm").value);
        var Ta = parseFloat(document.getElementById("Ta").value);
        var Mm = parseFloat(document.getElementById("Mm").value);
        var Ma = parseFloat(document.getElementById("Ma").value);
    }
    if (KtKf == "Kt_check"){
        var Kf = 1 + parseFloat(document.getElementById("q").value) * (parseFloat(document.getElementById("Kt").value) - 1);
        var Kfs = 1 + parseFloat(document.getElementById("qs").value) * (parseFloat(document.getElementById("Kts").value) - 1);
    }else if (KtKf == "Kf_check"){
        var Kf = parseFloat(document.getElementById("Kf").value);
        var Kfs = parseFloat(document.getElementById("Kfs").value);
    }
    var A = math.sqrt((4 * math.pow(Kf * Ma, 2)) + 3 * math.pow(Kfs * Ta, 2));
    var B = math.sqrt((4 * math.pow(Kf * Mm, 2)) + 3 * math.pow(Kfs * Tm, 2));
    var Sut = parseFloat(document.getElementById("Sut").value);
    var Syt = parseFloat(document.getElementById("Syt").value);
    var Se = parseFloat(document.getElementById("Se").value);
    var method = document.querySelector('input[name="method"]:checked').value;
    var target = document.querySelector('input[name="target"]:checked').value;
    
    if (target == "d_check"){
        var fs = parseFloat(document.getElementById("fs").value);
        if (method == "goodman") {
            var d = math.pow((((fs * 16)/math.PI) * ((A / Se) + (B / Sut))), 1/3);
        } else if (method == "gerber") {
            var d = math.pow((((8 * fs *A) / (math.PI * Se)) * (1 + math.pow(1 + math.pow((2 * B * Se) / (A * Sut), 2), 0.5))), 1/3);
        } else if (method == "soderberg") {
            var d = math.pow((((fs * 16)/math.PI) * ((A / Se) + (B / Syt))), 1/3);
        }
        document.getElementById("result").innerHTML ='d = ' + d.toFixed(2) * 10 + ' mm'; ;
    } else if (target = "fs_check"){
        var d = parseFloat(document.getElementById("d").value);
        console.log(math.PI);
        console.log(math.pow(d, 3));
        if (method == "goodman") {
          var c = 1/((A / Se) + (B / Sut));  
          var fs =(((math.PI * math.pow(d , 3)) / 16) * c);
          fs = fs * 0.001;
        } else if (method == "gerber") {
            var x = (((8 * A) / (math.PI * math.pow(d, 3) * Se)) * (1 + math.pow(1 + math.pow((2 * B * Se) / (A * Sut), 2), 0.5)));
            var fs = math.pow(x, -1);
            fs = fs * 0.001;
        } else if (method == "soderberg") {
            var fs = math.pow((((16/(math.PI * math.pow(d, 3))) * ((A / Se) + (B / Syt)))), -1);
            fs = fs * 0.001;
        }
        document.getElementById("result").innerHTML = 'FS = ' + fs.toFixed(2);
    }
}
function toggletarget(show) {
      var inputtarger1 = document.getElementById('inputtarger1');
      var inputtarget2 = document.getElementById('inputtarget2');
      var fs = document.getElementById('fs');
      var d = document.getElementById('d');

      if (show == 1) {
        inputtarget2.style.display = 'block';
        inputtarger1.style.display = 'none';
        fs.required = true;
        d.required = false;
        displayResult('FS')
      } else if(show == 2){
        inputtarget2.style.display = 'none';
        inputtarger1.style.display = 'block';
        fs.required = false;
        d.required = true;
        displayResult('diameter')
      } else {
        inputtarget2.style.display = 'none';
        inputtarger1.style.display = 'none';
        fs.required = false;
        d.required = false;
        fs.value = '';
        d.value = '';
      }
      
}
function togglemethod(show) {
      var inputmethod1 = document.getElementById('inputmethod1');
      var inputmethod2 = document.getElementById('inputmethod2');
      var Syt = document.getElementById('Syt');
      var Sut = document.getElementById('Sut');

      if (show == 1) {
        inputmethod2.style.display = 'block';
        inputmethod1.style.display = 'none';
        Syt.required = true;
        Sut.required = false;
      } else if(show == 2){
        inputmethod2.style.display = 'none';
        inputmethod1.style.display = 'block';
        Syt.required = false;
        Sut.required = true;
      } else {
        inputmethod2.style.display = 'none';
        inputmethod1.style.display = 'none';
        Syt.required = false;
        Sut.required = false;
        Syt.value = '';
        Sut.value = '';
      }    
}
function toggleKtKf(show) {
      var inputKf = document.getElementById('inputKf');
      var inputKt = document.getElementById('inputKt');
      var Kt = document.getElementById('Kt');
    var Kts = document.getElementById('Kts');
    var q = document.getElementById('q');
    var qs = document.getElementById('qs');
      var Kf = document.getElementById('Kf');
    var Kfs = document.getElementById('Kfs');

      if (show == 1) {
        inputKf.style.display = 'block';
        inputKt.style.display = 'none';
        Kf.required = true;
        Kfs.required = true;
        Kt.required = false;
        Kts.required = false;
        q.required = false;
        qs.required = false;
      } else if(show == 2){
        inputKf.style.display = 'none';
        inputKt.style.display = 'block';
        Kf.required = false;
        Kfs.required = false;
        Kt.required = true;
        Kts.required = true;
        q.required = true;
        qs.required = true;
      } else {
        inputKf.style.display = 'none';
        inputKt.style.display = 'none';
        Kf.required = false;
        Kfs.required = false;
        Kt.required = false;
        Kts.required = false;
        q.required = false;
        qs.required = false;
        Kf.value = '';
        Kfs.value = '';
        Kt.value = '';
        Kts.value = '';
        q.value = '';
        qs.value = '';
      }    
}
function toggleMaxMinMA(show) {
      var inputMaxMin = document.getElementById('inputMaxMin');
      var inputAM = document.getElementById('inputAM');
      var Tmax = document.getElementById('Tmax');
    var Tmin = document.getElementById('Tmin');
    var Mmax = document.getElementById('Mmax');
    var Mmin = document.getElementById('Mmin');
    var Tm = document.getElementById('Tm');
    var Ta = document.getElementById('Ta');
    var Mm = document.getElementById('Mm');
    var Ma = document.getElementById('Ma');

      if (show == 1) {
        inputMaxMin.style.display = 'block';
        inputAM.style.display = 'none';
        Tmax.required = true;
        Tmin.required = true;
        Mmax.required = true;
        Mmin.required = true;
        Tm.required = false;
        Ta.required = false;
        Mm.required = false;
        Ma.required = false;
      } else if(show == 2){
        inputMaxMin.style.display = 'none';
        inputAM.style.display = 'block';
        Tmax.required = false;
        Tmin.required = false;
        Mmax.required = false;
        Mmin.required = false;
        Tm.required = true;
        Ta.required = true;
        Mm.required = true;
        Ma.required = true;
      } else {
        inputMaxMin.style.display = 'none';
        inputAM.style.display = 'none';
        Tmax.required = false;
        Tmin.required = false;
        Mmax.required = false;
        Mmin.required = false;
        Tm.required = false;
        Ta.required = false;
        Mm.required = false;
        Ma.required = false;
        Tmax.value = '';
        Tmin.value = '';
        Mmax.value = '';
        Mmin.value = '';
        Tm.value = '';
        Ta.value = '';
        Mm.value = '';
        Ma.value = '';
      }    
}
function displayResult(type) {
  let output;
  var result = document.getElementById('result').value || ''
  if (type === 'diameter') {
      output = 'd = ' + result + ' mm';
  } else if (type === 'FS') {
      output = 'FS = ' + result;
  } else {
      output = 'Invalid search type';
  }

  document.getElementById('result').textContent = output;
}
