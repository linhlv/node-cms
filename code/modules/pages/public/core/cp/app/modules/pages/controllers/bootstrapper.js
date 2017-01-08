define(['modules/pages/controllers/pages.ctrl',
'modules/pages/controllers/pages.list.ctrl',
'modules/pages/controllers/page.add.1.ctrl',
'modules/pages/controllers/page.add.2.ctrl',
'modules/pages/controllers/page.add.3.ctrl'
],
    function (pages, pages_list_ctrl, page_add_1_ctrl, page_add_2_ctrl, page_add_3_ctrl) {
        angular.module('pages.controllers', [])
            .controller('pages.ctrl', ['$scope', pages])
            .controller('pages.list.ctrl', ['$scope', pages_list_ctrl])
            .controller('page.add.1.ctrl', ['$scope', '$state', '$sessionStorage', 'types.svc', 'pages.svc', page_add_1_ctrl])
            .controller('page.add.2.ctrl', ['$scope', '$state', '$q','$sessionStorage', '$stateParams', 'types.svc', 'templates.svc', 'pages.svc', page_add_2_ctrl])
            .controller('page.add.3.ctrl', ['$scope', '$state', '$sessionStorage', '$stateParams', '$q', 'types.svc', 'templates.svc', 'pages.svc', page_add_3_ctrl]);
});