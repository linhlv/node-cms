/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $http){
        var vm = this;
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

        var options = { method: 'GET', url: '/cp/landing/requests', headers: { 'Content-Type': 'application/json' } };

        $http(options).then(function (data, status, headers, cfg) {
            if(data.data && data.data.items){
                vm.items = data.data.items;
            }
        },function (error, status) { vm.submitting = false; });

        vm.show = function(item){
             swal(
                 "Message of " + item.name + " from " + item.company, 
                 item.message);
        };

        vm.approve = function(item){
             swal({   
                title: "Are you sure?",   
                text: "You are going to approve request from partner to view full catalogue!",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "Yes, delete it!",   
                cancelButtonText: "No, cancel plx!",   
                closeOnConfirm: false,   
                closeOnCancel: false 
            }, function(isConfirm){   
                if (isConfirm) {
                    var approve_options = { method: 'POST', url: '/cp/landing/approve_request', data: item, headers: { 'Content-Type': 'application/json' } };
                    $http(approve_options).then(function (data, status, headers, cfg) {
                        if(data.data){
                            swal("Approved!", "Partner full catalogue view request is approved.", "success", function(){
                                item.approve = true;
                            });
                        }
                    },function (error, status) { vm.submitting = false; });
                       
                } else {     
                    //not confirm   
                } 
            });
        };        
    }

    return c;
});