materialAdmin
    .config(function ($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/home");


        $stateProvider
        
            //------------------------------
            // HOME
            //------------------------------

            .state ('home', {
                url: '/home',
                templateUrl: window.configs.baseUrl + 'views/home.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/fullcalendar/dist/fullcalendar.min.css',
                                ]
                            },
                            {
                                name: 'vendors',
                                insertBefore: '#app-level-js',
                                files: [
                                    window.configs.baseUrl + 'vendors/sparklines/jquery.sparkline.min.js',
                                    window.configs.baseUrl + 'vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
                                    window.configs.baseUrl + 'vendors/bower_components/simpleWeather/jquery.simpleWeather.min.js'
                                ]
                            }
                        ])
                    }
                }
            })


            //------------------------------
            // HEADERS
            //------------------------------
            .state ('headers', {
                url: '/headers',
                templateUrl: window.configs.baseUrl + 'views/common-2.html'
            })

            .state('headers.textual-menu', {
                url: '/textual-menu',
                templateUrl: window.configs.baseUrl + 'views/textual-menu.html'
            })

            .state('headers.image-logo', {
                url: '/image-logo',
                templateUrl: window.configs.baseUrl + 'views/image-logo.html'
            })

            .state('headers.mainmenu-on-top', {
                url: '/mainmenu-on-top',
                templateUrl: window.configs.baseUrl + 'views/mainmenu-on-top.html'
            })


            //------------------------------
            // TYPOGRAPHY
            //------------------------------
        
            .state ('typography', {
                url: '/typography',
                templateUrl: window.configs.baseUrl + 'views/typography.html'
            })


            //------------------------------
            // WIDGETS
            //------------------------------
        
            .state ('widgets', {
                url: '/widgets',
                templateUrl: window.configs.baseUrl + 'views/common.html'
            })

            .state ('widgets.widgets', {
                url: '/widgets',
                templateUrl: window.configs.baseUrl + 'views/widgets.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/mediaelement/build/mediaelementplayer.css',
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    window.configs.baseUrl + 'vendors/bower_components/autosize/dist/autosize.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('widgets.widget-templates', {
                url: '/widget-templates',
                templateUrl: window.configs.baseUrl + 'views/widget-templates.html',
            })


            //------------------------------
            // TABLES
            //------------------------------
        
            .state ('tables', {
                url: '/tables',
                templateUrl: window.configs.baseUrl + 'views/common.html'
            })
            
            .state ('tables.tables', {
                url: '/tables',
                templateUrl: window.configs.baseUrl + 'views/tables.html'
            })
            
            .state ('tables.data-table', {
                url: '/data-table',
                templateUrl: window.configs.baseUrl + 'views/data-table.html'
            })

        
            //------------------------------
            // FORMS
            //------------------------------
            .state ('form', {
                url: '/form',
                templateUrl: window.configs.baseUrl + 'views/common.html'
            })

            .state ('form.basic-form-elements', {
                url: '/basic-form-elements',
                templateUrl: window.configs.baseUrl + 'views/form-elements.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/autosize/dist/autosize.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('form.form-components', {
                url: '/form-components',
                templateUrl: window.configs.baseUrl + 'views/form-components.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/nouislider/jquery.nouislider.css',
                                    window.configs.baseUrl + 'vendors/farbtastic/farbtastic.css',
                                    window.configs.baseUrl + 'vendors/bower_components/summernote/dist/summernote.css',
                                    window.configs.baseUrl + 'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                                    window.configs.baseUrl + 'vendors/bower_components/chosen/chosen.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    window.configs.baseUrl + 'vendors/input-mask/input-mask.min.js',
                                    window.configs.baseUrl + 'vendors/bower_components/nouislider/jquery.nouislider.min.js',
                                    window.configs.baseUrl + 'vendors/bower_components/moment/min/moment.min.js',
                                    window.configs.baseUrl + 'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                                    window.configs.baseUrl + 'vendors/bower_components/summernote/dist/summernote.min.js',
                                    window.configs.baseUrl + 'vendors/fileinput/fileinput.min.js',
                                    window.configs.baseUrl + 'vendors/bower_components/chosen/chosen.jquery.js',
                                    window.configs.baseUrl + 'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                    window.configs.baseUrl + 'vendors/bower_components/angular-farbtastic/angular-farbtastic.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
            .state ('form.form-examples', {
                url: '/form-examples',
                templateUrl: window.configs.baseUrl + 'views/form-examples.html'
            })
        
            .state ('form.form-validations', {
                url: '/form-validations',
                templateUrl: window.configs.baseUrl + 'views/form-validations.html'
            })
        
            
            //------------------------------
            // USER INTERFACE
            //------------------------------
        
            .state ('user-interface', {
                url: '/user-interface',
                templateUrl: window.configs.baseUrl + 'views/common.html'
            })
        
            .state ('user-interface.ui-bootstrap', {
                url: '/ui-bootstrap',
                templateUrl: window.configs.baseUrl + 'views/ui-bootstrap.html'
            })

            .state ('user-interface.colors', {
                url: '/colors',
                templateUrl: window.configs.baseUrl + 'views/colors.html'
            })

            .state ('user-interface.animations', {
                url: '/animations',
                templateUrl: window.configs.baseUrl + 'views/animations.html'
            })
        
            .state ('user-interface.box-shadow', {
                url: '/box-shadow',
                templateUrl: window.configs.baseUrl + 'views/box-shadow.html'
            })
        
            .state ('user-interface.buttons', {
                url: '/buttons',
                templateUrl: window.configs.baseUrl + 'views/buttons.html'
            })
        
            .state ('user-interface.icons', {
                url: '/icons',
                templateUrl: window.configs.baseUrl + 'views/icons.html'
            })
        
            .state ('user-interface.alerts', {
                url: '/alerts',
                templateUrl: window.configs.baseUrl + 'views/alerts.html'
            })

            .state ('user-interface.preloaders', {
                url: '/preloaders',
                templateUrl: window.configs.baseUrl + 'views/preloaders.html'
            })

            .state ('user-interface.notifications-dialogs', {
                url: '/notifications-dialogs',
                templateUrl: window.configs.baseUrl + 'views/notification-dialog.html'
            })
        
            .state ('user-interface.media', {
                url: '/media',
                templateUrl: window.configs.baseUrl + 'views/media.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/mediaelement/build/mediaelementplayer.css',
                                    window.configs.baseUrl + 'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    window.configs.baseUrl + 'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
            .state ('user-interface.other-components', {
                url: '/other-components',
                templateUrl: window.configs.baseUrl + 'views/other-components.html'
            })
            
        
            //------------------------------
            // CHARTS
            //------------------------------
            
            .state ('charts', {
                url: '/charts',
                templateUrl: window.configs.baseUrl + 'views/common.html'
            })

            .state ('charts.flot-charts', {
                url: '/flot-charts',
                templateUrl: window.configs.baseUrl + 'views/flot-charts.html',
            })

            .state ('charts.other-charts', {
                url: '/other-charts',
                templateUrl: window.configs.baseUrl + 'views/other-charts.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                files: [
                                    window.configs.baseUrl + 'vendors/sparklines/jquery.sparkline.min.js',
                                    window.configs.baseUrl + 'vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
                                ]
                            }
                        ])
                    }
                }
            })
        
        
            //------------------------------
            // CALENDAR
            //------------------------------
            
            .state ('calendar', {
                url: '/calendar',
                templateUrl: window.configs.baseUrl + 'views/calendar.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/fullcalendar/dist/fullcalendar.min.css',
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/moment/min/moment.min.js',
                                    window.configs.baseUrl + 'vendors/bower_components/fullcalendar/dist/fullcalendar.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
        
            //------------------------------
            // PHOTO GALLERY
            //------------------------------
            
             .state ('photo-gallery', {
                url: '/photo-gallery',
                templateUrl: window.configs.baseUrl + 'views/common.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            //Default
        
            .state ('photo-gallery.photos', {
                url: '/photos',
                templateUrl: window.configs.baseUrl + 'views/photos.html'
            })
        
            //Timeline
    
            .state ('photo-gallery.timeline', {
                url: '/timeline',
                templateUrl: window.configs.baseUrl + 'views/photo-timeline.html'
            })
        
        
            //------------------------------
            // GENERIC CLASSES
            //------------------------------
            
            .state ('generic-classes', {
                url: '/generic-classes',
                templateUrl: window.configs.baseUrl + 'views/generic-classes.html'
            })
        
            
            //------------------------------
            // PAGES
            //------------------------------
            
            .state ('pages', {
                url: '/pages',
                templateUrl: window.configs.baseUrl + 'views/common.html'
            })
            
        
            //Profile
        
            .state ('pages.profile', {
                url: '/profile',
                templateUrl: window.configs.baseUrl + 'views/profile.html'
            })
        
            .state ('pages.profile.profile-about', {
                url: '/profile-about',
                templateUrl: window.configs.baseUrl + 'views/profile-about.html'
            })
        
            .state ('pages.profile.profile-timeline', {
                url: '/profile-timeline',
                templateUrl: window.configs.baseUrl + 'views/profile-timeline.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('pages.profile.profile-photos', {
                url: '/profile-photos',
                templateUrl: window.configs.baseUrl + 'views/profile-photos.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
            .state ('pages.profile.profile-connections', {
                url: '/profile-connections',
                templateUrl: window.configs.baseUrl + 'views/profile-connections.html'
            })
        
        
            //-------------------------------
        
            .state ('pages.listview', {
                url: '/listview',
                templateUrl: window.configs.baseUrl + 'views/list-view.html'
            })
        
            .state ('pages.messages', {
                url: '/messages',
                templateUrl: window.configs.baseUrl + 'views/messages.html'
            })
        
            .state ('pages.pricing-table', {
                url: '/pricing-table',
                templateUrl: window.configs.baseUrl + 'views/pricing-table.html'
            })
        
            .state ('pages.contacts', {
                url: '/contacts',
                templateUrl: window.configs.baseUrl + 'views/contacts.html'
            })
        
            .state ('pages.invoice', {
                url: '/invoice',
                templateUrl: window.configs.baseUrl + 'views/invoice.html'
            })
                                
            .state ('pages.wall', {
                url: '/wall',
                templateUrl: window.configs.baseUrl + 'views/wall.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/autosize/dist/autosize.min.js',
                                    window.configs.baseUrl + 'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    window.configs.baseUrl + 'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    window.configs.baseUrl + 'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
            
            //------------------------------
            // BREADCRUMB DEMO
            //------------------------------
            .state ('breadcrumb-demo', {
                url: '/breadcrumb-demo',
                templateUrl: window.configs.baseUrl + 'views/breadcrumb-demo.html'
            })
    });
