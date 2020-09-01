(function ($) {
    "use strict";
    $(document).ready(function ($) {
        //Initiate Color Picker
        $('.wp-color-picker-field').wpColorPicker();

        // Switches option sections
        $('.group').hide();
        var mrActiveTab = '';
        if (typeof (localStorage) != 'undefined') {
            mrActiveTab = localStorage.getItem("mrActiveTab");
        }
        if (mrActiveTab != '' && $(mrActiveTab).length) {
            $(mrActiveTab).fadeIn();
        } else {
            $('.group:first').fadeIn();
        }
        $('.group .collapsed').each(function () {
            $(this).find('input:checked').parent().parent().parent().nextAll().each(
                function () {
                    if ($(this).hasClass('last')) {
                        $(this).removeClass('hidden');
                        return false;
                    }
                    $(this).filter('.hidden').removeClass('hidden');
                });
        });

        // Add class when nav tab active
        if (mrActiveTab != '' && $(mrActiveTab + '-tab').length) {
            $(mrActiveTab + '-tab').addClass('nav-tab-active');
        } else {
            // Default nav tab active
            $('.nav-tab-wrapper a:first').addClass('nav-tab-active');
        }

        // Event on nav tab click
        $('.nav-tab-wrapper a').on('click', function (evt) {
            $('.nav-tab-wrapper a').removeClass('nav-tab-active');
            $(this).addClass('nav-tab-active').blur();
            var clicked_group = $(this).attr('href');
            if (typeof (localStorage) != 'undefined') {
                localStorage.setItem("mrActiveTab", $(this).attr('href'));
            }
            $('.group').hide();
            $(clicked_group).fadeIn();
            evt.preventDefault();
        });

        // Browse image
        $('.wpsa-browse').on('click', function (event) {
            event.preventDefault();

            var self = $(this);

            // Create the media frame.
            var file_frame = wp.media.frames.file_frame = wp.media({
                title: self.data('uploader_title'),
                button: {
                    text: self.data('uploader_button_text'),
                },
                multiple: false
            });

            file_frame.on('select', function () {
                var attachment = file_frame.state().get('selection').first().toJSON();
                self.prev('.wpsa-url').val(attachment.url).change();
            });

            // Finally, open the modal
            file_frame.open();
        });

        // Copied to the clipboard
        $('#mrAssistantRules').on('click', function (event) {
            event.preventDefault();

            event.target.focus();
            event.target.select();
            event.target.setSelectionRange(0, 99999);
            document.execCommand("copy");
            const status = document.getElementById("mrAssistantRulesStatus");
            if (status) {
                status.innerHTML = '<h2><small>Copied to the clipboard!!</small></h2>';
            }
        });

    });
})(jQuery)
