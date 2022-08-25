// ¯\_(ツ)_/¯
$("#beadsButton").on("click", function () {
  navigator.vibrate =
    navigator.vibrate ||
    navigator.webkitVibrate ||
    navigator.mozVibrate ||
    navigator.msVibrate;
  var iBeads = parseInt($("#beads").text(), 0);
  var iRounds = parseInt($("#rounds").text(), 0);
  if (108 == iBeads) {
    iRounds = isNaN(iRounds) ? 0 : iRounds;
    iBeads = 0;
    iRounds++;
    $("#beadsButton").addClass("beadsButtonChange");
    $("#beads").css("display", "hidden");
    $("#rounds").text(iRounds);
    $("#beadsButton").html(
      '<span id="beads" style="display: none;"></span><img src="./img/panchatatva_mantra.png" width="180" height="180" id="panchatatva" alt="Panchatatva Mantra" />'
    );
    if (navigator.vibrate) {
      navigator.vibrate(1000);
    }
  } else {
    iBeads = isNaN(iBeads) ? 0 : iBeads;
    iBeads++;
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    $("#beads").css("display", "block");
    $("#beads").text(iBeads);
    $("#panchatatva").css("display", "none");
  }
});
