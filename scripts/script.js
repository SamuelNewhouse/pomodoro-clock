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
	function startTimer(mins) {
		var startTime = new Date;		
		return setInterval(function(){
			var curTime = new Date; // *** Continue Here ***
			$("#time-display h2").html();
		});
	}

	$("#work-time-minus").click(function() {
		startWorkMins = sub1Floor1($("#work-time").html());
		$("#work-time").html(startWorkMins);
	});
	$("#break-time-minus").click(function() {
		startBreakMins = sub1Floor1($("#break-time").html())
		$("#break-time").html(startBreakMins);
	});
	$("#work-time-plus").click(function() {
		startWorkMins = add1Ciel99($("#work-time").html());
		$("#work-time").html(startWorkMins);
	});
	$("#break-time-plus").click(function() {
		startBreakMins = add1Ciel99($("#break-time").html())
		$("#break-time").html(startBreakMins);
	});

	$("#action-button").click(function() {
		if(curState === "idle") {
			curTimer = startTimer(startWorkMins);
		}
	});	
});