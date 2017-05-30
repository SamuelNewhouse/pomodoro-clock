$(function () {
	var curState = "idle";
	var startWorkMins = 25;
	var startBreakMins = 5;
	var curTimer = undefined;

	function sub1Floor1 (strInt) {
		var int = parseInt(strInt);
		return --int < 1 ? 1 : int;
	}
	function add1Ciel99 (strInt) {
		var int = parseInt(strInt);
		return ++int > 99 ? 99 : int;
	}
	function updateIdleTimer (mins) {
		if(curState === "idle")
			$("#time-display").html("<h4>" + (mins < 10 ? "0" + mins : mins) + ":00" + "</h4>");
	}
	function resetTimer(timer) {
		clearInterval(timer);
		curState = "idle";
		$("#action-button").html("<h2>Start</h2>");
		updateIdleTimer(startWorkMins);
		$("#fill").css("width", "0%");
	}

	function startTimer(mins) {
		var startTime = new Date;
		var timerms = mins * 60000 + 900; // Date is in milliseconds. 1 extra second to account for Math.floor()

		$("#action-button").html("<h4>Reset</h4>");
		$("#time-display").html("<h1>" + (mins < 10 ? "0" + mins : mins) + ":00" + "</h1>");

		return setInterval(function() {
			var counterTime = timerms - (Date.now() - startTime);			

			if(counterTime <= 0) {
				counterTime = 0;
				if( curState === "working" ) {
					startTime = new Date;
					timerms = startBreakMins * 60000 + 900;
					curState = "breaking";
				}
				else {
					resetTimer(curTimer);					
					return;
				}
			}

			if(curState === "working")
				$("#fill").css("background-color", "#87af87");
			else
				$("#fill").css("background-color", "#8787af");

			var fillPercent = (timerms - counterTime) / timerms * 100;
			$("#fill").css("width", fillPercent + "%");

			var displayMins = Math.floor(counterTime / 60000);
			counterTime -= 60000 * displayMins;
			var displaySeconds = Math.floor(counterTime / 1000);

			displayMins = displayMins < 10 ? "0" + displayMins : displayMins;
			displaySeconds = displaySeconds < 10 ? "0" + displaySeconds : displaySeconds;
			$("#time-display h1").html(displayMins + ":" + displaySeconds);
		}, 100);
	}

	$("#work-time-minus").click(function() {
		startWorkMins = sub1Floor1($("#work-time").html());
		$("#work-time").html(startWorkMins);
		updateIdleTimer(startWorkMins);
	});
	$("#break-time-minus").click(function() {
		startBreakMins = sub1Floor1($("#break-time").html())
		$("#break-time").html(startBreakMins);
		updateIdleTimer(startWorkMins);
	});
	$("#work-time-plus").click(function() {
		startWorkMins = add1Ciel99($("#work-time").html());
		$("#work-time").html(startWorkMins);
		updateIdleTimer(startWorkMins);
	});
	$("#break-time-plus").click(function() {
		startBreakMins = add1Ciel99($("#break-time").html())
		$("#break-time").html(startBreakMins);
		updateIdleTimer(startWorkMins);
	});

	$("#action-button").click(function() {
		if(curState === "idle") {
			curState = "working";
			curTimer = startTimer(startWorkMins);
		} else {
			resetTimer(curTimer);
		}
	});
});