const { Keyboard } = require('vk-io');
const axios = require('axios');
const https = require('https');
const httsAgent = new https.Agent({ rejectUnauthorized: false });

async function sendVk(toId, amount) {
    console.log(toId, amount);
    return axios.post('https://vkgamecoin.ru:9090/api/merchant.send', {
        "token": 'i-Y%b*+EvVD@Lh0q)JyO%q6@a@0r+$41)U1G$U&LS28Hp9yG=h',
        "to": toId,
        "sum": amount,
        "code": 1,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    })

}

async function getVkBalance() {
    let { data } = await axios.post('https://vkgamecoin.ru:9090/api/merchant.getBalance', {
        "token": 'i-Y%b*+EvVD@Lh0q)JyO%q6@a@0r+$41)U1G$U&LS28Hp9yG=h',
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    })
    return data.balance;
}
module.exports = {
    tag: ["вывоsdfsdfgerhewд"],
    button: ["gc_output"],
    func: async (context, { vk, _user, game, util, db, conversation, config }) => {
        let balancefunc = await getVkBalance();
        let second = Math.floor(balancefunc / 1000)
        const prem = Number(context.peerId);
        if (_user.gcbalance <= 0) {
            _vivod = await context.question({
                message: `[id${context.senderId}|${_user.name}], введите желаемую сумму вывода GameCoin...`
            });
            _vivod = util.rewrite_numbers(_vivod)
            let message = _vivod == null ? '' : _vivod
            let noti = message.split('] ')
            if (message[0] == '[' && noti[0].split('|').length == 2 && (noti[0].split('|')[0] == `[club200783696` || noti[0].split('|')[0] == `[public200783696`)) {
                noti.splice(0, 1)
                _vivod = noti.join('] ')
            }
        }
        if (_user.gcbalance > 0) {
            _vivod = await context.question({
                message: `[id${context.senderId}|${_user.name}], введите желаемую сумму вывода GameCoin...`,
                keyboard: Keyboard.keyboard([
                    [
                        Keyboard.textButton({ label: `${util.number_format(_user.gcbalance / 4)}`, color: Keyboard.SECONDARY_COLOR }),
                        Keyboard.textButton({ label: `${util.number_format(_user.gcbalance / 2)}`, color: Keyboard.SECONDARY_COLOR }),
                        Keyboard.textButton({ label: `${util.number_format(_user.gcbalance)}`, color: Keyboard.SECONDARY_COLOR }),
                    ]
                ]).inline(true)
            });
            _vivod = util.rewrite_numbers(_vivod)
            let message = _vivod == null ? '' : _vivod
            let noti = message.split('] ')
            if (message[0] == '[' && noti[0].split('|').length == 2 && (noti[0].split('|')[0] == `[club200783696` || noti[0].split('|')[0] == `[public200783696`)) {
                noti.splice(0, 1)
                _vivod = noti.join('] ')
            }
        }
        if (_vivod > _user.gcbalance) {
            return context.send(`[id${context.senderId}|${_user.name}], вы не можете вывести больше, чем есть у вас на балансе.`)
        }
        if (_user.global_ban > 0) { return context.send(`[id${context.senderId}|${_user.name}], У вас глобальный бан... Вывод недоступен.`); }
        if (_vivod > balancefunc) {
            return context.send(`На балансе бота недостаточно средств для вывода, ожидайте пополнения.`);
        }

        if (_vivod <= _user.gcbalance) {
            await sendVk(_user.uid, _vivod).then(async () => {
                db.get().collection('users').updateOne({ uid: Number(context.senderId) }, { $inc: { gcbalance: -Math.floor(_vivod) } });
                await context.send({ message: `[id${context.senderId}|${_user.name}], выведено ${util.number_format(_vivod)} GameCoin` });
            });
        }
    }
}