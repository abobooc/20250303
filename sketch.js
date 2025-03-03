let input, slider, button, dropdown;
let yOffset = 0;
let direction = 1;
let xOffsets = [];
let yOffsets = [];
let ySpeeds = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10); // 設定文字框位置
  input.size(300, 50); // 設定文字框大小
  input.value('淡江大學'); // 預設文字
  input.style('font-size', '50px'); // 設定文字大小

  slider = createSlider(28, 50, 32); // 設定滑桿，範圍28px到50px，預設值32px
  slider.position(10, 70); // 設定滑桿位置

  button = createButton('跳動文字');
  button.position(10, 130); // 設定按鈕位置
  button.mousePressed(toggleBounce); // 設定按鈕點擊事件

  dropdown = createSelect();
  dropdown.position(10, 190); // 設定下拉式選單位置
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.option('第三週筆記');
  dropdown.changed(handleDropdownChange); // 設定選單變更事件
}

let bouncing = false;

function toggleBounce() {
  bouncing = !bouncing;
  if (bouncing) {
    xOffsets = Array(floor(width / textWidth(input.value()))).fill(0).map(() => random(-20, 20));
    yOffsets = Array(floor(height / textAscent())).fill(0).map(() => random(-20, 20));
    ySpeeds = Array(floor(height / textAscent())).fill(0).map(() => random(1, 5));
  }
}

function handleDropdownChange() {
  let selected = dropdown.value();
  let iframe = document.getElementById('contentFrame');
  if (selected === '淡江大學') {
    iframe.src = 'https://www.tku.edu.tw/';
  } else if (selected === '教育科技學系') {
    iframe.src = 'https://www.et.tku.edu.tw/';
  } else if (selected === '第三週筆記') {
    iframe.src = 'https://hackmd.io/@bobooo/BJjk99fokx';
  }
  iframe.style.display = 'block';
}

function draw() {
  background(220);
  let txt = input.value();
  let fontSize = slider.value(); // 取得滑桿的值作為字體大小
  textAlign(LEFT, TOP);
  textSize(fontSize);

  if (bouncing) {
    yOffset += direction * 2;
    if (yOffset > 20 || yOffset < -20) {
      direction *= -1;
    }
  }

  let x = 0;
  let i = 0;
  while (x < width) {
    let y = 0;
    let j = 0;
    while (y < height) {
      let yPos = y + yOffset + (bouncing ? yOffsets[j % yOffsets.length] : 0);
      let xPos = x + (bouncing ? xOffsets[i % xOffsets.length] : 0);
      text(txt, xPos, yPos);
      y += textAscent() + textDescent() + 20; // 增加文字間距
      j++;
    }
    x += textWidth(txt) + 20; // 增加文字間距
    i++;
  }
}
