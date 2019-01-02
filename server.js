var http = require('http'); //基本http伺服器
var url = require('url'); //手動解析url
var util = require('util');//轉換字串用
var querystring = require('querystring'); //用來解析查詢字串
 
var postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';//http post方式 
 
http.createServer(function (req, res) {

  var body = "";//儲存接到的資料
  req.on('data', function (chunk) {//如果有資料送入
    body += chunk;//把資料全部串起來成字串
    //console.log(body);
  });
  req.on('end', function () { //請求結束時

    body = querystring.parse(body);//解析內部參數
    // 设置响应头部信息及编码
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});//設置請求回應標頭
 
    if(body.name && body.url) { // 输出提交的数据
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URL：" + body.url);
    } else {  // 输出表单
        res.write(postHTML);
    }
    res.end();//回應標題結束
  });
}).listen(3000);//post 使用的埠號


http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'}); //請求發送回應標頭
    const text = url.parse(req.url, true); //URL的解析
    console.log(text);//獲得URL全部資訊
    console.log(text.query);//獲得get的輸入參數
    res.end(util.inspect(url.parse(req.url, true)));//res.end()結束回應 util.inspect()轉換成字串 url.parse()手動解析url  req.url請求的URL
}).listen(4000);
