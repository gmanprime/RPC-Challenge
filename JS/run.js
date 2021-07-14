let core = document.getElementById("core");
let circleRad = 3;

// round numbers up to some precision
function pRound(num, precision) {
  precision = Math.pow(10, precision);
  return Math.round(num * precision) / precision;
}

// get angle value in radians
function radAng(ang) {
  let { PI } = Math;
  return (ang * PI) / 180;
}

// get x,y values from radian values
function coordinates(rad, ang) {
  let x = rad * Math.cos(radAng(ang));
  let y = rad * Math.sin(radAng(ang));

  x = pRound(x, 3);
  y = pRound(y, 3);

  console.log([x, y]);

  return {
    btm: pRound(y, 2),
    rt: pRound(x, 2),
  };
}

// create circle elements
let addCircles = function (options = []) {
  for (let i = 0; i < options.length; i++) {
    let buttonWrapper = document.createElement("div");
    let item = document.createElement("button"); // create new button element for current data set

    let { rad, ang } = options[i];
    let { btm, rt } = coordinates(rad, ang);

    // define dynamic item styles using items directly
    // item.style.position = "absolute";
    // item.style.bottom = (btm - circleRad).toString() + "rem";
    // item.style.right = (rt - circleRad).toString() + "rem";

    // using Button Wrapper
    buttonWrapper.style.position = "absolute";
    buttonWrapper.style.bottom = btm.toString() + "rem";
    buttonWrapper.style.right = rt.toString() + "rem";

    // give item id and class values
    item.id = `btn${i + 1}`;
    item.style.position = "absolute";
    item.style.bottom = -circleRad.toString() + "rem";
    item.style.right = -circleRad.toString() + "rem";
    item.classList.add("circle");

    // Give buttonWrapper id and class values
    buttonWrapper.classList.add("btnWrapper");

    buttonWrapper.appendChild(item);

    core.appendChild(buttonWrapper);
  }
};

// calculate circle positions
function positions(n, size) {
  d = 360 / n;
  rad = size;

  angle = 0;

  let items = [];

  // for each item set the radius and angle of the item with a 90 degree angle on the first one
  for (let i = 0; i < n; i++) {
    items[i] = {
      ang: angle - 90,
      rad,
    };

    console.log(items[i].ang);

    angle += d;
  }

  return items;
}

// set circle size
function circleScale(scale) {
  let collection = document.getElementsByClassName("circle");

  for (let i = 0; i < collection.length; i++) {
    collection[i].style.width = (circleRad * 2 * scale).toString() + "rem";
    collection[i].style.height = (circleRad * 2 * scale).toString() + "rem";
  }
}

// determine positions
let pos = positions(3, 8);

// generate circle elements
addCircles(pos);

circleScale(1.4);
