//***********************************************************
//  mathGame.js
//  created by Chris Murphy
//  repo https://github.com/christophermurphy/mathGame
//  
//  
//  
//***********************************************************



var problemTypes = [{"id"   : 0, 
                   "name" : "Subtraction" , 
                   "symbol" : "-"},
                  {"id"   : 1, 
                   "name" : "Addition" , 
                   "symbol" : "+"},
                  {"id"   : 2, 
                   "name" : "Multiplication" , 
                   "symbol" : "*"}];

var random = function (max, min) {
    'use strict';
	return Math.floor(Math.random() * (max - min)) + min;
};

var problemType = problemTypes[random(problemTypes.length, 0)].symbol;

var randomDigits = function (max, min, digits) {
    'use strict';
};


// Read the object problemTypes and create a checkbox for each item on the page
// input the object problemTypes
// returns DOM elements appended to the page
var listProblemTypes = function () {
    'use strict';
    var i;
    for (i=0; i<problemTypes.length; i++) {
		$('#problem-type-container').append('<div class="col-md-4"><label for="' + problemTypes[i].name + '">' + problemTypes[i].name + ' ' + problemTypes[i].symbol + '</label> <input type="checkbox" id=\"' + problemTypes[i].name + '" name="' + problemTypes[i].name + '" value="' + problemTypes[i].name + '" checked="checked" class="inset"/></div>');
    }
}


// Create the values for a problem and return an object
// input none
// output an object 
var generateProblem = function () {
    'use strict';
	var x = random(10, 0),
        y = random(10, 0),
        probVals = {};

	if (Math.min(x, y) === x) {
		probVals = {"x": y, "op": problemType, "y": x };
	} else {
		probVals =  {"x": x, "op": problemType, "y": y };
	}
    return probVals;
};

var checkAnswer = function (problemType, xValue, yValue) {
    'use strict';
    var correctAnswer;
    if (problemType === '+') {
		correctAnswer = ($('#' + xValue).html() * 1) + ($('#' + yValue).html() * 1);
	}
	if (problemType === '-') {
		correctAnswer = ($('#' + xValue).html() * 1) - ($('#' + yValue).html() * 1);
	}
	if (problemType === '*') {
		correctAnswer = ($('#' + xValue).html() * 1) * ($('#' + yValue).html() * 1);
	}
    return correctAnswer;
};

var initializePage = function () {
    'use strict';
	$('.inputAnswer').parent().addClass('inactive');
	$('#correctSum').html($('.correct').length);
	$('#incorrectSum').html($('.incorrect').length);
	$('#unansweredSum').html($('.inactive').length);
    listProblemTypes();
};

$(function () {
    'use strict';
	var numberOfQuestions = 12,         // How many problems should I create
        i,                              // Counter to create the number of problems
        p;                              // The current problem
	for (i = 0; i < numberOfQuestions; i++) {
		p = generateProblem();
		$('#workspace').append("<div class='problem' id='problem_" + i + "'><span id='px_" + i + "' class='px'>" + p.x + "</span><br />" +
			"<span class='op'>" + p.op + "</span>" +
			"<span id='py_" + i + "' class='py'>" + p.y + "</span>" +
			"<span class='answer'><input type='text' class='inputAnswer' name='test_" + i + "' id='test_" + i + "' value='' /></span></div>");
	}
	var init = initializePage();
	$('.inputAnswer').blur(function () {
		var currentId = $(this).attr('id').split('_'),
		    xValue = 'px_' + currentId[1],
		    yValue = 'py_' + currentId[1],
		    ans = checkAnswer(problemType, xValue, yValue);

            if (ans == $(this).val()) {
			$('#test_' + currentId[1]).removeClass('incorrect').addClass("correct");
		}
		if (ans != $(this).val() && $(this).val().length > 0) {
			$('#test_' + currentId[1]).removeClass("correct").addClass("incorrect");
		}
        $(this).parent()
            .removeClass('active')
            .addClass('inactive');
		$('#correctSum').html($('.correct').length);
		$('#incorrectSum').html($('.incorrect').length);
		var unanswered = numberOfQuestions - 
			(
				$('.correct').length +
				$('.incorrect').length
			);
		$('#unansweredSum').html('').html(unanswered);
//		console.log(unanswered);

	});
	$('.inputAnswer').focus(function () {
		$(this).parent()
			   .removeClass('inactive')
			   .addClass('active');
		$('#correctSum').html($('.correct').length);
		$('#incorrectSum').html($('.incorrect').length);
	});
    $('#page-content-wrapper').hide().fadeIn('5200');
    $('#test_0').focus();

});
