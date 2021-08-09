function startJapa() {
  navigator.vibrate =
    navigator.vibrate ||
    navigator.webkitVibrate ||
    navigator.mozVibrate ||
    navigator.msVibrate;
  var iBeads = parseInt(document.getElementById("beads").innerHTML, 0);
  var iRounds = parseInt(document.getElementById("rounds").innerHTML, 0);
  if (108 == iBeads) {
    iRounds = isNaN(iRounds) ? 0 : iRounds;
    iBeads = 0;
    iRounds++;
    document.getElementById("beads").style.display = "hidden";
    document.getElementById("rounds").innerHTML = iRounds;
    document.getElementById("beadsButton").innerHTML =
      '<span id="beads" style="display: none;"></span><img src="./assets/images/panchatatva_mantra.png" width="180" height="180" id="panchatatva" alt="Panchatatva Mantra" />';
    if (navigator.vibrate) {
      navigator.vibrate(1000);
    }
  } else {
    iBeads = isNaN(iBeads) ? 0 : iBeads;
    iBeads++;
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    document.getElementById("beads").style.display = "block";
    document.getElementById("beads").innerHTML = iBeads;
    document.getElementById("panchatatva").style.display = "none";
  }
}
