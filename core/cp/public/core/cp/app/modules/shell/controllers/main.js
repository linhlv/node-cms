/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope){
        // By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
        this.sidebarToggle = {
            left: false,
            right: false
        }
    }

    return c;
});