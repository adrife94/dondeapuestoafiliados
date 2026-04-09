/*!
 * Simple Age Verification (https://github.com/Herudea/age-verification))
 */

var modal_content,
modal_screen;

// Start Working ASAP.
$(document).ready(function() {
	av_legality_check();
});


av_legality_check = function() {
	if ($.cookie('is_legal') == "no") {
		// legal!
		// Do nothing?
	} else {
		av_showmodal();

		// Make sure the prompt stays in the middle.
		$(window).on('resize', av_positionPrompt);
	}
};

av_showmodal = function() {
	modal_screen = $('<div id="modal_screen"></div>');
	modal_content = $('<div id="modal_content"></div>');
	var modal_content_wrapper = $('<div id="modal_content_wrapper" class="content_wrapper"></div>');
	var modal_regret_wrapper = $('<div id="modal_regret_wrapper" class="content_wrapper" style="display:none;"></div>');

	// Question Content
	var content_heading = $('<h2>¿Tienes mas de 18 años de edad?</h2>');
  var content_text = $('<p>Este sitio, junto con las casas de apuestas, esta dirigido a personas mayores de 18 años. Nuestro objetivo es garantizar un juego responsable, es decir, un juego justo, integro, fiable y transparente. El juego puede generar adiccion, por favor juega de forma responsable. Para seguir navegando en nuestro sitio web deberas confirmar tu edad.</p>');
	var content_buttons = $('<nav><ul><li><a href="#nothing" class="av_btn av_go" rel="yes">SÍ</a></li><li><a href="#nothing" class="av_btn av_no" rel="no">NO</a></li></nav>');


	// Regret Content
	var regret_heading = $('<h2>¡LO LAMENTAMOS!</h2>');
	var regret_buttons = $('<nav><small>¡Apreté el botón equivocado!</small> <ul><li><a href="#nothing" class="av_btn av_go" rel="yes">Soy mayor de edad</a></li></ul></nav>');
	var regret_text = $('<p>Debe tener 18 años o más para ingresar a este sitio.</p>');

	modal_content_wrapper.append(content_heading, content_text, content_buttons);
	modal_regret_wrapper.append(regret_heading, regret_buttons, regret_text);
	modal_content.append(modal_content_wrapper, modal_regret_wrapper);

	// Append the prompt to the end of the document
	$('body').append(modal_screen, modal_content);

	// Center the box
	av_positionPrompt();

	modal_content.find('a.av_btn').on('click', av_setCookie);
};

av_setCookie = function(e) {
	e.preventDefault();

	var is_legal = $(e.currentTarget).attr('rel');

	$.cookie('is_legal', is_legal, {
		expires: 30,
		path: '/'
	});

	if (is_legal == "yes") {
		av_closeModal();
		$(window).off('resize');
	} else {
		av_showRegret();
	}
};

av_closeModal = function() {
	modal_content.fadeOut();
	modal_screen.fadeOut();
};

av_showRegret = function() {
	modal_screen.addClass('nope');
	modal_content.find('#modal_content_wrapper').hide();
	modal_content.find('#modal_regret_wrapper').show();
};

av_positionPrompt = function() {
	var top = ($(window).outerHeight() - $('#modal_content').outerHeight()) / 2;
	var left = ($(window).outerWidth() - $('#modal_content').outerWidth()) / 2;
	modal_content.css({
		'top': top,
		'left': left
	});

	if (modal_content.is(':hidden') && ($.cookie('is_legal') != "yes")) {
		modal_content.fadeIn('slow')
	}
};
