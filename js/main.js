if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

var Main = {
  init: function() {
    var ipp = document.getElementsByTagName("ul").item(0).dataset.itemsperpage,
        that = this;

    var lis = document.getElementsByClassName("content")[0].getElementsByTagName("li");
    for(var i = 0; i < lis.length; i++) {
      lis[i].dataset.page = Math.floor(i / ipp) + 1;
    }

    that.nbPages = Math.ceil(lis.length / ipp);

    var searchInput = document.getElementsByTagName("input")[0];
    if(window.location.hash.startsWith("#p")) {
      var numPage = parseInt(window.location.hash.substr(2));
      if(!isNaN(numPage)) {
        that.displayPage(numPage);
      } else {
        that.displayPage(1);
      }
    } else if(window.location.hash.startsWith("#search=")) {
      that.page = "search";
      searchInput.value = window.location.hash.substr(8);
    } else {
      that.displayPage(1);
    }

    var imgs = document.getElementsByClassName("content").item(0).getElementsByTagName("img");
    searchInput.onkeyup = function(e) {
      if(this.value.length < 3) {
        that.displayPage(1);
      } else {
        that.page = "search";
        window.location.hash = "search=" + this.value;
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
    if(searchInput.value.length > 0) {
      document.getElementsByTagName("input")[0].onkeyup();
    }

    document.getElementsByClassName("prev").item(0).onclick = function(e) {
      e.preventDefault();
      if(this.classList.contains("disabled")) return;

      Main.displayPage(Main.page - 1);
    };
    document.getElementsByClassName("next").item(0).onclick = function(e) {
      e.preventDefault();
      if(this.classList.contains("disabled")) return;

      Main.displayPage(Main.page + 1);
    }
  },

  displayPage: function(p) {
    if(Main.page == p) return;
    if(p == 1) {
      document.getElementsByClassName("prev")[0].classList.add("disabled");
    } else {
      document.getElementsByClassName("prev")[0].classList.remove("disabled");
    }
    if(p == Main.nbPages) {
      document.getElementsByClassName("next")[0].classList.add("disabled");
    } else {
      document.getElementsByClassName("next")[0].classList.remove("disabled");
    }

    var lis = document.getElementsByClassName("content")[0].getElementsByTagName("li");
    for(var i = 0; i < lis.length; i++) {
      lis[i].classList.add("hidden");
      lis[i].getElementsByTagName("img")[0].setAttribute("src", "#");
    }

    var lisToBeDisplayed = document.querySelectorAll("[data-page='"+p+"']");
    for(var i = 0; i < lisToBeDisplayed.length; i++) {
      lisToBeDisplayed[i].classList.remove("hidden");
      var img = lisToBeDisplayed[i].getElementsByTagName("img")[0];
      if(!img.hasAttribute("src") || img.src.split("/").pop() == "#") {
        img.setAttribute("src", img.dataset.src);
      }
    }
    window.location.hash = "p" + p;
    Main.page = p;
  }
};
Main.init();
