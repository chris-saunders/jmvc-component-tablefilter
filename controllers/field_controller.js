$.Controller.extend('Components.Tablefilter.Field',
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

Components.Tablefilter.Field.extend('Components.Tablefilter.Field.Text',
{

}, {
    render: function() {
        this.element.html(this.view('//components/tablefilter/views/fields/text.ejs', this.options));
        this.find('input').typeahead({
            source: this.options.data
        });
        this._super();
    }
});

Components.Tablefilter.Field.extend('Components.Tablefilter.Field.Date',
{

}, {
    render: function() {
        this.element.html(this.view('//components/tablefilter/views/fields/date.ejs', this.options));
        this.element.find('input').datepicker({ dateFormat: 'dd/mm/yy' });
        this._super();
    }
});

Components.Tablefilter.Field.extend('Components.Tablefilter.Field.Select',
{

}, {
    render: function() {
        this.element.html(this.view('//components/tablefilter/views/fields/select.ejs', this.options));
        this._super();
    }
});