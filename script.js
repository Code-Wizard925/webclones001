var scrollableDistance = window.screen.availWidth / 5;
var oldpt;
(() => {
  let imageslider = document.getElementById("imageslider");
  let slide = window.getComputedStyle(imageslider.children[0]);
  let slideWidth = slide.getPropertyValue("width").replace("px", "");
  let slideMargin = slide.getPropertyValue("margin-left").replace("px", "");
  let lastPos = (parseFloat(slideWidth) + parseFloat(slideMargin)) * -1;
  for(let i = 0; i < imageslider.children.length; i++){
    imageslider.children[i].style.position = "absolute";
    imageslider.children[i].style.left = `${lastPos + parseFloat(slideMargin) + parseFloat(slideWidth)}px`;
    lastPos += (parseFloat(slideWidth) + parseFloat(slideMargin));
  }
})();
function canc(){
  let option = document.getElementById("option");
  option.style.top = "-100vh";
  option.style.transition = "top 0.8s ease-in";
}
function menu(){
  let option = document.getElementById("option");
  option.style.top = "0vh";
  option.style.transition = "top 0.4s ease-out";
}

function scrollHandler(event){
  let newpt = event.pageX;
  if (event.type === "touchmove"){
    let touch = event.changedTouches[0];
    touch = touch.pageX;
    newpt = touch;
  }
  if (typeof oldpt === "undefined"){
    oldpt = event.pageX;
    if (event.type === "touchmove"){
      let touch = event.changedTouches[0];
      touch = touch.pageX;
      oldpt = touch;
    }
  }else{
    if(oldpt > newpt){
      rearrangeScrolls();
      let scrolls = event.currentTarget;
      let distance = oldpt - newpt;
      for (let i = 0; i < scrolls.children.length; i++){
        let oldPos = window.getComputedStyle(scrolls.children[i]).getPropertyValue("left").replace("px", "");
        scrolls.children[i].style.left = `${parseFloat(oldPos) - distance}px`;
        oldpt = newpt;
      }
    }else if(oldpt < newpt){
      rearrangeScrolls();
      let scrolls = event.currentTarget;
      let distance = newpt - oldpt;
      for (let i = 0; i < scrolls.children.length; i++){
        let oldPos = window.getComputedStyle(scrolls.children[i]).getPropertyValue("left").replace("px", "");
        scrolls.children[i].style.left = `${parseFloat(oldPos) + distance}px`;
        oldpt = newpt;
      }
    }
  }
}
function rearrangeScrolls(){
  let scrolls = document.getElementById("imageslider");
  let first = scrolls.firstElementChild;
  let last = scrolls.lastElementChild;
  let firstLeft = window.getComputedStyle(first).getPropertyValue("left").replace("px", "");
  let lastLeft = window.getComputedStyle(last).getPropertyValue("left").replace("px", "");
  let margin = window.getComputedStyle(first).getPropertyValue("margin-left").replace("px", "");
  let width = window.getComputedStyle(first).getPropertyValue("width").replace("px", "");
  let scrollsWidth = window.getComputedStyle(scrolls).getPropertyValue("width").replace("px", "");
  if (firstLeft > 0){
    last.style.left = `${firstLeft - (margin * 2 + parseFloat(width))}px`;
    scrolls.insertBefore(last, first);
  }else if(scrollsWidth - lastLeft > width){
    first.style.left = `${parseFloat(lastLeft) + parseFloat(margin) + parseFloat(width)}px`;
    scrolls.appendChild(first);
  }
}
function initmove(event){
  let scrolls = document.getElementById("imageslider");
  oldpt = event.pageX;
  scrolls.addEventListener("mousemove", scrollHandler);
}

function stopmove(){
  let scroller = document.getElementById("imageslider");
  scroller.removeEventListener("mousemove", scrollHandler);
  oldpt = undefined;
}

function scrollToTop() {
  let top = document.getElementById("eventDesign");
  top.scrollIntoView({behavior: "smooth"});
}