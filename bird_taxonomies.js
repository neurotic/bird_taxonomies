(function ($) {

  Drupal.behaviors.bird_taxonomies = {
    attach: function (context, settings) {
      
      if($('#block-bird-taxonomies-bird-orders .content').is(':visible')) {
        $('#block-bird-taxonomies-bird-orders h2').append('<span class="plus">-</span>');
      }
      else {
        $('#block-bird-taxonomies-bird-orders h2').append('<span class="plus">+</span>');
      }
    	
    	/*$('#block-bird-taxonomies-bird-orders .content ul li a').append('<span class="plus">+</span>');*/
    	
      $('.orders > li > .a-wrapper > a').click(function() {
        plus = $(this);
        $(plus).parent().parent('li').toggleClass('selected');
		    $(this).parent().next('.item-list').children('ul').slideToggle('slow', function() {		      
		    });
		    return false;
    	});
    	
    	$('.families > li > .a-wrapper > a').click(function() {
    	   family = $(this);
   	     $(family).parent().parent('li').toggleClass('selected');
    	   family_id = $(family).parent().parent('li').attr('id');
    	   family_id = family_id.substring(3,family_id.lenght);
         // Miramos si ya esta puesto y sino lo obteneos
         if($(family).parent().parent().children('.container').length == 0) {
          jQuery.ajax({
            type: 'POST',
            url: Drupal.settings.basePath + 'bird_taxonomies/ajax/species/' + family_id,
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
    	
    	$(document).delegate('.species > li > .a-wrapper > a', 'click', function() {
    	   specie = $(this);
    	   $(specie).parent().parent('li').toggleClass('selected');
    	   specie_id = $(specie).parent().parent('li').attr('id');
    	   specie_id = specie_id.substring(3,specie_id.lenght);
  	     
        //alert(Drupal.settings.basePath + 'bird_taxonomies/ajax/subspecies/' + specie_id);
        // Miramos si ya esta puesto y sino lo obteneos
        if($(specie).parent().parent().children('.container').length == 0) {
          jQuery.ajax({
            type: 'POST',
            url: Drupal.settings.basePath + 'bird_taxonomies/ajax/subspecies/' + specie_id,
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
    	 window.location = $(this).prev('a').attr('href');
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

    }
  };

}(jQuery));

/*
$('.orders > li > a > span.plus').click(function() {
        plus = $(this);
		    $(this).parent('a').next('.item-list').children('ul').toggle('slow', function() {
		      if($(plus).text() == '+') {
		        $(plus).text('-');
		      }
		      else {
		        $(plus).text('+');
		      }
		    });
		    return false;
    	});
    	
    	$('#block-bird-taxonomies-bird-orders h2').click(function() {
		    $(this).parent().children('.content').toggle('slow', function() {
		      if($(this).parent().children('h2').children('span').text() == '+') {
		        $(this).parent().children('h2').children('span').text('-');
		      }
		      else {
		        $(this).parent().children('h2').children('span').text('+');
		      }
		    });
		    return false;
    	});
    	
*/