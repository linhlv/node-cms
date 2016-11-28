define(['modules/types/controllers/types-add.1.ctrl', 
'modules/types/controllers/types-add.2.ctrl',
'modules/types/controllers/types-add.3.ctrl'],
    function (types_add_1, types_add_2, types_add_3) {
        angular.module('types.controllers', [])
            .controller('types-add.1.ctrl', ['$scope', types_add_1]);
        angular.module('types.controllers', [])
            .controller('types-add.2.ctrl', ['$scope', types_add_2]);
        angular.module('types.controllers', [])
            .controller('types-add.3.ctrl', ['$scope', types_add_3]);
});