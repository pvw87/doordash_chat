require.config({

    baseUrl: './js',
    paths: {
        'jquery': 'libs/jquery',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',

        'text': 'libs/plugins/text',

        // Application Folders
        'collections': 'collections',
        'models': 'models',
        'routers': 'routers',
        'templates': 'templates',
        'views': 'views',
        'utils': 'views/utilities/utils',
        'globals': 'views/utilities/globals',
        'events': 'views/utilities/events'
    },

    shim: {
        'backbone': {
            'deps': ['underscore', 'jquery'],
            'exports': 'Backbone'
        }
    }

});

require([
    'jquery',
    'backbone',
    'routers/Router'
], function($, Backbone, Router) {
    new Router();
});