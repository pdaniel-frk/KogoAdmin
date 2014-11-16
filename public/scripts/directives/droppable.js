
app.directive('droppable', ['LanesService', function(LanesService) {
  return {
    scope: {
      drop: '&', // parent
      lane: '='
    },
    link: function(scope, element) {
      // again we need the native object
      var el = element[0];

      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
          // allows us to drop
          if (e.preventDefault) e.preventDefault();
            this.classList.add('over');
            return false;
        },
        false
      );

      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'drop',
        function(e) {
          var boxId = this.id;


          // make a swap

          var targetContainer = document.getElementById(boxId);

          // element from target container that needs to be moved to source
          var swappedLane = $(targetContainer).children()[0];

          var newSequenceNumber = boxId.split('-')[1];
          var movedOutLaneId = $(swappedLane).attr('id').split('-')[1];

          var lane = document.getElementById(e.dataTransfer.getData('Text'));
          var sourceContainer = $(lane).parent();

          var sourceSequenceNumber = $(sourceContainer).attr('id').split('-')[1];
          var movedLaneId = $(lane).attr('id').split('-')[1];

          LanesService.update(movedLaneId, {sequenceNumber:newSequenceNumber});
          LanesService.update(movedOutLaneId, {sequenceNumber:sourceSequenceNumber});


          sourceContainer.append(swappedLane);

          this.appendChild(lane);

          // call the passed drop function
          scope.$apply(function(scope) {
            var fn = scope.drop();
            if ('undefined' !== typeof fn) {
              fn(item.id, boxId);
            }
          });
        },
        false
      );
    }
  }
}]);
