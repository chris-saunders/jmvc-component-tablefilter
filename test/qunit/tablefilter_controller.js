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
            equal($fixture.find('.name').frogui_components_tablefilter_field_text().find('input[type="text"]').length, 1);
        });

        module('select field', repeat);
        test('can be instantiated', function() {
            ok($fixture.frogui_components_tablefilter_field_select());
        });

        test('select field is created in DOM', function() {
            equal($fixture.find('.city').frogui_components_tablefilter_field_select().find('select').length, 1);
        });

        test('select field is populated by given data', function() {
            $td = $fixture.find('.city');
            $td.frogui_components_tablefilter_field_select({
                data: ["wakefield"]
            });
            equal($td.find('option[name=wakefield]').val(), 'wakefield');
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

            equal($el.find('input').length, 1);
            ok($el.find('input').hasClass('hasDatepicker'));
        });

        module('component parameter validation');
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

        test('component throws error if a filter is provided without a position declared', function() {
            $fixture = $('#qunit-fixture');
            $fixture.append($.View('//frogui/components/tablefilter/test/qunit/views/blank_table_test.ejs'));
            $table = $fixture.find('table');

            raises(
                function() {
                    $table.frogui_components_tablefilter({
                        filters: {
                            name: {
                                type: "text",
                                data: ["Chris", "Dave", "Jill"]
                            }
                        }
                    });
                },
                function(err) {
                    return err.message === 'You must provide `position` for each filter.';
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
                            data: ["Chris", "Dave", "Jill"],
                            position: 0
                        },
                        dob: {
                            type: "date",
                            placeholder: 'Enter Date of Birth',
                            position: 1
                        },
                        city: {
                            type: "select",
                            data: ["manchester", "wakefield", "leeds"],
                            position: 2
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

        test('placeholders can be defaulted and overriden', function() {
            equal($table.find('.name input').attr('placeholder'), 'Enter name');
            equal($table.find('.dob input').attr('placeholder'), 'Enter Date of Birth');
        });

        test('appends filter row to thead', function() {
            equal($table.find('thead tr.filter-row').length, 1);
        });

        test('appends filter submit row to thead', function() {
            equal($table.find('thead tr.filter-submit-row').length, 1);
        });

        test('instantiates a component on corresponding column', function() {
            var $filterRowTds = $table.find('tr.filter-row').children();

            ok($filterRowTds.eq(0).hasClass('frogui_components_tablefilter_field_text'));
            ok($filterRowTds.eq(1).hasClass('frogui_components_tablefilter_field_date'));
            ok($filterRowTds.eq(2).hasClass('frogui_components_tablefilter_field_select'));
        });

        test('reset button clears filter values', function() {
            var $filterRow = $table.find('tr.filter-row');

            $filterRow.find('.name input').val('Chris');
            $filterRow.find('.dob input').val('06/01/2013');
            $filterRow.find('.city select').val('wakefield');

            $table.find('.filter-reset').click();

            strictEqual($filterRow.find('.name input').val(), '');
            strictEqual($filterRow.find('.dob input').val(), '');
            strictEqual($filterRow.find('.city select').val(), 'manchester');
        });

        test('filter button emits form data', 1, function() {
            var $filters = $table.find('tr.filter-row td'),
                expectedData = {
                    
                    dob: "06/01/2013",
                    city: "wakefield"
                };

            $fixture.on('tablefilter.submit', function(ev, data) {
                deepEqual(data, expectedData);
            });

            // $filters.children('.name input').val('Chris');
            $filters.children('.dob input').val('06/01/2013');
            $filters.children('.city select').val('wakefield');

            $table.find('.filter-submit').click();
        });

        module('display', repeat);
        test('component initiates hidden from view', function() {
            ok($table.find('.filter-row').hasClass('hide'));
            ok($table.find('.filter-submit-row').hasClass('hide'));
        });

        test('component visibility toggles on firing `tablefilter.toggleVisibility` event', function() {
            $table.trigger('tablefilter.toggleVisibility');
            ok(!$table.find('.filter-row').hasClass('hide'));

            $table.trigger('tablefilter.toggleVisibility');
            ok($table.find('.filter-row').hasClass('hide'));
        });
    }
)