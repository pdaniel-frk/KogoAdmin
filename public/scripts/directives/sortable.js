
app.directive('sortable', function () {
    return {
        link: function ($scope, element, attrs) {
          $(".connectedSortable").sortable({
            placeholder: "sort-highlight",
            connectWith: ".connectedSortable",
            handle: ".box-header, .nav-tabs",
            forcePlaceholderSize: true,
            zIndex: 999999
          }).disableSelection();

          $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom")
            .css("cursor", "move");

          //$(".connectedSortable").on("sortupdate", function( event, ui ) {} );
        }
    };
});
