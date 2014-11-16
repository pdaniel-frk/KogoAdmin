
app.directive('superSelect', function () {
    return {
        link: function ($scope, element, attrs) {
          $(element).select2();
        }
    };
});
