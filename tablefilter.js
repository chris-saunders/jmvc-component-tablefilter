steal(
    'jquery/controller',
    'jquery/controller/view',
    '//jquery/view/ejs/ejs',
    './controllers/controllers.js',
	'./models/models.js',
	'./fixtures/fixtures.js',
    './tablefilter.css'
).then(
    '//public/js/libs/jqueryui/latest.js',

	function(){
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