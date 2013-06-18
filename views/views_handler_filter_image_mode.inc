<?php /* -*- mode: php; indent-tabs-mode: nil; tab-width: 2; -*- */

/**
 * @file
 * Handler to filter based on locked nodes
 */

class views_handler_filter_image_mode extends views_handler_filter {
  function value_form(&$form, &$form_state) {

    $params = bird_taxonomies_get_params();

    $value = 0;
    if(isset($params['image_mode']) && $params['image_mode'] == 1) {
      $value = 1;
    }
    //$options = bird_taxonomies_plates_modes();
    $form['value'] = array(
      '#type' => 'checkbox',
      '#title' => t('Scaled'),
      '#default_value' => 0,
      '#value' => $value,
    );

    return $form;
  }

  function query() {
  }
}
