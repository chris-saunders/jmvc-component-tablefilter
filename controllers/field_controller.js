Frog.Controller.extend('Frogui.Controllers.Components.Tablefilter.Field',
{
    defaults: {
        data: [],
        placeholder: ''
    }

}, {
    init: function() {
        this.render();
    },

    render: function() {
        this.element.addClass(this.options.label);
    }
});

Frogui.Controllers.Components.Tablefilter.Field.extend('Frogui.Controllers.Components.Tablefilter.Field.Text',
{

}, {
    render: function() {
        this.element.html(this.view('//frogui/components/tablefilter/views/fields/text.ejs', this.options));
        this.find('input').typeahead({
            source: this.options.data
        });
        this._super();
    }
});

Frogui.Controllers.Components.Tablefilter.Field.extend('Frogui.Controllers.Components.Tablefilter.Field.Date',
{

}, {
    render: function() {
        this.element.html(this.view('//frogui/components/tablefilter/views/fields/date.ejs', this.options));
        this.element.find('input').datepicker({ dateFormat: 'dd/mm/yy' })
        this._super();
    }
});

Frogui.Controllers.Components.Tablefilter.Field.extend('Frogui.Controllers.Components.Tablefilter.Field.Select',
{

}, {
    render: function() {
        this.element.html(this.view('//frogui/components/tablefilter/views/fields/select.ejs', this.options));
        this._super();
    }
});