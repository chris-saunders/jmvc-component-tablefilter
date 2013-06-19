Frog.Controller.extend('Frogui.Controllers.Components.Tablefilter.Field',
{

}, {
    init: function() {
        this.render();
    }
});

Frogui.Controllers.Components.Tablefilter.Field.extend('Frogui.Controllers.Components.Tablefilter.Field.Text',
{

}, {
    render: function() {
        this.element.html(this.view('//frogui/components/tablefilter/views/fields/text.ejs'));
    }
});

Frogui.Controllers.Components.Tablefilter.Field.extend('Frogui.Controllers.Components.Tablefilter.Field.Date',
{

}, {
    render: function() {
        this.element.html(this.view('//frogui/components/tablefilter/views/fields/date.ejs'));
        this.element.find('input').datepicker();
    }
});

Frogui.Controllers.Components.Tablefilter.Field.extend('Frogui.Controllers.Components.Tablefilter.Field.Select',
    {

    }, {
        render: function() {
            this.element.html(this.view('//frogui/components/tablefilter/views/fields/select.ejs'));
        }
    });