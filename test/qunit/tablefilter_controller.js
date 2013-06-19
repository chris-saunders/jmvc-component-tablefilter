steal(
	'funcunit/qunit',
	'jquery/model',
	'jquery/controller',
    'jquery/controller/view',
	'jquery/view/ejs',
	'jquery/dom/fixture',
	'../../tablefilter.js'
).then(
	function() {
		var $fixture = null,
			$table = null,
			repeat_field = {
				setup: function() {
					$fixture = $('#qunit-fixture');
                    $fixture.append($.View('//frogui/components/tablefilter/test/qunit/views/field_test.ejs'));
				},
                teardown: function() {
					$fixture = $table = null;
				}
            },
            repeat_instantiation = {
                setup: function() {
                    $fixture = $('#qunit-fixture');
                    $fixture.append($.View('//frogui/components/tablefilter/test/qunit/views/instantiation_test.ejs'));
                },
                teardown: function() {
                    $fixture = $table = null;
                }
            };

        module('text field', repeat_field);

        test('can be instantiated', function() {
            ok($fixture.frogui_components_tablefilter_field_text());
        });

        test('text input is created in DOM', function() {
            var $el = $fixture.find('.name');
            $el.frogui_components_tablefilter_field_text();
            equals($el.find('input[type="text"]').length, 1);
        });

        module('select field', repeat_field);

        test('can be instantiated', function() {
            ok($fixture.frogui_components_tablefilter_field_select());
        });

        test('select field is created in DOM', function() {
            var $el = $fixture.find('.city');
            $el.frogui_components_tablefilter_field_select();
            equals($el.find('select').length, 1);
        });

		module('date field', repeat_field);

		test('can be instantiated', function() {
			ok($fixture.frogui_components_tablefilter_field_date());
		});

        test('jQuery UI datepicker is created in DOM', function() {
            var $el = $fixture.find('.dob');
            $el.frogui_components_tablefilter_field_date();
            ok($fixture.find('.ui-datepicker'));
        });

        test('jQuery UI datepicker is associated to input', function() {
            var $el = $fixture.find('.dob');
            $el.frogui_components_tablefilter_field_date();
            equals($el.find('input').length, 1);
            ok($el.find('input').hasClass('hasDatepicker'));
        });

        module('instantiation', repeat_instantiation);

        test('component can be instantiated on a table', function() {
            var $table = $fixture.find('table');
            $table.frogui_components_tablefilter();
            ok($table.hasClass('frogui_components_tablefilter'));
        });

        test('appends filter row to thead', function() {
            var $table = $fixture.find('table');
            $table.frogui_components_tablefilter();
            equals($table.find('thead tr.filter-row').length, 1);
        });

        test('filter row has correct column count', function() {
            var $table = $fixture.find('table'),
                columnCount = $table.find('thead tr:first th').length;
            $table.frogui_components_tablefilter();
            equals($table.find('thead tr.filter-row td').length, columnCount);
        });

        test('filter names are inserted as classes on correct columns', function() {
            var $table = $fixture.find('table'),
                params = {
                    'filters': {
                        0: {'name': 'name'},
                        1: {'name': 'dob'},
                        2: {'name': 'city'}
                    }
                };
            $table.frogui_components_tablefilter(params);
            var filters = $table.find('thead tr.filter-row td');
            ok($(filters[0]).hasClass('name'));
            ok($(filters[1]).hasClass('dob'));
            ok($(filters[2]).hasClass('city'));
        });

        test('filter components are rendered into correct columns', function() {
            var $table = $fixture.find('table'),
                params = {
                    filters: {
                        0: {'name': 'name', 'component': Frogui.Controllers.Components.Tablefilter.Field.Text},
                        1: {'name': 'dob'},
                        2: {'name': 'city', 'component': Frogui.Controllers.Components.Tablefilter.Field.Select}
                    }
                };
            $table.frogui_components_tablefilter(params);
            var $filters = $table.find('thead tr.filter-row');
            ok($filters.find('.name').hasClass('frogui_components_tablefilter_field_text')); // name has text component
			ok($filters.find('.dob').attr('class') === 'dob'); // DOB has no component
			ok($filters.find('.city').hasClass('frogui_components_tablefilter_field_select')); // city has select component
        });
	}
)