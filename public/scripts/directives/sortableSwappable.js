
app.directive('sortableSwappable', function () {
    return {
        link: function ($scope, element, attrs) {
          $(".connectedSortable").sortable({
            placeholder: "sort-highlight",
            connectWith: ".connectedSortable",
            handle: ".box-header, .nav-tabs",
            forcePlaceholderSize: true,
            zIndex: 999999,
            receive: function(event, ui) {

                var sourceList = ui.sender;
                var targetList = $(this);
                var ticket     = ui.item;

                targetList.children().appendTo(sourceList);
                ticket.append(targetList)

                console.log(sourceList);
                console.log(targetList);
                console.log(ticket);
            }
          }).disableSelection();

          $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom")
            .css("cursor", "move");

          //$(".connectedSortable").on("sortupdate", function( event, ui ) {} );
        }
    };
});
