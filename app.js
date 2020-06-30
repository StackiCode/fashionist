var _sI = 1;
var t1 = 0;
var t2 = 0;
var slide_1 = document.querySelector('a[class="slide_1"]');
var slide_2 = document.querySelector('a[class="slide_2"]');
var slide_3 = document.querySelector('a[class="slide_3"]');
var btn_up = document.querySelector('a[class="slide_up"]');
var btn_down = document.querySelector('a[class="slide_down"]');
btn_up.addEventListener("click", validate_click);
btn_down.addEventListener("click", validate_click);
slide_1.addEventListener("click", slide_);
slide_2.addEventListener("click", slide_);
slide_3.addEventListener("click", slide_);

//timer click
function validate_click(e) {
  var el = e.target;
  t2 = Date.now();
  let delta = t2 - t1;
  t1 = t2;
  if (delta > 1000) {
    if (el.className == "slide_up") {
      slide(-1);
    }
    if (el.className == "slide_down") {
      slide(1);
    }
  }
}

//slide button
function slide_(e) {
  var el = e.target;
  var cN = el.className;
  t2 = Date.now();
  let delta_t = t2 - t1;
  t1 = t2;
  let delta;
  if (delta_t > 1000) {
    if (delta !== 0 && cN == "slide_1") {
      delta = 1 - _sI;
      _slide(1, delta);
    }
    if (delta !== 0 && cN == "slide_2") {
      delta = 2 - _sI;
      _slide(2, delta);
    }
    if (delta !== 0 && cN == "slide_3") {
      delta = 3 - _sI;
      _slide(3, delta);
    }
  }
  console.log(delta);
}

_slide(_sI, 0);

function slide(_dir) {
  _sI = _sI + _dir;
  _slide(_sI, _dir);
}

function _slide(_Index, _dir) {
  var target = document.querySelectorAll('div[name= "_page"]');
  // adjust _sI within range 1 to length
  let _cI = _Index - _dir;
  _sI = _Index;
  if (_sI > target.length) {
    _sI = 1;
  } else if (_sI < 1) {
    _sI = target.length;
  }
  slide_1.classList.remove("slide_animate");
  slide_2.classList.remove("slide_animate");
  slide_3.classList.remove("slide_animate");

  if (_sI == 1) {
    slide_1.classList.add("slide_animate");
  } else if (_sI == 2) {
    slide_2.classList.add("slide_animate");
  } else if (_sI == 3) {
    slide_3.classList.add("slide_animate");
  }
  for (var i = 0; i < target.length; i++) {
    if (i == _cI - 1) {
      target[i].style.display = "block";
    } else {
      target[i].style.display = "none";
    }
    target[i].classList.remove("cur_up");
    target[i].classList.remove("cur_down");
    target[i].classList.remove("next_up");
    target[i].classList.remove("next_down");
  }
  target[_sI - 1]
    .querySelector("div.page_quote")
    .classList.remove("quote_animate");

  //set active for display next page
  if (_dir > 0) {
    //cur go down, next go down
    target[_cI - 1].classList.add("cur_down");
    target[_sI - 1].style.display = "block";
    target[_sI - 1].classList.add("next_down");
    var my_interval = setInterval(() => {
      target[_cI - 1].style.display = "none";
      clearInterval(my_interval);
    }, 1000);
  } else if (_dir < 0) {
    //go up
    target[_cI - 1].classList.add("cur_up");
    target[_sI - 1].style.display = "block";
    target[_sI - 1].classList.add("next_up");
    var my_interval = setInterval(() => {
      target[_cI - 1].style.display = "none";
      clearInterval(my_interval);
    }, 1000);
  }
  console.log("_sI", _sI);
  console.log("_cI", _cI);
  target[_sI - 1]
    .querySelector("div.page_quote")
    .classList.add("quote_animate");
  document.removeEventListener("click", slide_1);
  document.removeEventListener("click", slide_2);
  document.removeEventListener("click", slide_3);
  document.removeEventListener("click", slide_1);
  document.removeEventListener("click", validate_click);
}
