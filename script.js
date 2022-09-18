var oldpt;
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
function initmove(event){
  let scrolls = document.getElementById("imageslider");
  oldpt = event.pageX;
  scrolls.addEventListener("touchmove", moveimg);
}
function initmove2(event){
  let scrolls = document.getElementById("imageslider");
  let touches = event.changedTouches[0];
  oldpt = touches.pageX;
  scrolls.addEventListener("touchmove", moveimg);
}

function stopmove(){
  let scroller = document.getElementById("imageslider");
  imageslider.ontouchmove = "";
}
function moveimg(event){
  if (event.isTrusted){
    let touches = event.changedTouches;
    touches = touches[0];
    scrollimg(touches.pageX);
  }else{
    let scroller = document.getElementById("imageslider");
    moveimg2(event);
  }
}
function moveimg2(event){
  scroller = document.getElementById("imageslider");
  
  scrollimg(event.pageX);
}
function scrollimg(newpt){
  if (newpt > oldpt){
    let dist = newpt - oldpt;
    for (i = 0; i < 7; i++){
      let scrolls = document.getElementById("imageslider");
      scroll = scrolls.children[i];
      scrolls = window.getComputedStyle(scroll);
      scrolls = scrolls.getPropertyValue("left");
      console.log(scrolls)
      scrolls = scrolls.replace("px", "");
      scrolls = `${Number(scrolls) + dist/14}px`;
      scroll.style.left = scrolls;
      let check = scrolls.replace("px", "");
      console.log(check)
      let tscase = scroll.width;
      if (Number(check) > Number(tscase)*3.33){
        scroll.style.left = `-${Number(tscase)*4.44}`;
      }
    }
  }else{
    let dist = oldpt - newpt;
    for (i = 0; i < 7; i++){
      let scrolls = document.getElementById("imageslider");
      scroll = scrolls.children[i];
      scrolls = window.getComputedStyle(scroll);
      scrolls = scrolls.getPropertyValue("left");
      scrolls = scrolls.replace("px", "");
      scrolls = `${Number(scrolls) - dist/14}px`;
      scroll.style.left = scrolls;
      let check = scrolls.replace("px", "");
      let tscase = scroll.width;
      if ((Number(check)) < (Number(tscase)*-5.55)){
        scroll.style.left = `+${tscase*2.22}`;
      }
    }
  }
}
function scrollToTop() {
  let top = document.getElementById("eventDesign");
  top.scrollIntoView({behavior: "smooth"});
}