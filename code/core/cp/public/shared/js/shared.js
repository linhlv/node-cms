(function(){
    var shared = angular.module('shared', [
        'ngAnimate',
        'ngResource',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'oc.lazyLoad',
        'nouislider',
        'ngTable'
    ]);


    // =========================================================================
    // INPUT FEILDS MODIFICATION
    // =========================================================================
    //Add blue animated border and remove with condition when focus and blur
    shared.directive('fgLine', [function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                if($('.fg-line')[0]) {
                    $('body').on('focus', '.form-control', function(){
                        $(this).closest('.fg-line').addClass('fg-toggled');
                    })

                    $('body').on('blur', '.form-control', function(){
                        var p = $(this).closest('.form-group');
                        var i = p.find('.form-control').val();

                        if (p.hasClass('fg-float')) {
                            if (i.length == 0) {
                                $(this).closest('.fg-line').removeClass('fg-toggled');
                            }
                        }
                        else {
                            $(this).closest('.fg-line').removeClass('fg-toggled');
                        }
                    });
                }
    
            }
        }
        
    }]);

    // =========================================================================
    // AUTO SIZE TEXTAREA
    // =========================================================================
    shared.directive('autoSize', [function(){
         return {
            restrict: 'A',
            link: function(scope, element){
                if (element[0]) {
                   autosize(element);
                }
            }
        }
    }]);

    // =========================================================================
    // BOOTSTRAP SELECT
    // =========================================================================
    shared.directive('selectPicker', [function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                //if (element[0]) {
                    element.selectpicker();
                //}
            }
        }
    }]);    

    // =========================================================================
    // INPUT MASK
    // =========================================================================
    shared.directive('inputMask', [function(){
        return {
            restrict: 'A',
            scope: {
              inputMask: '='
            },
            link: function(scope, element){
                element.mask(scope.inputMask.mask);
            }
        }
    }]);
    
    // =========================================================================
    // COLOR PICKER
    // =========================================================================
    shared.directive('colordPicker', [function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).each(function(){
                    var colorOutput = $(this).closest('.cp-container').find('.cp-value');
                    $(this).farbtastic(colorOutput);
                });
                
            }
        }
    }]);

    // =========================================================================
    // PLACEHOLDER FOR IE 9 (on .form-control class)
    // =========================================================================
    shared.directive('formControl', [function(){
        return {
            restrict: 'C',
            link: function(scope, element, attrs) {
                if(angular.element('html').hasClass('ie9')) {
                    $('input, textarea').placeholder({
                        customClass: 'ie9-placeholder'
                    });
                }
            }
            
        }
    }]);

    // =========================================================================
    // CALENDAR WIDGET
    // =========================================================================
    shared.directive('fullCalendar', [function(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.fullCalendar({
                    contentHeight: 'auto',
                    theme: true,
                    header: {
                        right: '',
                        center: 'prev, title, next',
                        left: ''
                    },
                    defaultDate: '2014-06-12',
                    editable: true,
                    events: [
                        {
                            title: 'All Day',
                            start: '2014-06-01',
                            className: 'bgm-cyan'
                        },
                        {
                            title: 'Long Event',
                            start: '2014-06-07',
                            end: '2014-06-10',
                            className: 'bgm-orange'
                        },
                        {
                            id: 999,
                            title: 'Repeat',
                            start: '2014-06-09',
                            className: 'bgm-lightgreen'
                        },
                        {
                            id: 999,
                            title: 'Repeat',
                            start: '2014-06-16',
                            className: 'bgm-blue'
                        },
                        {
                            title: 'Meet',
                            start: '2014-06-12',
                            end: '2014-06-12',
                            className: 'bgm-teal'
                        },
                        {
                            title: 'Lunch',
                            start: '2014-06-12',
                            className: 'bgm-gray'
                        },
                        {
                            title: 'Birthday',
                            start: '2014-06-13',
                            className: 'bgm-pink'
                        },
                        {
                            title: 'Google',
                            url: 'http://google.com/',
                            start: '2014-06-28',
                            className: 'bgm-bluegray'
                        }
                    ]
                });
            }
        }
    }]);
    

    // =========================================================================
    // MAIN CALENDAR
    // =========================================================================
    shared.directive('calendar', ['$compile', function($compile){
        return {
            restrict: 'A',
            scope: {
                select: '&',
                actionLinks: '=',
            },
            link: function(scope, element, attrs) {
                
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();

                //Generate the Calendar
                element.fullCalendar({
                    header: {
                        right: '',
                        center: 'prev, title, next',
                        left: ''
                    },

                    theme: true, //Do not remove this as it ruin the design
                    selectable: true,
                    selectHelper: true,
                    editable: true,

                    //Add Events
                    events: [
                        {
                            title: 'Hangout with friends',
                            start: new Date(y, m, 1),
                            allDay: true,
                            className: 'bgm-cyan'
                        },
                        {
                            title: 'Meeting with client',
                            start: new Date(y, m, 10),
                            allDay: true,
                            className: 'bgm-red'
                        },
                        {
                            title: 'Repeat Event',
                            start: new Date(y, m, 18),
                            allDay: true,
                            className: 'bgm-blue'
                        },
                        {
                            title: 'Semester Exam',
                            start: new Date(y, m, 20),
                            allDay: true,
                            className: 'bgm-green'
                        },
                        {
                            title: 'Soccor match',
                            start: new Date(y, m, 5),
                            allDay: true,
                            className: 'bgm-purple'
                        },
                        {
                            title: 'Coffee time',
                            start: new Date(y, m, 21),
                            allDay: true,
                            className: 'bgm-orange'
                        },
                        {
                            title: 'Job Interview',
                            start: new Date(y, m, 5),
                            allDay: true,
                            className: 'bgm-dark'
                        },
                        {
                            title: 'IT Meeting',
                            start: new Date(y, m, 5),
                            allDay: true,
                            className: 'bgm-cyan'
                        },
                        {
                            title: 'Brunch at Beach',
                            start: new Date(y, m, 1),
                            allDay: true,
                            className: 'bgm-purple'
                        },
                        {
                            title: 'Live TV Show',
                            start: new Date(y, m, 15),
                            allDay: true,
                            className: 'bgm-orange'
                        },
                        {
                            title: 'Software Conference',
                            start: new Date(y, m, 25),
                            allDay: true,
                            className: 'bgm-blue'
                        },
                        {
                            title: 'Coffee time',
                            start: new Date(y, m, 30),
                            allDay: true,
                            className: 'bgm-orange'
                        },
                        {
                            title: 'Job Interview',
                            start: new Date(y, m, 30),
                            allDay: true,
                            className: 'bgm-dark'
                        },
                    ],

                    //On Day Select
                    select: function(start, end, allDay) {
                        scope.select({
                            start: start, 
                            end: end
                        });
                    }
                });
                
                  
                //Add action links in calendar header
                element.find('.fc-toolbar').append($compile(scope.actionLinks)(scope));
            }
        }
    }]);    

    //Change Calendar Views
    shared.directive('calendarView', [function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function(){
                    $('#calendar').fullCalendar('changeView', attrs.calendarView);  
                })
            }
        }
    }]);

     // =========================================================================
    // MEDIA ELEMENT
    // =========================================================================    
    shared.directive('mediaElement', [function(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.mediaelementplayer();
            }
        }
        
    }]);


    // =========================================================================
    // LIGHTBOX
    // =========================================================================    
    shared.directive('lightbox', [function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                element.lightGallery({
                    enableTouch: true
                }); 
            }
        }
        
    }]);


    // =========================================================================
    // LAYOUT
    // =========================================================================    
    shared.directive('changeLayout', [function(){
        
        return {
            restrict: 'A',
            scope: {
                changeLayout: '='
            },
            
            link: function(scope, element, attr) {
                
                //Default State
                if(scope.changeLayout === '1') {
                    element.prop('checked', true);
                }
                
                //Change State
                element.on('change', function(){
                    if(element.is(':checked')) {
                        localStorage.setItem('ma-layout-status', 1);
                        scope.$apply(function(){
                            scope.changeLayout = '1';
                        })
                    }
                    else {
                        localStorage.setItem('ma-layout-status', 0);
                        scope.$apply(function(){
                            scope.changeLayout = '0';
                        })
                    }
                })
            }
        }
    }]);


    // =========================================================================
    // MAINMENU COLLAPSE
    // =========================================================================
    shared.directive('toggleSidebar', [function(){

        return {
            restrict: 'A',
            scope: {
                modelLeft: '=',
                modelRight: '='
            },
            
            link: function(scope, element, attr) {
                element.on('click', function(){
 
                    if (element.data('target') === 'mainmenu') {
                        if (scope.modelLeft === false) {
                            scope.$apply(function(){
                                scope.modelLeft = true;
                            })
                        }
                        else {
                            scope.$apply(function(){
                                scope.modelLeft = false;
                            })
                        }
                    }
                    
                    if (element.data('target') === 'chat') {
                        if (scope.modelRight === false) {
                            scope.$apply(function(){
                                scope.modelRight = true;
                            })
                        }
                        else {
                            scope.$apply(function(){
                                scope.modelRight = false;
                            })
                        }
                        
                    }
                })
            }
        }
    
    }]);
    

    
    // =========================================================================
    // SUBMENU TOGGLE
    // =========================================================================
    shared.directive('toggleSubmenu', [function(){

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    element.next().slideToggle(200);
                    element.parent().toggleClass('toggled');
                });
            }
        }
    }]);

    // =========================================================================
    // STOP PROPAGATION
    // =========================================================================    
    shared.directive('stopPropagate', [function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                element.on('click', function(event){
                    event.stopPropagation();
                });
            }
        }
    }]);

    shared.directive('aPrevent', [function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                element.on('click', function(event){
                    event.preventDefault();
                });
            }
        }
    }]);


    // =========================================================================
    // PRINT
    // =========================================================================    
    shared.directive('print', [function(){
        return {
            restrict: 'A',
            link: function(scope, element){
                element.click(function(){
                    window.print();
                })   
            }
        }
    }]);
})();
