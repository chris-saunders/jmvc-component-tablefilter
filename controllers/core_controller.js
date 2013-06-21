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

        this.find('thead').append(this.view('//frogui/components/tablefilter/views/core/tablefilter.ejs'));
        var $cols = this.find('thead tr th'),
            $filterRow = this.find('.filter-row'),
            $submitRow = this.find('.filter-submit-row');

        $cols.each(function(index, el) {
            $filterRow.append($('<td></td>'));
            if (index < $cols.length - 1) {
                $submitRow.prepend($('<td></td>'));
            }
        });

        var i = 0, $cell;

        for (var filter in filters) {
            if (filters.hasOwnProperty(filter)) {
                switch(filters[filter].type) {
                    case 'text':
                        $cell = $($filterRow.find('td').get(i));
                        $cell.attr('label', filter);
                        $cell.frogui_components_tablefilter_field_text({
                            label: filter,
                            data: filters[filter].data,
                            placeholder: filters[filter].placeholder || 'Enter ' + filter
                        });
                    break;
                    case 'date':
                        $cell = $($filterRow.find('td').get(i));
                        $cell.attr('label', filter);
                        $cell.frogui_components_tablefilter_field_date({
                            label: filter,
                            data: filters[filter].data,
                            placeholder: filters[filter].placeholder || 'Enter ' + filter
                        });
                    break;
                    case 'select':
                        $cell = $($filterRow.find('td').get(i));
                        $cell.attr('label', filter);
                        $cell.frogui_components_tablefilter_field_select({
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
    },

    'tablefilter.toggleVisibility': function(el, ev) {
        this.find('.filter-row, .filter-submit-row').toggleClass('hide');
    },

    'button.filter-reset {click}': function(el, ev) {
        var $filters = this.element.find('tr.filter-row').children();

        $filters.each(function(index, el) {
            $(this).children().val('');
        });

        this.element.trigger('tablefilter.reset');
    },

    'button.filter-submit {click}': function(el, ev) {
        var $filters = this.element.find('tr.filter-row td'),
            filterData = {};

        $filters.each(function(index, el) {
            filterData[$(this).attr('label')] = $(el).children().val();
        });

        this.element.trigger('tablefilter.submit', filterData);
    }
});