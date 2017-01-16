/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.dialog.add( 'emojionetest', function( editor ) {
	var config = editor.config,
		lang = editor.lang.smiley,
		images = config.smiley_images,
		food_and_drink_images = config.food_and_drink_images,
		people_images = config.people_images,
		nature_images = config.nature_images,
		food_images = config.food_images,
		activity_images = config.activity_images,
		travel_images = config.travel_images,
		object_images = config.object_images,
		symbol_images = config.symbol_images,
		columns = config.smiley_columns || 8,
		i;

	// Simulate "this" of a dialog for non-dialog events.
	// @type {CKEDITOR.dialog}
	var dialog;
	var onClick = function( evt ) {
			var target = evt.data.getTarget(),
				targetName = target.getName();

			if ( targetName == 'a' )
				target = target.getChild( 0 );
			else if ( targetName != 'img' )
				return;

			var src = target.getAttribute( 'cke_src' ),
				title = target.getAttribute( 'title' );

			var img = editor.document.createElement( 'img', {
				attributes: {
					src: src,
					'data-cke-saved-src': src,
					title: title,
					alt: title,
					width: target.$.width,
					height: target.$.height
				}
			} );

			editor.insertElement( img );

			// dialog.hide(); to prevent it from closing
			evt.data.preventDefault();
		};

	var onKeydown = CKEDITOR.tools.addFunction( function( ev, element ) {
		ev = new CKEDITOR.dom.event( ev );
		element = new CKEDITOR.dom.element( element );
		var relative, nodeToMove;

		var keystroke = ev.getKeystroke(),
			rtl = editor.lang.dir == 'rtl';
		switch ( keystroke ) {
			// UP-ARROW
			case 38:
				// relative is TR
				if ( ( relative = element.getParent().getParent().getPrevious() ) ) {
					nodeToMove = relative.getChild( [ element.getParent().getIndex(), 0 ] );
					nodeToMove.focus();
				}
				ev.preventDefault();
				break;
				// DOWN-ARROW
			case 40:
				// relative is TR
				if ( ( relative = element.getParent().getParent().getNext() ) ) {
					nodeToMove = relative.getChild( [ element.getParent().getIndex(), 0 ] );
					if ( nodeToMove )
						nodeToMove.focus();
				}
				ev.preventDefault();
				break;
				// ENTER
				// SPACE
			case 32:
				onClick( { data: ev } );
				ev.preventDefault();
				break;

				// RIGHT-ARROW
			case rtl ? 37 : 39:
				// relative is TD
				if ( ( relative = element.getParent().getNext() ) ) {
					nodeToMove = relative.getChild( 0 );
					nodeToMove.focus();
					ev.preventDefault( true );
				}
				// relative is TR
				else if ( ( relative = element.getParent().getParent().getNext() ) ) {
					nodeToMove = relative.getChild( [ 0, 0 ] );
					if ( nodeToMove )
						nodeToMove.focus();
					ev.preventDefault( true );
				}
				break;

				// LEFT-ARROW
			case rtl ? 39 : 37:
				// relative is TD
				if ( ( relative = element.getParent().getPrevious() ) ) {
					nodeToMove = relative.getChild( 0 );
					nodeToMove.focus();
					ev.preventDefault( true );
				}
				// relative is TR
				else if ( ( relative = element.getParent().getParent().getPrevious() ) ) {
					nodeToMove = relative.getLast().getChild( 0 );
					nodeToMove.focus();
					ev.preventDefault( true );
				}
				break;
			default:
				// Do not stop not handled events.
				return;
		}
	} );

	// Build the HTML for the smiley images table.
	var labelId = CKEDITOR.tools.getNextId() + '_smiley_emtions_label';

	// PEOPLE HTML + PEOPLE SELECTOR
	var people_html = [
		'<div>' +
		'<span id="' + labelId + '" class="cke_voice_label">' + lang.options + '</span>',
		'<table role="listbox" aria-labelledby="' + labelId + '" style="width:100%;height:100%;border-collapse:separate;" cellspacing="2" cellpadding="2"',
		CKEDITOR.env.ie && CKEDITOR.env.quirks ? ' style="position:absolute;"' : '',
		'><tbody>'
	];

	var people_size = people_images.length;
	for ( i = 0; i < people_size; i++ ) {
		if ( i % columns === 0 )
			people_html.push( '<tr role="presentation">' );

		var smileyLabelId = 'cke_smile_label_' + i + '_' + CKEDITOR.tools.getNextNumber();
		people_html.push(
			'<td class="cke_dark_background cke_centered" style="vertical-align: middle;" role="presentation">' +
			'<a style="background-color: white" href="javascript:void(0)" role="option"', ' aria-posinset="' + ( i + 1 ) + '"', ' aria-setsize="' + people_size + '"', ' aria-labelledby="' + smileyLabelId + '"',
			' class="cke_smile cke_hand" tabindex="-1" onkeydown="CKEDITOR.tools.callFunction( ', onKeydown, ', event, this );">',
			'<img class="cke_hand" style="width:30px; height:30px" title="', '"' +
			' cke_src="', CKEDITOR.tools.htmlEncode( config.people_path + people_images[ i ] ), '" alt="', '"',
			' src="', CKEDITOR.tools.htmlEncode( config.people_path + people_images[ i ] ), '"',
			// IE BUG: Below is a workaround to an IE image loading bug to ensure the image sizes are correct.
			( CKEDITOR.env.ie ? ' onload="this.setAttribute(\'width\', 2); this.removeAttribute(\'width\');" ' : '' ), '>' +
			'<span id="' + smileyLabelId + '" class="cke_voice_label">' + '</span>' +
			'</a>', '</td>'
		);

		if ( i % columns == columns - 1 )
			people_html.push( '</tr>' );
	}

	var peopleSelector = {
		type: 'html',
		id: 'peopleSelector',
		html: people_html.join( '' ),
		onLoad: function( event ) {
			dialog = event.sender;
		},
		focus: function() {
			var self = this;
			// IE need a while to move the focus (#6539).
			setTimeout( function() {
				var firstSmile = self.getElement().getElementsByTag( 'a' ).getItem( 0 );
				firstSmile.focus();
			}, 0 );
		},
		onClick: onClick,
		style: 'width: 100%; border-collapse: separate;'
	};

	// NATURE HTML + NATURE SELECTOR
	var nature_html = [
		'<div>' +
		'<span id="' + labelId + '" class="cke_voice_label">' + lang.options + '</span>',
		'<table role="listbox" aria-labelledby="' + labelId + '" style="width:100%;height:100%;border-collapse:separate;" cellspacing="2" cellpadding="2"',
		CKEDITOR.env.ie && CKEDITOR.env.quirks ? ' style="position:absolute;"' : '',
		'><tbody>'
	];

	var nature_size = nature_images.length;
	for ( i = 0; i < nature_size; i++ ) {
		if ( i % columns === 0 )
			nature_html.push( '<tr role="presentation">' );

		var smileyLabelId = 'cke_smile_label_' + i + '_' + CKEDITOR.tools.getNextNumber();
		nature_html.push(
			'<td class="cke_dark_background cke_centered" style="vertical-align: middle;" role="presentation">' +
			'<a style="background-color: white" href="javascript:void(0)" role="option"', ' aria-posinset="' + ( i + 1 ) + '"', ' aria-setsize="' + nature_size + '"', ' aria-labelledby="' + smileyLabelId + '"',
			' class="cke_smile cke_hand" tabindex="-1" onkeydown="CKEDITOR.tools.callFunction( ', onKeydown, ', event, this );">',
			'<img class="cke_hand" style="width:30px; height:30px" title="', '"' +
			' cke_src="', CKEDITOR.tools.htmlEncode( config.nature_path + nature_images[ i ] ), '" alt="', '"',
			' src="', CKEDITOR.tools.htmlEncode( config.nature_path + nature_images[ i ] ), '"',
			// IE BUG: Below is a workaround to an IE image loading bug to ensure the image sizes are correct.
			( CKEDITOR.env.ie ? ' onload="this.setAttribute(\'width\', 2); this.removeAttribute(\'width\');" ' : '' ), '>' +
			'<span id="' + smileyLabelId + '" class="cke_voice_label">' + '</span>' +
			'</a>', '</td>'
		);

		if ( i % columns == columns - 1 )
			nature_html.push( '</tr>' );
	}

	var natureSelector = {
		type: 'html',
		id: 'natureSelector',
		html: nature_html.join( '' ),
		onLoad: function( event ) {
			dialog = event.sender;
		},
		focus: function() {
			var self = this;
			// IE need a while to move the focus (#6539).
			setTimeout( function() {
				var firstSmile = self.getElement().getElementsByTag( 'a' ).getItem( 0 );
				firstSmile.focus();
			}, 0 );
		},
		onClick: onClick,
		style: 'width: 100%; border-collapse: separate;'
	};

	// FOOD HTML + FOOD SELECTOR
	var food_html = [
		'<div>' +
		'<span id="' + labelId + '" class="cke_voice_label">' + lang.options + '</span>',
		'<table role="listbox" aria-labelledby="' + labelId + '" style="width:100%;height:100%;border-collapse:separate;" cellspacing="2" cellpadding="2"',
		CKEDITOR.env.ie && CKEDITOR.env.quirks ? ' style="position:absolute;"' : '',
		'><tbody>'
	];

	var food_size = food_images.length;
	for ( i = 0; i < food_size; i++ ) {
		if ( i % columns === 0 )
			food_html.push( '<tr role="presentation">' );

		var smileyLabelId = 'cke_smile_label_' + i + '_' + CKEDITOR.tools.getNextNumber();
		food_html.push(
			'<td class="cke_dark_background cke_centered" style="vertical-align: middle;" role="presentation">' +
			'<a style="background-color: white" href="javascript:void(0)" role="option"', ' aria-posinset="' + ( i + 1 ) + '"', ' aria-setsize="' + food_size + '"', ' aria-labelledby="' + smileyLabelId + '"',
			' class="cke_smile cke_hand" tabindex="-1" onkeydown="CKEDITOR.tools.callFunction( ', onKeydown, ', event, this );">',
			'<img class="cke_hand" style="width:30px; height:30px" title="', '"' +
			' cke_src="', CKEDITOR.tools.htmlEncode( config.food_path + food_images[ i ] ), '" alt="', '"',
			' src="', CKEDITOR.tools.htmlEncode( config.food_path + food_images[ i ] ), '"',
			// IE BUG: Below is a workaround to an IE image loading bug to ensure the image sizes are correct.
			( CKEDITOR.env.ie ? ' onload="this.setAttribute(\'width\', 2); this.removeAttribute(\'width\');" ' : '' ), '>' +
			'<span id="' + smileyLabelId + '" class="cke_voice_label">' + '</span>' +
			'</a>', '</td>'
		);

		if ( i % columns == columns - 1 )
			food_html.push( '</tr>' );
	}

	var foodSelector = {
		type: 'html',
		id: 'foodSelector',
		html: food_html.join( '' ),
		onLoad: function( event ) {
			dialog = event.sender;
		},
		focus: function() {
			var self = this;
			// IE need a while to move the focus (#6539).
			setTimeout( function() {
				var firstSmile = self.getElement().getElementsByTag( 'a' ).getItem( 0 );
				firstSmile.focus();
			}, 0 );
		},
		onClick: onClick,
		style: 'width: 100%; border-collapse: separate;'
	};

	// ACTIVITY HTML + ACTIVITY SELECTOR
	var activity_html = [
		'<div>' +
		'<span id="' + labelId + '" class="cke_voice_label">' + lang.options + '</span>',
		'<table role="listbox" aria-labelledby="' + labelId + '" style="width:100%;height:100%;border-collapse:separate;" cellspacing="2" cellpadding="2"',
		CKEDITOR.env.ie && CKEDITOR.env.quirks ? ' style="position:absolute;"' : '',
		'><tbody>'
	];

	var activity_size = activity_images.length;
	for ( i = 0; i < activity_size; i++ ) {
		if ( i % columns === 0 )
			activity_html.push( '<tr role="presentation">' );

		var smileyLabelId = 'cke_smile_label_' + i + '_' + CKEDITOR.tools.getNextNumber();
		activity_html.push(
			'<td class="cke_dark_background cke_centered" style="vertical-align: middle;" role="presentation">' +
			'<a style="background-color: white" href="javascript:void(0)" role="option"', ' aria-posinset="' + ( i + 1 ) + '"', ' aria-setsize="' + activity_size + '"', ' aria-labelledby="' + smileyLabelId + '"',
			' class="cke_smile cke_hand" tabindex="-1" onkeydown="CKEDITOR.tools.callFunction( ', onKeydown, ', event, this );">',
			'<img class="cke_hand" style="width:30px; height:30px" title="', '"' +
			' cke_src="', CKEDITOR.tools.htmlEncode( config.activity_path + activity_images[ i ] ), '" alt="', '"',
			' src="', CKEDITOR.tools.htmlEncode( config.activity_path + activity_images[ i ] ), '"',
			// IE BUG: Below is a workaround to an IE image loading bug to ensure the image sizes are correct.
			( CKEDITOR.env.ie ? ' onload="this.setAttribute(\'width\', 2); this.removeAttribute(\'width\');" ' : '' ), '>' +
			'<span id="' + smileyLabelId + '" class="cke_voice_label">' + '</span>' +
			'</a>', '</td>'
		);

		if ( i % columns == columns - 1 )
			activity_html.push( '</tr>' );
	}

	var activitySelector = {
		type: 'html',
		id: 'activitySelector',
		html: activity_html.join( '' ),
		onLoad: function( event ) {
			dialog = event.sender;
		},
		focus: function() {
			var self = this;
			// IE need a while to move the focus (#6539).
			setTimeout( function() {
				var firstSmile = self.getElement().getElementsByTag( 'a' ).getItem( 0 );
				firstSmile.focus();
			}, 0 );
		},
		onClick: onClick,
		style: 'width: 100%; border-collapse: separate;'
	};

	// TRAVEL HTML + TRAVEL SELECTOR
	var travel_html = [
		'<div>' +
		'<span id="' + labelId + '" class="cke_voice_label">' + lang.options + '</span>',
		'<table role="listbox" aria-labelledby="' + labelId + '" style="width:100%;height:100%;border-collapse:separate;" cellspacing="2" cellpadding="2"',
		CKEDITOR.env.ie && CKEDITOR.env.quirks ? ' style="position:absolute;"' : '',
		'><tbody>'
	];

	var travel_size = travel_images.length;
	for ( i = 0; i < travel_size; i++ ) {
		if ( i % columns === 0 )
			travel_html.push( '<tr role="presentation">' );

		var smileyLabelId = 'cke_smile_label_' + i + '_' + CKEDITOR.tools.getNextNumber();
		travel_html.push(
			'<td class="cke_dark_background cke_centered" style="vertical-align: middle;" role="presentation">' +
			'<a style="background-color: white" href="javascript:void(0)" role="option"', ' aria-posinset="' + ( i + 1 ) + '"', ' aria-setsize="' + travel_size + '"', ' aria-labelledby="' + smileyLabelId + '"',
			' class="cke_smile cke_hand" tabindex="-1" onkeydown="CKEDITOR.tools.callFunction( ', onKeydown, ', event, this );">',
			'<img class="cke_hand" style="width:30px; height:30px" title="', '"' +
			' cke_src="', CKEDITOR.tools.htmlEncode( config.travel_path + travel_images[ i ] ), '" alt="', '"',
			' src="', CKEDITOR.tools.htmlEncode( config.travel_path + travel_images[ i ] ), '"',
			// IE BUG: Below is a workaround to an IE image loading bug to ensure the image sizes are correct.
			( CKEDITOR.env.ie ? ' onload="this.setAttribute(\'width\', 2); this.removeAttribute(\'width\');" ' : '' ), '>' +
			'<span id="' + smileyLabelId + '" class="cke_voice_label">' + '</span>' +
			'</a>', '</td>'
		);

		if ( i % columns == columns - 1 )
			travel_html.push( '</tr>' );
	}

	var travelSelector = {
		type: 'html',
		id: 'travelSelector',
		html: travel_html.join( '' ),
		onLoad: function( event ) {
			dialog = event.sender;
		},
		focus: function() {
			var self = this;
			// IE need a while to move the focus (#6539).
			setTimeout( function() {
				var firstSmile = self.getElement().getElementsByTag( 'a' ).getItem( 0 );
				firstSmile.focus();
			}, 0 );
		},
		onClick: onClick,
		style: 'width: 100%; border-collapse: separate;'
	};

	// OBJECT HTML + OBJECT SELECTOR
	var object_html = [
		'<div>' +
		'<span id="' + labelId + '" class="cke_voice_label">' + lang.options + '</span>',
		'<table role="listbox" aria-labelledby="' + labelId + '" style="width:100%;height:100%;border-collapse:separate;" cellspacing="2" cellpadding="2"',
		CKEDITOR.env.ie && CKEDITOR.env.quirks ? ' style="position:absolute;"' : '',
		'><tbody>'
	];

	var object_size = object_images.length;
	for ( i = 0; i < object_size; i++ ) {
		if ( i % columns === 0 )
			object_html.push( '<tr role="presentation">' );

		var smileyLabelId = 'cke_smile_label_' + i + '_' + CKEDITOR.tools.getNextNumber();
		object_html.push(
			'<td class="cke_dark_background cke_centered" style="vertical-align: middle;" role="presentation">' +
			'<a style="background-color: white" href="javascript:void(0)" role="option"', ' aria-posinset="' + ( i + 1 ) + '"', ' aria-setsize="' + object_size + '"', ' aria-labelledby="' + smileyLabelId + '"',
			' class="cke_smile cke_hand" tabindex="-1" onkeydown="CKEDITOR.tools.callFunction( ', onKeydown, ', event, this );">',
			'<img class="cke_hand" style="width:30px; height:30px" title="', '"' +
			' cke_src="', CKEDITOR.tools.htmlEncode( config.object_path + object_images[ i ] ), '" alt="', '"',
			' src="', CKEDITOR.tools.htmlEncode( config.object_path + object_images[ i ] ), '"',
			// IE BUG: Below is a workaround to an IE image loading bug to ensure the image sizes are correct.
			( CKEDITOR.env.ie ? ' onload="this.setAttribute(\'width\', 2); this.removeAttribute(\'width\');" ' : '' ), '>' +
			'<span id="' + smileyLabelId + '" class="cke_voice_label">' + '</span>' +
			'</a>', '</td>'
		);

		if ( i % columns == columns - 1 )
			object_html.push( '</tr>' );
	}

	var objectSelector = {
		type: 'html',
		id: 'objectSelector',
		html: object_html.join( '' ),
		onLoad: function( event ) {
			dialog = event.sender;
		},
		focus: function() {
			var self = this;
			// IE need a while to move the focus (#6539).
			setTimeout( function() {
				var firstSmile = self.getElement().getElementsByTag( 'a' ).getItem( 0 );
				firstSmile.focus();
			}, 0 );
		},
		onClick: onClick,
		style: 'width: 100%; border-collapse: separate;'
	};

	// SYMBOL HTML + SYMBOL SELECTOR
	var symbol_html = [
		'<div>' +
		'<span id="' + labelId + '" class="cke_voice_label">' + lang.options + '</span>',
		'<table role="listbox" aria-labelledby="' + labelId + '" style="width:100%;height:100%;border-collapse:separate;" cellspacing="2" cellpadding="2"',
		CKEDITOR.env.ie && CKEDITOR.env.quirks ? ' style="position:absolute;"' : '',
		'><tbody>'
	];

	var symbol_size = symbol_images.length;
	for ( i = 0; i < symbol_size; i++ ) {
		if ( i % columns === 0 )
			symbol_html.push( '<tr role="presentation">' );

		var smileyLabelId = 'cke_smile_label_' + i + '_' + CKEDITOR.tools.getNextNumber();
		symbol_html.push(
			'<td class="cke_dark_background cke_centered" style="vertical-align: middle;" role="presentation">' +
			'<a style="background-color: white" href="javascript:void(0)" role="option"', ' aria-posinset="' + ( i + 1 ) + '"', ' aria-setsize="' + symbol_size + '"', ' aria-labelledby="' + smileyLabelId + '"',
			' class="cke_smile cke_hand" tabindex="-1" onkeydown="CKEDITOR.tools.callFunction( ', onKeydown, ', event, this );">',
			'<img class="cke_hand" style="width:30px; height:30px" title="', '"' +
			' cke_src="', CKEDITOR.tools.htmlEncode( config.symbol_path + symbol_images[ i ] ), '" alt="', '"',
			' src="', CKEDITOR.tools.htmlEncode( config.symbol_path + symbol_images[ i ] ), '"',
			// IE BUG: Below is a workaround to an IE image loading bug to ensure the image sizes are correct.
			( CKEDITOR.env.ie ? ' onload="this.setAttribute(\'width\', 2); this.removeAttribute(\'width\');" ' : '' ), '>' +
			'<span id="' + smileyLabelId + '" class="cke_voice_label">' + '</span>' +
			'</a>', '</td>'
		);

		if ( i % columns == columns - 1 )
			symbol_html.push( '</tr>' );
	}

	var symbolSelector = {
		type: 'html',
		id: 'symbolSelector',
		html: symbol_html.join( '' ),
		onLoad: function( event ) {
			dialog = event.sender;
		},
		focus: function() {
			var self = this;
			// IE need a while to move the focus (#6539).
			setTimeout( function() {
				var firstSmile = self.getElement().getElementsByTag( 'a' ).getItem( 0 );
				firstSmile.focus();
			}, 0 );
		},
		onClick: onClick,
		style: 'width: 100%; border-collapse: separate;'
	};

	// return the dialog
	return {
		title: "Emojis",
		minWidth: 270,
		minHeight: 120,
		contents: [
			{
				id: 'people',
				label: 'Smileys & People',
				expand: true,
				padding: 0,
				elements: [
					peopleSelector
				]
			},	{
				id: 'nature',
				label: 'Animals & Nature',
				expand: true,
				padding: 0,
				elements: [
					natureSelector
				]
			},	{
				id: 'food',
				label: 'Food & Drink',
				expand: true,
				padding: 0,
				elements: [
					foodSelector
				]
			},	{
				id: 'activity',
				label: 'Activity',
				expand: true,
				padding: 0,
				elements: [
					activitySelector
				]
			},	{
				id: 'travel',
				label: 'Travel & Places',
				expand: true,
				padding: 0,
				elements: [
					travelSelector
				]
			},	{
				id: 'object',
				label: 'Objects',
				expand: true,
				padding: 0,
				elements: [
					objectSelector
				]
			},	{
				id: 'symbol',
				label: 'Symbols',
				expand: true,
				padding: 0,
				elements: [
					symbolSelector
				]
			}
		],
		buttons: [ CKEDITOR.dialog.cancelButton ]
	};
} );
