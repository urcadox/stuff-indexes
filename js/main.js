var Main = {
  init: function() {
    var ipp = document.getElementsByTagName("ul").item(0).dataset.itemsperpage,
        that = this;

    var imgs = document.getElementsByClassName("content").item(0).getElementsByTagName("img");
    document.getElementsByTagName("input").item(0).onkeyup = function(e) {
      if(this.value.length < 3) {
        that.initialDisplay(ipp);
      } else {
        document.getElementsByClassName("prev").item(0).classList.add("disabled");
        document.getElementsByClassName("next").item(0).classList.add("disabled");
        var li = document.getElementsByClassName("content").item(0).getElementsByTagName("li");
        for(var i = 0; i < li.length; i++) {
          li.item(i).classList.add("hidden");
        }
        for(var i = 0; i < imgs.length; i++) {
          var img = imgs.item(i);
          if(img.dataset.src.toLowerCase().indexOf(this.value.toLowerCase()) != -1) {
            img.parentNode.parentNode.classList.remove("hidden");
            img.setAttribute("src", img.dataset.src);
          } else {
            img.setAttribute("src", "#");
          }
        }
      }
    }

    this.initialDisplay(ipp);

    document.getElementsByClassName("prev").item(0).onclick = function(e) {
      e.preventDefault();
      if(this.classList.contains("disabled")) return;

      var li = document.getElementsByClassName("content").item(0).getElementsByTagName("li");
      var lastDisplayedIndex = -1;
      var newlyDisplayedItems = 0;
      for(var i = li.length - 1; i >= 0; i--) {
        var item = li.item(i);
        var img = item.getElementsByTagName("img").item(0);
        if(!item.classList.contains("hidden")) {
          lastDisplayedIndex = i;
          item.classList.add("hidden");
          img.setAttribute("src", "#");
        } else if(lastDisplayedIndex != -1 && newlyDisplayedItems < ipp) {
          item.classList.remove("hidden");
          img.setAttribute("src", img.dataset.src);
          newlyDisplayedItems++;
          if(i == 0) {
            this.classList.add("disabled");
          }
        }
      }
      document.getElementsByClassName("next").item(0).classList.remove("disabled");
    };
    document.getElementsByClassName("next").item(0).onclick = function(e) {
      e.preventDefault();
      if(this.classList.contains("disabled")) return;

      var li = document.getElementsByClassName("content").item(0).getElementsByTagName("li");
      var lastDisplayedIndex = -1;
      var newlyDisplayedItems = 0;
      for(var i = 0; i < li.length; i++) {
        var item = li.item(i);
        var img = item.getElementsByTagName("img").item(0);
        if(!item.classList.contains("hidden")) {
          lastDisplayedIndex = i;
          item.classList.add("hidden");
          img.setAttribute("src", "#");
        } else if(lastDisplayedIndex != -1 && newlyDisplayedItems < ipp) {
          item.classList.remove("hidden");
          img.setAttribute("src", img.dataset.src);
          newlyDisplayedItems++;
          if(i == li.length - 1) {
            this.classList.add("disabled");
          }
        }
      }
      document.getElementsByClassName("prev").item(0).classList.remove("disabled");
    }
  },

  initialDisplay: function(ipp) {
    var li = document.getElementsByClassName("content").item(0).getElementsByTagName("li");
    for(var i = 0; i < li.length; i++) {
      li.item(i).classList.add("hidden");
    }
    for(var i = 0; i < ipp && i < li.length; i++) {
      var item = li.item(i);
      var img = item.getElementsByTagName("img").item(0);
      if(!img.hasAttribute("src") || img.src.split("/").pop() == "#") {
        img.setAttribute("src", img.dataset.src);
      }
      item.classList.remove("hidden");
    }
    if(li.length <= ipp) {
      document.getElementsByClassName("next").item(0).classList.add("disabled");
    } else {
      document.getElementsByClassName("next").item(0).classList.remove("disabled");
    }
  }
};
Main.init();
