$(document).ready(function() {
	function reorient(e) {
		var orientation = window.screen.orientation.type;
		$("#landscapediv").remove();

		if (orientation == 'landscape-primary' || orientation == 'landscape-secondary') {
			var div = "<div id='landscapediv' class='landscapediv'><div class='landscape-flex'><div class='landscape-bg'></div><div class='landscape-heading'>Please rotate your device</div><div class='landscape-text'>We don't support landscape mode yet. Please go back to portrait mode for the best experience</div></div></div>";

			if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)){
				$("body").prepend(div);
			}
		} else {
			$("#landscapediv").remove();
		}
	}
	$(window).on("orientationchange", function() {
		reorient();
	});
	window.setTimeout(reorient, 0);
});