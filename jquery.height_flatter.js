;(function($){
  function flatten($elms){
    var column_count = getColumnCount($elms),
        index = 0;

    while(index < $elms.length){
      changeHeight($elms.slice(index, column_count + index), column_count);
      index = index + column_count;
    }
    return $elms;
  }

  function getColumnCount($elms){
    var column_count = 0,
        top_px = $elms.offset().top;

    $elms.each(function(i){
      if(top_px !== $(this).offset().top) {
        column_count = i;
        return false;
      }
    });
    return column_count;
  }

  function changeHeight($elms, column_count){
    var highest = Math.max.apply(null, $elms.map(function(i){
      var $this  = $(this),
          height  = $this.height(),
          children = $.unique($this.children().map(function(){
            return $(this).attr('class');
          }).get());

      $(children).each(function(){
        changeHeight($elms.children('.' + this), column_count);
      });
      return height;
    }));

    $elms.height(highest);
  }

  $.fn.flatten = function() {
    return flatten(this);
  }
})(jQuery);
