<?php

/**
 * @file
 * Handler to filter based on locked nodes
 */

class views_handler_filter_l extends views_handler_filter {
  function value_form(&$form, &$form_state) {
    //$options = bird_taxonomies_plates_viewstyle();

    $params = bird_taxonomies_get_params();

    $value = 0;
    if(isset($params['l']) && $params['l'] == 1) {
      $value = 1;
    }

    $form['value'] = array(
      '#type' => 'checkbox',
      '#title' => t('List view'),
      '#default_value' => 0,
      '#value' => $value,
    );

    return $form;
  }

  function query() {
  }
}
