process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
console.log("ЗАПУСК!!!");
const express = require("express");
var http = require('http')
var httpServ = require('http');
const {VK} = require('vk-io');
const {Keyboard} = require('vk-io');
const vk = new VK(); 
const {updates, api, snippets} = vk; 
var https = require('https');
const qs = require('querystring');
const crypto = require('crypto');
var bodyParser = require('body-parser')
const fetch = require('node-fetch');
const fs = require("fs");
const md5 = require('md5');
var cors = require('cors')
var request = require("request");
var users = require("./users.json");
var b7m = require("./b7m.json");
var double = require("./double.json");
var wheel = require("./wheel.json");
var chat = require("./chat.json");
var dices = require("./dices.json");
var pspayments = require("./pstransfers.json");
var vkcpayments = require("./vkctransfers.json");
var ccpayments = require("./cctransfers.json");
var gcpayments = require("./gctransfers.json");
const config = require("./configjg.js");
const axios = require('axios');
var util = require("./util.js")

/*require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();*/
let r = 0
for (i in users) {
  r++
}
console.log('Зарегано: ' + r) 
let cusers = []

vk.setOptions({ 
  token: "", 
  apiMode: "parallel", 
    pollingGroupId: 
});

const PaperScroll = require("paper-scroll-sdk");


/* api1.deleteWebhook().then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});
api1.createWebhook("https://to-link.pw:4040/paper", ['transfer_new']).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});

 api1.editMerchant({
      groupid: 0,
      name: 'Coin Win',
      avatar: 'https://sun9-17.userapi.com/9wrr9XqLRkrGW-PhCBgo_NPxWpr815uq312x4w/01N6S25m9PQ.jpg'
     }).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
}); */

let adminId =  // Admin VK Id

let miniAppKey = "" // Mini App Token
let miniAppKey1 = "" // Mini App Secret Key

let online = 0 // Default: 0
const admins = []

// get random number
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// ssl
var privateKey = fs.readFileSync('key.key', 'utf8');
var certificate = fs.readFileSync('cert.crt', 'utf8');

//bonus

let bonusPostId = 1912
// update bases
setInterval(function() {
    fs.writeFileSync("./users.json", JSON.stringify(users, null, "\t"))
    fs.writeFileSync("./b7m.json", JSON.stringify(b7m, null, "\t"))
    fs.writeFileSync("./double.json", JSON.stringify(double, null, "\t"))
    fs.writeFileSync("./wheel.json", JSON.stringify(wheel, null, "\t"))
    fs.writeFileSync("./dices.json", JSON.stringify(dices, null, "\t"))
    fs.writeFileSync("./chat.json", JSON.stringify(chat, null, "\t"))
    fs.writeFileSync("./pstransfers.json", JSON.stringify(pspayments, null, "\t"))
    fs.writeFileSync("./cctransfers.json", JSON.stringify(ccpayments, null, "\t"))
    fs.writeFileSync("./vkctransfers.json", JSON.stringify(vkcpayments, null, "\t"))
    fs.writeFileSync("./gctransfers.json", JSON.stringify(gcpayments, null, "\t"))
}, 60000);

// check sign
const validateAppUrl = (url, secret_key) => {
    //console.log(url)
    // достаем параметры из url
    const query_params = url.slice(url.indexOf("?") + 1)
        .split("&")
        .reduce((a, x) => {
            const data = x.split("=");
            a[data[0]] = data[1];
            return a;
        }, {});
    // выбираем нужные (с приставкой "vk_") и сортируем их
    const sign_params = {};
    Object.keys(query_params)
        .sort()
        .forEach((key) => {
            if (!key.startsWith("vk_")) return;
            sign_params[key] = query_params[key];
        });
    // образуем строку вида param1=value1&param2=value2...
    const sign_str = Object.keys(sign_params)
        .reduce((a, x) => {
            a.push(x + "=" + sign_params[x]);
            return a;
        }, [])
        .join("&");
    // подписываем
    let sign = require("crypto")
        .createHmac("sha256", secret_key)
        .update(sign_str);
    sign = sign.digest("binary");
    sign = require("buffer")
        .Buffer.from(sign, "binary")
        .toString("base64");
    sign = sign.split("+")
        .join("-");
    sign = sign.split("/")
        .join("_");
    sign = sign.replace(/=+$/, '');
    // сравниваем подпись с оригинальной. если все окей, то возвращаем id пользователя, если нет - null

    //console.log(sign)
    let status = sign === query_params["sign"];
    //console.log(status);
    let statu = {
        status: status,
        sign: sign,
        vk: query_params['sign']
    };

    return statu; //sign === query_params["sign"] ? query_params["vk_user_id"] : null;
};
// get params from url 
function getUrlVars(url) {
    var hash;
    var myJson = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        myJson[hash[0]] = hash[1];
        // If you want to get in native datatypes
        // myJson[hash[0]] = JSON.parse(hash[1]);
    }
    return myJson;
}

// ssl
var credentials = {
    key: privateKey,
    cert: certificate
};

const app = express(credentials);

var httpsServer = https.createServer(credentials, app);

var httpServer = http.createServer(app);
var server = https.createServer(credentials, app);

var io = require('socket.io')(server);
let gamedice = 0
let gameb7m = 0

/* For HTTP
var server = httpServ.createServer(app);
var io = require('socket.io')(server);
*/

// Send message function
async function send_message(message, id, token) {
  let url = `https://api.vk.com/method/messages.send?peer_id=${id}&access_token=${token}&v=5.122&message=${message}&random_id=${Math.floor(Math.random() * (1000000000 - 1 + 1)) + 1}`
  const encoded = encodeURI(url);
  fetch(encoded, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
}
// users get function
async function users_get(id, token) {
  let url = `https://api.vk.com/method/users.get?user_id=${id}&fields=photo_100&access_token=${token}&v=5.122`
  const encoded = encodeURI(url);
  let info = await fetch(encoded, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
 
  info = await info.json()

  let response = info
  
  if (response.response) {
    return response.response[0] 
} else {
    return {}
}
  
}

app.use(cors())
app.use(bodyParser.json());

// paper scroll webhook
app.post("/paper/webhook", async (req, res) => {

    
      io.emit('addBalance', {
                "user_id": req.body.object.peer_id,
                "sum": Math.floor(Math.floor(req.body.object.amount / 1000))
            });
    console.log(`Поступил платёж (${req.body.object.peer_id}) от https://vk.com/id${req.body.object.peer_id} в размере ${Math.floor(req.body.object.amount / 1000)} коинов`);
    users[req.body.object.peer_id].balance += Math.floor(Math.floor(req.body.object.amount / 1000))
     users[req.body.object.peer_id].notify.unshift({
      "text": "Пополнение баланса",
      "sum": Math.floor(Math.floor(req.body.object.amount / 1000)),
      "pered": "+",
      "icon": "add"
     })
     
    res.send('OK')
  
})

// user info
app.get("/app/user.getInfo", async (req, res) => {
    let query = req.query;


    let params = getUrlVars(req.headers["x-vk-sign"])
    if (req.headers["x-vk-sign"] === 'https://vkjustgame.ru/') return
    if(!req.headers["x-vk-sign"]) {
        return
    }
    let prov = validateAppUrl(req.headers["x-vk-sign"], miniAppKey);
    if (!prov.status) {
        return
    }
    let user = params.vk_user_id;
    let query_ = req.query;
    console.log(req.query)
    if (!user) {
        return
    }



    if (validateAppUrl(req.headers['x-vk-sign'], miniAppKey)) {

        let params = getUrlVars(req.headers['x-vk-sign'])

        if (!users[params.vk_user_id]) {
            users[params.vk_user_id] = {
                "balance": 0,
                "gcbalance":0,
                "vkcbalance":0,
                "ccbalance":0,
                "psbalance":0,
                "pswin":0,
                "vkcwin":0,
                "ccwin":0,
                "win": 0,
                "psday":0,
                "dayvkc":0,
                "daycc":0,
                "daygc":0,
                "lose": 0,
                "photo": query.photo,
                "id": params.vk_user_id
            }
            let info = await users_get(params.vk_user_id, 'e61feeb2e61feeb2e61feeb26fe66a847aee61fe61feeb2b9cd662ff30ac5844217de59')
        users[params.vk_user_id].photo = info.photo_100
        users[params.vk_user_id].name = `${query.name} ${query.familyname}`
        }
        let info = await users_get(params.vk_user_id, 'e61feeb2e61feeb2e61feeb26fe66a847aee61fe61feeb2b9cd662ff30ac5844217de59')
        users[params.vk_user_id].photo = info.photo_100
        users[params.vk_user_id].name = `${query.name} ${query.familyname}`
        if (!users[params.vk_user_id].day) {
            users[params.vk_user_id].day = 0
        }
        if (!users[params.vk_user_id].iplay) {
            users[params.vk_user_id].iplay = 0
        }

        if (users[params.vk_user_id].active == 'VKCoin' || users[params.vk_user_id].active == 'CoronaCoin') {
            users[params.vk_user_id].active = 'PaperScroll'
        }

        if (!users[params.vk_user_id].playb7m) {
            users[params.vk_user_id].playb7m = 0
        }
        if (!users[params.vk_user_id].dice) {
            users[params.vk_user_id].dice = 0
        }
        if(!users[params.vk_user_id].ingam){
            users[params.vk_user_id].ingam = 0
        }
        if (!users[params.vk_user_id].mydoubleingame) {
            users[params.vk_user_id].mydoubleingame = 0
        }
        if (!users[params.vk_user_id].repost) {
            users[params.vk_user_id].repost = 0
        }
        if (!users[params.vk_user_id].nvuti) {
            users[params.vk_user_id].nvuti = 0
        }
        if (!users[params.vk_user_id].withdrawlimit) {
            users[params.vk_user_id].withdrawlimit = 0
        }
        if (!users[params.vk_user_id].daywithdraw) {
            users[params.vk_user_id].daywithdraw = 0
        }
        if (!users[params.vk_user_id].myb7msum) {
            users[params.vk_user_id].myb7msum = 0
            users[params.vk_user_id].myb7mvaluta = 0
            users[params.vk_user_id].myb7mview = 0
            users[params.vk_user_id].myb7mwin = 'undef'
        }
        if (!users[params.vk_user_id].myb7mingame) {
            users[params.vk_user_id].myb7mingame = 0
        }
        if (!users[params.vk_user_id].moreless) {
            users[params.vk_user_id].moreless = 0
        }
        if (!users[params.vk_user_id].wheel) {
            users[params.vk_user_id].wheel = 0
        }

        if (!users[params.vk_user_id].active) {
            users[params.vk_user_id].active = 'VKCoin'
        }

        if (!users[params.vk_user_id].psday) {
            users[params.vk_user_id].psday = 0
            users[params.vk_user_id].ccday = 0
            users[params.vk_user_id].vkcday = 0
            users[params.vk_user_id].gcday = 0
        }

        if (!users[params.vk_user_id].notify) {
            users[params.vk_user_id].notify = []
        }


        res.json({
            response: users[params.vk_user_id]
        })
    } else {

        res.json({
            "error": "Неверные параметры запуска."
        })
    }
});

// get admin info
app.get("/app/admin.getInfo", (req, res) => {
    let query = req.query;
    let params = getUrlVars(req.headers["x-vk-sign"])
    if (req.headers["x-vk-sign"] === 'https://vkjustgame.ru/') return

     if(!req.headers["x-vk-sign"]) {

        return
    }
    
    
    if (validateAppUrl(req.headers['x-vk-sign'], miniAppKey)) {
        let params = getUrlVars(req.headers['x-vk-sign'])
        if (params.vk_user_id != adminId) return
        let bank = 0
        for (i in users) {
            bank += users[i].balance
        }
        let win = 0
        for (i in users) {
            win += users[i].win
        }
        let bank2 = 0
        for (i in users) {
            bank2 += users[i].vkc
        }
        let win2 = 0
        for (i in users) {
            win2 += users[i].vkcwin
        }
        api1.getMerchants().then((result) => {
           res.json({
            bank: bank,
            win: win,
            win2: win2,
            bank2: bank2,
            online10: 1,
            online12: 1,
            online14: 3,
            online16: 2,
            online18: 42,
            online20: 1,
            online22: 24,
            online00: 7,
            balance: Math.floor(result[0].balance / 1000)
        })

    })
       
    } else {
        res.json({
            "error": "Неверные параметры запуска."
        })
    }
});

// ref system (not working)
app.get("/app/user.ref", (req, res) => {
    let query = req.query;
    if(!req.headers["x-vk-sign"]) {
        res.status(403)
            .json({
                response: [{
                    status: 'error',
                    error_code: 1,
                    error_description: 'Невалидные парметры запуска'
            }]
            });
        return
    }
    if (validateAppUrl(req.headers['x-vk-sign'], miniAppKey)) {
      let params = getUrlVars(req.headers['x-vk-sign'])
        if (users[params.vk_user_id].active == 'scroll') {
         
        if (users[params.vk_user_id].isRef == '123') {
            res.json({})
            return
        }
        users[params.vk_user_id].isRef = '123'
        users[params.vk_user_id].ref = query.ref
        users[params.vk_user_id].refName = users[query.ref].name
        users[params.vk_user_id].balance += 50000
        users[query.ref].balance += 300000
        users[query.ref].notify.unshift({
      "text": "По вашей реф ссылке перешел пользователь",
      "sum": Math.floor(300000),
      "pered": "+",
      "icon": "ref"
     })
        send_message(`По вашей реф.ссылке перешел @id${params.vk_user_id} (пользователь). На ваш баланс зачислено 300 000

          `, query.ref, 'hui')


        res.send({
            status: 'ok'
        })
      } 

       if (users[params.vk_user_id].active == 'vkc') {
         
        if (users[params.vk_user_id].isRef == '123') {
            res.json({})
            return
        }
        users[params.vk_user_id].isRef = '123'
        users[params.vk_user_id].ref = query.ref
        users[params.vk_user_id].refName = users[query.ref].name
        users[params.vk_user_id].balance += 1000
        users[query.ref].balance += 100000
        users[query.ref].notify.unshift({
      "text": "По вашей реф ссылке перешел пользователь",
      "sum": Math.floor(100000),
      "pered": "+",
      "type": "vkc",
      "icon": "ref"
     })

        res.send({
            status: 'ok'
        })
      } 

    } else {
        res.json({
            "error": "Неверные параметры запуска."
        })
    }
});


// get online (deprecated)
app.get("/app/user.online", (req, res) => {
    let query = req.query;
    if(!req.headers["x-vk-sign"]) {
        res.status(403)
            .json({
                response: [{
                    status: 'error',
                    error_code: 1,
                    error_description: 'Невалидные парметры запуска'
            }]
            });
        return
    }
    if (validateAppUrl(req.headers['x-vk-sign'], miniAppKey)) {
        let params = getUrlVars(req.headers['x-vk-sign'])

        users[params.vk_user_id].online = true
        res.send({
            status: 'ok',
            online: online
        })
    } else {
        res.json({
            "error": "Неверные параметры запуска."
        })
    }
});


// user ban

// user balance top
app.get("/app/user.getTop", (req, res) => {
    let params = getUrlVars(req.headers["x-vk-sign"])
    if (req.headers["x-vk-sign"] === 'https://vkjustgame.ru/') return
    if(!req.headers["x-vk-sign"]) {

        return
    }
    let prov = validateAppUrl(req.headers['x-vk-sign'], miniAppKey)
    if (!prov.status) {
        return
    }
    if (validateAppUrl(req.headers['x-vk-sign'], miniAppKey)) {
        let params = getUrlVars(req.headers['x-vk-sign'])
        const pos = 1
        let now = new Date();
        let hour = now.getHours()
        let minutes = now.getMinutes()
        if (hour < 10) {
            hour = `0${hour}`
        }
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        let timeString = hour + ":" + minutes;
        let hash = req.params.hash;
        let a = 0
        let base = users
        let query = req.query;

        let top = []

        for (let i in base) {

            top.push({
                id: i,
                verify: base[i].verify,
                name: base[i].name,
                photo: base[i].photo,
                balance: base[i].balance
            })

        }
        top.sort(function(a, b) {

            if (b.balance > a.balance) return 1
            if (b.balance < a.balance) return -1
            return 0


        });

        res.json({
            "users": top
        })
    } else {
        res.json({
            "error": "Неверные параметры запуска."
        })
    }
});

// users day top
app.get("/app/user.getDayTop", (req, res) => {
    let query = req.query;
    if(!req.headers["x-vk-sign"]) {

        return
    }
    let prov = validateAppUrl(req.headers['x-vk-sign'], miniAppKey)
    if (!prov.status) {
        return
    }
    if (validateAppUrl(req.headers['x-vk-sign'], miniAppKey)) {
        let params = getUrlVars(req.headers['x-vk-sign'])
        const pos = 1
        let now = new Date();
        let hour = now.getHours()
        let minutes = now.getMinutes()
        if (hour < 10) {
            hour = `0${hour}`
        }
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        let timeString = hour + ":" + minutes;
        let hash = req.params.hash;
        let a = 0
        let base = users
        let query = req.query;

        let top = []

        for (let i in base) {

            top.push({
                id: i,
                verify: base[i].verify,
                name: base[i].name,
                familyname: base[i].familyname,
                photo: base[i].photo,
                balance: base[i].psday
            })

        }
        top.sort(function(a, b) {

            if (b.balance > a.balance) return 1
            if (b.balance < a.balance) return -1
            return 0


        });

        res.json({
            "users": top
        })
    } else {
        res.json({
            "error": "Неверные параметры запуска."
        })
    }
});
function sendVk(toId, amount) {
    return axios.post('https://coin-without-bugs.vkforms.ru/merchant/send/', {
        "merchantId": 389246356,
        "key": config.vkcKey,
        "toId": toId,
        "amount": amount * 1000,
        "markAsMerchant": 1,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    })
}
async function getVkBalance() {
    let { data } = await axios.post('https://coin-without-bugs.vkforms.ru/merchant/score/', {
        "merchantId": 389246356,
        "key": "cU25,1N9za#=R9c_NJx6enHx7GMfHA;Mv;ju3y-Kzf.!pDm#yI",
        "userIds": [389246356],
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    })
    return data.response['389246356'];
};
function sendCC(toId, amount) {
    return axios.post('https://corona-coins.ru/api/', {
        "token": config.cckey,
        "method": 'transfer',
        "to_id": toId,
        "amount": amount * 1000,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    })
}



async function getCCBalance() {
    let { data } = await axios.post('https://corona-coins.ru/api/', {
        "token": config.cckey,
        "method": 'score',
        "user_ids": [389246356],
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    })

    return data.response[0].coins;
}
// withdraw coins
app.get("/app/user.withdraw", async(req, res) => {
    let query = req.query;
    if(!req.headers["x-vk-sign"]) {
        res.status(403)
            .json({
                response: [{
                    status: 'error',
                    error_code: 1,
                    error_description: 'Невалидные парметры запуска'
            }]
            });
        return
    }
    let prov = validateAppUrl(req.headers['x-vk-sign'], miniAppKey)
    if (!prov.status) {
        return
    }
    if (validateAppUrl(req.headers['x-vk-sign'], miniAppKey)) {
      let params = getUrlVars(req.headers['x-vk-sign'])
      if (users[params.vk_user_id].ban == true) {
            res.json({
                status: 'error',
                error: 'Ваш аккаунт заблокирован'
            })
            return
        }
        if (users[params.vk_user_id].active == 'PaperScroll') {
         
        if (!query.sum) {
            res.json({
                status: 'error',
                error: 'Введите сумму!'
            })
            return
        }
        
        if (query.sum < 1) {
            res.json({
                status: 'error',
                error: 'Введите корректную сумму.'
            })
            return
        }

         if (users[params.vk_user_id].psbalance < query.sum) {
            res.json({
                status: 'error',
                error: 'Недостаточно бумаги.'
            })
            return
        
        }


        if (!users[params.vk_user_id]) {
            res.json({
                status: 'error',
                error: 'Неизвестная ошибка'
            })
            return
        }

        api2.callMethod('transfers.create', {
                "peer_id": Math.floor(params.vk_user_id),
                "object_type": "balance",
                "object_type_id": 0,
                "amount": Math.floor(query.sum * 1000)
            }).then((e) => {

              /*users[params.vk_user_id].daywithdraw +=  Math.floor(query.sum)*/

                users[params.vk_user_id].psbalance -= Math.floor(query.sum)
                res.json({
                    status: 'ok',
                    error: ''
                })
                return
            })
            .catch((e) => {

                res.json({
                    status: 'error',
                    error: 'Недостаточно бумаги у бота.'
                })
                return
            })

        }
        if (users[params.vk_user_id].active == 'VKCoin') {
          if (!query.sum) {
            res.json({
                status: 'error',
                error: 'Введите сумму!'
            })
            return
        }
       
        if (query.sum < 1) {
            res.json({
                status: 'error',
                error: 'Введите корректную сумму.'
            })
            return
        }

        if (!users[params.vk_user_id]) {
            res.json({
                status: 'error',
                error: 'Неизвестная ошибка'
            })
            return
        }

         if (users[params.vk_user_id].vkcbalance < query.sum) {
            res.json({
                status: 'error',
                error: 'Недостаточно коинов.'
            })
            return
        
        }
        let balancefunc = await getVkBalance();
        let second = Math.floor(balancefunc / 1000)
        if(users[params.vk_user_id].vkcbalance > second){
            res.json({
                status:'error',
                error: 'У приложения недостаточно коинов'
            })
            return

        } else {
        	sendVk(params.vk_user_id, query.sum).then(async () => {
                users[params.vk_user_id].vkcbalance -= Math.floor(query.sum)
                 res.json({
                    status: 'ok',
                    error: ''
                })
                return
            });
        }
        

        }
        if (users[params.vk_user_id].active == 'CoronaCoin') {
          if (!query.sum) {
            res.json({
                status: 'error',
                error: 'Введите сумму!'
            })
            return
        }
       
        if (query.sum < 1) {
            res.json({
                status: 'error',
                error: 'Введите корректную сумму.'
            })
            return
        }

         if (users[params.vk_user_id].ccbalance < query.sum) {
            res.json({
                status: 'error',
                error: 'Недостаточно коинов.'
            })
            return
        
        }
        if (!users[params.vk_user_id]) {
            res.json({
                status: 'error',
                error: 'Неизвестная ошибка'
            })
            return
        }
        let balancefunc2 = await getCCBalance();
        let second2 = Math.floor(balancefunc2 / 1000)
        if(users[params.vk_user_id].ccbalance > second2){
            res.json({
                status: 'error',
                error: 'У приложения недостаточно коинов'
            })
        }
        sendCC(params.vk_user_id, query.sum).then(async () => {
                users[params.vk_user_id].ccbalance -= Math.floor(query.sum)
                 res.json({
                    status: 'ok',
                    error: ''
                })
                return
            });
        }
        
    } else {
        res.json({
            "error": "Неверные параметры запуска."
        })
    }
});

// dice
app.get("/app/game.dice", (req, res) => {
    let query = req.query;
    if(!req.headers["x-vk-sign"]) {
        res.status(403)
            .json({
                response: [{
                    status: 'error',
                    error_code: 1,
                    error_description: 'Невалидные парметры запуска'
            }]
            });
        return
    }
    let prov = validateAppUrl(req.headers['x-vk-sign'], miniAppKey)
    if (!prov.status) {
        return
    }
    if (validateAppUrl(req.headers['x-vk-sign'], miniAppKey)) {
      let params = getUrlVars(req.headers['x-vk-sign'])
      if (users[params.vk_user_id].active == 'scroll') {
       
        if (!query.sum) {
            res.json({
                status: 'error',
                error: 'Введите сумму!'
            })
            return
        }
        if (query.sum > 2000000000) {
            res.json({
                status: 'error',
                error: 'Максимальная сумма ставки 2ккк'
            })
            return
        }
        if (query.sum < 1) {
            res.json({
                status: 'error',
                error: 'Введите корректную сумму.'
            })
            return
        }
        if (users[params.vk_user_id].balance < query.sum) {
            res.json({
                status: 'error',
                error: 'Недостаточно бумаги.'
            })
            return
        }
        let numbers = [1, 2, 1, 3, 4, 4, 5, 3, 6, 2, 8, 8, 9, 5, 10, 6, 11, 12, 11, 12, 9, 12, 10]
        let rand = numbers[Math.floor(Math.random() * (23 - 0 + 1)) + 0];
        users[params.vk_user_id].balance -= Math.floor(query.sum)
        if (rand == 7) {
            if (query.number == 7) {
                let plus = query.sum * 5.30
                users[params.vk_user_id].balance += plus
                users[params.vk_user_id].win += plus
                users[params.vk_user_id].day += plus
                users[params.vk_user_id].moreless += plus
                res.json({
                    status: 'ok',
                    error: '',
                    number: rand,
                    result: 'win',
                    text: `Выпало число 7. (+${plus} бумаги)`
                })
                return
            } else {
                res.json({
                    status: 'ok',
                    error: '',
                    number: rand,
                    result: 'lose',
                    text: `Выпало число 7. (-${query.sum} бумаги)`
                })
            }
        }
        if (rand > 7) {
            if (query.number == 8) {
                let plus = query.sum * 1.90
                users[params.vk_user_id].balance += plus
                users[params.vk_user_id].win += plus
                users[params.vk_user_id].day += plus
                users[params.vk_user_id].moreless += plus
                res.json({
                    status: 'ok',
                    error: '',
                    number: rand,
                    result: 'win',
                    text: `Выпало число ${rand}. (+${plus} бумаги)`
                })
                return
            } else {
                res.json({
                    status: 'ok',
                    error: '',
                    number: rand,
                    result: 'lose',
                    text: `Выпало число ${rand}. (-${query.sum} бумаги)`
                })
            }
        }
        if (rand < 7) {
            if (query.number == 6) {
                let plus = query.sum * 1.90
                users[params.vk_user_id].balance += plus
                users[params.vk_user_id].day += plus
                users[params.vk_user_id].moreless += plus
                users[params.vk_user_id].win += plus
                res.json({
                    status: 'ok',
                    error: '',
                    number: rand,
                    result: 'win',
                    text: `Выпало число ${rand}. (+${plus} бумаги)`
                })
                return
            } else {
                res.json({
                    status: 'ok',
                    error: '',
                    number: rand,
                    result: 'lose',
                    text: `Выпало число ${rand}. (-${query.sum} бумаги)`
                })
            }
        }
        res.json({
            status: 'ok',
            error: ''
        })
      } 
     
    } else {
        res.json({
            "error": "Неверные параметры запуска."
        })
    }
});

// thimble
app.get("/app/game.thimble", (req, res) => {
    let query = req.query;
    if(!req.headers["x-vk-sign"]) {
        res.status(403)
            .json({
                response: [{
                    status: 'error',
                    error_code: 1,
                    error_description: 'Невалидные парметры запуска'
            }]
            });
        return
    }
    let prov = validateAppUrl(req.headers['x-vk-sign'], miniAppKey)
    if (!prov.status) {
        return
    }
    if (validateAppUrl(req.headers['x-vk-sign'], miniAppKey)) {
        let params = getUrlVars(req.headers['x-vk-sign'])
        if (users[params.vk_user_id].active == 'scroll') {
        if (!query.sum) {
            res.json({
                status: 'error',
                error: 'Введите сумму!'
            })
            return
        }
        if (query.sum > 2000000000) {
            res.json({
                status: 'error',
                error: 'Максимальная сумма ставки 2ккк'
            })
            return
        }
        if (query.sum < 1) {
            res.json({
                status: 'error',
                error: 'Введите корректную сумму.'
            })
            return
        }
        if (users[params.vk_user_id].balance < query.sum) {
            res.json({
                status: 'error',
                error: 'Недостаточно бумаги.'
            })
            return
        }
        if (query.number == 6) {
       let rand = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
       users[params.vk_user_id].balance -= query.sum
       if (rand == 1) {
        if (query.rand == 1) {
      let plus = query.sum * 2.30
                users[params.vk_user_id].balance += plus
                users[params.vk_user_id].day += plus
                users[params.vk_user_id].thimble += plus
                users[params.vk_user_id].win += plus
                res.json({stakan: rand, win: true, text: `Приз был в стаканчике №${rand}. (+${plus} бумаги)`})
        } else {
          
                res.json({stakan: rand, win: false, text: `Приз был в стаканчике №${rand}. (-${query.sum} бумаги)`})
        }
       }

       if (rand == 2) {
        if (query.rand == 2) {
      let plus = query.sum * 2.30
                users[params.vk_user_id].balance += plus
                users[params.vk_user_id].day += plus
                users[params.vk_user_id].thimble += plus
                users[params.vk_user_id].win += plus
                res.json({stakan: rand, win: true, text: `Приз был в стаканчике №${rand}. (+${plus} бумаги)`})
        } else {
          
                res.json({stakan: rand, win: false, text: `Приз был в стаканчике №${rand}. (-${query.sum} бумаги)`})
        }
       }

       if (rand == 3) {
        if (query.rand == 3) {
      let plus = query.sum * 2.30
                users[params.vk_user_id].balance += plus
                users[params.vk_user_id].day += plus
                users[params.vk_user_id].thimble += plus
                users[params.vk_user_id].win += plus
                res.json({stakan: rand, win: true, text: `Приз был в стаканчике №${rand}. (+${plus} бумаги)`})
        } else {
          
                res.json({stakan: rand, win: false, text: `Приз был в стаканчике №${rand}. (-${query.sum} бумаги)`})
        }
       }
        if (rand == 4) {
        if (query.rand == 4) {
      let plus = query.sum * 2.30
                users[params.vk_user_id].balance += plus
                users[params.vk_user_id].day += plus
                users[params.vk_user_id].thimble += plus
                users[params.vk_user_id].win += plus
                res.json({stakan: rand, win: true, text: `Приз был в стаканчике №${rand}. (+${plus} бумаги)`})
        } else {
          
                res.json({stakan: rand, win: false, text: `Приз был в стаканчике №${rand}. (-${query.sum} бумаги)`})
        }
       }
        if (rand == 5) {
        if (query.rand == 5) {
      let plus = query.sum * 2.30
                users[params.vk_user_id].balance += plus
                users[params.vk_user_id].day += plus
                users[params.vk_user_id].thimble += plus
                users[params.vk_user_id].win += plus
                res.json({stakan: rand, win: true, text: `Приз был в стаканчике №${rand}. (+${plus} бумаги)`})
        } else {
          
                res.json({stakan: rand, win: false, text: `Приз был в стаканчике №${rand}. (-${query.sum} бумаги)`})
        }
       }
        if (rand == 6) {
        if (query.rand == 6) {
      let plus = query.sum * 2.30
                users[params.vk_user_id].balance += plus
                users[params.vk_user_id].day += plus
                users[params.vk_user_id].thimble += plus
                users[params.vk_user_id].win += plus
                res.json({stakan: rand, win: true, text: `Приз был в стаканчике №${rand}. (+${plus} бумаги)`})
        } else {
          
                res.json({stakan: rand, win: false, text: `Приз был в стаканчике №${rand}. (-${query.sum} бумаги)`})
        }
       }
     } 

       if (query.number == 3) {
       let rand = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
       users[params.vk_user_id].balance -= query.sum
       if (rand == 1) {
        if (query.rand == 1) {
      let plus = query.sum * 1.30
                users[params.vk_user_id].balance += plus
                users[params.vk_user_id].day += plus
                users[params.vk_user_id].thimble += plus
                users[params.vk_user_id].win += plus
                res.json({stakan: rand, win: true, text: `Приз был в стаканчике №${rand}. (+${plus} бумаги)`})
        } else {
          
                res.json({stakan: rand, win: false, text: `Приз был в стаканчике №${rand}. (-${query.sum} бумаги)`})
        }
       }

       if (rand == 2) {
        if (query.rand == 2) {
      let plus = query.sum * 1.30
                users[params.vk_user_id].balance += plus
                users[params.vk_user_id].day += plus
                users[params.vk_user_id].thimble += plus
                users[params.vk_user_id].win += plus
                res.json({stakan: rand, win: true, text: `Приз был в стаканчике №${rand}. (+${plus} бумаги)`})
        } else {
          
                res.json({stakan: rand, win: false, text: `Приз был в стаканчике №${rand}. (-${query.sum} бумаги)`})
        }
       }

       if (rand == 3) {
        if (query.rand == 3) {
      let plus = query.sum * 1.30
                users[params.vk_user_id].balance += plus
                users[params.vk_user_id].day += plus
                users[params.vk_user_id].thimble += plus
                users[params.vk_user_id].win += plus
                res.json({stakan: rand, win: true, text: `Приз был в стаканчике №${rand}. (+${plus} бумаги)`})
        } else {
          
                res.json({stakan: rand, win: false, text: `Приз был в стаканчике №${rand}. (-${query.sum} бумаги)`})
        }
       }
     } 
}

    } else {
        res.json({
            "error": "Неверные параметры запуска."
        })
    }
});

// wheel
app.get("/app/game.wheel", (req, res) => {
    let query = req.query;
    if(!req.headers["x-vk-sign"]) {
        res.status(403)
            .json({
                response: [{
                    status: 'error',
                    error_code: 1,
                    error_description: 'Невалидные парметры запуска'
            }]
            });
        return
    }
    let prov = validateAppUrl(req.headers['x-vk-sign'], miniAppKey)
    if (!prov.status) {
        return
    }
    if (validateAppUrl(req.headers['x-vk-sign'], miniAppKey)) {
        let params = getUrlVars(req.headers['x-vk-sign'])
        if (users[params.vk_user_id].active == 'scroll') {
            if (!query.sum) {
            res.json({
                status: 'error',
                error: 'Введите сумму!'
            })
            return
        }
        if (!Math.floor(query.sum)) {
            res.json({
                status: 'error',
                error: 'Введите сумму!'
            })
            return
        }
        if (query.sum > 2000000000) {
            res.json({
                status: 'error',
                error: 'Максимальная сумма ставки 2кк'
            })
            return
        }
        if (query.sum < 1) {
            res.json({
                status: 'error',
                error: 'Введите корректную сумму.'
            })
            return
        }
        if (users[params.vk_user_id].balance < query.sum) {
            res.json({
                status: 'error',
                error: 'Недостаточно бумаги.'
            })
            return
        }
        users[params.vk_user_id].balance -= query.sum

        let text = ``

        if (query.type == 'color') {
            if (query.data == 'red') {
                text = 'Ставка на красное'
            }
            if (query.data == 'black') {
                text = 'Ставка на черное'
            }
        }

        if (query.type == 'ev') {
            if (query.data == 'even') {
                text = 'Ставка на четное'
            }
            if (query.data == 'noteven') {
                text = 'Ставка на нечетное'
            }
        }

        if (query.type == 'num') {
            if (query.data == '1-12') {
                text = 'Ставка на 1-12'
            }
            if (query.data == '13-24') {
                text = 'Ставка на 13-24'
            }
            if (query.data == '25-36') {
                text = 'Ставка на 25-36'
            }
        }

        let q = 0

        for (i in wheel.users) {
          if (wheel.users[i].id == params.vk_user_id) {
            q++
          }
        }

        
        wheel.users.push({
            "id": params.vk_user_id,
            "name": users[params.vk_user_id].name,
            "type": query.type,
            "data": query.data,
            "sum": query.sum,
            "active": "scroll",
            "text": text
        })

        res.json({
            status: 'ok',
            error: ''
        })
        }
       
    } else {
        res.json({
            "error": "Неверные параметры запуска."
        })
    }
});

// orel reshka
app.get("/app/game.orel-reshka", (req, res) => {
    let query = req.query;
    if(!req.headers["x-vk-sign"]) {
        res.status(403)
            .json({
                response: [{
                    status: 'error',
                    error_code: 1,
                    error_description: 'Невалидные парметры запуска'
            }]
            });
        return
    }
    let prov = validateAppUrl(req.headers['x-vk-sign'], miniAppKey)
    if (!prov.status) {
        return
    }
    if (validateAppUrl(req.headers['x-vk-sign'], miniAppKey)) {
      let params = getUrlVars(req.headers['x-vk-sign'])
    
        
        if (!query.sum) {
            res.json({
                status: 'error',
                error: 'Введите сумму!'
            })
            return
        }
        if (query.sum > 2000000000) {
            res.json({
                status: 'error',
                error: 'Максимальная сумма ставки 2кк'
            })
            return
        }
        if (query.sum < 1) {
            res.json({
                status: 'error',
                error: 'Введите корректную сумму.'
            })
            return
        }
        if (users[params.vk_user_id].balance < query.sum) {
            res.json({
                status: 'error',
                error: 'Недостаточно бумаги.'
            })
            return
        }

        let rand = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        users[params.vk_user_id].balance -= Math.floor(query.sum)

        if (rand == 1) {
            if (query.type == 1) {
                users[params.vk_user_id].balance += Math.floor(query.sum * 1.3)
                users[params.vk_user_id].win += Math.floor(query.sum * 1.3)
                users[params.vk_user_id].orelResh += Math.floor(query.sum * 1.3)
                users[params.vk_user_id].day += Math.floor(query.sum * 1.3)
                res.json({
                    status: 'ok',
                    error: '',
                    text: `+${query.sum * 1.3} бумаги`,
                    result: 'win',
                    res: 'orel'
                })
                return
            } else {
                res.json({
                    status: 'ok',
                    error: '',
                    text: `-${query.sum} бумаги`,
                    result: 'lose',
                    res: 'orel'
                })
                return
            }
        } else {
            if (query.type == 2) {
                users[params.vk_user_id].balance += Math.floor(query.sum * 1.3)
                users[params.vk_user_id].win += Math.floor(query.sum * 1.3)
                users[params.vk_user_id].orelResh += Math.floor(query.sum * 1.3)
                users[params.vk_user_id].day += Math.floor(query.sum * 1.3)
                res.json({
                    status: 'ok',
                    error: '',
                    text: `+${query.sum * 1.3} бумаги`,
                    result: 'win',
                    res: 'reshka'
                })
                return
            } else {
                res.json({
                    status: 'ok',
                    error: '',
                    text: `-${query.sum} бумаги`,
                    result: 'lose',
                    res: 'reshka'
                })
                return
            }
        }


        res.json({
            status: 'ok',
            error: ''
        })
      
      

       
    } else {
        res.json({
            "error": "Неверные параметры запуска."
        })
    }
});

// nvuti
app.get("/app/game.nvuti", (req, res) => {
    let query = req.query;
    if(!req.headers["x-vk-sign"]) {
        res.status(403)
            .json({
                response: [{
                    status: 'error',
                    error_code: 1,
                    error_description: 'Невалидные парметры запуска'
            }]
            });
        return
    }
    let prov = validateAppUrl(req.headers['x-vk-sign'], miniAppKey)
    if (!prov.status) {
        return
    }
    if (validateAppUrl(req.headers['x-vk-sign'], miniAppKey)) {
        let params = getUrlVars(req.headers['x-vk-sign'])
        if (!query.sum) {
            res.json({
                status: 'error',
                error: 'Введите сумму!'
            })
            return
        }
        if (query.sum > 2000000000) {
            res.json({
                status: 'error',
                error: 'Максимальная сумма ставки 2ккк'
            })
            return
        }
        if (query.sum < 1) {
            res.json({
                status: 'error',
                error: 'Введите корректную сумму.'
            })
            return
        }
        if (users[params.vk_user_id].balance < query.sum) {
            res.json({
                status: 'error',
                error: 'Недостаточно бумаги.'
            })
            return
        }

        if (query.chance == 85) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 849000) {
                    let plus = query.sum * 1.12
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.12)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 150000) {
                    let plus = query.sum * 1.12
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.12)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }

        if (query.chance == 80) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 799999) {
                    let plus = query.sum * 1.12
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.19)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 200000) {
                    let plus = query.sum * 1.12
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.19)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }

        if (query.chance == 75) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 749999) {
                    let plus = query.sum * 1.27
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.27)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 250000) {
                    let plus = query.sum * 1.27
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.27)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }

        if (query.chance == 70) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 699999) {
                    let plus = query.sum * 1.36
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.36)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 300000) {
                    let plus = query.sum * 1.36
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.36)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }
        if (query.chance == 65) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 649999) {
                    let plus = query.sum * 1.46
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.46)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 350000) {
                    let plus = query.sum * 1.46
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.46)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }
        if (query.chance == 60) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 599999) {
                    let plus = query.sum * 1.58
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.58)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 400000) {
                    let plus = query.sum * 1.58
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.58)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }
        if (query.chance == 55) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 549999) {
                    let plus = query.sum * 1.73
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.73)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 450000) {
                    let plus = query.sum * 1.73
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.73)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }
        if (query.chance == 50) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 499999) {
                    let plus = query.sum * 1.90
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.90)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 500000) {
                    let plus = query.sum * 1.90
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x1.90)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }
        if (query.chance == 45) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 449999) {
                    let plus = query.sum * 2.11
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x2.11)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 550000) {
                    let plus = query.sum * 2.11
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x2.11)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }
        if (query.chance == 40) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 399999) {
                    let plus = query.sum * 2.38
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x2.38)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 600000) {
                    let plus = query.sum * 2.38
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x2.38)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }
        if (query.chance == 35) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 349999) {
                    let plus = query.sum * 2.71
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x2.71)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 650000) {
                    let plus = query.sum * 2.71
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x2.71)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }
        if (query.chance == 30) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 299999) {
                    let plus = query.sum * 3.17
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x3.17)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 700000) {
                    let plus = query.sum * 3.17
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x3.17)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }
        if (query.chance == 25) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 249999) {
                    let plus = query.sum * 3.80
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x3.80)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 750000) {
                    let plus = query.sum * 3.17
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x3.80)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }
        if (query.chance == 20) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 199999) {
                    let plus = query.sum * 4.75
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x4.75)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 800000) {
                    let plus = query.sum * 4.75
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x4.75)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }
        if (query.chance == 15) {
            let random = Math.floor(Math.random() * (999999 - 0 + 1)) + 0

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 149999) {
                    let plus = query.sum * 6.33
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x6.33)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 850000) {
                    let plus = query.sum * 6.33
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x6.33)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }
        if (query.chance == 10) {
            let random = Math.floor(Math.random() * (900000 - 99999 + 1)) + 99999

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 99999) {
                    let plus = query.sum * 9.50
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x9.50)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 900000) {
                    let plus = query.sum * 9.50
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x9.50)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            }
        }
        if (query.chance == 5) {
            let random = Math.floor(Math.random() * (950000 - 49999 + 1)) + 49999

            users[params.vk_user_id].balance -= Math.floor(query.sum)
            if (query.type == 'big') {
                if (random < 49999) {
                    let plus = query.sum * 19
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x19)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            } else {
                if (random > 950000) {
                    let plus = query.sum * 19
                    users[params.vk_user_id].balance += plus
                    users[params.vk_user_id].win += plus
                    users[params.vk_user_id].nvuti += plus
                    users[params.vk_user_id].day += plus
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `+${plus} бумаги (x19)`,
                        result: 'win',
                        number: random
                    })
                } else {
                    res.json({
                        status: 'ok',
                        error: '',
                        text: `-${query.sum} бумаги`,
                        result: 'lose',
                        number: random
                    })
                }
            
        }
        
        
        res.json({
            status: 'ok',
            error: ''
        })
      
        
      }
      
        
      
    } else {
        res.json({
            "error": "Неверные параметры запуска."
        })
    }
});


// SOCKET.IO
io.on('connection', function(socket) {

   if (!socket.handshake.query.params) { 
    return socket.disconnect()
   }

     let prov = validateAppUrl(socket.handshake.query.params, miniAppKey); // check dign
    if(!prov) return socket.disconnect()
let params = getUrlVars(socket.handshake.query.params)
   
    socket.handshake.query.user_id = params.vk_user_id
    
     socket.emit('messages', chat);
         cusers.push(socket);
    online += 1
    socket.emit('wheelWins', {
            "wins":wheel.wins
        });
    let updatewheel = setInterval(() => {
         let hash = ''
        hash = `${wheel.number}@${wheel.hash}`
        hash = md5(hash)
        socket.emit('wheelData', {
            "time": wheel.time,
            "users": wheel.users,
            "hash": hash,
            "res": wheel.res
        });
       
        
    }, 1000)
    let updatedice = setInterval(() => {
        let hash2 = ''
        hash2 = `${dices.number}|${dices.hash}`
        hash2 = md5(hash2)
        
        socket.emit('dicesData', {
            "time": dices.time,
            "hash": hash2,
            "users": dices.users,
            "wins": dices.wins,
            "res": dices.res
        });
        socket.emit('online', online)
    }, 1000)
    /*let updatedouble = setInterval(() => {
        let hash4 = ''
        hash4 = `${double.number}|${double.hash}`
        hash4 = md5(hash4)
        
        socket.emit('doubleData', {
            "time": double.time,
            "hash": hash4,
            "users": double.users,
            "wins": double.wins,
            "res": double.res
        });
        socket.emit('updateuserstavkadouble', users[socket.handshake.query.user_id])
        socket.emit('online', online)
    }, 1000)
    let updateb7m = setInterval(() => {
        let hash3 = ''
        hash3 = `${b7m.number}|${b7m.hash}`
        hash3 = md5(hash3)
        
        socket.emit('b7mData', {
            "time": b7m.time,
            "hash": hash3,
            "users": b7m.users,
            "wins": b7m.wins,
            "res": b7m.res
        });
        socket.emit('updateuserstavkab7m', users[socket.handshake.query.user_id])
        socket.emit('online', online)
    }, 1000)*/
    socket.on('disconnect', function() {
        users[socket.handshake.query.user_id].ingam = 0
        
        const index = cusers.indexOf(socket);
        online -= 1
        cusers.splice(index, 1);
        clearInterval(updatewheel)
        clearInterval(updatedice)
        /*clearInterval(updateb7m)*/

    });

    socket.on('diceBet', async function(data) {
        let prov = validateAppUrl(data.params, miniAppKey)
    if (!prov.status) {
        return
    }
        if (validateAppUrl(data.params, miniAppKey)) {
            if (users[socket.handshake.query.user_id].ban == true) {
                socket.emit('alert', "Ваш аккаунт заблокирован");
        return
            }

                if (!data.sum) {
        socket.emit('alert', "Введите сумму!");
        return
         
        }
        if (!Math.floor(data.sum)) {
          socket.emit('alert', "Введите сумму!");
        return
          
        }
        
        if (data.sum < 1) {
          socket.emit('alert', "Введите корректную сумму!");
        return
           
        }
        if (users[socket.handshake.query.user_id].ban == true) {
            socket.emit('alert', "У вас бан!");
        return
        }
        if (dices.res == true) {
            socket.emit('alert', "Sever error");
        return
        }
        let valutasel = ``;
        switch (data.select) {
                case 'PaperScroll':

                    if (data.sum > 100000000000) {
          socket.emit('alert', "Максимальная сумма ставки 100ккк");
        return
            
        }

        if (data.sum < 100000) {
          socket.emit('alert', "Минимальная сумма ставки 100к");
        return
            
        }
 
                    valutasel += `PS`
                    if (users[socket.handshake.query.user_id].psbalance < data.sum) {
          socket.emit('alert', "Недостаточно PS.");
        return
            
        }
        if (users[socket.handshake.query.user_id].psbalance == null) {
        	socket.emit('alert', "Sever error");
        return
        }
        if (users[socket.handshake.query.user_id].psbalance < 0) {
        	socket.emit('alert', "Sever error");
        return
        }
        users[socket.handshake.query.user_id].psbalance -= Math.floor(data.sum)
                    break;
                case 'VKCoin':

                    if (data.sum > 10000000000) {
          socket.emit('alert', "Максимальная сумма ставки 10ккк");
        return
            
        }

        if (data.sum < 100000) {
          socket.emit('alert', "Минимальная сумма ставки 100к");
        return
            
        }
        if (users[data.vk_user_id].vkcbalance == null || (isNaN(users[data.vk_user_id].vkcbalance) == true)) {
        	socket.emit('alert', "Sever error");
            users[data.vk_user_id].vkcbalance = 0
        return
        }
        if (users[data.vk_user_id].vkcbalance < 0 ) {
        	socket.emit('alert', "Sever error");
        return
        }
 		if (users[data.vk_user_id].vkcbalance < data.sum) {
          socket.emit('alert', "Недостаточно VKC.");
        return
            
        }

        valutasel += `VKC`
        users[data.vk_user_id].vkcbalance -= Math.floor(data.sum)
                    break;
                case 'CoronaCoin':

                    if (data.sum > 1000000000) {
          socket.emit('alert', "Максимальная сумма ставки 1ккк");
        return
            
        }

        if (data.sum < 100000) {
          socket.emit('alert', "Минимальная сумма ставки 100к");
        return
            
        }

        if (users[socket.handshake.query.user_id].ccbalance == null || (isNaN(users[data.vk_user_id].ccbalance) == true)) {
        	socket.emit('alert', "Sever error");
            users[data.vk_user_id].сcbalance = 0
        return
        }
        if (users[socket.handshake.query.user_id].ccbalance < 0) {
        	socket.emit('alert', "Sever error");
        return
        }
 
                    valutasel += `CC`
                    if (users[socket.handshake.query.user_id].ccbalance < data.sum) {
          socket.emit('alert', "Недостаточно CC.");
        return
            
        }
        users[socket.handshake.query.user_id].ccbalance -= Math.floor(data.sum)
                    break;
                case 'GameCoin':
 
                    valutasel += `GC`
                    if (users[socket.handshake.query.user_id].gcbalance < data.sum) {
          socket.emit('alert', "Недостаточно GC.");
        return
            
        }
        users[socket.handshake.query.user_id].gcbalance -= Math.floor(data.sum)
                    break;
                default:
                    valutasel += `Хер его знает`
                    if (users[socket.handshake.query.user_id].balance < data.sum) {
          socket.emit('alert', "Недостаточно чего-то.");
        return
            
        }
        users[socket.handshake.query.user_id].balance -= data.sum
            }
        

        let text = ``
        if (data.type == 'ev') {
            if (data.data == 'even') {
                text = 'Ставка на четное'
            }
            if (data.data == 'noteven') {
                text = 'Ставка на нечетное'
            }
        }

        /*if (data.type == 'num') {
            if (data.data == '1-3') {
                text = 'Ставка на 1-3'
            }
            if (data.data == '4-6') {
                text = 'Ставка на 4-6'
            }
           
        }*/
        if (data.type == 'number') {
            if (data.data == '1') {
                text = 'Ставка на 1'
            }
            if (data.data == '2') {
                text = 'Ставка на 2'
            }
            if (data.data == '3') {
                text = 'Ставка на 3'
            }
            if (data.data == '4') {
                text = 'Ставка на 4'
            }
            if (data.data == '5') {
                text = 'Ставка на 5'
            }
            if (data.data == '6') {
                text = 'Ставка на 6'
            }
        }


            
            dices.users.push({
            "id": socket.handshake.query.user_id,
            "name": users[socket.handshake.query.user_id].name,
            "type": data.type,
            "data": data.data,
            "photo": users[socket.handshake.query.user_id].photo,
            "sum": Math.floor(data.sum),
            "valuta": valutasel,
            "active": users[socket.handshake.query.user_id].active,
            "text": text
        })

        
            socket.emit('updateuser', users[socket.handshake.query.user_id])
        gamedice = 1

            }
      
       
    })
    
    socket.on('wheelv2Bet', async function(data) {
        let prov = validateAppUrl(data.params, miniAppKey)
    if (!prov.status) {
        return
    }
        if (validateAppUrl(data.params, miniAppKey)) {
            if (users[socket.handshake.query.user_id].ban == true) {
                socket.emit('alert', "Ваш аккаунт заблокирован");
        return
            }
                if (!data.sum) {
        socket.emit('alert', "Введите сумму!");
        return
         
        }
        if (!Math.floor(data.sum)) {
          socket.emit('alert', "Введите сумму!");
        return
          
        }
        
        if (data.sum < 1) {
          socket.emit('alert', "Введите корректную сумму!");
        return
           
        }
        if (users[socket.handshake.query.user_id].ban == true) {
            socket.emit('alert', "У вас бан!");
        return
        }
        let valutasel = ``;
        switch (data.select) {
                case 'PaperScroll':

                    if (data.sum > 100000000000) {
          socket.emit('alert', "Максимальная сумма ставки 100ккк");
        return
            
        }

        if (data.sum < 100000) {
          socket.emit('alert', "Минимальная сумма ставки 100к");
        return
            
        }
        if (wheel.res == true) {
            socket.emit('alert', "Sever error");
            return
        }
 
                    valutasel += `PS`
                    if (users[socket.handshake.query.user_id].psbalance < data.sum) {
          socket.emit('alert', "Недостаточно PS.");
        return
            
        }
        if (users[socket.handshake.query.user_id].psbalance == null) {
            socket.emit('alert', "Sever error");
        return
        }
        if (users[socket.handshake.query.user_id].psbalance < 0) {
            socket.emit('alert', "Sever error");
        return
        }
        users[socket.handshake.query.user_id].psbalance -= Math.floor(data.sum)
                    break;
                case 'VKCoin':

                    if (data.sum > 10000000000) {
          socket.emit('alert', "Максимальная сумма ставки 10ккк");
        return
            
        }

        if (data.sum < 100000) {
          socket.emit('alert', "Минимальная сумма ставки 100к");
        return
            
        }
        if (users[data.vk_user_id].vkcbalance == null || (isNaN(users[data.vk_user_id].vkcbalance) == true)) {
            socket.emit('alert', "Sever error");
            users[data.vk_user_id].vkcbalance = 0
        return
        }
        if (users[data.vk_user_id].vkcbalance < 0 ) {
            socket.emit('alert', "Sever error");
        return
        }
        if (users[data.vk_user_id].vkcbalance < data.sum) {
          socket.emit('alert', "Недостаточно VKC.");
        return
            
        }

        valutasel += `VKC`
        users[data.vk_user_id].vkcbalance -= Math.floor(data.sum)
                    break;
                case 'CoronaCoin':

                    if (data.sum > 1000000000) {
          socket.emit('alert', "Максимальная сумма ставки 1ккк");
        return
            
        }

        if (data.sum < 100000) {
          socket.emit('alert', "Минимальная сумма ставки 100к");
        return
            
        }

        if (users[socket.handshake.query.user_id].ccbalance == null || (isNaN(users[data.vk_user_id].ccbalance) == true)) {
            socket.emit('alert', "Sever error");
            users[data.vk_user_id].сcbalance = 0
        return
        }
        if (users[socket.handshake.query.user_id].ccbalance < 0) {
            socket.emit('alert', "Sever error");
        return
        }
 
                    valutasel += `CC`
                    if (users[socket.handshake.query.user_id].ccbalance < data.sum) {
          socket.emit('alert', "Недостаточно CC.");
        return
            
        }
        users[socket.handshake.query.user_id].ccbalance -= Math.floor(data.sum)
                    break;
                case 'GameCoin':
 
                    valutasel += `GC`
                    if (users[socket.handshake.query.user_id].gcbalance < data.sum) {
          socket.emit('alert', "Недостаточно GC.");
        return
            
        }
        users[socket.handshake.query.user_id].gcbalance -= Math.floor(data.sum)
                    break;
                default:
                    valutasel += `Хер его знает`
                    if (users[socket.handshake.query.user_id].balance < data.sum) {
          socket.emit('alert', "Недостаточно чего-то.");
        return
            
        }
        users[socket.handshake.query.user_id].balance -= data.sum
            }
        

        let text = ``
        let bg = ``


        if (data.type == 'number') {
            text = data.value
            if (data.value == 1 || data.value == 3 || data.value == 5 || data.value == 7 || data.value == 9 || data.value == 12 || data.value == 14 || data.value == 16 || data.value == 18 || data.value == 19 || data.value == 21 || data.value == 23 || data.value == 25 || data.value == 27 || data.value == 30 || data.value == 32 || data.value == 34 || data.value == 36) {
                bg = 'red'
            } else if (data.value == 0) {
                bg = '#8BC34A'
            } else {
                bg = 'black'
            }
        }

        if (data.type == 'color') {
            if (data.value == 'red') {
                text = `Красн`
                bg = `red`
            }
            if (data.value == 'black') {
                text = `Черн`
                bg = `black`
            }
        }
        
        if (data.type == 'typenum') {
            if (data.value == 'even') {
                text = `Четн`
                bg = `#009688`
            }
            if (data.value == 'noteven') {
                text = `Нечет`
                bg = `#607D8B`
            }
        }

        if (data.type == 'promez') {
            if (data.value == 'oe') {
                text = `1-18`
                bg = `#3F51B5`
            }
            if (data.value == 'nt') {
                text = `19-36`
                bg = `#3F51B5`
            }
            if (data.value == 'ot') {
                text = `1-12`
                bg = `#3F51B5`
            }
            if (data.value == 'tt') {
                text = `13-24`
                bg = `#3F51B5`
            }
            if (data.value == 'twt') {
                text = `25-36`
                bg = `#3F51B5`
            }
        }



            
            wheel.users.push({
            "id": socket.handshake.query.user_id,
            "name": users[socket.handshake.query.user_id].name,
            "type": data.type,
            "data": data.value,
            "photo": users[socket.handshake.query.user_id].photo,
            "sum": Math.floor(data.sum),
            "valuta": valutasel,
            "active": users[socket.handshake.query.user_id].active,
            "text": text,
            "bg": bg
        })

        
            socket.emit('updateuser', users[socket.handshake.query.user_id])


            }
      
       
    })


    socket.on('b7mBet', async function(data) {
        let prov = validateAppUrl(data.params, miniAppKey)
    if (!prov.status) {
        return
    }
        if (validateAppUrl(data.params, miniAppKey)) {
            if (users[socket.handshake.query.user_id].ban == true) {
                socket.emit('alert', "Ваш аккаунт заблокирован");
        return
            }
                if (!data.sum) {
        socket.emit('alert', "Введите сумму!");
        return
         
        }
        if (!Math.floor(data.sum)) {
          socket.emit('alert', "Введите сумму!");
        return
          
        }

        if (b7m.res == true) {
           socket.emit('alert', "Server error!");
        return 
        }
        if (users[socket.handshake.query.user_id].ban == true) {
            socket.emit('alert', "У вас бан!");
        return
        }
        
        if (data.sum < 1) {
          socket.emit('alert', "Введите корректную сумму!");
        return
           
        }

        if ( users[socket.handshake.query.user_id].myb7mingame != 0) {
            socket.emit('alert', "Server error!");
        return
        }
        let valutasel = ``;
        switch (data.select) {
                case 'PaperScroll':

                    if (data.sum > 100000000000) {
          socket.emit('alert', "Максимальная сумма ставки 100ккк");
        return
            
        }

        if (data.sum < 100000) {
          socket.emit('alert', "Минимальная сумма ставки 100к");
        return
            
        }
 
                    valutasel += `PS`
                    if (users[socket.handshake.query.user_id].psbalance < data.sum) {
          socket.emit('alert', "Недостаточно PS.");
        return
            
        }
        if (users[socket.handshake.query.user_id].psbalance == null) {
            socket.emit('alert', "Sever error");
        return
        }
        if (users[socket.handshake.query.user_id].psbalance < 0) {
            socket.emit('alert', "Sever error");
        return
        }
        users[socket.handshake.query.user_id].psbalance -= Math.floor(data.sum)
                    break;
                case 'VKCoin':

                    if (data.sum > 10000000000) {
          socket.emit('alert', "Максимальная сумма ставки 10ккк");
        return
            
        }

        if (data.sum < 100000) {
          socket.emit('alert', "Минимальная сумма ставки 100к");
        return
            
        }
        if (users[data.vk_user_id].vkcbalance == null || (isNaN(users[data.vk_user_id].vkcbalance) == true)) {
            socket.emit('alert', "Sever error");
            users[data.vk_user_id].vkcbalance = 0
        return
        }
        if (users[data.vk_user_id].vkcbalance < 0 ) {
            socket.emit('alert', "Sever error");
        return
        }
        if (users[data.vk_user_id].vkcbalance < data.sum) {
          socket.emit('alert', "Недостаточно VKC.");
        return
            
        }

        valutasel += `VKC`
        users[data.vk_user_id].vkcbalance -= Math.floor(data.sum)
                    break;
                case 'CoronaCoin':

                    if (data.sum > 1000000000) {
          socket.emit('alert', "Максимальная сумма ставки 1ккк");
        return
            
        }

        if (data.sum < 10000) {
          socket.emit('alert', "Минимальная сумма ставки 100к");
        return
            
        }

        if (users[socket.handshake.query.user_id].ccbalance == null || (isNaN(users[data.vk_user_id].ccbalance) == true)) {
            socket.emit('alert', "Sever error");
            users[data.vk_user_id].сcbalance = 0
        return
        }
        if (users[socket.handshake.query.user_id].ccbalance < 0) {
            socket.emit('alert', "Sever error");
        return
        }
 
                    valutasel += `CC`
                    if (users[socket.handshake.query.user_id].ccbalance < data.sum) {
          socket.emit('alert', "Недостаточно CC.");
        return
            
        }
        users[socket.handshake.query.user_id].ccbalance -= Math.floor(data.sum)
                    break;
                case 'GameCoin':
 
                    valutasel += `GC`
                    if (users[socket.handshake.query.user_id].gcbalance < data.sum) {
          socket.emit('alert', "Недостаточно GC.");
        return
            
        }
        users[socket.handshake.query.user_id].gcbalance -= Math.floor(data.sum)
                    break;
                default:
                    valutasel += `Хер его знает`
                    if (users[socket.handshake.query.user_id].balance < data.sum) {
          socket.emit('alert', "Недостаточно чего-то.");
        return
            
        }
        users[socket.handshake.query.user_id].balance -= data.sum
            }
        

        let text = ``
        if (data.type == 'm7') {
            text = '< 7'
        } else if (data.type == 's7') {
            text = '= 7'
        } else if (data.type == 'b7') {
            text = '> 7'
        }


            
            b7m.users.push({
            "id": socket.handshake.query.user_id,
            "name": users[socket.handshake.query.user_id].name,
            "type": data.type,
            "photo": users[socket.handshake.query.user_id].photo,
            "sum": Math.floor(data.sum),
            "valuta": valutasel,
            "active": users[socket.handshake.query.user_id].active,
            "view": text
        })

            gameb7m = 1

            
            users[socket.handshake.query.user_id].myb7mingame = 1
            socket.emit('updateuser', users[socket.handshake.query.user_id])

            
            
            }
      
       
    })

 socket.on('doubleBet', async function(data) {
    let prov = validateAppUrl(data.params, miniAppKey)
    if (!prov.status) {
        return
    }
        if (validateAppUrl(data.params, miniAppKey)) {
            if (users[socket.handshake.query.user_id].ban == true) {
                socket.emit('alert', "Ваш аккаунт заблокирован");
        return
            }
                if (!data.sum) {
        socket.emit('alert', "Введите сумму!");
        return
         
        }
        if (!Math.floor(data.sum)) {
          socket.emit('alert', "Введите сумму!");
        return
          
        }

        if (double.res == true) {
           socket.emit('alert', "Server error!");
        return 
        }
        
        if (data.sum < 1) {
          socket.emit('alert', "Введите корректную сумму!");
        return
           
        }

        if ( users[socket.handshake.query.user_id].mydoubleingame != 0) {
            socket.emit('alert', "Server error!");
        return
        }
        let valutasel = ``;
        switch (data.select) {
                case 'PaperScroll':

                    if (data.sum > 100000000000) {
          socket.emit('alert', "Максимальная сумма ставки 100ккк");
        return
            
        }

        if (data.sum < 100000) {
          socket.emit('alert', "Минимальная сумма ставки 100к");
        return
            
        }
 
                    valutasel += `PS`
                    if (users[socket.handshake.query.user_id].psbalance < data.sum) {
          socket.emit('alert', "Недостаточно PS.");
        return
            
        }
        if (users[socket.handshake.query.user_id].psbalance == null) {
            socket.emit('alert', "Sever error");
        return
        }
        if (users[socket.handshake.query.user_id].psbalance < 0) {
            socket.emit('alert', "Sever error");
        return
        }
        users[socket.handshake.query.user_id].psbalance -= Math.floor(data.sum)
                    break;
                case 'VKCoin':

                    if (data.sum > 10000000000) {
          socket.emit('alert', "Максимальная сумма ставки 10ккк");
        return
            
        }

        if (data.sum < 100000) {
          socket.emit('alert', "Минимальная сумма ставки 100к");
        return
            
        }
        if (users[data.vk_user_id].vkcbalance == null || (isNaN(users[data.vk_user_id].vkcbalance) == true)) {
            socket.emit('alert', "Sever error");
        return
        }
        if (users[data.vk_user_id].vkcbalance < 0 ) {
            socket.emit('alert', "Sever error");
        return
        }
        if (users[data.vk_user_id].vkcbalance < data.sum) {
          socket.emit('alert', "Недостаточно VKC.");
        return
            
        }

        valutasel += `VKC`
        users[data.vk_user_id].vkcbalance -= Math.floor(data.sum)
                    break;
                case 'CoronaCoin':

                    if (data.sum > 1000000000) {
          socket.emit('alert', "Максимальная сумма ставки 1ккк");
        return
            
        }

        if (data.sum < 10000) {
          socket.emit('alert', "Минимальная сумма ставки 100к");
        return
            
        }

        if (users[socket.handshake.query.user_id].ccbalance == null || (isNaN(users[data.vk_user_id].ccbalance) == true)) {
            socket.emit('alert', "Sever error");
        return
        }
        if (users[socket.handshake.query.user_id].ccbalance < 0) {
            socket.emit('alert', "Sever error");
        return
        }
 
                    valutasel += `CC`
                    if (users[socket.handshake.query.user_id].ccbalance < data.sum) {
          socket.emit('alert', "Недостаточно CC.");
        return
            
        }
        users[socket.handshake.query.user_id].ccbalance -= Math.floor(data.sum)
                    break;
                case 'GameCoin':
 
                    valutasel += `GC`
                    if (users[socket.handshake.query.user_id].gcbalance < data.sum) {
          socket.emit('alert', "Недостаточно GC.");
        return
            
        }
        users[socket.handshake.query.user_id].gcbalance -= Math.floor(data.sum)
                    break;
                default:
                    valutasel += `Хер его знает`
                    if (users[socket.handshake.query.user_id].balance < data.sum) {
          socket.emit('alert', "Недостаточно чего-то.");
        return
            
        }
        users[socket.handshake.query.user_id].balance -= data.sum
            }
        

        let text = data.type


            
            double.users.push({
            "id": socket.handshake.query.user_id,
            "name": users[socket.handshake.query.user_id].name,
            "type": data.type,
            "photo": users[socket.handshake.query.user_id].photo,
            "familyname": users[socket.handshake.query.user_id].familyname,
            "sum": Math.floor(data.sum),
            "valuta": valutasel,
            "active": users[socket.handshake.query.user_id].active,
            "view": text
        })

            
            users[socket.handshake.query.user_id].mydoubleingame = 1
            socket.emit('updateuser', users[socket.handshake.query.user_id])

            
            
            }
      
       
    })

    socket.on('sendMessage' , async function(data) {

        if (!data.msg) return
        if (data.msg == null) return
        if (data.msg == '') return
        chat.messages.push({
            "id": socket.handshake.query.user_id,
            "name": users[socket.handshake.query.user_id].name,
            "photo": users[socket.handshake.query.user_id].photo,
            "msg": data.msg
        })
     io.emit('messages', chat);
    })

    socket.on('changerule', async function(data) {
        let prov = validateAppUrl(data.params, miniAppKey)
    if (!prov.status) {
        return
    }
        if (validateAppUrl(data.params, miniAppKey)) {
            if (data.value < 0 && data.value > 1) {
                return
            }
            if (data.value == 1) {
                users[data.vk_user_id].iplay = 1
            }
            if (data.value == 0) {
                users[data.vk_user_id].iplay = 0
            }
        }
    })

    socket.on('gamerule', async function(data) {
        let prov = validateAppUrl(data.params, miniAppKey)
    if (!prov.status) {
        return
    }
        if (validateAppUrl(data.params, miniAppKey)) {
            if (data.rule < 0 && data.rule > 1) {
                return
            }

                users[data.vk_user_id].ingam = Math.floor(data.rule)
                socket.emit('changerules', data.rule)

        }
    })

    

    


    socket.on('sell', async function(data) {
      fetch(`https://api.vkdonuts.ru/balance`, {
            method: 'post',
            body: JSON.stringify({
              "group": 0,
              "token": "hui",
              "v": 1
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((response) => {
              
              if (Math.floor(response.balance / 100) < Math.floor(data.sum * 0.005 / 1000000)) {
                socket.emit('sellError', {"text": "В кошельке недостаточно средств"});
              } else {
                socket.emit('sellOk', {});
              }
            })
        socket.emit('messages', chat);
    })
    socket.on('setQiwi', async function(data) {
       if (validateAppUrl(data.params, miniAppKey)) {
          users[socket.handshake.query.user_id].qiwi = data.qiwi
       }
    })
    
    socket.on('valuteChange', async function(data) {
        let prov = validateAppUrl(data.params, miniAppKey)
    if (!prov.status) {
        return
    }
       if (validateAppUrl(data.params, miniAppKey)) {
          users[socket.handshake.query.user_id].active = data.to
       }
    })
   

    
})
// update day top
/*setInterval(function() {
    let hour = new Date().getHours()
    let minute = new Date().getMinutes()
    let second = new Date().getSeconds()
    let o = `${nols(hour)}:${nols(minute)}`
    if (o == `00:00`) {
        let online = 0
        for (r in users) {
            users[r].day = 0
            users[r].dayvkc = 0
            users[r].daywithdraw = 0
            send_message(`Топ обнулён!

          `, adminId, 'hui')
        }
    }
    
}, 60000)*/ 

// wheel update
setInterval(() => {
    if (wheel.users.length > 0) {
    if (wheel.time != 1) {
        wheel.time -= 1
    } else {
       wheel.time = 61
            let even = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
            let players = []
            wheel.res = true
            for (i in wheel.users) {

                if (wheel.users[i].type == 'color') {

                    if (wheel.users[i].data == 'red') {
                        if (wheel.color == 'red') {
                           if (wheel.users[i].valuta == 'PS') {
                            users[wheel.users[i].id].psbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].psday += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].pswin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'VKC') {
                            users[wheel.users[i].id].vkcbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].dayvkc += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].vkcwin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'GC') {
                            users[wheel.users[i].id].gcbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].daygc += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].gcwin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'CC') {
                            users[wheel.users[i].id].ccbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].ccwin += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].daycc += Math.ceil(wheel.users[i].sum * 2)
                            }
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum * 2,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": true,
                                "bg": wheel.users[i].bg
                            })
                        } else {
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum ,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": false,
                                "bg": wheel.users[i].bg
                            })
                        }
                    } else {
                        if (wheel.color == 'black') {

                         if (wheel.users[i].valuta == 'PS') {
                            users[wheel.users[i].id].psbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].psday += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].pswin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'VKC') {
                            users[wheel.users[i].id].vkcbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].dayvkc += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].vkcwin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'GC') {
                            users[wheel.users[i].id].gcbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].daygc += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].gcwin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'CC') {
                            users[wheel.users[i].id].ccbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].ccwin += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].daycc += Math.ceil(wheel.users[i].sum * 2)
                            }
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum * 2,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": true,
                                "bg": wheel.users[i].bg
                            })
                        } else {
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum ,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": false,
                                "bg": wheel.users[i].bg
                            })
                        }
                    }


                }
                if (wheel.users[i].type == 'typenum') {
                    if (wheel.users[i].data == 'even') {
                        if (even.includes(wheel.number) && wheel.number != 0) {

                           if (wheel.users[i].valuta == 'PS') {
                            users[wheel.users[i].id].psbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].psday += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].pswin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'VKC') {
                            users[wheel.users[i].id].vkcbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].dayvkc += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].vkcwin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'GC') {
                            users[wheel.users[i].id].gcbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].daygc += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].gcwin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'CC') {
                            users[wheel.users[i].id].ccbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].ccwin += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].daycc += Math.ceil(wheel.users[i].sum * 2)
                            }
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum * 2,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": true,
                                "bg": wheel.users[i].bg
                            })
                        } else {
                          players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum ,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": false,
                                "bg": wheel.users[i].bg
                            })
                        }
                      }
                        if (wheel.users[i].data == 'noteven') {
                            if (!even.includes(wheel.number) && wheel.number != 0) {

                               if (wheel.users[i].valuta == 'PS') {
                            users[wheel.users[i].id].psbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].psday += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].pswin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'VKC') {
                            users[wheel.users[i].id].vkcbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].dayvkc += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].vkcwin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'GC') {
                            users[wheel.users[i].id].gcbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].daygc += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].gcwin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'CC') {
                            users[wheel.users[i].id].ccbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].ccwin += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].daycc += Math.ceil(wheel.users[i].sum * 2)
                            }
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum * 2,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": true,
                                "bg": wheel.users[i].bg
                            })
                            } else {
                                players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum ,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": false,
                                "bg": wheel.users[i].bg
                            })
                            }

                        }

                    
                }
            }

            for (i in wheel.users) {
                if (wheel.users[i].type == 'promez') {
                    if (wheel.users[i].text == '1-12') {
                        if (wheel.number >= 1 && wheel.number <= 12) {
                          if (wheel.users[i].valuta == 'PS') {
                            users[wheel.users[i].id].psbalance += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].psday += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].pswin += Math.ceil(wheel.users[i].sum * 3)
                        }
                        if (wheel.users[i].valuta == 'VKC') {
                            users[wheel.users[i].id].vkcbalance += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].dayvkc += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].vkcwin += Math.ceil(wheel.users[i].sum * 3)
                        }
                        if (wheel.users[i].valuta == 'GC') {
                            users[wheel.users[i].id].gcbalance += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].daygc += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].gcwin += Math.ceil(wheel.users[i].sum * 3)
                        }
                        if (wheel.users[i].valuta == 'CC') {
                            users[wheel.users[i].id].ccbalance += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].ccwin += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].daycc += Math.ceil(wheel.users[i].sum * 3)
                            }
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum * 3,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": true,
                                "bg": wheel.users[i].bg
                            })
                        } else {
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum ,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": false,
                                "bg": wheel.users[i].bg
                            })
                        }
                    }
                    if (wheel.users[i].text == '1-18') {
                        if (wheel.number >= 1 && wheel.number <= 18) {
                          if (wheel.users[i].valuta == 'PS') {
                            users[wheel.users[i].id].psbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].psday += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].pswin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'VKC') {
                            users[wheel.users[i].id].vkcbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].dayvkc += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].vkcwin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'GC') {
                            users[wheel.users[i].id].gcbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].daygc += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].gcwin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'CC') {
                            users[wheel.users[i].id].ccbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].ccwin += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].daycc += Math.ceil(wheel.users[i].sum * 2)
                            }
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum * 2,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": true,
                                "bg": wheel.users[i].bg
                            })
                        } else {
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum ,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": false,
                                "bg": wheel.users[i].bg
                            })
                        }
                    }
                    if (wheel.users[i].text == '19-36') {
                        if (wheel.number >= 19 && wheel.number <= 36) {
                          if (wheel.users[i].valuta == 'PS') {
                            users[wheel.users[i].id].psbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].psday += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].pswin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'VKC') {
                            users[wheel.users[i].id].vkcbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].dayvkc += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].vkcwin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'GC') {
                            users[wheel.users[i].id].gcbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].daygc += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].gcwin += Math.ceil(wheel.users[i].sum * 2)
                        }
                        if (wheel.users[i].valuta == 'CC') {
                            users[wheel.users[i].id].ccbalance += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].ccwin += Math.ceil(wheel.users[i].sum * 2)
                            users[wheel.users[i].id].daycc += Math.ceil(wheel.users[i].sum * 2)
                            }
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum * 2,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": true,
                                "bg": wheel.users[i].bg
                            })
                        } else {
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum ,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": false,
                                "bg": wheel.users[i].bg
                            })
                        }
                    }
                    if (wheel.users[i].text == '13-24') {
                        if (wheel.number >= 13 && wheel.number <= 24) {
                           if (wheel.users[i].valuta == 'PS') {
                            users[wheel.users[i].id].psbalance += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].psday += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].pswin += Math.ceil(wheel.users[i].sum * 3)
                        }
                        if (wheel.users[i].valuta == 'VKC') {
                            users[wheel.users[i].id].vkcbalance += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].dayvkc += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].vkcwin += Math.ceil(wheel.users[i].sum * 3)
                        }
                        if (wheel.users[i].valuta == 'GC') {
                            users[wheel.users[i].id].gcbalance += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].daygc += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].gcwin += Math.ceil(wheel.users[i].sum * 3)
                        }
                        if (wheel.users[i].valuta == 'CC') {
                            users[wheel.users[i].id].ccbalance += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].ccwin += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].daycc += Math.ceil(wheel.users[i].sum * 3)
                            }
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum * 3,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": true,
                                "bg": wheel.users[i].bg
                            })
                        } else {
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": false,
                                "bg": wheel.users[i].bg
                            })
                        }


                    }
                    if (wheel.users[i].text == '25-36') {
                        if (wheel.number >= 25 && wheel.number <= 36) {
                           if (wheel.users[i].valuta == 'PS') {
                            users[wheel.users[i].id].psbalance += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].psday += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].pswin += Math.ceil(wheel.users[i].sum * 3)
                        }
                        if (wheel.users[i].valuta == 'VKC') {
                            users[wheel.users[i].id].vkcbalance += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].dayvkc += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].vkcwin += Math.ceil(wheel.users[i].sum * 3)
                        }
                        if (wheel.users[i].valuta == 'GC') {
                            users[wheel.users[i].id].gcbalance += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].daygc += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].gcwin += Math.ceil(wheel.users[i].sum * 3)
                        }
                        if (wheel.users[i].valuta == 'CC') {
                            users[wheel.users[i].id].ccbalance += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].ccwin += Math.ceil(wheel.users[i].sum * 3)
                            users[wheel.users[i].id].daycc += Math.ceil(wheel.users[i].sum * 3)
                            }
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum * 3,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": true,
                                "bg": wheel.users[i].bg
                            })
                        } else {
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].data,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": false,
                                "bg": wheel.users[i].bg
                            })
                        }
                    }
                }
                 if (wheel.users[i].type == 'number') {
                    if (wheel.users[i].text == wheel.number) {

                            if (wheel.users[i].valuta == 'PS') {
                            users[wheel.users[i].id].psbalance += Math.ceil(wheel.users[i].sum * 36)
                            users[wheel.users[i].id].psday += Math.ceil(wheel.users[i].sum * 36)
                            users[wheel.users[i].id].pswin += Math.ceil(wheel.users[i].sum * 36)
                        }
                        if (wheel.users[i].valuta == 'VKC') {
                            users[wheel.users[i].id].vkcbalance += Math.ceil(wheel.users[i].sum * 36)
                            users[wheel.users[i].id].dayvkc += Math.ceil(wheel.users[i].sum * 36)
                            users[wheel.users[i].id].vkcwin += Math.ceil(wheel.users[i].sum * 36)
                        }
                        if (wheel.users[i].valuta == 'GC') {
                            users[wheel.users[i].id].gcbalance += Math.ceil(wheel.users[i].sum * 36)
                            users[wheel.users[i].id].daygc += Math.ceil(wheel.users[i].sum * 36)
                            users[wheel.users[i].id].gcwin += Math.ceil(wheel.users[i].sum * 36)
                        }
                        if (wheel.users[i].valuta == 'CC') {
                            users[wheel.users[i].id].ccbalance += Math.ceil(wheel.users[i].sum * 36)
                            users[wheel.users[i].id].ccwin += Math.ceil(wheel.users[i].sum * 36)
                            users[wheel.users[i].id].daycc += Math.ceil(wheel.users[i].sum * 36)
                            }
                            players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum * 36,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].value,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": true,
                                "bg": wheel.users[i].bg
                            })
                        } else {
                           players.push({
                                "id": wheel.users[i].id,
                                "name": wheel.users[i].name,
                                "sum": wheel.users[i].sum,
                                "type": wheel.users[i].type,
                                "active": wheel.users[i].active,
                                "valuta": wheel.users[i].valuta,
                                "data": wheel.users[i].value,
                                "photo": users[wheel.users[i].id].photo,
                                
                                "text": wheel.users[i].text,
                                "win": false,
                                "bg": wheel.users[i].bg
                            })
                        }
                    }
            }   

            
            let colors = ['red', 'black']

            let hash = ''
            hash = `${wheel.number}@${wheel.hash}`
            hash = md5(hash)
            console.log(players)
            io.emit('wheelResult', {
                "color": wheel.color,
                "number": wheel.number,
                "players": wheel.users,
                "code": wheel.hash,
                "hash": hash,
                "string": `${wheel.number}@${wheel.hash}`,
                "res":wheel.res
            });
            let number = wheel.number
            let code = wheel.hash
            let hash41 = hash
            let string = `${wheel.number}@${wheel.hash}`
            let players31 = players
            let color = wheel.color
            let md51 = md5(hash)
            let oldusr = wheel.users
            setTimeout(() => {
                oldusr = players31

            }, 11500)

            var sendinfo132 = setInterval(async() => {
                io.emit('wheelResult', {
                "color": color,
                "number": number,
                "players": oldusr,
                "code": code,
                "hash": hash41,
                "string": string,
                "res":wheel.res
            });



       },1000)
            setTimeout(() => {
        wheel.res = false
        io.emit('wheelWins', {
                    "wins":wheel.wins,
                    "res":wheel.res
                })
        clearInterval(sendinfo132)
    }, 20000)
            wheel.wins.push({
                "color": wheel.color,
                "number": wheel.number,
                "hash": wheel.hash,
                "md5": md5(wheel.hash)
            })


            wheel.hash = util.str_rand(util.random(18,20))
            console.log(`log => ${wheel.hash}`)
            
            wheel.number = Math.ceil(Math.random() * (36 - 1))
            if (wheel.number == 1 || wheel.number == 3 || wheel.number == 5 || wheel.number == 9 || wheel.number == 7 || wheel.number == 12 || wheel.number == 14 || wheel.number == 16 || wheel.number == 18 || wheel.number == 19 || wheel.number == 21 || wheel.number == 23 || wheel.number == 25 || wheel.number == 27 || wheel.number == 30 || wheel.number == 32 || wheel.number == 34 || wheel.number == 36) {
                wheel.color = 'red'
            } else if (wheel.number == 0) {
                wheel.color = '8BC34A'
            } else {
                wheel.color = 'black'
            }
            vk.api.messages.send({
                    peer_id: Math.ceil(2000000020),
                    message: `(Wheel) num ${wheel.number} color ${wheel.color}`
                })
            
                    wheel.users = []
    }
    for (i in users) {
        if (users[i].balance == null) {
            users[i].balance = 0
        }
    }} else {}
}, 1000)

// dice update
setInterval(() => {
    if (dices.users.length > 0) {
    if (dices.time != 1) {
        dices.time -= 1
    } else {

       dices.time = 31

            let even = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50]
            let players = []
            dices.res = true
            for (i in dices.users) {

                if (dices.users[i].type == 'ev') {
                    if (dices.users[i].data == 'even') {
                        if (even.includes(dices.number)) {
                        if (dices.users[i].valuta == 'PS') {
                            users[dices.users[i].id].psbalance += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].psday += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].pswin += Math.ceil(dices.users[i].sum * 2)
                        }
                        if (dices.users[i].valuta == 'VKC') {
                            users[dices.users[i].id].vkcbalance += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].dayvkc += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].vkcwin += Math.ceil(dices.users[i].sum * 2)
                        }
                        if (dices.users[i].valuta == 'GC') {
                            users[dices.users[i].id].gcbalance += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].daygc += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].gcwin += Math.ceil(dices.users[i].sum * 2)
                        }
                        if (dices.users[i].valuta == 'CC') {
                            users[dices.users[i].id].ccbalance += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].ccwin += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].daycc += Math.ceil(dices.users[i].sum * 2)
                            }
                            players.push({
                                "id": dices.users[i].id,
                                "name": dices.users[i].name,
                                "sum": dices.users[i].sum * 2,
                                "type": dices.users[i].type,
                                "active": dices.users[i].active,
                                "valuta": dices.users[i].valuta,
                                "data": dices.users[i].data,
                                "photo": users[dices.users[i].id].photo,
                                
                                "text": dices.users[i].text,
                                "win": true
                            })
                        } else {
                            players.push({
                                "id": dices.users[i].id,
                                "name": dices.users[i].name,
                                "sum": dices.users[i].sum,
                                "type": dices.users[i].type,
                                "active": dices.users[i].active,
                                "data": dices.users[i].data,
                                "photo": users[dices.users[i].id].photo,
            
                                "valuta": dices.users[i].valuta,
                                "text": dices.users[i].text,
                                "win": false
                            })
                        }
                      }
                        if (dices.users[i].data == 'noteven') {
                            if (!even.includes(dices.number)) {
                  
                              if (dices.users[i].valuta == 'PS') {
                            users[dices.users[i].id].psbalance += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].psday += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].pswin += Math.ceil(dices.users[i].sum * 2)
                        }
                        if (dices.users[i].valuta == 'VKC') {
                            users[dices.users[i].id].vkcbalance += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].dayvkc += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].vkcwin += Math.ceil(dices.users[i].sum * 2)
                        }
                        if (dices.users[i].valuta == 'GC') {
                            users[dices.users[i].id].gcbalance += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].daygc += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].gcwin += Math.ceil(dices.users[i].sum * 2)
                        }
                        if (dices.users[i].valuta == 'CC') {
                            users[dices.users[i].id].ccbalance += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].ccwin += Math.ceil(dices.users[i].sum * 2)
                            users[dices.users[i].id].daycc += Math.ceil(dices.users[i].sum * 2)
                            }

                                players.push({
                                    "id": dices.users[i].id,
                                    "name": dices.users[i].name,
                                    "sum": dices.users[i].sum * 2,
                                    "type": dices.users[i].type,
                                    "photo": users[dices.users[i].id].photo,
            
                                    "active": dices.users[i].active,
                                    "data": dices.users[i].data,
                                    "valuta": dices.users[i].valuta,
                                    "text": dices.users[i].text,
                                    "win": true
                                })
                            } else {
                                players.push({
                                    "id": dices.users[i].id,
                                    "name": dices.users[i].name,
                                    "sum": dices.users[i].sum,
                                    "type": dices.users[i].type,
                                    "photo": users[dices.users[i].id].photo,
            
                                    "data": dices.users[i].data,
                                    "valuta": dices.users[i].valuta,
                                    "active": dices.users[i].active,
                                    "text": dices.users[i].text,
                                    "win": false
                                })
                            }

                        }

                    
                }
            }

            for (i in dices.users) {
                if (dices.users[i].type == 'num') {
                    if (dices.users[i].text == 'Ставка на 1-3') {
                        if (dices.number >= 1 && dices.number <= 3) {
                             if (dices.users[i].valuta == 'PS') {
                            users[dices.users[i].id].psbalance += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].psday += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].pswin += Math.ceil(dices.users[i].sum * 3)
                        }
                        if (dices.users[i].valuta == 'VKC') {
                            users[dices.users[i].id].vkcbalance += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].dayvkc += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].vkcwin += Math.ceil(dices.users[i].sum * 3)
                        }
                        if (dices.users[i].valuta == 'GC') {
                            users[dices.users[i].id].gcbalance += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].daygc += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].gcwin += Math.ceil(dices.users[i].sum * 3)
                        }
                        if (dices.users[i].valuta == 'CC') {
                            users[dices.users[i].id].ccbalance += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].ccwin += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].daycc += Math.ceil(dices.users[i].sum * 3)
                            }
                            players.push({
                                "id": dices.users[i].id,
                                "name": dices.users[i].name,
                                "sum": dices.users[i].sum * 3,
                                "type": dices.users[i].type,
                                "active": dices.users[i].active,
                                "valuta": dices.users[i].valuta,
                                "photo": users[dices.users[i].id].photo,
            
                                "data": dices.users[i].data,
                                "text": dices.users[i].text,
                                "win": true
                            })
                        } else {
                            players.push({
                                "id": dices.users[i].id,
                                "name": dices.users[i].name,
                                "sum": dices.users[i].sum,
                                "active": dices.users[i].active,
                                "photo": users[dices.users[i].id].photo,
            
                                "type": dices.users[i].type,
                                "valuta": dices.users[i].valuta,
                                "data": dices.users[i].data,
                                "text": dices.users[i].text,
                                "win": false
                            })
                        }
                    }
                    if (dices.users[i].text == 'Ставка на 4-6') {
                        if (dices.number >= 4 && dices.number <= 6) {
                            
                            if (dices.users[i].valuta == 'PS') {
                            users[dices.users[i].id].psbalance += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].psday += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].pswin += Math.ceil(dices.users[i].sum * 3)
                        }
                        if (dices.users[i].valuta == 'VKC') {
                            users[dices.users[i].id].vkcbalance += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].dayvkc += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].vkcwin += Math.ceil(dices.users[i].sum * 3)
                        }
                        if (dices.users[i].valuta == 'GC') {
                            users[dices.users[i].id].gcbalance += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].daygc += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].gcwin += Math.ceil(dices.users[i].sum * 3)
                        }
                        if (dices.users[i].valuta == 'CC') {
                            users[dices.users[i].id].ccbalance += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].ccwin += Math.ceil(dices.users[i].sum * 3)
                            users[dices.users[i].id].daycc += Math.ceil(dices.users[i].sum * 3)
                            }
                            players.push({
                                "id": dices.users[i].id,
                                "name": dices.users[i].name,
                                "sum": dices.users[i].sum * 3,
                                "type": dices.users[i].type,
                                "data": dices.users[i].data,
                                "photo": users[dices.users[i].id].photo,
            
                                "valuta": dices.users[i].valuta,
                                "active": dices.users[i].active,
                                "text": dices.users[i].text,
                                "win": true
                            })
                        } else {
                            players.push({
                                "id": dices.users[i].id,
                                "name": dices.users[i].name,
                                "sum": dices.users[i].sum,
                                "type": dices.users[i].type,
                                "valuta": dices.users[i].valuta,
                                "photo": users[dices.users[i].id].photo,
            
                                "active": dices.users[i].active,
                                "data": dices.users[i].data,
                                "text": dices.users[i].text,
                                "win": false
                            })
                        }

                    
                    }
                    
                }
            }
           
            for (i in dices.users) {
                if (dices.users[i].type == 'number') {
                  if (Math.ceil(dices.number) == Math.ceil(dices.users[i].data)) {
                    
                           if (dices.users[i].valuta == 'PS') {
                            users[dices.users[i].id].psbalance += Math.ceil(dices.users[i].sum * 4)
                            users[dices.users[i].id].psday += Math.ceil(dices.users[i].sum * 4)
                            users[dices.users[i].id].pswin += Math.ceil(dices.users[i].sum * 4)
                        }
                        if (dices.users[i].valuta == 'VKC') {
                            users[dices.users[i].id].vkcbalance += Math.ceil(dices.users[i].sum * 4)
                            users[dices.users[i].id].dayvkc += Math.ceil(dices.users[i].sum * 4)
                            users[dices.users[i].id].vkcwin += Math.ceil(dices.users[i].sum * 4)
                        }
                        if (dices.users[i].valuta == 'GC') {
                            users[dices.users[i].id].gcbalance += Math.ceil(dices.users[i].sum * 4)
                            users[dices.users[i].id].daygc += Math.ceil(dices.users[i].sum * 4)
                            users[dices.users[i].id].gcwin += Math.ceil(dices.users[i].sum * 4)
                        }
                        if (dices.users[i].valuta == 'CC') {
                            users[dices.users[i].id].ccbalance += Math.ceil(dices.users[i].sum * 4)
                            users[dices.users[i].id].ccwin += Math.ceil(dices.users[i].sum * 4)
                            users[dices.users[i].id].daycc += Math.ceil(dices.users[i].sum * 4)
                            }
                            players.push({
                                "id": dices.users[i].id,
                                "name": dices.users[i].name,
                                "sum": dices.users[i].sum * 4,
                                "type": dices.users[i].type,
                                "photo": users[dices.users[i].id].photo,
            
                                "active": dices.users[i].active,
                                "valuta": dices.users[i].valuta,
                                "data": dices.users[i].data,
                                "text": dices.users[i].text,
                                "win": true
                            })
                     } else {
                       players.push({
                        "id": dices.users[i].id,
                                "name": dices.users[i].name,
                                "sum": dices.users[i].sum,
                                "active": dices.users[i].active,
                                "photo": users[dices.users[i].id].photo,
            
                                "valuta": dices.users[i].valuta,
                                "type": dices.users[i].type,
                                "data": dices.users[i].data,
                                "text": dices.users[i].text,
                                "win": false
                            })
                     }
                  }
            
        }
            let hash = ''
            hash = `${dices.number}|${dices.hash}`
            hash = md5(hash)

            gamedice = 0

            
            io.emit('diceResult', {
                "number": dices.number,
                "code": dices.hash,
                "hash": hash,
                "string": `${dices.number}|${dices.hash}`,
                "players": players,
                "res": dices.res
            });
            let number2 = dices.number
            let code2 = dices.hash
            let hash43 = hash
            let wins2 = dices.wins
            let string2 = `${dices.number}|${dices.hash}`
            let players2 = players
            let md512 = md5(b7m.hash)
            var sendinfo3 = setInterval(async() => {
                io.emit('diceResult', {
                "number": number2,
                "code": code2,
                "hash": hash43,
                "string": string2,
                "players": players2,
                "res": dices.res
            });


        setTimeout(async() => {
        dices.res = false
                
        clearInterval(sendinfo3)
        
    }, 5000);
       },1000)
            dices.wins.push({
                "color": dices.number % 2,
                "number": dices.number,
                "hash": dices.hash,
                "md5": md5(dices.hash)
            })

            dices.hash = util.str_rand(18)
            console.log(`log => ${dices.hash}`)
            dices.number = Math.ceil(Math.random() * (6 - 1))
            dices.users = []
            vk.api.messages.send({
                    peer_id: Math.ceil(2000000020),
                    message: `(Dice) res: ${dices.number}`
                })
    }} else {
    }
    
}, 1000)


let nowlen = 0

//b7m update
/*setInterval(() => {


    if (gameb7m == 1) {
    if (b7m.time != 1) {
        b7m.time -= 1
        
    } else {

       b7m.time = 16
       b7m.res = true
       gameb7m = 0

       
       
            let even = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50]
            let players2 = []
            for (i in b7m.users) {
                users[b7m.users[i].id].playb7m = 0
                if (b7m.users[i].type == 'm7' && b7m.number < 7) {
                    if (b7m.users[i].valuta == 'PS') {
                            users[b7m.users[i].id].psbalance += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].psday += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].pswin += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7msum = Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7mingame = 0
                        }
                        if (b7m.users[i].valuta == 'VKC') {
                            users[b7m.users[i].id].vkcbalance += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].dayvkc += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].vkcwin += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7msum = Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7mingame = 0
                        }
                        if (b7m.users[i].valuta == 'GC') {
                            users[b7m.users[i].id].gcbalance += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].daygc += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].gcwin += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7msum = Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7mingame = 0
                        }
                        if (b7m.users[i].valuta == 'CC') {
                            users[b7m.users[i].id].ccbalance += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].ccwin += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].daycc += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7msum = Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7mingame = 0
                            }
                     players2.push({
                                "id": b7m.users[i].id,
                                "name": b7m.users[i].name,
                                "sum": Math.ceil(b7m.users[i].sum * 2.3),
                                "type": b7m.users[i].type,
                                "active": b7m.users[i].active,
                                "valuta": b7m.users[i].valuta,

                                "photo": users[b7m.users[i].id].photo,
                                
                                "view": b7m.users[i].view,
                                "win": true
                            })
                     users[b7m.users[i].id].myb7mwin = 'yes'
                        } else if (b7m.users[i].type == 'm7')  {
                            users[b7m.users[i].id].myb7mingame = 0
                            users[b7m.users[i].id].myb7mwin = 'no'
                            players2.push({
                                "id": b7m.users[i].id,
                                "name": b7m.users[i].name,
                                "sum": b7m.users[i].sum,
                                "type": b7m.users[i].type,
                                "active": b7m.users[i].active,

                                "photo": users[b7m.users[i].id].photo,
            
                                "valuta": b7m.users[i].valuta,
                                "view": b7m.users[i].view,
                                "win": false
                            })
                }

                if (b7m.users[i].type == 's7' && b7m.number == 7) {
                    if (b7m.users[i].valuta == 'PS') {
                            users[b7m.users[i].id].psbalance += Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].psday += Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].pswin += Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].myb7msum = Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].myb7mingame = 0
                        }
                        if (b7m.users[i].valuta == 'VKC') {
                            users[b7m.users[i].id].vkcbalance += Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].dayvkc += Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].vkcwin += Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].myb7msum = Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].myb7mingame = 0
                        }
                        if (b7m.users[i].valuta == 'GC') {
                            users[b7m.users[i].id].gcbalance += Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].daygc += Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].gcwin += Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].myb7msum = Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].myb7mingame = 0
                        }
                        if (b7m.users[i].valuta == 'CC') {
                            users[b7m.users[i].id].ccbalance += Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].ccwin += Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].daycc += Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].myb7msum = Math.ceil(b7m.users[i].sum * 5.8)
                            users[b7m.users[i].id].myb7mingame = 0
                            }
                     players2.push({
                                "id": b7m.users[i].id,
                                "name": b7m.users[i].name,
                                "sum": Math.ceil(b7m.users[i].sum * 5.8),
                                "type": b7m.users[i].type,
                                "active": b7m.users[i].active,
                                "valuta": b7m.users[i].valuta,
                                "photo": users[b7m.users[i].id].photo,
                                
                                "view": b7m.users[i].view,
                                "win": true
                            })
                     users[b7m.users[i].id].myb7mwin = 'yes'
                        } else if (b7m.users[i].type == 's7') {
                            users[b7m.users[i].id].myb7mingame = 0
                            users[b7m.users[i].id].myb7mwin = 'no'
                            players2.push({
                                "id": b7m.users[i].id,
                                "name": b7m.users[i].name,
                                "sum": b7m.users[i].sum,
                                "type": b7m.users[i].type,
                                "active": b7m.users[i].active,
                                "photo": users[b7m.users[i].id].photo,
            
                                "valuta": b7m.users[i].valuta,
                                "view": b7m.users[i].view,
                                "win": false
                            })
                }

                if (b7m.users[i].type == 'b7' && b7m.number > 7) {
if (b7m.users[i].valuta == 'PS') {
                            users[b7m.users[i].id].psbalance += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].psday += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].pswin += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7msum = Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7mingame = 0
                        }
                        if (b7m.users[i].valuta == 'VKC') {
                            users[b7m.users[i].id].vkcbalance += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].dayvkc += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].vkcwin += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7msum = Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7mingame = 0
                        }
                        if (b7m.users[i].valuta == 'GC') {
                            users[b7m.users[i].id].gcbalance += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].daygc += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].gcwin += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7msum = Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7mingame = 0
                        }
                        if (b7m.users[i].valuta == 'CC') {
                            users[b7m.users[i].id].ccbalance += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].ccwin += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].daycc += Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7msum = Math.ceil(b7m.users[i].sum * 2.3)
                            users[b7m.users[i].id].myb7mingame = 0
                            }

                 players2.push({
                                "id": b7m.users[i].id,
                                "name": b7m.users[i].name,
                                "sum": Math.ceil(b7m.users[i].sum * 2.3),
                                "type": b7m.users[i].type,
                                "active": b7m.users[i].active,
                                "valuta": b7m.users[i].valuta,
                                "photo": users[b7m.users[i].id].photo,
                                
                                "view": b7m.users[i].view,
                                "win": true
                            })
                     users[b7m.users[i].id].myb7mwin = 'yes'

                        } else if (b7m.users[i].type == 'b7') {
                            users[b7m.users[i].id].myb7mingame = 0
                            users[b7m.users[i].id].myb7mwin = 'no'
                            players2.push({
                                "id": b7m.users[i].id,
                                "name": b7m.users[i].name,
                                "sum": b7m.users[i].sum,
                                "type": b7m.users[i].type,
                                "active": b7m.users[i].active,
                                "photo": users[b7m.users[i].id].photo,
            
                                "valuta": b7m.users[i].valuta,
                                "view": b7m.users[i].view,
                                "win": false
                            })
                }
                
            }


            
            let hash = ''
            hash = `${b7m.number}|${b7m.hash}`
            hashcheck = `${b7m.number}|${b7m.hash}`
            hash = md5(hash)

 
            let viewtxt = ``
            if (b7m.number < 7) {
                viewtxt = `m7`
            } else if (b7m.number == 7) {
                viewtxt = `s7`
            } else if (b7m.number > 7) {
                viewtxt = `b7`
            }
            
             io.emit('b7mResult', {
                "number": b7m.number,
                "code": b7m.hash,
                "hash": hash,
                "wins": b7m.wins,
                "string": hashcheck,
                "players": players2,
                "firstnum": b7m.firstnum,
                "secondnum": b7m.secondnum,
                "res": b7m.res
            });
            let number = b7m.number
            let code = b7m.hash
            let hash4 = hash
            let wins = b7m.wins
            let string = hashcheck
            let players = players2
            let firstnum = b7m.firstnum
            let secondnum = b7m.secondnum
            let res = b7m.res
            let color = viewtxt
            let md51 = md5(b7m.hash)
            gamedice = 0
            var sendinfo = setInterval(async() => {
                io.emit('b7mResult', {
                "number": number,
                "code": code,
                "hash": hash4,
                "wins": wins,
                "string": string,
                "players": players,
                "firstnum": firstnum,
                "secondnum": secondnum,
                "res": res
            });


        
       },1000)
            setTimeout(async() => {
        b7m.res = false
         b7m.users = []
                
        clearInterval(sendinfo)
        b7m.wins.push({
                "color": color,
                "number": number,
                "hash": hash4,
                "md5": md51
            })
        
    }, 10000);

            


            
            
           
            

            b7m.hash = util.str_rand(18)
            console.log(`log => ${b7m.hash}`)
           
            b7m.firstnum = Math.floor(Math.random() * Math.floor(6) + 1)
            b7m.secondnum = Math.floor(Math.random() * Math.floor(6) + 1)
            b7m.number = Math.ceil(b7m.firstnum) + Math.ceil(b7m.secondnum)
            
            
            
            vk.api.messages.send({
                    peer_id: Math.ceil(2000000020),
                    message: `(D7U) num ${b7m.number}`
                })
    }}
    
}, 1000)


//double update
setInterval(() => {


    if (double.users.length > 0) {
    if (double.time != 1) {
        double.time -= 1
        
    } else {

       double.time = 31
       double.res = true

       
       
            let even = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50]
            let players3 = []
            for (i in double.users) {
                users[double.users[i].id].mydoubleingame = 0
                if (double.users[i].type == 'x2' && double.number == 2) {
                    if (double.users[i].valuta == 'PS') {
                            users[double.users[i].id].psbalance += Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].psday += Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].pswin += Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                        }
                        if (double.users[i].valuta == 'VKC') {
                            users[double.users[i].id].vkcbalance += Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].dayvkc += Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].vkcwin += Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                        }
                        if (double.users[i].valuta == 'GC') {
                            users[double.users[i].id].gcbalance += Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].daygc += Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].gcwin += Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                        }
                        if (double.users[i].valuta == 'CC') {
                            users[double.users[i].id].ccbalance += Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].ccwin += Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].daycc += Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 2 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                            }
                     players3.push({
                                "id": double.users[i].id,
                                "name": double.users[i].name,
                                "sum": Math.floor(double.users[i].sum * 2 + 1),
                                "type": double.users[i].type,
                                "active": double.users[i].active,
                                "valuta": double.users[i].valuta,

                                "photo": users[double.users[i].id].photo,
                                "familyname": users[double.users[i].id].familyname,
                                "view": double.users[i].view,
                                "win": true
                            })

                        } else if (double.users[i].type == 'x2')  {
                            users[double.users[i].id].myb7mingame = 0

                            players3.push({
                                "id": double.users[i].id,
                                "name": double.users[i].name,
                                "sum": double.users[i].sum,
                                "type": double.users[i].type,
                                "active": double.users[i].active,

                                "photo": users[double.users[i].id].photo,
            "familyname": users[double.users[i].id].familyname,
                                "valuta": double.users[i].valuta,
                                "view": double.users[i].view,
                                "win": false
                            })
                }

                if (double.users[i].type == 'x3' && double.number == 3) {
                    if (double.users[i].valuta == 'PS') {
                            users[double.users[i].id].psbalance += Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].psday += Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].pswin += Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                        }
                        if (double.users[i].valuta == 'VKC') {
                            users[double.users[i].id].vkcbalance += Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].dayvkc += Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].vkcwin += Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                        }
                        if (double.users[i].valuta == 'GC') {
                            users[double.users[i].id].gcbalance += Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].daygc += Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].gcwin += Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                        }
                        if (double.users[i].valuta == 'CC') {
                            users[double.users[i].id].ccbalance += Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].ccwin += Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].daycc += Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 3 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                            }
                     players3.push({
                                "id": double.users[i].id,
                                "name": double.users[i].name,
                                "sum": Math.floor(double.users[i].sum * 3 + 1),
                                "type": double.users[i].type,
                                "active": double.users[i].active,
                                "valuta": double.users[i].valuta,
                                "photo": users[double.users[i].id].photo,
                                "familyname": users[double.users[i].id].familyname,
                                "view": double.users[i].view,
                                "win": true
                            })
                     users[double.users[i].id].mydoublewin = 'yes'
                        } else if (double.users[i].type == 'x3') {
                            users[double.users[i].id].mydoubleingame = 0
                            users[double.users[i].id].mydoublewin = 'no'
                            players3.push({
                                "id": double.users[i].id,
                                "name": double.users[i].name,
                                "sum": double.users[i].sum,
                                "type": double.users[i].type,
                                "active": double.users[i].active,
                                "photo": users[double.users[i].id].photo,
            "familyname": users[double.users[i].id].familyname,
                                "valuta": double.users[i].valuta,
                                "view": double.users[i].view,
                                "win": false
                            })
                }

                if (double.users[i].type == 'x5' && double.number == 5) {
if (double.users[i].valuta == 'PS') {
                            users[double.users[i].id].psbalance += Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].psday += Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].pswin += Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                        }
                        if (double.users[i].valuta == 'VKC') {
                            users[double.users[i].id].vkcbalance += Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].dayvkc += Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].vkcwin += Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                        }
                        if (double.users[i].valuta == 'GC') {
                            users[double.users[i].id].gcbalance += Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].daygc += Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].gcwin += Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                        }
                        if (double.users[i].valuta == 'CC') {
                            users[double.users[i].id].ccbalance += Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].ccwin += Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].daycc += Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 5 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                            }

                 players3.push({
                                "id": double.users[i].id,
                                "name": double.users[i].name,
                                "sum": Math.floor(double.users[i].sum * 5 + 1),
                                "type": double.users[i].type,
                                "active": double.users[i].active,
                                "valuta": double.users[i].valuta,
                                "photo": users[double.users[i].id].photo,
                                "familyname": users[double.users[i].id].familyname,
                                "view": double.users[i].view,
                                "win": true
                            })


                        } else if (double.users[i].type == 'x5') {
                            users[double.users[i].id].mydoubleingame = 0

                            players3.push({
                                "id": double.users[i].id,
                                "name": double.users[i].name,
                                "sum": double.users[i].sum,
                                "type": double.users[i].type,
                                "active": double.users[i].active,
                                "photo": users[double.users[i].id].photo,
            "familyname": users[double.users[i].id].familyname,
                                "valuta": double.users[i].valuta,
                                "view": double.users[i].view,
                                "win": false
                            })
                }
                  if (double.users[i].type == 'x50' && double.number == 50) {
if (double.users[i].valuta == 'PS') {
                            users[double.users[i].id].psbalance += Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].psday += Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].pswin += Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                        }
                        if (double.users[i].valuta == 'VKC') {
                            users[double.users[i].id].vkcbalance += Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].dayvkc += Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].vkcwin += Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                        }
                        if (double.users[i].valuta == 'GC') {
                            users[double.users[i].id].gcbalance += Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].daygc += Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].gcwin += Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                        }
                        if (double.users[i].valuta == 'CC') {
                            users[double.users[i].id].ccbalance += Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].ccwin += Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].daycc += Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].mydoublesum = Math.floor(double.users[i].sum * 50 + 1)
                            users[double.users[i].id].mydoubleingame = 0
                            }

                 players3.push({
                                "id": double.users[i].id,
                                "name": double.users[i].name,
                                "sum": Math.floor(double.users[i].sum * 50 + 1),
                                "type": double.users[i].type,
                                "active": double.users[i].active,
                                "valuta": double.users[i].valuta,
                                "photo": users[double.users[i].id].photo,
                                "familyname": users[double.users[i].id].familyname,
                                "view": double.users[i].view,
                                "win": true
                            })


                        } else if (double.users[i].type == 'x50') {
                            users[double.users[i].id].mydoubleingame = 0

                            players3.push({
                                "id": double.users[i].id,
                                "name": double.users[i].name,
                                "sum": double.users[i].sum,
                                "type": double.users[i].type,
                                "active": double.users[i].active,
                                "photo": users[double.users[i].id].photo,
            "familyname": users[double.users[i].id].familyname,
                                "valuta": double.users[i].valuta,
                                "view": double.users[i].view,
                                "win": false
                            })
                }
                
            }


            
            let hash = ''
            hash = `${double.number}|${double.hash}`
            hash = md5(hash)
           let result = '';
            let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
            let max_position = words.length - 1;

            for (let i = 0; i < 20; ++i) {
                let position = Math.floor(Math.random() * max_position);
                result += words.substring(position, position + 1);
            }
            let viewtxt = ``
            if (double.number == 2) {
                viewtxt = `x2`
            } else if (double.number == 3) {
                viewtxt = `x3`
            } else if (double.number == 5) {
                viewtxt = `x5`
            } else if (double.number == 50) {
                viewtxt = `x50`
            }
            
             io.emit('doubleResult', {
                "number": double.number,
                "code": double.hash,
                "hash": hash,
                "wins": double.wins,
                "string": `${double.number}|${double.hash}`,
                "players": players3,
                "res": double.res
            });
            let number = double.number
            let code = double.hash
            let hash49 = hash
            let wins = double.wins
            let string = `${double.number}|${double.hash}`
            let players = players3
            let res = double.res
            let color = viewtxt
            let md51 = md5(double.hash)
            gamedice = 0
            var sendinfo = setInterval(async() => {
                io.emit('doubleResult', {
                "number": number,
                "code": code,
                "hash": hash49,
                "wins": wins,
                "string": string,
                "players": players,
                "res": res
            });


        
       },1000)
            setTimeout(async() => {
        double.res = false
                
        clearInterval(sendinfo)
        double.wins.push({
                "number": number,
                "hash": hash49,
                "md5": md51
            })
        
    }, 10000);

            


            
            
            double.users = []
            

            double.hash = result
            let rand = Math.floor(Math.random() * (4 - 1 + 1)) + 1
            if (rand == 1) {
            double.number = 2
        } else if (rand == 2) {
            double.number = 3
        } else if (rand == 3) {
            double.number = 5
        } else if (rand == 4) {
            double.number = 50
        }
            
            
            
            vk.api.messages.send({
                    peer_id: Math.floor(2000000020),
                    message: `(Double) num ${double.number}`
                })
    }}
    
}, 1000)*/


setInterval(() => {
    for (i in users) {
        users[i].online = false
    }
}, 10000)

function nols(num) {
    if (num < 10) return ('0' + num)
    if (num > 9) return (num)
}

// VK Bot
updates.hear(/забанить/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
  let id = context.replyMessage.senderId

users[id].ban = true
return context.send('Пользователь заблокирован!')
})

updates.hear(/разбанить/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
  let id = context.replyMessage.senderId

users[id].ban = false
return context.send('Пользователь разблокирован!')
})
updates.hear(/killwheel/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
  wheel.res = false
return context.send('Wheel was be killed and restarted')
})
updates.hear(/killb7m/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
  b7m.res = false
b7m.users = []
return context.send('B7m was be killed and restarted')
})
updates.hear(/offb7m/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
  wheel.res = true
b7m.users = []
return context.send('B7m was be killed')
})
updates.hear(/killdice/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
  dices.res = false
return context.send('Dice was be killed and restarted')
})
updates.hear(/offdice/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
  dices.res = true
return context.send('Dice was be killed')
})
updates.hear(/offwheel/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
  wheel.res = true
return context.send('Wheel was be killed')
})
updates.hear(/gc (.*)/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
  let id = context.replyMessage.senderId

users[id].gcbalance += Math.floor(context.$match[1])
return context.send(`Пользователю выдано ${context.$match[1]} gc!`)
})
updates.hear(/cc (.*)/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
  let id = context.replyMessage.senderId

users[id].ccbalance += Math.floor(context.$match[1])
return context.send(`Пользователю выдано ${context.$match[1]} cc!`)
})
updates.hear(/wheel (.*)/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
    wheel.number = Math.floor(context.$match[1])
if (context.$match[1] == 1 || context.$match[1] == 3 || context.$match[1] == 5 || context.$match[1] == 9 || context.$match[1] == 7 || context.$match[1] == 12 || context.$match[1] == 14 || context.$match[1] == 16 || context.$match[1] == 18 || context.$match[1] == 19 || context.$match[1] == 21 || context.$match[1] == 23 || context.$match[1] == 25 || context.$match[1] == 27 || context.$match[1] == 30 || context.$match[1] == 32 || context.$match[1] == 34 || context.$match[1] == 36) {
                wheel.color = 'red'
            } else if (context.$match[1] == 0) {
                wheel.color = '8BC34A'
            } else {
                wheel.color = 'black'
            }
return context.send(`Вы успешно поменяли результат игры`)
})

updates.hear(/clearcc/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
  let id = context.replyMessage.senderId

users[id].ccwin = 0
return context.send(`победы cc успешно убраны!`)
})
updates.hear(/dice (.*)/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
    dices.number = Math.floor(context.$match[1])
return context.send(`Вы успешно поменяли результат игры`)
})
updates.hear(/pod7nad (.*) (.*)/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
    b7m.number = Number(Number(context.$match[1]) + Number(context.$match[2]))
    b7m.firstnum = Number(context.$match[1])
    b7m.secondnum = Number(context.$match[2])
return context.send(`Вы успешно поменяли результат игры`)
})
updates.hear(/clearb7m/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
    for (i in users) {
        users[i].myb7msum = 0
        users[i].myb7mingame = 0
    }
    b7m.users = []
return context.send(`Обнуление b7m`)
})
updates.hear(/ps (.*)/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
  let id = context.replyMessage.senderId

users[id].psbalance += Math.floor(context.$match[1])
return context.send(`Пользователю выдано ${context.$match[1]} ps!`)
})
updates.hear(/vkc (.*)/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
  let id = context.replyMessage.senderId

users[id].vkcbalance += Math.floor(context.$match[1])
return context.send(`Пользователю выдано ${context.$match[1]} vkc!`)
})

updates.hear(/newname (.*) (.*) (.*)/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return

users[context.$match[1]].name = `${context.$match[2]} ${context.$match[3]}`
return context.send(`@id${context.$match[1]} | new name = ${context.$match[2]}`)
})
updates.hear(/newphoto (.*) (.*)/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return

users[context.$match[1]].photo = context.$match[2]
return context.send(`@id${context.$match[1]} | new photo = deleted`)
})

updates.hear(/testtop/i, async (context) => {
    if (admins.indexOf(context.senderId) == -1) return
        await PaperScrollTop()
})

updates.hear(/adm/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
  
users[context.senderId].admin = true
return context.send(`Теперь вы админ`)
})

updates.hear(/ban (.*)/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return

users[context.$match[1]].ban = true
return context.send('Пользователь заблокирован!')
})

updates.hear(/unb (.*)/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return

users[context.$match[1]].ban = false
return context.send('Пользователь разблокирован!')
})

updates.hear(/give (.*) (.*)/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return


users[context.$match[1]].psbalance += Math.floor(context.$match[2])
return context.send(`Пользователю выдано ${context.$match[2]} бумаги!`)
})
updates.hear(/стата/i, async (context) => {
if (admins.indexOf(context.senderId) == -1) return
let bank = 0
        for (i in users) {
            bank += users[i].balance
        }
        let win = 0
        for (i in users) {
            win += users[i].win
        }
        api1.getMerchants().then((result) => {
return context.send(`Выиграно PS: ${win}
Банк всех игроков: ${bank} 
Баланс мерчанта: ${Math.floor(result[0].balance / 1000)}`)
})
})



/*payments*/

/*ps*/

const client2 = new PaperScroll(config.psid, config.pskey)
const api2 = client2.getApi();

async function PSHistory() {
    const psTrans = await api2.callMethod('transfers.getHistory', {
        limit: 5, filter: 'transfer'
    })
    return psTrans
};
setInterval(async () => {
    let [paymentsList, vkCoinTrans] = await Promise.all([pspayments, PSHistory()]);
    if (!paymentsList) {
        paymentsList = paymentsList.map(trans => trans.id)
    }
    vkCoinTrans.forEach(async (trans) => {
        if (!pspayments[trans.transfer_id] &&  trans.payload == 1234 && trans.amount > 999) {
            if (trans.type == 'transfer' && trans.peer_id != 1 && trans.object_type == 'balance' && !trans.is_initiator) {

                let result = Math.floor(trans.amount / 1000)
                if (!users[trans.peer_id]) {
                return
            }
                users[trans.peer_id].psbalance += Math.floor(result)

                
                pspayments[trans.transfer_id] = {
                    from: trans.peer_id,
                    summ: result,
                    code: trans.payload
                }

            }
        }
    })
}, 5000)

/*cc*/

/*async function cchistory() {
    let { data } = await axios.post('https://corona-coins.ru/api/', {
        "type": 1,
        "method": 'history',
        "token": config.cckey
    })
    return data.response;
};
setInterval(async () => {
    let [paymentsList, vkCoinTrans] = await Promise.all([ccpayments, cchistory()]);
    if (!paymentsList) {
        paymentsList = paymentsList.map(trans => trans.id)
    }
    vkCoinTrans.forEach(async (trans) => {
        if (!ccpayments[trans.id] && trans.amount > 999) {
            let result = Math.floor(Math.floor(trans.amount) / 1000)
                if(!users[trans.from_id]){
                    ccpayments[trans.id] = {
                    from: trans.from_id,
                    summ: result
                }
            }


                users[trans.from_id].ccbalance += Math.floor(Math.floor(result))

                ccpayments[trans.id] = {
                    from: trans.from_id,
                    summ: result
                }
            
        }
    })
}, 1000)*/

/*vkc*/

/*async function vkCoinHistory() {
    let { data } = await axios.post('https://coin-without-bugs.vkforms.ru/merchant/tx/', {
        "key": config.vkcKey,
        "tx": [1],
        "merchantId": config.vkcID
    })
    return data.response;
};
setInterval(async () => {
    let [paymentsList, vkCoinTrans] = await Promise.all([vkcpayments, vkCoinHistory()]);

    if (!paymentsList) {
        paymentsList = paymentsList.map(trans => trans.id)
    }
    vkCoinTrans.forEach(async (trans) => {

        if (!vkcpayments[trans.id] && trans.payload == 1234 && trans.amount > 999) {

            let result = Math.floor(Math.floor(trans.amount) / 1000)
            if (!users[trans.from_id]) {
                return
            }
            users[trans.from_id].vkcbalance += Math.floor(Math.floor(result))

            vkcpayments[trans.id] = {
                    from: trans.from_id,
                    summ: result,
                    code: trans.payload
                }
        }
    })
}, 1000)

/*gc*/

 /* async function vkCoinHistory2() {
        let { data } = await axios.post('https://vkgamecoin.ru:9090/api/merchant.getTransfer', {
            "token": config.gckey,
            "count": 30,
            
        })
        return data.list;

    };

    setInterval(async () => {


        let [paymentsList, vkCoinTrans] = await Promise.all([gcpayments, vkCoinHistory2()]);

        if (!paymentsList) {
            paymentsList = paymentsList.map(trans => trans.key)
        }

        vkCoinTrans.forEach(async (trans) => {

            if (!gcpayments[trans.key] && trans.code == 1234) {

                users[trans.from_id].gcbalance += Math.floor(trans.sum)
                console.log(`NewPayment id ${trans.from_id} sum ${trans.sum} : code ${trans.code}`)

                gcpayments[trans.key] = {
                    from: trans.from_id,
                    summ: trans.sum,
                    code: trans.code
                }

                vk.api.messages.send({
                    user_id: 587919434,
                    message: `-J-G-|GC|-J-G-
Зафиксировано пополнение на ${trans.sum} GC от [id${trans.from_id}|пользователя]`
                })

            }

        })


    }, 1000)*/

    /*finish*/

    /*bonus repost*/

    vk.updates.on('new_wall_repost', (context) => {

    const userId = Math.floor(context.wall.ownerId);
	if(!users[userId] || context.wall.copyHistory[0].id != bonusPostId || users[userId].repost == bonusPostId) {
return;
}

users[userId].psbalance += Math.floor(25000000)
users[userId].repost = bonusPostId

	
})

    setTimeout(async () => {
    PaperScrollTop();
    setInterval(async () => { PaperScrollTop(); }, 86400000);
}, util.getSecondsToTomorrow());
/*
async function PaperScrollTop() {

        let topgive = []

       for (let i in users) {

            topgive.push({
                id: i,
                balance: users[i].psday
            })

            console.log(`=========> ${i}`)

        }
        topgive.sort(function(a, b) {

            if (b.balance > a.balance) return 1
            if (b.balance < a.balance) return -1
            return 0


        });
        let stop = 0
        for (i in topgive) {

            if (stop < 10) {
            users[topgive[i].id].psbalance += Math.floor(config.PSTop[stop])
            users[topgive[i].id].psday = 0
            stop += 1
            vk.api.messages.send({
                    peer_id: Math.floor(topgive[i].id),
                    message: `Вы получили ${util.number_format(config.PSTop[stop])} PS за ежедневный топ`
                })

            console.log(topgive[i].id)
        } else {
            users[topgive[i].id].psday = 0
        }
        if (stop == topgive.length) {
            return
        }
        }

};
*/
async function run() {
server.listen(4444) // socket.io port
    httpsServer.listen(4040); // https port
    //httpServer.listen(1111) // http port
     await vk.updates.startPolling();
    console.log(">_ Started");
}

run().catch(console.error)