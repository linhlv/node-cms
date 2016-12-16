define(['modules/pages/controllers/pages.ctrl',
'modules/pages/controllers/pages.list.ctrl',
'modules/pages/controllers/page.add.1.ctrl',
'modules/pages/controllers/page.add.2.ctrl'
],
    function (pages, pages_list_ctrl, page_add_1_ctrl, page_add_2_ctrl) {
        angular.module('pages.controllers', [])
            .controller('pages.ctrl', ['$scope', pages])
            .controller('pages.list.ctrl', ['$scope', pages_list_ctrl])
            .controller('page.add.1.ctrl', ['$scope', '$state', '$sessionStorage', 'pages.svc', page_add_1_ctrl])
            .controller('page.add.2.ctrl', ['$scope', '$state', '$sessionStorage', 'pages.svc', page_add_2_ctrl]);
});