var ball = document.querySelectorAll(".con_left li"),
  selected_li = document
    .getElementsByClassName("selected")[0]
    .getElementsByTagName("li"),
  checked_li = document
    .getElementsByClassName("checked")[0]
    .getElementsByTagName("li"),
  bingo = document.getElementById("bingo"),
  award_type = document.getElementById("award_type"),
  award_amount = document.getElementById("award_amount"),
  count = document.getElementsByTagName("input")[0],
  left_side = document.getElementById("left_side").getElementsByTagName("div"),
  arr = new Array(),
  arr1 = new Array();

for (var i = 0; i < left_side.length; i++) {
  left_side[i].index = i;
  left_side[i].onclick = function () {
    for (var j = 0; j < left_side.length; j++) {
      left_side[j].className = "";
    }
    this.className = "active";
  };
}

var blueNum = "";

for (var i = 0; i < ball.length; i++) {
  ball[i].index = i;
  ball[i].onclick = function () {
    if (this.className != "select") {
      this.className = "select";
      arr.push(this.index);
    } else {
      this.className = "";
      arr.remove(this.index);
    }
    console.log(arr);
  };
}

count.onkeydown = function () {
  //	var e = event.srcElement;
  if (event.keyCode == 38) {
    count.value++;
  } else if (event.keyCode == 40) {
    if (count.value < 2) {
      count.value = 1;
    } else {
      count.value--;
    }
  }
};

function cancel() {
  arr = [];

  for (var i = 0; i < ball.length; i++) {
    ball[i].className = "";
  }

  for (var i = 0; i < 7; i++) {
    selected_li[i].innerHTML = "";
  }
  // selected_li[6].innerHTML = "1";
}

function settleBall() {
  for (var i = 0; i < ball.length; i++) {
    ball[i].className = "";
  }

  for (var j = 0; j < 6; j++) {
    ball[arr[j]].className = "select";
  }
}

Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

function sortNum(a, b) {
  return a - b;
}

function done() {
  if (blueNum < 0) {
    alert("请选择6个红球！！！");
    return;
  }

  if (arr.length === 7) {
    arr.splice(arr.indexOf(Number(blueNum)), 1);
    arr.sort(sortNum);
    arr.push(blueNum);
    for (var i = 0; i < 7; i++) {
      selected_li[i].innerHTML = arr[i] + 1;
    }
  } else {
    alert("请选择6个红球！！！");
  }
}

function rand() {
  for (var i = 0; ; i++) {
    var ar = new Array();
    for (var j = 0; j < 6; j++) {
      ar.push(Math.floor(Math.random() * 33));
    }
    var flag = false;
    for (var k = 0; k < 6; k++) {
      for (var n = 5; n > k; n--) {
        if (ar[n] == ar[k]) {
          flag = true;
        }
      }
    }
    if (!flag) {
      break;
    }
  }
  ar.sort(sortNum);
  return ar;
}

function ran(name) {
  if (name == selected_li) {
    arr = rand();
    blueNum = Math.floor(Math.random() * 16);
    arr.push(blueNum);
    settleBall();
    for (var i = 0; i < 7; i++) {
      name[i].innerHTML = arr[i] + 1;
    }
  } else {
    arr1 = rand();
    arr1.push(Math.floor(Math.random() * 16));
    for (var i = 0; i < 7; i++) {
      name[i].innerHTML = arr1[i] + 1;
    }
    if (arr.length == 7) {
      var times = 0;
      for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
          if (arr1[i] == arr[j]) {
            times++;
          }
        }
      }
      switch (times) {
        // case 3:
        //   bingo.innerHTML = "恭喜您中奖了~！";
        //   award_type.innerHTML = "四等奖,奖金额度：10元;";
        //   award_amount.innerHTML = "总奖金：" + 10 * count.value + "元;";
        //   break;
        case 4:
          bingo.innerHTML = "恭喜您中奖了~！";
          award_type.innerHTML = "三等奖,奖金额度：50元;";
          award_amount.innerHTML = "总奖金：" + 50 * count.value + "元;";
          break;
        case 5:
          bingo.innerHTML = "恭喜您中奖了~！";
          award_type.innerHTML = "二等奖,奖金额度：1000元;";
          award_amount.innerHTML = "总奖金：" + 1000 * count.value + "元;";
          break;
        case 6:
          bingo.innerHTML = "恭喜您中奖了~！";
          award_type.innerHTML = "一等奖,奖金额度：100000元;";
          award_amount.innerHTML = "总奖金：" + 100000 * count.value + "元;";
          break;
        case 7:
          bingo.innerHTML = "恭喜您中奖了~！";
          award_type.innerHTML = "特等奖,奖金额度：10000000元;";
          award_amount.innerHTML = "总奖金：" + 10000000 * count.value + "元;";
          break;
        default:
          bingo.innerHTML = "很遗憾，您没有中奖~~~";
          award_type.innerHTML = "";
          award_amount.innerHTML = "";
      }
    }
  }
}
