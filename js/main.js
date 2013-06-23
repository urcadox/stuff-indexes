var Main = {
  init: function() {
    var ipp = document.getElementsByTagName("ul").item().dataset.itemsperpage;

    var li = document.getElementsByClassName("content").item().getElementsByTagName("li");
    for(var i = 0; i < ipp && i < li.length; i++) {
      var item = li.item(i);
      var img = item.getElementsByTagName("img").item();
      img.setAttribute("src", img.dataset.src);
      item.classList.remove("hidden");
    }
    if(li.length <= ipp) {
      document.getElementsByClassName("next").item().classList.add("disabled");
    }

    document.getElementsByClassName("prev").item().onclick = function(e) {
      e.preventDefault();
      if(this.classList.contains("disabled")) return;

      var li = document.getElementsByClassName("content").item().getElementsByTagName("li");
      var lastDisplayedIndex = -1;
      var newlyDisplayedItems = 0;
      for(var i = li.length - 1; i >= 0; i--) {
        var item = li.item(i);
        var img = item.getElementsByTagName("img").item();
        if(!item.classList.contains("hidden")) {
          lastDisplayedIndex = i;
          item.classList.add("hidden");
        } else if(lastDisplayedIndex != -1 && newlyDisplayedItems < ipp) {
          item.classList.remove("hidden");
          img.setAttribute("src", img.dataset.src);
          newlyDisplayedItems++;
          if(i == 0) {
            this.classList.add("disabled");
          }
        }
      }
      document.getElementsByClassName("next").item().classList.remove("disabled");
    };
    document.getElementsByClassName("next").item().onclick = function(e) {
      e.preventDefault();
      if(this.classList.contains("disabled")) return;

      var li = document.getElementsByClassName("content").item().getElementsByTagName("li");
      var lastDisplayedIndex = -1;
      var newlyDisplayedItems = 0;
      for(var i = 0; i < li.length; i++) {
        var item = li.item(i);
        var img = item.getElementsByTagName("img").item();
        if(!item.classList.contains("hidden")) {
          lastDisplayedIndex = i;
          item.classList.add("hidden");
        } else if(lastDisplayedIndex != -1 && newlyDisplayedItems < ipp) {
          item.classList.remove("hidden");
          img.setAttribute("src", img.dataset.src);
          newlyDisplayedItems++;
          if(i == li.length - 1) {
            this.classList.add("disabled");
          }
        }
      }
      document.getElementsByClassName("prev").item().classList.remove("disabled");
    }
  }
};
Main.init();
