jQuery(document).ready(function($) {

      $('input#edit-search-block-form--2').attr('value','Enter your keyword(s)').addClass('default-keywords');
      $('input#edit-search-block-form--2').focusin(function() {
        if ( this.value == 'Enter your keyword(s)' ) {
          this.value = '';
        }
        //console.log('addlcass');
        $('input#edit-search-block-form--2').removeClass('default-keywords');
      }).focusout(function() {
        if ( this.value == '' ) {
          this.value = 'Enter your keyword(s)';
        }
        //console.log('removeclass');
        $('input#edit-search-block-form--2').addClass('default-keywords');
      });

      if($('#block-bird-taxonomies-bird-orders h2 span.plus').length == 0) {
        if($('#block-bird-taxonomies-bird-orders .content').is(':visible')) {
          $('#block-bird-taxonomies-bird-orders h2').append('<span class="plus">-</span>');
        }
        else {
          $('#block-bird-taxonomies-bird-orders h2').append('<span class="plus">+</span>');
        }
    	}
    	/*$('#block-bird-taxonomies-bird-orders .content ul li a').append('<span class="plus">+</span>');*/

      $('.orders > li > .a-wrapper > a.name').click(function() {
        plus = $(this);
        $(plus).parent().parent('li').toggleClass('selected');
		    $(this).parent().next('.item-list').children('ul').slideToggle('slow', function() {
		    });
		    return false;
    	});

    	$('.families > li > .a-wrapper > a.name').click(function() {
    	   family = $(this);
   	     $(family).parent().parent('li').toggleClass('selected');
    	   family_id = $(family).parent().parent('li').attr('id');
    	   family_id = family_id.substring(3,family_id.length);

         if(Drupal.settings.bird_taxonomies.arg[1] > 0) {
          nid_url = Drupal.settings.bird_taxonomies.arg[1];
         }
         else {
          nid_url = 0;
         }

         // Miramos si ya esta puesto y sino lo obteneos
         if($(family).parent().parent().children('.container').length == 0) {
          if($('#overlay').length == 0) {
            $('.block-bird-taxonomies .content').prepend('<div id="overlay"><div id="bowlG"><div id="bowl_ringG"><div class="ball_holderG"><div class="ballG"></div></div></div></div></div>');
          }
          jQuery.ajax({
            type: 'POST',
            url: Drupal.settings.basePath + 'bird_taxonomies/ajax/species/' + family_id + '/' + nid_url,
            beforeSend: function(){
              //console.log(this);

              //$('#id-' + family_id).prepend('<div id="overlay"><div id="bowlG"><div id="bowl_ringG"><div class="ball_holderG"><div class="ballG"></div></div></div></div></div>');
              //console.log($('#id-' + family_id + ' > .a-wrapper'));
              var height = $('#id-' + family_id + ' > .a-wrapper').height();
              var position = $('#id-' + family_id + ' > .a-wrapper').position();
              //console.log(position);
              $('#bowlG').css('top', position.top - 5);
              //console.log(height);
              $("#overlay").show();
            },
            complete: function(){
              $("#overlay").remove();
            },
            dataType: 'html',
            cache: false,
            success: function(data) {
                $(family).parent().parent().append('<div class="container"></div>');
                $(family).parent().parent().children('.container').hide();
                $(family).parent().parent().children('.container').append(data);
                $(family).parent().parent().children('.container').show('slow');
              }
           });
         }

         $(family).parent().parent().children('.container').slideToggle('slow');

		    return false;
    	});

    	$(document).delegate('.species > li > .a-wrapper > span.plus', 'click', function() {
    	   specie = $(this);
    	   $(specie).parent().parent('li').toggleClass('selected');
    	   specie_id = $(specie).parent().parent('li').attr('id');
    	   specie_id = specie_id.substring(3,specie_id.length);

         if(Drupal.settings.bird_taxonomies.arg[1] > 0) {
          nid_url = Drupal.settings.bird_taxonomies.arg[1];
         }
         else {
          nid_url = 0;
         }
        // Miramos si ya esta puesto y sino lo obteneos
        if($(specie).parent().parent().children('.container').length == 0) {
          jQuery.ajax({
            type: 'POST',
            url: Drupal.settings.basePath + 'bird_taxonomies/ajax/subspecies/' + specie_id + '/' + nid_url,
            dataType: 'html',
            cache: false,
            success: function(data) {
              if(data.length > 30) {
                $(specie).parent().parent().append('<div class="container"></div>');
                $(specie).parent().parent().children('.container').hide();
                $(specie).parent().parent().children('.container').append(data);
                $(specie).parent().parent().children('.container').show('slow');
              }
            }
          });
        }
        $(specie).parent().parent().children('.container').slideToggle('slow');

		    return false;
    	});

    	$(document).delegate('.orders span.go','click',function() {
    	 //window.location = $(this).prev('a').attr('href');
    	});

    	$('#block-bird-taxonomies-bird-orders h2').click(function() {
		    $(this).parent().children('.content').slideToggle('slow', function() {
		      if($(this).parent().children('h2').children('span.plus').text() == '+') {
		        $(this).parent().children('h2').children('span.plus').text('-');
		      }
		      else {
		        $(this).parent().children('h2').children('span.plus').text('+');
		      }
		    });
		    return false;
    	});


      /**
       * Si la familia tiene muchas especies, el contenedor mide mas de 350px de alto, por lo que se forma un scroll.
       * En estos casos, hay que mostrar la especie activa al principio de este scroll
       */
      // elemento que queremos mostrar en el scroll
      var active_s = $('#region-sidebar-first .families .item-list ul.species > li.selected .a-wrapper');
      // Averiguar si el elemento está presente en la página (si no averiguamos, provoca un error de que .top es NULL)
      if (active_s.length > 0){
        // distancia desde top hasta especie activa
        var offset_s = active_s.offset().top - $(window).scrollTop();
        // distancia desde top hasta familia activa
        var offset_f = $('#region-sidebar-first ul .families > li.selected .a-wrapper').offset().top;
        //console.log('active_s: ' + active_s + ' / offset_s: ' + offset_s + ' / offset_f: ' + offset_f);

        if (offset_s > window.innerHeight) {
            $('#region-sidebar-first ul.species').animate({
                scrollTop: offset_s - offset_f - 66 // 66 per veure també la sp anterior
            }, 1000);
            return false;
        }
      }

      /**
       * Idem per Geographical tree
       */
      var active_s2 = $('#region-sidebar-first section#block-menu-menu-geographical-tree ul.menu ul.menu ul.menu li.active-trail');
      if (active_s2.length > 0){
        var offset_s2 = active_s2.offset().top - $(window).scrollTop();
        var offset_f2 = $('#region-sidebar-first section#block-menu-menu-geographical-tree ul.menu ul.menu li.active-trail').offset().top;
        //console.log('active_s2: ' + active_s2 + ' / offset_s2: ' + offset_s2 + ' / offset_f2: ' + offset_f2);

        if (offset_s2 > window.innerHeight) {
            $('#region-sidebar-first section#block-menu-menu-geographical-tree ul.menu ul.menu ul.menu').animate({
                scrollTop: offset_s2 - offset_f2 - 66
            }, 1000);
            return false;
        }
      }

});

/**
 * Geographical tree
 */
(function ($) {
  $(window).load(function() {
    // Estat del tree al carregar-se: expanded
    $('#region-sidebar-first section#block-menu-menu-geographical-tree li.first.last.dhtml-menu > ul.menu').css('display', 'block');
    // Esborrar el "R" de "R World" del Geographical tree
    $('#dhtml_menu-11337 > a').text('World')
    //$('#region-sidebar-first section#block-menu-menu-geographical-tree ul.menu > li.first > ul.menu > li.first > a').text('World')
    // expandre la zona clickable del icona a tot el nom
    $('#dhtml_menu-11337 > a, #dhtml_menu-10983 > a, #dhtml_menu-11038 > a, #dhtml_menu-11048 > a, #dhtml_menu-11077 > a, #dhtml_menu-11148 > a, #dhtml_menu-11195 > a, #dhtml_menu-11223 > a').unbind('click').bind('click', function() {
      $('a.dhtml-menu-icon', this).click();
    });
    // Prevent (the real) click (to taxonomy entity) on parent items (World, Afrotropical,...)
    $('#dhtml_menu-11337 > a, #dhtml_menu-10983 > a, #dhtml_menu-11038 > a, #dhtml_menu-11048 > a, #dhtml_menu-11077 > a, #dhtml_menu-11148 > a, #dhtml_menu-11195 > a, #dhtml_menu-11223 > a').click(false);
  });
})(jQuery);
