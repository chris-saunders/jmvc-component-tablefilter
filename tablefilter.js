steal(
	'./tablefilter.css', 			// application CSS file
	'./models/models.js',		// steals all your models
	'./fixtures/fixtures.js',	// sets up fixtures for your models
	'jquery/controller',
	'jquery/controller/view',

	function(){					// configure your application
		$.Controller('Tablefilter',
		{

		}, {
			init: function() {
				this.render();
			},

			render: function() {
				this.element.find('tbody').append(this.view('core.ejs'));
			}
		});
	})