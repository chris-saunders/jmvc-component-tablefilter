steal(
	'funcunit/qunit',
	'jquery/model',
	'jquery/controller',
	'jquery/view/ejs',
	'jquery/dom/fixture',
	'../../tablefilter.js',
	function() {
		var $fixture = null,
			$table = null,
			repeat = {
				setup: function() {
					$fixture = $('#qunit-fixture');
					$fixture.append('<table class="testTable"><thead></thead><tbody></tbody></table>');
					$table = $('.testTable');
					$table.tablefilter();
				}, teardown: function() {
					$fixture = $table = null;
				}
			};

		module("instantiation", repeat);
		test("can instantiate component on a table", function() {
			ok($table.hasClass('tablefilter'));
		});

		test("component row is added to table's tbody", function() {
			ok($fixture.find('tbody>:first-child').hasClass('table-filter-row'));
		});

		test("controller can parse corresponding given col types to view cols", function() {
			$table.tablefilter({
				cells: {
					name: 'text',
					dob: 'date'
				}
			});
			// instantiate col type components
		});
	}
)