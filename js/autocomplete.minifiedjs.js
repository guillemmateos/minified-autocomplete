/**
 * Created by guillem on 21/09/15.
 */
var MINI = require('minified');
var _ = MINI._, $ = MINI.$, $$ = MINI.$$, EE = MINI.EE, HTML = MINI.HTML;

MINI.$.autocomplete = function( input, suggestions, container ) {
    var AC_MIN_LENGTH = 3;

    var KEY_ARROW_UP = 38;
    var KEY_ARROW_DOWN = 40;
    var KEY_ENTER = 13;
    var KEY_ESC = 27;

    var ac_suggestion_visible = false;
    var ac_list_index = -1;
    var ac_input_previous_value = '';
    var ac_arrow_move_event = false;
    var ac_valid_suggestions;
    var ac_function_keys = [KEY_ENTER,KEY_ESC,KEY_ARROW_UP,KEY_ARROW_DOWN];

    if( !container )
        container = input;

    var ac_input_left = $$(container).getBoundingClientRect().left + 'px';

    $(input).on('|keyup', function (event) {
        var value = event.target.value;

        if (value != ac_input_previous_value && ac_function_keys.indexOf(event.which) == -1 ) {
            ac_input_previous_value = value;
            ac_valid_suggestions = [];

            if (value.length >= AC_MIN_LENGTH) {

                if (!ac_suggestion_visible) {
                    $(container).addAfter(EE('ul', {$: 'ac-suggest', $left: ac_input_left}));
                    ac_suggestion_visible = true;
                }

                $('ul.ac-suggest').fill();

                _.each(suggestions, function (item) {
                    if (item.indexOf(value) != -1) {
                        ac_valid_suggestions.push(item);
                        $('ul.ac-suggest').add(EE('li', item))
                    }
                });

                if (ac_valid_suggestions.length > 0) {
                    $.off(suggestionClickAC);
                    $('.ac-suggest li').on('mousedown', suggestionClickAC);
                    if (!ac_arrow_move_event) {
                        $(input).on('|keyup', arrowMoveAC);
                        ac_arrow_move_event = true;
                    }
                }
            } else if (value.length < 3) {
                suggestionCloseAC(false);
            }
        }
    })

    $(input).on('|blur', function () {
        suggestionCloseAC(true);
    });

    function suggestionCloseAC(resetPrevious) {
        ac_suggest_focus = false;
        $.off(arrowMoveAC);
        $.off(suggestionClickAC);
        ac_arrow_move_event = false;
        $('.ac-suggest').remove();
        ac_suggestion_visible = false;
        ac_list_index = -1;
        if (resetPrevious)
            ac_input_previous_value = '';
    }

    function arrowMoveAC(event) {
        if (-1 < ac_list_index < ac_valid_suggestions.length)
            $($('.ac-suggest li')[ac_list_index]).set('$', '-highlight');

        switch (event.which) {
            case KEY_ARROW_DOWN:
                if (ac_list_index < ac_valid_suggestions.length - 1) {
                    ac_list_index++;
                    $(input).set('value', ac_valid_suggestions[ac_list_index]);
                }
                break;

            case KEY_ARROW_UP:
                if (ac_list_index > 0) {
                    ac_list_index--;
                    $(input).set('value', ac_valid_suggestions[ac_list_index]);
                }
                break;

            case KEY_ESC:
            case KEY_ENTER:
                suggestionCloseAC(true);
                break;

            default:
                break;
        }

        if ((-1 < ac_list_index) && (ac_list_index < ac_valid_suggestions.length))
            $($('.ac-suggest li')[ac_list_index]).set('$', '+highlight');
    }

    function suggestionClickAC() {
        var ac_list_index = $('.ac-suggest li').find(this[0]);
        $(input).set('value', ac_valid_suggestions[ac_list_index]);
        suggestionCloseAC(true);
    }
};