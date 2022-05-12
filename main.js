import './style.css';

function generateQuerySelector(el) {
  if (el.tagName) if (el.tagName.toLowerCase() == 'html') return 'HTML';
  var str = el.tagName;
  str += el.id != '' ? '#' + el.id : '';
  if (el.className) {
    var classes = el.className.split(/\s/);
    for (var i = 0; i < classes.length; i++) {
      str += '.' + classes[i];
    }
  }
  return generateQuerySelector(el.parentNode) + ' > ' + str;
}
setInterval(() => {
  const data = {
    html: null,
    p: null,
    width: null,
    height: null,
  };
  const t1 = performance.now();
  data.html = document.documentElement.innerHTML.replace(/\n|\t/g, ' ');
  data.width = window.innerWidth;
  data.height = window.innerHeight;
  console.log(data);
  data.p = performance.now() - t1;
}, 1000);
const eventHistory = {};

function handler(e) {
  const data = {
    timestamp: e.timeStamp,
    timestampInt: parseInt(e.timeStamp / 1000),
    pageX: null,
    pageY: null,
    targetSelector: null,
  };
  if (!eventHistory[e.type]) eventHistory[e.type] = {};
  if (!eventHistory[e.type][data.timestampInt]) {
    console.log(eventHistory[e.type][data.timestampInt]);

    data['pageX'] = e.pageX;
    data['pageY'] = e.pageY;
    data['targetSelector'] = generateQuerySelector(e.target);
    eventHistory[e.type][`${data.timestampInt}`] = data;
  }
  console.log(eventHistory);
}
//the mouse button was pressed over the element
document.addEventListener('mousedown', handler);

//the mouse button was released over the element
document.addEventListener('mouseup', handler);

//the element was clicked
document.addEventListener('click', handler);

//the element was doubled click event
document.addEventListener('dblclick', handler);

//when the mouse is moved over the element
document.addEventListener('mousemove', handler);

// when the mouse enters the element or any of its child elements
document.addEventListener('mouseover', handler);

// when the mouse enter the element
document.addEventListener('mouseenter', handler);

// when the mouse leaves the element or any of its child elements
document.addEventListener('mouseout', handler);

// when the mouse leaves the element
document.addEventListener('mouseleave', handler);

// when the context menu is opened, e.g. on a right mouse button click
element.addEventListener('contextmenu', handler);
