// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
require.config({    
    paths: {        
        app: window.configs.baseUrl + 'app'
    },
	urlArgs: 'v=1.2'    
});

window.spa = window.spa || {};
window.spa.name = 'cms';
window.spa.sysmodules = ['shell'];

// Start loading the main app file. Put all of
// your application logic in there.
require(['bootstrap']);
