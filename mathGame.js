var probArray = ["-", "*", "+"];
var random = function(max, min){
	return Math.floor(Math.random()*(max-min)) + min;
};

var problemtype = probArray[random(3,0)];

var randomDigits = function(max, min, digits){
};

var generateProblem = function(){
	var x = random(10,5);
	var y = random(10,0);

	if(Math.min(x,y) == x){
		return {'x': y, 'op':problemtype, 'y': x };
	}else{
		return {'x': x, 'op':problemtype, 'y': y };
	}
};

var initializePage = function () {
	$('.inputAnswer').parent().addClass('inactive');
	$('#correctSum').html($('.correct').length);
	$('#incorrectSum').html($('.incorrect').length);
	$('#unansweredSum').html($('.inactive').length);

};


$(function() {
	for(var i = 0; i < 12; i++){
		var p = generateProblem();
		$('#workspace').append("<div class='problem' id='problem_"+i+"'><span id='px_"+i+"' class='px'>" + p.x + "</span><br />" +
			"<span class='op'>" + p.op + "</span>" +
			"<span id='py_"+i+"' class='py'>" + p.y + "</span>" +
			"<span class='answer'><input type='text' class='inputAnswer' name='test_"+i+"' id='test_"+i+"' /></span></div>");
	}
	var init = initializePage();
	$('.inputAnswer').blur(function() {
		var currentId = $(this).attr('id').split('_');
		var xValue = 'px_'+currentId[1];
		var yValue = 'py_'+currentId[1];
		
		if (problemtype == '+') {
		var ans = ($('#'+xValue).html()*1) + ($('#'+yValue).html()*1);
		}
		if (problemtype == '-') {
		var ans = ($('#'+xValue).html()*1) - ($('#'+yValue).html()*1);
		}
		if (problemtype == '*') {
		var ans = ($('#'+xValue).html()*1) * ($('#'+yValue).html()*1);
		}
//		console.log(ans);
		if (ans == $(this).val()) {
			$('#test_'+currentId[1]).removeClass('incorrect').addClass("correct");
		} 
		if (ans != $(this).val() && $(this).val().length>0) {
			$('#test_'+currentId[1]).removeClass( "correct" ).addClass( "incorrect" );			
		}		
	});
	$('.inputAnswer').focus(function() {			
			$(this).parent()
				   .removeClass( "inactive" )
				   .addClass('active');
			$('#correctSum').html($('.correct').length);
			$('#incorrectSum').html($('.incorrect').length);
	});
	$('input').blur(function() {
			$(this).parent()
				   .removeClass( "active" )
				   .addClass('inactive');
			$('#correctSum').html($('.correct').length);
			$('#incorrectSum').html($('.incorrect').length);			
			$('#unansweredSum').html(' ').html($('input:text[value=""]').length);
			console.log($('input:text[value=""]').length)
	});
	
	
});
