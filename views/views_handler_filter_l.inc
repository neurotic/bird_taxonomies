<?php

/**
 * @file
 * Handler to filter based on locked nodes
 */
  
class views_handler_filter_l extends views_handler_filter {
  function value_form(&$form, &$form_state) {
    $options = bird_taxonomies_plates_viewstyle();
    $form['value'] = array(
      '#type' => 'checkbox',
      '#title' => t('List view'),
      '#description' => t('View this plate in list mode'),
      '#default_value' => array_shift(array_keys($options)),
      '#options' => $options,
    );
        
    return $form;
  }

  function query() {
    //dsm("Query");
  }
}
