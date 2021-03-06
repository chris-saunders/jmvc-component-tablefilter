jmvc-component-tablefilter
===============================

A tablefilter component for JMVC 3.2.4.

## Overview
Appends a row to an existing table to facilitate filtering table content. An event is triggered with the filter data.

## Getting Started
### Quick-start
##### Controller
    $('table').components_tablefilter({
        filters: {
            name: {
                type: "text",
                data: ["Chris", "Bob", "Janet"],
                position: 0
            },
            dob: {
                type: "date",
                position: 1
            },
            city: {
                type: "select",
                data: ["Wakefield", "Dewsbury", "Batley"],
                position: 2
            }
        }
    });

##### Filter button

    'button.filter-show click': function(el, ev) {
        this.find('.components_tablefilter').trigger('tablefilter.toggleVisibility');
    }

#### Template
    <button class="btn filter-show"><div class="filter-icon"></div></button>

#### CSS

    .filter-icon {
        background: url("../../../../public/icon/UI/icons.png") no-repeat -328px -107px;
        height: 18px;
        width: 16px;
    }

## Parameters
The component takes an object literal as its only parameter.
### Required
#### filters
    filters: {
        arbitraryIdentifier: {
            type: 'text' || 'date' || 'select',
            data: [] // only required for 'text' or 'select',
            position: integer (zero-indexed)
        }
    } 
    Type: Object
NB: 'text' filters use [Bootstrap Typeahead](http://twitter.github.io/bootstrap/javascript.html#typeahead)
### Optional
#### filters.arbitraryIdentified.placeholder (default: 'Enter `arbitraryIdentifier`')
    Type: String
A string used for the placeholder on specified field.

## Events
###  Emitted
- 'tablefilter.submit' - provides scraped filter data as an object keyed by arbitrary identifiers provided.
- 'tablefilter.reset'.

### Listeners
- 'tablefilter.toggleVisibility' - shows/hides component.

## Additional Info
- This component is test driven. If you make any modifications to this component please test drive carefully!

### Suggestions & Questions
chris.saunders@frogtrade.com
