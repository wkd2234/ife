/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = [];

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value;
    var va = document.getElementById("aqi-value-input").value;
    var cityReg = /^[a-zA-Z\u4E00-\u9FA5]+$/;
    var vaReg = /^[1-999]*$/;
    if(!cityReg.test(city)&&!vaReg.test(va)){
        alert("输入错误");
        return false;
        }
    aqiData[city] = va;
    return true;
    }



/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var str="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for (var key in aqiData){ 
        str += "<tr><td>"+key+"</td><td>"+aqiData[key]+"<td><button class='1'>删除</button></td></tr>";
    }
    document.getElementById("aqi-table").innerHTML=str;
}



/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData()&&renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  var key = this.parentNode.parentNode;
  document.getElementById("aqi-table").removeChild(key);
  renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").onclick=addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementsByClassName("1").onclick=delBtnHandle;
}



init();