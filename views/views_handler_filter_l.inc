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
      '#default_value' => 0,
    );

    return $form;
  }

  function query() {
    //dsm("Query");
  }
}
