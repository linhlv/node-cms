define(['modules/types/controllers/types-add.1.ctrl', 
'modules/types/controllers/types-add.2.ctrl',
'modules/types/controllers/types-add.3.ctrl',
'modules/types/controllers/types-add.4.ctrl'],
    function (types_add_1, types_add_2, types_add_3, types_add_4) {
        angular.module('types.controllers', [])
            .controller('types-add.1.ctrl', ['$scope', types_add_1])        
            .controller('types-add.2.ctrl', ['$scope', types_add_2])        
            .controller('types-add.3.ctrl', ['$scope', types_add_3])        
            .controller('types-add.4.ctrl', ['$scope', types_add_4]);
});