<?php /* -*- mode: php; indent-tabs-mode: nil; tab-width: 2; -*- */

/**
 * @file
 * Handler to filter based on locked nodes
 */
  
class views_handler_filter_image_style extends views_handler_filter {
  function value_form(&$form, &$form_state) {
    $options = bird_taxonomies_plates_styles();
    $form['value'] = array(
      '#type' => 'select',
      '#title' => t('Image Style'),
      '#default_value' => array_shift(array_keys($options)),
      '#options' => $options,
    );
        
    return $form;
  }

  function query() {
    //dsm("Query");
  }
}
