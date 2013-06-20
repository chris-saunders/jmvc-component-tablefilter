steal(
    '../../tablefilter.js'
).then(
    function() {
        var $fixture = null,
            $table = null,
            repeat = {
                setup: function() {
                    $fixture = $('#qunit-fixture');
                    $fixture.append($.View('//frogui/components/tablefilter/test/qunit/views/field_test.ejs'));
                },
                teardown: function() {
                    $fixture = $table = null;
                }
            };
            
        module('text fields', repeat);
        test('can be instantiated', function() {
            ok($fixture.frogui_components_tablefilter_field_text());
        });

        test('text input is created in DOM', function() {
            equals($fixture.find('.name').frogui_components_tablefilter_field_text().find('input[type="text"]').length, 1);
        });

        test('text field is populated by given data', function() {
            $td = $fixture.find('.name');
            $td.frogui_components_tablefilter_field_text({
                data: ["chris"]
            });
            equals($td.find('input').val(), '');
        });

        module('select field', repeat);
        test('can be instantiated', function() {
            ok($fixture.frogui_components_tablefilter_field_select());
        });

        test('select field is created in DOM', function() {
            equals($fixture.find('.city').frogui_components_tablefilter_field_select().find('select').length, 1);
        });

        test('select field is populated by given data', function() {
            $td = $fixture.find('.city');
            $td.frogui_components_tablefilter_field_select({
                data: ["wakefield"]
            });
            equals($td.find('option[name=wakefield]').val(), 'wakefield');
        });

        module('date field', repeat);
        test('can be instantiated', function() {
            ok($fixture.frogui_components_tablefilter_field_date());
        });

        test('jQuery UI datepicker is created in DOM', function() {
            ok($fixture.find('.dob').frogui_components_tablefilter_field_date().find('.ui-datepicker'));
        });

        test('jQuery UI datepicker is associated to input', function() {
            var $el = $fixture.find('.dob').frogui_components_tablefilter_field_date();
            equals($el.find('input').length, 1);
            ok($el.find('input').hasClass('hasDatepicker'));
        });

        module('failing component instantiation');
        test('component requires atleast one column to be filtered', function() {
            $fixture = $('#qunit-fixture');
            $fixture.append($.View('//frogui/components/tablefilter/test/qunit/views/blank_table_test.ejs'));
            $table = $fixture.find('table');

            raises(
                function() {
                    $table.frogui_components_tablefilter();
                },
                function(err) {
                    return err.message === 'You must provide atleast one filter.';
                }
            );
        });

        repeat = {
            setup: function() {
                $fixture = $('#qunit-fixture');
                $fixture.append($.View('//frogui/components/tablefilter/test/qunit/views/blank_table_test.ejs'));
                $table = $fixture.find('table');
                $table.frogui_components_tablefilter({
                    filters: {
                        name: {
                            type: "text",
                            data: ["Chris", "Dave", "Jill"]
                        },
                        dob: {
                            type: "date"
                        },
                        city: {
                            type: "select",
                            data: ["manchester", "wakefield", "leeds"]
                        }
                    }
                });
            },
            teardown: function() {
                $fixture = $table = null;
            }
        };

        module('component instantiation', repeat)
        test('component can be instantiated on a table', function() {
            ok($table.hasClass('frogui_components_tablefilter'));
        });

        test('appends filter row to thead', function() {
            equals($table.find('thead tr.filter-row').length, 1);
        });

        test("instantiates a component on corresponding column", function() {
            // test = $table;
            // debugger;
            ok($table.find('.filter-row td.city').hasClass('frogui_components_tablefilter_field_select'));
            ok($table.find('.filter-row td.name').hasClass('frogui_components_tablefilter_field_text'));
            ok($table.find('.filter-row td.dob').hasClass('frogui_components_tablefilter_field_date'));
        });
    }
)