<?php
/**
 * Mr. Assistant Settings API wrapper class.
 * This MrAssistantOptionsTree class will Dynamically generate custom settings fields.
 *
 * @category   MrAssistantOptionsTree
 * @package    WordPress
 * @subpackage Mr_Assistant
 * @author     Shapon pal <helpmrassistant@gmail.com>
 * @Version    1.0
 */

if (!class_exists('MrAssistantOptionsTree')) :
    /**
     * Class MrAssistantOptionsTree - dynamically generate custom settings fields
     */
    class MrAssistantOptionsTree
    {
        /**
         * Mr. Assistant Settings sections array
         *
         * @var array
         */
        protected $mr_sections = array();


        /**
         * Mr. Assistant Settings fields array
         *
         * @var array
         */
        protected $mr_fields = array();


        /**
         * MrAssistantOptionsTree constructor.
         */
        public function __construct()
        {
            add_action('admin_enqueue_scripts', array($this, 'mrEnqueueScripts'));
        }


        /**
         * Enqueue scripts and styles
         *
         * @return void
         */
        public function mrEnqueueScripts()
        {
            wp_enqueue_style('wp-color-picker');
            wp_enqueue_media();
            wp_enqueue_script('wp-color-picker');
            wp_enqueue_script('jquery');
        }


        /**
         * Set settings sections
         *
         * @param array $sections - setting sections array
         *
         * @return MrAssistantOptionsTree
         */
        public function mrSectionsInit($sections)
        {
            $this->mr_sections = $sections;
            return $this;
        }


        /**
         * Set settings fields
         *
         * @param array $fields - settings fields array
         *
         * @return MrAssistantOptionsTree
         */
        public function mrFieldsInit($fields)
        {
            $this->mr_fields = $fields;
            return $this;
        }


        /**
         * Allow listed html tags
         *
         * @return array
         */
        public function mr_allowed_htm_tags()
        {
            return array(
                'a' => array(
                    'href' => array(),
                    'class' => array(),
                    'target' => array(),
                ),
                'code' => array(),
                'strong' => array(),
                'small' => array(),
                'div' => array(
                    'class' => array(),
                ),
                'p' => array(
                    'class' => array(),
                    'id' => array(),
                ),
                'textarea' => array(
                    'readonly' => array(),
                    'id' => array(),
                ),
                'h2' => array(
                    'class' => array(),
                ),
                'ul' => array(
                    'class' => array(),
                ),
                'li' => array(),
            );
        }



        /**
         * Initialize and registers the settings sections and fields to WordPress
         *
         * Usually this should be called at `admin_init` hook.
         *
         * This function gets the initiated settings sections and fields. Then
         * registers them to WordPress and ready for use.
         *
         * @return void
         */
        public function mrAdminInitialize()
        {
            //register settings sections
            foreach ($this->mr_sections as $section) {
                if (false == get_option($section['id'])) {
                    add_option($section['id']);
                }

                if (isset($section['desc']) && !empty($section['desc'])) {
                    $section['desc'] = '<div class="inside">' . esc_html($section['desc']) . '</div>';
                    $callback = create_function('', 'echo "' . str_replace('"', '\"', $section['desc']) . '";');
                } elseif (isset($section['callback'])) {
                    $callback = $section['callback'];
                } else {
                    $callback = null;
                }

                add_settings_section($section['id'], $section['title'], $callback, $section['id']);
            }

            //register settings fields
            foreach ($this->mr_fields as $section => $field) {
                foreach ($field as $option) {
                    $name = $option['name'];
                    $type = isset($option['type']) ? $option['type'] : 'text';
                    $label = isset($option['label']) ? $option['label'] : '';
                    $callback = isset($option['callback']) ? $option['callback'] : array($this, 'mrFuncCallback_' . $type);

                    $args = array(
                        'id' => $name,
                        'label_for' => $args['label_for'] = "{$section}[{$name}]",
                        'desc' => isset($option['desc']) ? $option['desc'] : '',
                        'name' => $label,
                        'section' => $section,
                        'size' => isset($option['size']) ? $option['size'] : null,
                        'options' => isset($option['options']) ? $option['options'] : '',
                        'std' => isset($option['default']) ? $option['default'] : '',
                        'sanitize_callback' => isset($option['sanitize_callback']) ? $option['sanitize_callback'] : '',
                        'type' => $type,
                        'placeholder' => isset($option['placeholder']) ? $option['placeholder'] : '',
                        'min' => isset($option['min']) ? $option['min'] : '',
                        'max' => isset($option['max']) ? $option['max'] : '',
                        'step' => isset($option['step']) ? $option['step'] : '',
                    );

                    add_settings_field("{$section}[{$name}]", $label, $callback, $section, $section, $args);
                }
            }

            // creates Mr. Assistant Settings in the options table
            foreach ($this->mr_sections as $section) {
                register_setting($section['id'], $section['id'], array($this, 'sanitize_options'));
            }
        }


        /**
         * Get field description for display
         *
         * @param array $args - settings field args
         *
         * @return string
         */
        public function mrDescription($args)
        {
            if (!empty($args['desc'])) {
                $allow = $this->mr_allowed_htm_tags();
                $desc = sprintf('<p class="description">%s</p>', wp_kses($args['desc'], $allow));
            } else {
                $desc = '';
            }

            return $desc;
        }


        /**
         * Displays text field for settings field
         *
         * @param array $args settings field args
         *
         * @return void
         */
        public function mrFuncCallback_text($args)
        {
            $value = esc_html($this->get_option($args['id'], $args['section'], $args['std']));
            $sec = esc_attr($args['section']);
            $id = esc_attr($args['id']);
            $size = isset($args['size']) && !is_null($args['size']) ? esc_attr($args['size']) : 'regular';
            $type = isset($args['type']) ? esc_attr($args['type']) : 'text';
            $placeholder = empty($args['placeholder']) ? '' : ' placeholder="' . esc_html($args['placeholder']) . '"';

            $html = sprintf('<input type="%1$s" class="%2$s-text" id="%3$s[%4$s]" name="%3$s[%4$s]" value="%5$s"%6$s/>', $type, $size, $sec, $id, $value, $placeholder);
            $html .= $this->mrDescription($args);

            echo $html;
        }


        /**
         * Displays url field for Mr. Assistant Settings field
         *
         * @param array $args - Mr. Assistant Settings field args
         *
         * @return void
         */
        public function mrFuncCallback_url($args)
        {
            $this->mrFuncCallback_text($args);
        }


        /**
         * Displays number field for Mr. Assistant Settings field
         *
         * @param array $args Mr. Assistant Settings field args
         *
         * @return string
         */
        public function mrFuncCallback_number($args)
        {
            $value = esc_attr($this->get_option($args['id'], $args['section'], $args['std']));
            $sec = esc_attr($args['section']);
            $id = esc_attr($args['id']);
            $size = isset($args['size']) && !is_null($args['size']) ? esc_attr($args['size']) : 'regular';
            $type = isset($args['type']) ? esc_attr($args['type']) : 'number';
            $placeholder = empty($args['placeholder']) ? '' : ' placeholder="' . esc_html($args['placeholder']) . '"';
            $min = empty($args['min']) ? '' : ' min="' . esc_attr($args['min']) . '"';
            $max = empty($args['max']) ? '' : ' max="' . esc_attr($args['max']) . '"';
            $step = empty($args['max']) ? '' : ' step="' . esc_attr($args['step']) . '"';

            $html = sprintf('<input type="%1$s" class="%2$s-number" id="%3$s[%4$s]" name="%3$s[%4$s]" value="%5$s"%6$s%7$s%8$s%9$s/>', $type, $size, $sec, $id, $value, $placeholder, $min, $max, $step);
            $html .= $this->mrDescription($args);

            echo $html;
        }


        /**
         * Displays checkbox for Settings field
         *
         * @param array $args - Mr. Assistant Settings field args
         *
         * @return string
         */
        public function mrFuncCallback_checkbox($args)
        {
            $value = esc_attr($this->get_option($args['id'], $args['section'], $args['std']));
            $sec = esc_attr($args['section']);
            $id = esc_attr($args['id']);
            $desc = esc_html($args['desc']);

            $html = '<fieldset>';
            $html .= sprintf('<label for="mr-%1$s[%2$s]">', $sec, $id);
            $html .= sprintf('<input type="hidden" name="%1$s[%2$s]" value="off" />', $sec, $id);
            $html .= sprintf('<input type="checkbox" class="checkbox" id="mr-%1$s[%2$s]" name="%1$s[%2$s]" value="on" %3$s />', $sec, $id, checked($value, 'on', false));
            $html .= sprintf('%1$s</label>', $desc);
            $html .= '</fieldset>';

            echo $html;
        }


        /**
         * Displays checkbox for Mr. Assistant Settings field
         *
         * @param array $args Mr. Assistant Settings field args
         *
         * @return string
         */
        public function mrFuncCallback_radio($args)
        {
            $value = esc_attr($this->get_option($args['id'], $args['section'], $args['std']));
            $sec = esc_attr($args['section']);
            $id = esc_attr($args['id']);
            $html = '<fieldset>';
            foreach ($args['options'] as $key => $label) {
                $html .= sprintf('<label for="mr-%1$s[%2$s][%3$s]">', $sec, $id, $key);
                $html .= sprintf('<input type="radio" class="radio" id="mr-%1$s[%2$s][%3$s]" name="%1$s[%2$s]" value="%3$s" %4$s />', $sec, $id, $key, checked($value, $key, false));
                $html .= sprintf('%1$s</label><span class="mr-space">&nbsp;&nbsp;</span>', $label);
            }

            $html .= $this->mrDescription($args);
            $html .= '</fieldset>';

            echo $html;
        }


        /**
         * Displays select box for Settings field
         *
         * @param array $args Mr. Assistant Settings field args
         *
         * @return string
         */
        public function mrFuncCallback_select($args)
        {
            $value = esc_attr($this->get_option($args['id'], $args['section'], $args['std']));
            $sec = esc_attr($args['section']);
            $id = esc_attr($args['id']);
            $size = isset($args['size']) && !is_null($args['size']) ? esc_attr($args['size']) : 'regular';
            $html = sprintf('<select class="%1$s" name="%2$s[%3$s]" id="%2$s[%3$s]">', $size, $sec, $id);

            foreach ($args['options'] as $key => $label) {
                $html .= sprintf('<option value="%s"%s>%s</option>', $key, selected($value, $key, false), $label);
            }

            $html .= sprintf('</select>');
            $html .= $this->mrDescription($args);

            echo $html;
        }


        /**
         * Displays textarea for Mr. Assistant Settings field
         *
         * @param array $args Mr. Assistant Settings field args
         *
         * @return string
         */
        public function mrFuncCallback_textarea($args)
        {
            $value = esc_attr($this->get_option($args['id'], $args['section'], $args['std']));
            $sec = esc_attr($args['section']);
            $id = esc_attr($args['id']);
            $size = isset($args['size']) && !is_null($args['size']) ? esc_attr($args['size']) : 'regular';
            $placeholder = empty($args['placeholder']) ? '' : ' placeholder="' . esc_html($args['placeholder']) . '"';

            $html = sprintf('<textarea rows="5" cols="55" class="%1$s-text" id="%2$s[%3$s]" name="%2$s[%3$s]"%4$s>%5$s</textarea>', $size, $sec, $id, $placeholder, $value);
            $html .= $this->mrDescription($args);

            echo $html;
        }


        /**
         * Displays textarea for Mr. Assistant Settings field
         *
         * @param array $args Mr. Assistant Settings field args
         *
         * @return string
         */
        public function mrFuncCallback_html($args)
        {
            echo $this->mrDescription($args);
        }


        /**
         * Displays file upload field for Mr. Assistant Settings field
         *
         * @param array $args Mr. Assistant Settings field args
         *
         * @return string
         */
        public function mrFuncCallback_file($args)
        {
            $value = esc_url($this->get_option($args['id'], $args['section'], $args['std']));
            $sec = esc_attr($args['section']);
            $id = esc_attr($args['id']);
            $size = isset($args['size']) && !is_null($args['size']) ? esc_attr($args['size']) : 'regular';
            $label = isset($args['options']['button_label']) ? esc_html($args['options']['button_label']) : __('Choose File');

            $html = sprintf('<input type="text" class="%1$s-text wpsa-url" id="%2$s[%3$s]" name="%2$s[%3$s]" value="%4$s"/>', $size, $sec, $id, $value);
            $html .= '<input type="button" class="button wpsa-browse" value="' . $label . '" />';
            $html .= $this->mrDescription($args);

            echo $html;
        }

        /**
         * Displays password field for Mr. Assistant Settings field
         *
         * @param array $args Mr. Assistant Settings field args
         *
         * @return string
         */
        public function mrFuncCallback_password($args)
        {
            $value = esc_html($this->get_option($args['id'], $args['section'], $args['std']));
            $sec = esc_attr($args['section']);
            $id = esc_attr($args['id']);
            $size = isset($args['size']) && !is_null($args['size']) ? esc_attr($args['size']) : 'regular';

            $html = sprintf('<input type="password" class="%1$s-text" id="%2$s[%3$s]" name="%2$s[%3$s]" value="%4$s"/>', $size, $sec, $id, $value);
            $html .= $this->mrDescription($args);

            echo $html;
        }


        /**
         * Displays color picker field for Mr. Assistant Settings field
         *
         * @param array $args Mr. Assistant Settings field args
         *
         * @return string
         */
        public function mrFuncCallback_color($args)
        {
            $value = esc_attr($this->get_option($args['id'], $args['section'], $args['std']));
            $sec = esc_attr($args['section']);
            $id = esc_attr($args['id']);
            $std = esc_attr($args['std']);
            $size = isset($args['size']) && !is_null($args['size']) ? esc_attr($args['size']) : 'regular';

            $html = sprintf('<input type="text" class="%1$s-text wp-color-picker-field" id="%2$s[%3$s]" name="%2$s[%3$s]" value="%4$s" data-default-color="%5$s" />', $size, $sec, $id, $value, $std);
            $html .= $this->mrDescription($args);

            echo $html;
        }


        /**
         * Sanitize Mr. Assistant settings radio option
         *
         * @param $value - input value
         *
         * @return string - on/off
         */
        public function sanitize_on_off($value)
        {
            if (in_array($value, array('on', 'off'))) {
                return $value;
            }
            return 'off';
        }


        /**
         * Sanitize Mr. Assistant settings radio option
         *
         * @param $value - input value
         *
         * @return string - theme/color
         */
        public function sanitize_theme_color($value)
        {
            if (in_array($value, array('theme', 'color'))) {
                return $value;
            }
            return 'theme';
        }


        /**
         * Sanitize Mr. Assistant settings email option
         *
         * @param $value - input value
         *
         * @return string - email
         */
        public function sanitize_email($value)
        {
            return sanitize_email($value);
        }


        /**
         * Sanitize Mr. Assistant settings radio option
         *
         * @param $value - input value
         *
         * @return string - on/off
         */
        public function sanitize_api_keys($value)
        {
            return preg_replace("/[^A-Za-z0-9]/", '', $value);
        }

        /**
         * Sanitize Mr. Assistant settings radio option
         *
         * @param $value - input value
         *
         * @return string - on/off
         */
        public function sanitize_title($value)
        {
            return sanitize_text_field($value);
        }

        /**
         * Sanitize Mr. Assistant settings radio option
         *
         * @param $value - input value
         *
         * @return string - on/off
         */
        public function sanitize_url($value)
        {
            return esc_url($value);
        }


        /**
         * Sanitize Mr. Assistant settings radio option
         *
         * @param $value - input value
         *
         * @return string - on/off
         */
        public function sanitize_color($value)
        {
            if (preg_match('/#([a-fA-F0-9]{3}){1,2}\b/', $value)) {
                return $value;
            }
            return '';
        }


        /**
         * Sanitize Mr. Assistant settings radio option
         *
         * @param $value - input value
         *
         * @return string - on/off
         */
        public function sanitize_link($value)
        {
            return wp_kses($value, array('link' => array(
                'href' => array(),
                'family' => array(),
                'rel' => array()
            )));
        }


        /**
         * Sanitize Mr. Assistant settings radio option
         *
         * @param $value - input value
         *
         * @return string - on/off
         */
        public function sanitize_integer($value)
        {
            if (filter_var($value, FILTER_VALIDATE_INT)) {
                return $value;
            }
            return 0;
        }


        /**
         * Sanitize Mr. Assistant settings radio option
         *
         * @param $value - input value
         *
         * @return string - on/off
         */
        public function sanitize_theme($value)
        {
            if (in_array($value, array_keys(MrAssistantSettings::get_themes()))) {
                return $value;
            }
            return 'theme1';
        }


        /**
         * Sanitize Mr. Assistant settings radio option
         *
         * @param $value - input value
         *
         * @return string - on/off
         */
        public function sanitize_css($value)
        {
            return wp_filter_nohtml_kses($value);
        }


        /**
         * Sanitize callback for Settings API
         *
         * @return array - options array
         */
        public function sanitize_options($options)
        {
            if (!$options) {
                return $options;
            }
            foreach ($options as $option_slug => $option_value) {
                $sanitize_callback = $this->get_sanitize_callback($option_slug);
                // If callback is set, call it
                if ($sanitize_callback) {
                    $options[$option_slug] = call_user_func(array($this, $sanitize_callback), $option_value);
                    continue;
                }
            }
            return $options;
        }


        /**
         * Get sanitization callback for given option slug
         *
         * @param string $slug option slug
         *
         * @return mixed string or bool false
         */
        public function get_sanitize_callback($slug = '')
        {
            if (empty($slug)) {
                return false;
            }

            // Iterate over registered fields and see if we can find proper callback
            foreach ($this->mr_fields as $section => $options) {
                foreach ($options as $option) {
                    if ($option['name'] != $slug) {
                        continue;
                    }

                    // Return the callback name
                    return (isset($option['sanitize_callback']) && is_callable(array($this, $option['sanitize_callback']))) ? $option['sanitize_callback'] : false;
                }
            }

            return false;
        }


        /**
         * Get the value of a settings field
         *
         * @param string $option - settings field name
         * @param string $section - the section name this field belongs to
         * @param string $default - default text if it's not found
         *
         * @return string
         */
        public function get_option($option, $section, $default = '')
        {
            $options = get_option($section);

            if (isset($options[$option])) {
                return $options[$option];
            }

            return $default;
        }


        /**
         * Show navigations as tab
         *
         * Shows all the settings section labels as tab
         *
         * @return string - navigation html
         */
        public function mrSettingTabs()
        {
            $html = '<h2 class="nav-tab-wrapper">';

            $count = count($this->mr_sections);

            // don't show the navigation if only one section exists
            if ($count === 1) {
                return;
            }

            foreach ($this->mr_sections as $tab) {
                $html .= sprintf('<a href="#%1$s" class="nav-tab" id="%1$s-tab">%2$s</a>', esc_attr($tab['id']), esc_attr($tab['title']));
            }

            $html .= '</h2>';

            echo $html;
        }

        /**
         * Show the section settings forms
         *
         * This function displays every sections in a different form
         *
         * @return string - form html
         */
        public function mrSettingForms()
        {
            ?>
            <div class="metabox-holder">
                <?php foreach ($this->mr_sections as $form) { ?>
                    <div id="<?php echo esc_attr($form['id']); ?>" class="group mr-hide">
                        <form method="post" action="<?php echo esc_url( add_query_arg('tab', $form['id'], admin_url('options.php'))); ?>">
                            <?php
                            do_action('wsa_form_top_' . $form['id'], $form);
                            settings_fields($form['id']);
                            do_settings_sections($form['id']);
                            do_action('wsa_form_bottom_' . $form['id'], $form);
                            if (isset($this->mr_fields[$form['id']])):
                                ?>
                                <div class="mr-opt-submit">
                                    <?php submit_button(); ?>
                                </div>
                            <?php endif; ?>
                        </form>
                    </div>
                <?php } ?>
            </div>
            <?php
        }
    }
endif;
