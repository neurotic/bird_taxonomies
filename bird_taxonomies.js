(function ($) {

  Drupal.behaviors.bird_taxonomies = {
    attach: function (context, settings) {
      $('#block-bird-taxonomies-bird-orders h2').append('<span class="plus">+</span>');
    	
    	$('#block-bird-taxonomies-bird-orders .content ul li a').append('<span class="plus">+</span>');
    	
      $('.orders > li > a > span.plus').click(function() {
        plus = $(this);
		    $(this).parent('a').next('.item-list').children('ul').toggle('slow', function() {
		      if($(plus).text() == '+') {
		        $(plus).text('-');
		        /*alert("Poniendolo a -")*/
		      }
		      else {
		        $(plus).text('+');
		        /*alert("Poniendolo a +")*/
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

    }
  };

}(jQuery));
