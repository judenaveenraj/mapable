var MapableStepSet = (function(steps, options) {

    var model = {

        steps: [],
        _options: options ? options : undefined

    };

    var controller = {

    };

    var view = {
        container: $("#container"),
        init: function() {

        },
        show: function() {

        }

    }

    function bindEvents() {

    }

    return {
        init: function() {
            view.init();
            bindEvents();
        },

        getModel: function() {
            return model;
        },
        getView: function() {
            return view;
        }


    }
});