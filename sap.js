/*var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var bg = new Image();
//var fg = new Image();
var pipeUp = new Image();
  // noinspection JSAnnotator
  bg.src="1.png";
  //fg.src="fg.png";
  pipeUp.src="pipeUp.png";

function draw() {
  ctx.drawImage(bg,0,0);
 // ctx.drawImage(fg,25,0);
 // ctx.drawImage(pipeUp,5,0);
}
   bg.onload = draw;
//fg.onload = draw;
pipeUp.onload = draw;

*/
var MF_WIDTH = 10;
var MF_HEIGHT = 16;
var DIFFICULTY = 8;
var alive = true;
function newElement(name, args, events) {
  var el = document.createElement(name);
  queryElement(el, args);
  el.onclick = function(){
    alive && events.left && (el.getAttribute('clickable') == 1) && events.left(el);
  };
  el.oncontextmenu = function(){
    alive && events.right && (el.getAttribute('clickable') == 1) && events.right(el); return false;
  };
  return el;
}
function queryElement(el, args) {
  for(key in args) el.setAttribute(key, args[key]);
  return el;
}
var mf = document.getElementById('minefield');
var iddqd = 0;
var bombCount = 0;
var unpressedCells = MF_WIDTH*MF_HEIGHT;
mf.style.width = (MF_WIDTH*20)+'px';
mf.style.height = (MF_HEIGHT*20)+'px';
for(i = 0; i < MF_WIDTH*MF_HEIGHT; i++)
{
  if(hasBomb = Math.floor(Math.random()*DIFFICULTY)==0 ? 1 : 0)
    bombCount++;
  mf.appendChild(newElement('div', {num: i, clickable: 1, class:'cell', bomb: hasBomb}, {left:function(el, a){
      if(el.getAttribute('bomb') == 1) {
        if(iddqd) return false;
        alive = false;
        for(i = 0; i < MF_WIDTH*MF_HEIGHT; i++)
          if(mf.children[i].getAttribute('bomb') == 1)
            mf.children[i].setAttribute('class', 'cell bomb');
        el.setAttribute('class', el.getAttribute('class').replace(/flag/, '') + ' dead');
        alert('Бомба! Вы проиграли... :с');
        return false;
      }
      var index = parseInt(el.getAttribute('num'));
      var neighbours = [index-1, index+1, index-MF_WIDTH-1, index-MF_WIDTH, index-MF_WIDTH+1, index+MF_WIDTH-1, index+MF_WIDTH, index+MF_WIDTH+1];
      var count = 0;
      for(i in neighbours) count += el.parentNode.children[neighbours[i]] && parseInt(el.parentNode.children[neighbours[i]].getAttribute('bomb'));
      queryElement(el, {'class':'cell clicked', 'clickable':0}).innerHTML = count;
      if(!count) {
        el.innerHTML = ''; iddqd++;
        for(i in neighbours) el.parentNode.children[neighbours[i]] && el.parentNode.children[neighbours[i]].getAttribute('class')!='clear' && el.parentNode.children[neighbours[i]].onclick(1);
        iddqd--;
      }
      else el.setAttribute('class', el.getAttribute('class').replace(/flag/, ''));
      if(--unpressedCells == bombCount) {
        alive = false;
        alert('Ура! Победа :3');
      }
    }, right:function(el){
      el.getAttribute('class').indexOf('flag') != -1 ? el.setAttribute('class', el.getAttribute('class').replace(/flag/, '')) : queryElement(el, {'class':el.getAttribute('class')+' flag'});
    }}));
}
mf.appendChild(newElement('div', {class:'clear'}));





