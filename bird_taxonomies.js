(function ($) {

  Drupal.behaviors.bird_taxonomies = {
    attach: function (context, settings) {
      $('.orders > li > a').click(function() {
		    $(this).parent('li').children('.item-list').children('ul').children('.families').toggle('slow');
		    return false;
    	});
    }
  };

}(jQuery));