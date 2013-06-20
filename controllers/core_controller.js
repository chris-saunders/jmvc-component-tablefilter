Frog.Controller.extend('Frogui.Controllers.Components.Tablefilter', {
    defaults: {
        filters: {}
    }
}, {
    init: function() {
        this.optionValidation();
        this.render();
    },

    optionValidation: function() {
        // Option validation
        if ($.isEmptyObject(this.options.filters)) {
            throw new Error('You must provide atleast one filter.');
        }
    },

    render: function() {
        var self = this,
            filters = this.options.filters;

        this.find('thead').append(this.view('//frogui/components/tablefilter/views/core/tablefilter-row.ejs'));
        var $cols = this.find('thead tr th'),
            $filterRow = this.find('.filter-row');

        $cols.each(function(index, el) {
            $filterRow.append($('<td></td>'));
        });

        var i = 0, $cell;

        for (var filter in filters) {
            if (filters.hasOwnProperty(filter)) {
                switch(filters[filter].type) {
                    case 'select':
                        $cell = $($filterRow.find('td').get(i));
                        $cell.frogui_components_tablefilter_field_select({
                            label: filter,
                            data: filters[filter].data
                        });
                    break;
                    case 'text':
                        $cell = $($filterRow.find('td').get(i));
                        $cell.frogui_components_tablefilter_field_text({
                            label: filter,
                            data: filters[filter].data
                        });
                    break;
                    case 'date':
                        $cell = $($filterRow.find('td').get(i));
                        $cell.frogui_components_tablefilter_field_date({
                            label: filter,
                            data: filters[filter].data
                        });
                    break;
                }
                i++;
            }
        }
    },

    update: function(options) {
        this._super(options);
        this.element.find('.filter-row').remove();
        this.optionValidation();
        this.render();
    }
});