<?php /* -*- mode: php; indent-tabs-mode: nil; tab-width: 2; -*- */

/**
 * @file
 * This file handles views api definitions.
 * We describe the table to Views module 
 * as well as other necessary stuff to integrate
 */

/**
 * Implementation of hook_views_data()
 */ 
function bird_taxonomies_views_data(){
  $data = array();

  // Our group in Views UI
  $data['bird_taxonomies']['table']['group'] = t('Bird Taxonomies');
  
  $data['bird_taxonomies']['table']['base'] = array(
    'field' => 'nid', // This is the identifier field for the view. 
    'title' => t('Example table'), 
    'help' => t('Example table contains example content and can be related to nodes.'), 
    'weight' => -10,
  );

  // This table references the {node} table. The declaration below creates an
  // 'implicit' relationship to the node table, so that when 'node' is the base
  // table, the fields are automatically available.
  $data['bird_taxonomies']['table']['join'] = array(
    // Index this array by the table name to which this table refers.
    // 'left_field' is the primary key in the referenced table.
    // 'field' is the foreign key in this table.
    'node' => array(
      'left_field' => 'nid', 
      'field' => 'nid',
    ),
  );
  
  // Our Handlers:
  $data['bird_taxonomies']['image_style'] = array(
    'title' => t('Image Style'),
    'help' => t('To choose the image style in Plates'),
    'filter' => array(
      'handler' => 'views_handler_filter_image_style',
    ),
  );
  
  return $data;
}

/**
 * Implementation of hook_views_handlers()
 */ 
 /*
function bird_taxonomies_views_handlers(){
  $array = array(
    'info' => array(
      'path' => drupal_get_path('module', 'bird_taxonomies') . '/views',
    ),
    'handlers' => array(
      'views_handler_filter_image_style' => array(
        'parent' => 'views_handler_filter', //views_handler_filter_boolean_operator',
      ),
    ),
  );
  
  dsm($array);
  
  return $array;
}
*/
