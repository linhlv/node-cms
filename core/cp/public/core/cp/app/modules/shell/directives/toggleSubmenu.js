/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function d(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    element.next().slideToggle(200);
                    element.parent().toggleClass('toggled');
                });
            }
        };    
    }

    return d;
});