Frog.Controller.extend('Frogui.Controllers.Components.Tablefilter', {
    defaults: {
        filters: {}
    }
}, {
    init: function() {
        this.columnCount = this.find('thead tr:first th').length;
        this.render();
    },

    render: function() {
		// Render an empty row with classes to indicate column names
        this.element.find('thead').append(this.view('//frogui/components/tablefilter/views/core/tablefilter-row.ejs', {
            columnCount: this.columnCount,
            filters: this.options.filters
        }));
        // Render field components on each td element
        for (i=0; i < this.columnCount; i++) {
            var filter = this.options.filters[i];
            if (filter && filter.hasOwnProperty('name') && filter.hasOwnProperty('component')) {
                var columnName = filter.name,
                    $el = this.element.find('thead tr td.' + columnName);
                if ($el) {
                    new filter.component($el);
                }
            }
        }
    }
});