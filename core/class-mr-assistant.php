<?php

//Prevent direct access
defined('ABSPATH') or die("You can't access this file directly.");

/**
 * The core Mr. Assistant plugin class.
 *
 * This is used to Load the dependencies, single instance of the MrAssistant class,
 * define the locale, and set the hooks for the admin area,
 * define internationalization, admin-specific hooks, ajax hook and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @category   MrAssistant
 * @package    WordPress
 * @subpackage Mr_Assistant
 * @author     Shapon pal <helpmrassistant@gmail.com>
 * @Version    1.0
 */

if (!class_exists('MrAssistant')) :

    /**
     * Class MrAssistant
     */
    final class MrAssistant
    {

        /**
         * The single instance of the MrAssistant class.
         *
         * @var MrAssistant instance
         */
        protected static $mr_instance = null;


        /**
         * Mr. Assistant options
         * Set some of settings for chat widget option and admin chat control panel
         *
         * @access protected
         * @var    array $options The array used for API config this plugin.
         */
        public $options = array();


        /**
         * Main MrAssistant Instance.
         *
         * Ensures only one instance of MrAssistant is loaded or can be loaded.
         *
         * @return MrAssistant - Main instance.
         * @static
         */
        public static function instance()
        {
            if (self::$mr_instance === null) {
                self::$mr_instance = new self();
            }
            return self::$mr_instance;
        }


        /**
         * MrAssistant constructor.
         *
         * This is used to initialize the dependencies,
         * define the locale, and set the hooks for the admin area,
         * define internationalization, admin-specific hooks, ajax hook and
         * public-facing site hooks.
         */
        public function __construct()
        {
            $this->mrFileLoaders();
            $this->mrLoadOptions();
            $this->mrRegisterHooks();
        }


        /**
         * Load the required dependencies for this plugin.
         *
         * Include the following files that make up the plugin:
         *
         * Create an instance of the loader which will be used to register the hooks
         * with WordPress.
         *
         * @access private
         * @return void
         */
        protected function mrFileLoaders()
        {
            // Global include core, api files.
            $files = array(
                'core' => array(
                    'mr-assistant-options-tree',
                    'mr-assistant-settings',
                    'mr-assistant-admin',
                    'mr-assistant-db-config',
                )
            );
            // Require the files.
            foreach ($files as $key => $values) {
                foreach ($values as $file) {
                    include_once MR_ASSISTANT_BASE_PATH . $key . '/' . "{$file}.php";
                }
            }
        }


        /**
         * Set options firebase realtime database configuration
         *
         * @return void
         */
        protected function mrLoadOptions()
        {
            $this->options['domain'] = get_option('siteurl');
            $this->options['plugin_name'] = MR_ASSISTANT_NAME;
            $this->options['plugin_url'] = MR_ASSISTANT_BASE_URL;
            $this->options['access_token'] = MR_ASSISTANT_ACCESS_TOKEN;

            $settings_fields = MrAssistantSettings::mrFields();
            $sections = array_keys($settings_fields);
            foreach ($sections as $section) {
                $this->mrSetOptions($this->mrGetOption($section));
            }

            // set Theme value
            if (isset($this->options['theme'])) {
                $this->options['theme'] = MrAssistantSettings::get_themes($this->options['theme']);
            }
            // set admin Theme value
            if (isset($this->options['admin_theme'])) {
                $this->options['admin_theme'] = MrAssistantSettings::get_themes($this->options['admin_theme']);
            }
            // set options
            if (is_admin()) {
                $unset_options = array('custom_css', 'font_link', 'font_name');
                foreach ($unset_options as $unset) {
                    unset($this->options[$unset]);
                }
            } else {
                $unset_options = array(
                    'email',
                    'admin_css',
                    'admin_font_link',
                    'admin_font_name'
                );
                foreach ($unset_options as $unset) {
                    unset($this->options[$unset]);
                }
            }
        }


        /**
         * The mrEnqueueScripts function responsible for loading
         * Mr. Assistant core Script that occur in the public-facing
         * side of the site.
         *
         * @return void
         */
        public function mrEnqueueScripts()
        {
            // is not admin
            if (!is_admin()) {
                if (isset($this->options['mr_assistant']) && $this->options['mr_assistant'] === 'on') {
                    $widget_url = $this->options['plugin_url'] . 'assets/js/mr-assistant-async-loader.min.js';
                    wp_enqueue_script('mr-assistant-script', $widget_url, array(), MR_ASSISTANT_VERSION);
                    wp_localize_script('mr-assistant-script', 'mr_assistant_obj', $this->options);

                    // load css
                    wp_enqueue_style('mr-assistant-chat-widget-style', $this->options['plugin_url'] . 'assets/css/chat-widget-style.css', array(), MR_ASSISTANT_VERSION);
                }
            }
        }


        /**
         * The mrAdminEnqueueScripts function responsible for loading
         * Mr. Assistant core Script that occur in the admin-facing
         * side of the site.
         *
         * @param $hook - hook current page name
         *
         * @return void
         */
        public function mrAdminEnqueueScripts($hook)
        {
            global $wp_version;
            if ('toplevel_page_mr-assistant-chatbot' === $hook && is_admin()) {
                /**
                 * Enqueue Mr. Assistant Admin generator Script
                 * This Script will generate new iFrame for chat control panel
                 *
                 * Load Mr. Assistant configuration as
                 * global variable - mr_assistant_obj
                 */
                wp_enqueue_script('mr-assistant-console-script', $this->options['plugin_url'] . 'assets/js/mr-assistant-admin-async-loader.min.js', array(), MR_ASSISTANT_VERSION);
                wp_localize_script('mr-assistant-console-script', 'mr_assistant_obj', $this->options);

                // Add custom style for chat control panel page
                wp_enqueue_style('mr-assistant-custom-style', $this->options['plugin_url'] . 'assets/css/custom-style.css', array(), MR_ASSISTANT_VERSION);
            }
            if ('mr-assistant_page_mr-assistant-setting' === $hook && is_admin()) {

                //Add custom style for chat chat configuration page
                wp_enqueue_style('mr-assistant-setting-style', $this->options['plugin_url'] . 'assets/css/admin-settings.css', array(), MR_ASSISTANT_VERSION);

                // Custom Script for Mr Options Tree
                wp_enqueue_script('mr-assistant-options-tree-script', $this->options['plugin_url'] . 'assets/js/options-tree-script.js', array(), MR_ASSISTANT_VERSION);

                // Custom Style for older version of WordPress
                if (version_compare($wp_version, '3.8', '<=')) {
                    wp_enqueue_style('mr-assistant-wp-old-version-style', $this->options['plugin_url'] . 'assets/css/wp-old-version-style.css', array(), MR_ASSISTANT_VERSION);
                }
            }

            // Custom menu icon
            wp_enqueue_style('mr-assistant-custom-menu-style', $this->options['plugin_url'] . 'assets/css/custom-menu-style.css', array(), MR_ASSISTANT_VERSION);
        }


        /**
         * Register all of the hooks related to the plugin functionality
         *
         * @access protected
         *
         * @return void
         */
        protected function mrRegisterHooks()
        {
            if (is_admin()) {
                $plugin_admin = new Mr_Assistant_Admin();
                add_action('admin_init', array($plugin_admin, 'mrSettingsInitialized'));
                add_action('admin_menu', array($plugin_admin, 'mrAdminPanel'));
                add_action('admin_enqueue_scripts', array($this, 'mrAdminEnqueueScripts'));
            } else {
                add_action('wp_enqueue_scripts', array($this, 'mrEnqueueScripts'));
            }
        }


        /**
         * Get the value of a settings field
         *
         * @param string $section - the section name this field belongs to
         * @param string $option  - settings field name
         * @param string $default - default text if it's not found
         *
         * @return array|string
         */
        public function mrGetOption($section, $option = '', $default = '')
        {
            if ($section === '') {
                return array();
            }
            $options = get_option($section);
            if ($option !== '' && isset($options[$option])) {
                return $options[$option];
            }
            if ($default === '' && $option === '') {
                return $options;
            }
            return $default;
        }


        /**
         * Marge options group together
         *
         * @param array $options options group
         *
         * @return void
         */
        public function mrSetOptions($options)
        {
            if (is_array($options) && !empty($options)) {
                $this->options = array_merge($this->options, $options);
            }
        }
    }
endif;
