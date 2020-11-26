var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();

function startJapa(){
    navigator.vibrate = navigator.vibrate ||
                  navigator.webkitVibrate ||
                  navigator.mozVibrate || 
                  navigator.msVibrate;
    var iBeads = parseInt(document.getElementById('beads').innerHTML, 0);
    var iRounds = parseInt(document.getElementById('rounds').innerHTML, 0);
    if(108 == iBeads)
    {
        iRounds = isNaN(iRounds) ? 0 : iRounds;
        iBeads = 0;
        iRounds++;
        document.getElementById("rounds").innerHTML = iRounds;
        document.getElementById("beads").innerHTML = '<span class="beadsStart">Start Japa</span>';
        if (navigator.vibrate) {
            navigator.vibrate(1000);
        }
    }
    else
    {
        iBeads = isNaN(iBeads) ? 0 : iBeads;
        iBeads++;
        document.getElementById("beads").innerHTML = iBeads;
    }
}