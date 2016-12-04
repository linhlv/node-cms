/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope){
        // Paging        
        $scope.totalItems = 64;
        $scope.currentPage = 4;
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
        // End Paging


        console.log('contacts');
    }

    return c;
});