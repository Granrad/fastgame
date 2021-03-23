import React from 'react';
import connect from '@vkontakte/vk-bridge';
import Icon16Done from '@vkontakte/icons/dist/16/done';
import Icon16Cancel from '@vkontakte/icons/dist/16/cancel';
import { View, Alert,PopoutWrapper, Snackbar, Avatar, Epic, Panel, Tabbar, HorizontalScroll, Tabs, TabsItem, FixedLayout, Textarea, Footer, FormStatus, Header, TabbarItem, Slider, Link, PanelHeader, CardGrid, Separator, PanelHeaderBack, ConfigProvider, Card, PanelHeaderButton, Select, SimpleCell, Cell, Counter, List, Group, ScreenSpinner, Title, ModalPageHeader, ActionSheet, RichCell, Banner, ActionSheetItem, ModalRoot, ModalPage, FormLayoutGroup, FormLayout, Input, Div, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28HomeOutline from '@vkontakte/icons/dist/28/home_outline';
import Icon28GraphOutline from '@vkontakte/icons/dist/28/graph_outline';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon28MoneyTransferOutline from '@vkontakte/icons/dist/28/money_transfer_outline';
import Icon28ReportOutline from '@vkontakte/icons/dist/28/report_outline';
import Icon28LikeOutline from '@vkontakte/icons/dist/28/like_outline';
import { Icon56RecentOutline } from '@vkontakte/icons';
import Icon28StatisticsOutline from '@vkontakte/icons/dist/28/statistics_outline';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import { animateScroll as scroll } from "react-scroll";
import Icon28RefreshOutline from '@vkontakte/icons/dist/28/refresh_outline';
import Icon28HistoryForwardOutline from '@vkontakte/icons/dist/28/history_forward_outline';
import Icon28HelpOutline from '@vkontakte/icons/dist/28/help_outline';
import Clipboard from 'react-clipboard.js';
import classNames from 'classnames';
import { Icon56InfoOutline } from '@vkontakte/icons';
import { Icon28ShareOutline } from '@vkontakte/icons';

import {
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Line,
    Label,
    Legend,
    AreaChart,
    Area,

} from "recharts";
import Icon28MarketOutline from '@vkontakte/icons/dist/28/market_outline';
import Icon28GameOutline from '@vkontakte/icons/dist/28/game_outline';
import Icon28SmileOutline from '@vkontakte/icons/dist/28/smile_outline';
import Icon28MessagesOutline from '@vkontakte/icons/dist/28/messages_outline';
import Icon28Users3Outline from '@vkontakte/icons/dist/28/users_3_outline';
import Icon28LogoVkOutline from '@vkontakte/icons/dist/28/logo_vk_outline';
import Chevron from '@vkontakte/icons/dist/28/chevron_down_outline'
import Icon24Send from '@vkontakte/icons/dist/24/send';
import Icon28CoinsOutline from '@vkontakte/icons/dist/28/coins_outline';
import { Icon24LinkCircle } from '@vkontakte/icons';

import Home from './panels/Home';

import './panels/Home.css';
import './wheelv2.css';

import io from 'socket.io-client'

const queryString = require('query-string');
const crypto = require('crypto');
const parsedHash = queryString.parse(window.location.hash);

const blueBackground = {
    backgroundColor: '#F0F2F5'
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'home',
            snackbar: null,
            sell: 1000,
            popoutres: null,
            wheelSum: 0,
            contextOpened: false,
            scheme: 'client_light', // Будет по умолчанию.  
            lights: 'client_light',
            numberqiwi: false,
            userId: 'Ошибка',
            wheelRes: false,
            nvutiSum: 0,
            stakans: 3,
            oopsPanel: 'oops',
            homePanel: 'home',
            adminId: null,
            refName: '',
            psday: 0,
            ccday: 0,
            vkcday: 0,
            online: 0,
            adminSum: null,
            active: 'VKCoin',

            adminInfo: {},
            messageText: '',
            dices: 0,
            adminrule:false,
            nvutis: 0,
            pay: 0,
            wheels: 0,
            thimble: {
                "win": false,
                "text": "",
                "stakan": 1
            },
            auc: {
                "text": "Хуй золотой",
                "sum": 100000000000000000000000000,
                "time": 99999999999,
            },
            thimbleSum: 0,
            orelReshs: 0,
            win: 0,
            wheelData: {
                "users": [],
                "hash": '',
                "time": 1
            },
            activeStory: 'feed',
            helpPanel: 'help',
            resHash: '',
            mines: {
                mine1: false,
                mine2: true,
                mine3: false,
                mine4: false,

            },
            resString: '',
            can: 1,
            resCode: '',
            activeTab3: 'bal',
            nvutiChance: 80,
            resWheelPlayers: [],
            lolInput: '0',
            resWheelColor: 'red',
            resWheelNumber: 1,
            gamesPanel: 'games',
            nvuti: {
                number: null,
                result: null,
                text: null
            },
            reshka: {
                result: null,
                res: null,
                text: null
            },
            vkcwin: 0,
            reshSum: 0,
            isOpen1: false,
            isOpen2: false,
            isOpen3: false,
            isOpen5: false,
            isOpen6: false,
            isOpen7: false,
            isOpen8: false,
            isOpen9: false,
            isOpen4: false,
            admin: {
                "bank": 0,
                "win": 0,
                "bal": 0
            },
            vkc: 0,
            withdrawSum: 0,
            reshkaSum: 0,
            vktop: [],
            vkdaytop: [],
            activeModal: null,
            messages: [],
            admintext: '',
            almaz: 0,
            almazWin: 0,
            almaztop: [],
            almazdaytop: [],
            diceSum: 0,
            errorText: '',
            errorCode: 500,
            notify: [],
            dayTop: [],
            qiwi: false,
            dicesCode: '',
            dicesString: '',
            dicesHash: '',
            activeTab2: 'music',
            dice: {
                result: null,
                text: null,
                number: null
            },
            fetchedUser: {
                id: 1,
                first_name: "",
                last_name: "",
                photo_100: ''
            },
            sendId: null,
            sendSum: null,
            resDicesPlayers: [],
            errorBody: '',
            top: [],
            resDicesNumber: 1,
            dicesData: {
                users: [],
                hash: '',
                time: 1
            },
            diceWins: [],
            dicesRes: false,
            balance: 0,
            vkcbalance: 'Loading...',
            psbalance: 0,
            fetching: false,
            iplay: 0,
            b7mSum: 0,
            b7mString: '',
            b7mCode: '',
            b7mHash: '',
            b7mData: {
                users: [],
                hash: '',
                time: 16,
                res:false
            },
            resb7mNumber: 1,
            resb7mPlayers: [],
            playb7m: 0,
            b7mWins: [],
            b7mRes: false,
            activeb7m: 'm7',
            /*double*/
            activedouble: 'x2',
            doubleSum:0,
            mydoubleingame: 0,
            doubleData: {
                users: [],
                hash: '',
                time: 16,
                res:false
            },
            doubleWins: [],
            doubleRes: false,
            doubleString:'',
            doubleHash:'',
            doubleCode:'', 
            /*other*/
            resb7mNumberone:0,
            resb7mNumbertwo:0,
            myb7msum: 0,
            myb7mvaluta: '',
            myb7mview: '',
            popout: <ScreenSpinner />,
            myb7mwin: '',
            myb7mingame: 0,
            ingam: 0,
            popout2: '',
            topcolors: ['#DE2166', '#3682C9', '#28AF84','#DE2166', '#3682C9', '#28AF84','#DE2166', '#3682C9', '#28AF84','#DE2166'],
            topsumps: [25000000000, 15000000000, 10000000000, 5000000000, 2500000000, 1000000000, 1000000000, 1000000000, 500000000, 500000000],
            wheelstavkavalue:100000000,
            selectbtnwheel: 1,
            stepwheel:100000,
            stepwheelps: 100000000,
            wheelnummodal:0,
            wheelWins:[],
            wheeloldString: '',
            wheeloldHash : '',
            viewtabl: 0
        };
    }

    componentDidMount() {


        var lol = setInterval(() => {
          if (window.socket) {

                  if (this.state.vkcbalance != 'Loading...') {
                      this.setState({ popout:null })
                  }

            

          }
        }, 1000)

        this.connect()
        connect.send("VKWebAppJoinGroup", { "group_id": 200783696 });
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
 
                    this.setState({ fetchedUser: e.detail.data, userId: e.detail.data.id });

                    this.getInfo()
                    break;
                /*case 'VKWebAppUpdateConfig':
                    this.camelCase(e.detail.data.scheme)
                    break;*/
                case 'VKWebAppGetUserInfoFailed':
                connect.send('VKWebAppGetUserInfo', {});
                break;
                case 'VKWebAppViewHide':
                this.setState({activeStory: 'oops', oopsPanel: 'disconnectserver', can:0 })
                break;
                default:
                    break;
            }
        })

        connect.send('VKWebAppGetUserInfo', {});
        setInterval(() => {
            this.getInfo()
            if (this.state.fetchedUser.id == 1) {
                this.getAdminInfo()
            }


        }, 5000)


    }

    camelCase = (scheme, needChange = false) => {

    }
    open = () => {
        this.setState({ contextOpened: true })


    };


    connect = () => {
        window.socket = io.connect('https://vkjustgame.ru:4444', {
            autoConnect: false,
            secure: true,
            query: {
                "user_id": this.state.fetchedUser.id,
                "params": window.location.search.substring(1)
            },
            transports: ['websocket']
        })
        this.events(window.socket)
        window.socket.connect()

    }

    events = (socket) => {



        socket.on('wheelData', (msg) => {
            
            this.setState({ wheelData: msg})

        })

        socket.on('wheelWins', (msg) => {
            let wins = msg.wins.reverse()
            let wins2 = wins.slice(0,15)
            this.setState({ wheelWins: wins2, wheelRes:msg.res  })
        })

        socket.on('resdice', (msg) => {
          this.setState({ dicesRes: msg })
        })

        socket.on('resb7m', (msg) => {
          this.setState({ b7mRes: msg })
        })

        socket.on('dicesData', (msg) => {
            let wins = msg.wins.reverse()
            let wins2 = wins.slice(0,15)
            this.setState({ dicesData: msg, diceWins: wins2, dicesRes:msg.res})

        })

        socket.on('b7mData', (msg) => {
            let wins = msg.wins.reverse()
            let wins2 = wins.slice(0,15)
            this.setState({ b7mData: msg, b7mWins: wins2, b7mRes:msg.res})
            if (msg.users.length > 0) {
            for(let i in msg.users ){
                if (msg.users[i].id == this.state.fetchedUser.id && this.state.myb7msum == 0) {
                    this.setState({ myb7msum: msg.users[i].sum, myb7mvaluta: msg.users[i].valuta, myb7mtext: msg.users[i].view, viewtabl:1, myb7mview:msg.users[i].view })

                } else if (msg.users[i].id == this.state.fetchedUser.id) {


                }
            }
        } else if (msg.users.length == 0){
            this.setState({ viewtabl:0, myb7msum: 0, myb7mwin:null })

        }
        })

        socket.on('doubleData', (msg) => {
            let wins = msg.wins.reverse()
            let wins2 = wins.slice(0,15)
            this.setState({ doubleData: msg, doubleWins: wins2, doubleRes:msg.res})
        })

        socket.on('online', (msg) => {
            this.setState({ online: msg })

        })

        socket.on('sellOk', (msg) => {
            connect.send("VKWebAppOpenApp", { "app_id": 7695048, "location": `m286_${Math.floor(Number(this.state.sum) * 1000)}_12312` })

        })

        socket.on('messages', (msg) => {
            this.setState({ messages: msg.messages })

            if (this.state.activeStory === 'messages') {
                scroll.scrollMore(30000);
            }
        })


        socket.on('wheelResult', (msg) => {
            this.setState({ wheelRes:msg.res,activeModal:null,wheeloldHash:msg.hash, wheeloldString:msg.string, resWheelNumber: msg.number, resWheelPlayers: msg.players, resWheelColor: msg.color, resHash: msg.hash, resString: msg.string, resCode: msg.code })
            
        })
        socket.on('diceResult', (msg) => {
            this.setState({ dicesRes: msg.res, resDicesNumber: msg.number, resDicesPlayers: msg.players, dicesHash: msg.hash, dicesCode: msg.code, dicesString: msg.string })
            
        })
        socket.on('b7mResult', (msg) => {
            this.setState({ b7mRes:msg.res, resb7mNumber: msg.number, resb7mPlayers: msg.players, b7mHash: msg.hash, b7mCode: msg.code, b7mString: msg.string, resb7mNumberone: msg.firstnum, resb7mNumbertwo: msg.secondnum  })

            for (let i in msg.players ){
                if (msg.players[i].id == this.state.fetchedUser.id && this.state.myb7mwin == null) {
                    this.setState({ myb7msum: msg.players[i].sum, myb7mvaluta: msg.players[i].valuta, myb7mview:msg.players[i].view, myb7mwin:msg.players[i].win, myb7mtext:msg.players[i].win, viewtabl:1 })
                }
            }
        })
        socket.on('alert', (msg) => {
            this.setState({
                snackbar: <Snackbar
                    layout="vertical"
                    onClose={() => this.setState({ snackbar: null })}
                    before={<Avatar size={24} style={{backgroundColor:'red'}}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                >
                    {msg}
                </Snackbar>
            })
        })
        socket.on('connect', () => {


        })
        socket.on('disconnect', () => {
            this.setState({activeStory: 'oops', oopsPanel: 'disconnectserver', can:0 })
        })
        socket.on('disconnectReason', (res) => {
            this.setState({ oopsPanel: 'disconnectserver', can:0 })
        })
        socket.on('updateuser', (res) => {
            this.setState({ psbalance: res.psbalance, vkcbalance: res.vkcbalance, ccbalance: res.ccbalance})
        })

        socket.on('changerules', (res) => {
            this.setState({ ingam:res })
        })

    }

    aeeda = () => {

        this.setState({ activeStory: 'games', gamesPanel: 'chat' })
        scroll.scrollMore(20000);
    }

    go = (e) => {
        this.setState({ activePanel: e.currentTarget.dataset.to })
    };

    onRefresh = () => {
        this.setState({ fetching: true });
        this.getInfo()
      setTimeout(() => {
        this.setState({
          fetching: false
        });
      }, 500);
    };

    goGames = (e) => {
        window.history.pushState( { gamesPanel: e.currentTarget.dataset.to }, `${e.currentTarget.dataset.to}` );
        
        if (e.currentTarget.dataset.to == 'wheelv2' || e.currentTarget.dataset.to == 'slots' || e.currentTarget.dataset.to == 'double' || e.currentTarget.dataset.to == 'b7m') {

        this.setState({ gamesPanel: e.currentTarget.dataset.to, can: 0 })

    
    } else {

        this.setState({ gamesPanel: e.currentTarget.dataset.to, can: 1 })
        
    }

    };
    openBase = () => {
        this.setState({
            popout:
                <ActionSheet onClose={() => this.setState({ popout: null })}>
                    <ActionSheetItem autoclose onClick={() => window.socket.emit('valuteChange', {
                        "vk_user_id": this.state.fetchedUser.id,
                        "photo": this.state.fetchedUser.photo_100,
                        "to": 'VKCoin',
                        "name": this.state.fetchedUser.first_name,
                        "params": window.location.search.substring()
                    })}>
                        VKCoin
        </ActionSheetItem>
                    <ActionSheetItem autoclose onClick={() => window.socket.emit('valuteChange', {
                        "vk_user_id": this.state.fetchedUser.id,
                        "photo": this.state.fetchedUser.photo_100,
                        "to": 'CoronaCoin',
                        "name": this.state.fetchedUser.first_name,
                        "params": window.location.search.substring()
                    })}>
                        CoronaCoin
        </ActionSheetItem>

                    <ActionSheetItem autoclose onClick={() => window.socket.emit('valuteChange', {
                        "vk_user_id": this.state.fetchedUser.id,
                        "photo": this.state.fetchedUser.photo_100,
                        "to": 'PaperScroll',
                        "name": this.state.fetchedUser.first_name,
                        "params": window.location.search.substring()
                    })}>
                        PaperScroll
        </ActionSheetItem>


                    <ActionSheetItem autoclose onClick={() => window.socket.emit('valuteChange', {
                        "vk_user_id": this.state.fetchedUser.id,
                        "photo": this.state.fetchedUser.photo_100,
                        "to": 'GameCoin',
                        "name": this.state.fetchedUser.first_name,
                        "params": window.location.search.substring()
                    })}>
                        GameCoin
        </ActionSheetItem>







                </ActionSheet>
        });
    }
    toggleContext = () => {
        this.setState({ contextOpened: !this.state.contextOpened });
    }

    select = (e) => {
        if (e.currentTarget.dataset.mode === 'VKCoin') {
            window.socket.emit('valuteChange', {
                "vk_user_id": this.state.fetchedUser.id,
                "photo": this.state.fetchedUser.photo_100,
                "to": 'VKCoin',
                "name": this.state.fetchedUser.first_name,
                "params": window.location.search.substring()
            })
            this.getInfo()
        }
        if (e.currentTarget.dataset.mode === 'PaperScroll') {
            window.socket.emit('valuteChange', {
                "vk_user_id": this.state.fetchedUser.id,
                "photo": this.state.fetchedUser.photo_100,
                "to": 'PaperScroll',
                "name": this.state.fetchedUser.first_name,
            })
            this.getInfo()
        }
        this.setState({ contextOpened: !this.state.contextOpened });
    }

    modal = (e) => {
        this.setState({ activeModal: e.currentTarget.dataset.to })
    };

    onStoryChange = (e) => {
        this.setState({ activeStory: e.currentTarget.dataset.story })
    }

    onb7mChange = (e) => {
        this.setState({ activeb7m: e.currentTarget.dataset.story })
    }

    ondoubleChange = (e) => {
        this.setState({ activedouble: e.currentTarget.dataset.story })
    }

    check = (sum) => {
        window.socket.emit('sell', {
            "vk_user_id": this.state.fetchedUser.id,
            "photo": this.state.fetchedUser.photo_100,
            "sum": sum,
            "name": this.state.fetchedUser.first_name,
            "params": window.location.search.substring()
        })
    }

    idChange = (e) => {
        this.setState({ sendId: e.currentTarget.value })
    }

    sumChange = (e) => {
        this.setState({ sendSum: e.currentTarget.value })
    }
    wheelsumChange = (e) => {
        this.setState({ wheelSum: e.currentTarget.value })
    }
    thimblesumChange = (e) => {
        this.setState({ thimbleSum: e.currentTarget.value })
    }
    dicesumChange = (e) => {
        this.setState({ diceSum: e.currentTarget.value })
    }
    addddiceinput = (summa) => {
        var val = document.getElementById('inputdice').value
        var sum = summa
        let sumres = Number(val) + Number(sum)
        document.getElementById('inputdice').value = `${sumres}`;
        this.setState({ dicesSum:sumres })
    }
    addddiceinput2 = (summa) => {
        var val = document.getElementById('inputb7m').value
        var sum = summa
        let sumres = Number(val) + Number(sum)
        document.getElementById('inputb7m').value = `${sumres}`;
        this.setState({ b7mSum:sumres })
    }
    addddiceinput23 = (summa) => {
        var val = document.getElementById('inputdouble').value
        var sum = summa
        let sumres = Number(val) + Number(sum)
        document.getElementById('inputdouble').value = `${sumres}`;
        this.setState({ doubleSum:sumres })
    }
    updatebtnwheel = (btn, sum) => {
        this.setState({ selectbtnwheel: btn, stepwheel: sum, wheelstavkavalue:sum, stepwheelps:sum })
    }
    adminsumChange = (e) => {
        this.setState({ adminSum: e.currentTarget.value })
    }
    lolChange = (e) => {
        if (Number(e.currentTarget.value) > 999999 && Number(e.currentTarget.value) < 100000000000) {
            this.setState({ lolInput: e.currentTarget.value, pay: Number(e.currentTarget.value * 0.005 / 1000000) })
        } else {
            this.setState({ lolInput: e.currentTarget.value, pay: 0 })
        }
    }
    closepopout = () => {
        this.setState({ popout2:null })
    }
    withdrawsumChange = (e) => {
        this.setState({ withdrawSum: e.currentTarget.value })
    }

    nvutisumChange = (e) => {
        this.setState({ nvutiSum: e.currentTarget.value })
    }

    messageChange = (e) => {
        this.setState({ messageText: e.currentTarget.value })
    }

    reshsumChange = (e) => {
        this.setState({ reshkaSum: e.currentTarget.value })
    }

    getInfo = () => {
        fetch(`https://vkjustgame.ru:4040/app/user.getInfo?photo=${this.state.fetchedUser.photo_100}&name=${this.state.fetchedUser.first_name}&familyname=${this.state.fetchedUser.last_name}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring(1)
            }
        })
            .then((respons) => {

                if (respons.status === 500) {
                    this.setState({ activeStory: 'oops' })
                }

                this.setState({ errorText: respons.statusText })
            })
            .then((response) => response.json())

            .then((response) => {

                this.setState({ psday: response.response.psday, vkcday: response.response.vkcday, ccday: response.response.ccday, adminrule:response.response.admin,ingam:response.response.ingam, myb7mingame:response.response.myb7mingame, playb7m:response.response.playb7m ,iplay:response.response.iplay, gcbalance: response.response.gcbalance, psbalance: response.response.psbalance, vkcbalance: response.response.vkcbalance, ccbalance: response.response.ccbalance, win: response.response.win, refName: response.response.refName, dices: response.response.dice, nvutis: response.response.nvuti, orelReshs: response.response.orelResh, wheels: response.response.wheel })
            })
            .catch((e) => {

            })
        fetch(`https://vkjustgame.ru:4040/app/user.getInfo?photo=${this.state.fetchedUser.photo_100}&name=${this.state.fetchedUser.first_name}&familyname=${this.state.fetchedUser.last_name}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())

            .then((response) => {

                this.setState({psday: response.response.psday, vkcday: response.response.vkcday, ccday: response.response.ccday, adminrule:response.response.admin,  ingam: response.response.ingam, myb7mingame:response.response.myb7mingame, playb7m:response.response.playb7m, gcbalance: response.response.gcbalance, iplay:response.response.iplay, psbalance: response.response.psbalance, vkcbalance: response.response.vkcbalance, ccbalance: response.response.ccbalance, balance: response.response.balance, almaz: response.response.almaz, almazWin: response.response.almazwin, ccwin:response.response.ccwin, pswin:response.response.pswin, vkcwin: response.response.vkcwin, active: response.response.active, vkc: response.response.vkc, win: response.response.win, notify: response.response.notify, qiwi: response.response.qiwi, refName: response.response.refName, dices: response.response.dice, nvutis: response.response.nvuti, orelReshs: response.response.orelResh, wheels: response.response.wheel })
                if (response.response.ban) {
                    this.setState({ activeStory: 'oops', oopsPanel: 'ban', can:0 })
                }

            })

        fetch(`https://vkjustgame.ru:4040/app/user.getTop?photo=${this.state.fetchedUser.photo_200}&name=${this.state.fetchedUser.first_name}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {

                this.setState({ top: response.users })
            })
            .catch((e) => {
                this.setState({ activeView: 'oops' })
            })

        fetch(`https://vkjustgame.ru:4040/app/user.getDayTop?photo=${this.state.fetchedUser.photo_200}&name=${this.state.fetchedUser.first_name}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {

                this.setState({ dayTop: response.users })
            })
            .catch((e) => {
                this.setState({ activeView: 'oops' })
            })

    }

    getAdminInfo = () => {
        fetch(`https://vkjustgame.ru:4040/app/admin.getInfo?photo=${this.state.fetchedUser.photo_200}&name=${this.state.fetchedUser.first_name}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {
                
            })

    }

    ref = (id) => {
        fetch(`https://vkjustgame.ru:4040/app/user.ref?ref=${id}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {

            })

    }

    goThimble = () => {
        if (this.state.thimbleSum > 1000000000) {
            this.setState({
                snackbar: <Snackbar
                    layout="vertical"
                    onClose={() => this.setState({ snackbar: null })}
                    before={<Avatar size={24}  style={{backgroundColor:'red'}}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                >
                    Максимальная сумма ставки 1ккк
      </Snackbar>
            })

            return
        }
        if (this.state.thimbleSum < 1) {
            this.setState({
                snackbar: <Snackbar
                    layout="vertical"
                    onClose={() => this.setState({ snackbar: null })}
                    before={<Avatar size={24}  style={{backgroundColor:'red'}}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                >
                    Введите сумму
      </Snackbar>
            })

            return
        }
        if (this.state.balance < this.state.thimbleSum) {
            this.setState({
                snackbar: <Snackbar
                    layout="vertical"
                    onClose={() => this.setState({ snackbar: null })}
                    before={<Avatar size={24}  style={{backgroundColor:'red'}}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                >
                    Недостаточно бумаги
      </Snackbar>
            })

            return
        }
        this.setState({ gamesPanel: 'thimble' })

    }

    

    give = (id, sum) => {
        fetch(`https://vkjustgame.ru:4040/app/admin.addCoins?id=${id}&sum=${sum}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    admin: {
                        "bank": response.bank,
                        "win": response.win
                    }
                })
            })
        this.setState({
            snackbar: <Snackbar
                layout="vertical"
                onClose={() => this.setState({ snackbar: null })}
                before={<Avatar size={24}  style={{backgroundColor:'green'}}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
            >
                Успешно выдано!
      </Snackbar>
        })
    }

    limit = (id, sum) => {
        fetch(`https://vkjustgame.ru:4040/app/admin.limit?id=${id}&sum=${sum}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    admin: {
                        "bank": response.bank,
                        "win": response.win
                    }
                })
            })
        this.setState({
            snackbar: <Snackbar
                layout="vertical"
                onClose={() => this.setState({ snackbar: null })}
                before={<Avatar size={24}  style={{backgroundColor:'green'}}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
            >
                Лимит успешно выдан!
      </Snackbar>
        })
    }

    modermsg = (msg) => {
        fetch(`https://vkjustgame.ru:4040/app/admin.sendMessage?msg=${msg}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    admin: {
                        "bank": response.bank,
                        "win": response.win
                    }
                })
            })
        this.setState({
            snackbar: <Snackbar
                layout="vertical"
                onClose={() => this.setState({ snackbar: null })}
                before={<Avatar size={24}  style={{backgroundColor:'green'}}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
            >
                Сообщение отправлено.
      </Snackbar>
        })
    }

    ban = (id) => {
        fetch(`https://vkjustgame.ru:4040/app/admin.ban?id=${id}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    admin: {
                        "bank": response.bank,
                        "win": response.win
                    }
                })
            })
        this.setState({
            snackbar: <Snackbar
                layout="vertical"
                onClose={() => this.setState({ snackbar: null })}
                before={<Avatar size={24}  style={{backgroundColor:'green'}}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
            >
                Успешно забанен!
      </Snackbar>
        })
    }

    unban = (id) => {
        fetch(`https://vkjustgame.ru:4040/app/admin.unban?id=${id}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    admin: {
                        "bank": response.bank,
                        "win": response.win
                    }
                })
            })
        this.setState({
            snackbar: <Snackbar
                layout="vertical"
                onClose={() => this.setState({ snackbar: null })}
                before={<Avatar size={24}  style={{backgroundColor:'green'}}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
            >
                Успешно разбанен!
      </Snackbar>
        })
    }


    dice = (number, sum) => {
        fetch(`https://vkjustgame.ru:4040/app/game.dice?sum=${sum}&number=${number}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {

                if (response.status == 'ok') {
                    this.setState({
                        dice: {
                            result: response.result,
                            text: response.text,
                            number: response.number
                        }, gamesPanel: 'diceResult'
                    })
                    this.getInfo()
                } else {
                    this.setState({
                        snackbar: <Snackbar
                            layout="vertical"
                            onClose={() => this.setState({ snackbar: null })}
                            before={<Avatar size={24}  style={{backgroundColor:'red'}}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                        >
                            {response.error}
                        </Snackbar>
                    })

                }
            })
    }

    openhashdice = (num, hash, md5) => {

    }

    thimble = (number, num, sum) => {
        fetch(`https://vkjustgame.ru:4040/app/game.thimble?sum=${sum}&rand=${number}&number=${num}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {

                if (response.status != 'error') {
                    this.setState({
                        thimble: {
                            win: response.win,
                            text: response.text,
                            stakan: response.stakan
                        }, gamesPanel: 'thimbleResult'
                    })
                    this.getInfo()
                } else {
                    this.setState({
                        snackbar: <Snackbar
                            layout="vertical"
                            onClose={() => this.setState({ snackbar: null })}
                            before={<Avatar size={24}  style={{backgroundColor:'red'}}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                        >
                            {response.error}
                        </Snackbar>
                    })

                }
            })
    }

    wheel = (sum, type, data) => {
        fetch(`https://vkjustgame.ru:4040/app/game.wheel?sum=${sum}&type=${type}&data=${data}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {

                if (response.status == 'ok') {
                    this.setState({
                        snackbar: <Snackbar
                            layout="vertical"
                            onClose={() => this.setState({ snackbar: null })}
                            before={<Avatar size={24}  style={{backgroundColor:'green'}}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
                        >
                            Ставка принята.
      </Snackbar>
                    })
                    this.getInfo()
                } else {
                    this.setState({
                        snackbar: <Snackbar
                            layout="vertical"
                            onClose={() => this.setState({ snackbar: null })}
                            before={<Avatar size={24}  style={{backgroundColor:'red'}}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                        >
                            {response.error}
                        </Snackbar>
                    })

                }
            })
    }

    dices = (sum, type, data) => {

        window.socket.emit('diceBet', {
            "vk_user_id": this.state.fetchedUser.id,
            "photo": this.state.fetchedUser.photo_100,
            "sum": sum,
            "type": type,
            "data": data,
            "select": this.state.active,
            "name": this.state.fetchedUser.first_name,
            "params": window.location.search.substring()
        })
        this.setState({ dicesSum: 0 })
        document.getElementById('inputdice').value = "";

    }

    b7m = (sum, type) => {
        window.socket.emit('b7mBet', {
            "vk_user_id": this.state.fetchedUser.id,
            "photo": this.state.fetchedUser.photo_100,
            "sum": sum,
            "type": type,
            "select": this.state.active,
            "name": this.state.fetchedUser.first_name,
            "params": window.location.search.substring()
        })

        this.setState({ b7mSum: 0 })
        document.getElementById('inputb7m').value = "";
    }

    double = (sum, type) => {
        window.socket.emit('doubleBet', {
            "vk_user_id": this.state.fetchedUser.id,
            "photo": this.state.fetchedUser.photo_100,
            "sum": sum,
            "type": type,
            "select": this.state.active,
            "name": this.state.fetchedUser.first_name,
            "params": window.location.search.substring()
        })

        this.setState({ doubleSum: 0 })
        document.getElementById('inputdouble').value = "";
    }

    wheelstavkasend = (sum, type, value) => {
        window.socket.emit('wheelv2Bet', {
            "vk_user_id": this.state.fetchedUser.id,
            "photo": this.state.fetchedUser.photo_100,
            "sum": sum,
            "type": type,
            "value": value,
            "select": this.state.active,
            "name": this.state.fetchedUser.first_name,
            "params": window.location.search.substring()
        })

        this.setState({ activeModal: null })
        setTimeout(async() => {
            this.setState({ activeModal: null })
        },50)
    }


    message = (text) => {
        window.socket.emit('sendMessage', {
            "msg": text
        })

        this.setState({ messageText: '' })
    }

    openhashcheck = ( number, hash, md51 ) => {
        let str = `${number}|${hash}`
         this.setState({ popoutres:
      <Alert
              actionsLayout="horizontal"
        onClose={() => this.setState({ popoutres:null })}
        header="Хеш игры"
        text={<><p>Результат игры: <b>1</b></p><p>Строка для проверки: <b>1</b></p><p>Хеш результата: <b>1</b></p><p>Для проверки скопируйте строку и вставьте на любом сайте для хешировния по технологии md5. Если полученный хеш совпадает с указанным в этом окне, то игра была честной</p></>}
        actions={[{
          title: 'Копировать',
          autoclose: false,
          mode: 'default',
          action: () => connect.send("VKWebAppCopyText", {"text": str}),
        }, {
          title: 'Закрыть',
          autoclose: true,
          mode: 'cancel',
          action: () => this.setState({ popoutres:null  }),
        }]}
      />
    });
    }

    withdraw = (sum) => {
        this.setState({ activeModal:null })
        setTimeout(() => {
            this.setState({ activeModal:null })
        },50)
        fetch(`https://vkjustgame.ru:4040/app/user.withdraw?sum=${sum}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {

                if (response.status == 'ok') {
                    this.setState({
                        activeModal: null, snackbar: <Snackbar
                            layout="vertical"
                            onClose={() => this.setState({ snackbar: null })}
                            before={<Avatar size={24}  style={{backgroundColor:'green'}}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
                        >
                            Вывод успешно обработан!
      </Snackbar>
                    })
                    this.getInfo()
                } else {
                    this.setState({
                        activeModal: null, snackbar: <Snackbar
                            layout="vertical"
                            onClose={() => this.setState({ snackbar: null })}
                            before={<Avatar size={24}  style={{backgroundColor:'red'}}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                        >
                            {response.error}
                        </Snackbar>
                    })

                }
            })
    }

    qiwi = (numbe) => {
        window.socket.emit('setQiwi', {
            "vk_user_id": this.state.fetchedUser.id,
            "photo": this.state.fetchedUser.photo_100,
            "name": this.state.fetchedUser.first_name,
            "qiwi": numbe,
            "params": window.location.search.substring()
        })
        this.getInfo()
        this.setState({
            activeModal: null, snackbar: <Snackbar
                layout="vertical"
                onClose={() => this.setState({ snackbar: null })}
                before={<Avatar size={24}  style={{backgroundColor:'green'}}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
            >
                Данные сохранены!
      </Snackbar>
        })
    }

    reshka = (type, sum) => {
        fetch(`https://vkjustgame.ru:4040/app/game.orel-reshka?sum=${sum}&type=${type}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {

                if (response.status == 'ok') {
                    setTimeout(() => {
                        this.setState({
                            gamesPanel: 'reshkaResult'
                        })
                    }, 3000)
                    this.setState({
                        reshka: {
                            result: response.result,
                            text: response.text,
                            res: response.res
                        }, gamesPanel: 'reshkaPreResult'
                    })

                    this.getInfo()
                } else {
                    this.setState({
                        snackbar: <Snackbar
                            layout="vertical"
                            onClose={() => this.setState({ snackbar: null })}
                            before={<Avatar size={24}  style={{backgroundColor:'red'}}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                        >
                            {response.error}
                        </Snackbar>
                    })

                }
            })
    }
    online = () => {
        fetch(`https://vkjustgame.ru:4040/app/user.online`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({ online: response.online })
            })
    }
    nvuti = (chance, sum, type) => {
        fetch(`https://vkjustgame.ru:4040/app/game.nvuti?sum=${sum}&chance=${chance}&type=${type}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {

                if (response.status == 'ok') {
                    this.setState({
                        nvuti: {
                            result: response.result,
                            text: response.text,
                            number: response.number
                        }, gamesPanel: 'nvutiResult'
                    })
                    this.getInfo()
                } else {
                    this.setState({
                        snackbar: <Snackbar
                            layout="vertical"
                            onClose={() => this.setState({ snackbar: null })}
                            before={<Avatar size={24}  style={{backgroundColor:'red'}}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                        >
                            {response.error}
                        </Snackbar>
                    })

                }
            })
    }
    adssacdc = () => {
        this.setState({ homePanel: 'buy' })
    }
    open1 = () => {
        this.setState({ isOpen1: true })
    }
    close1 = () => {
        this.setState({ isOpen1: false })
    }
    open2 = () => {
        this.setState({ isOpen2: true })
    }
    close2 = () => {
        this.setState({ isOpen2: false })
    }
    open3 = () => {
        this.setState({ isOpen3: true })
    }
    close3 = () => {
        this.setState({ isOpen3: false })
    }
    open4 = () => {
        this.setState({ isOpen4: true })
    }
    close4 = () => {
        this.setState({ isOpen4: false })
    }
    hoveron = () => {
        this.setState({ activeModal: 'stat' })
    }
    open5 = () => {
        this.setState({ isOpen5: !this.state.isOpen5 })
    }
    open6 = () => {
        this.setState({ isOpen6: !this.state.isOpen6 })
    }
    open7 = () => {
        this.setState({ isOpen7: !this.state.isOpen7 })
    }
    open8 = () => {
        this.setState({ isOpen8: !this.state.isOpen8 })
    }
    onSwipeRight = () => {

    }

    hoveroff = () => {
    }
    sendTransfer = (id, sum) => {
        fetch(`https://vkjustgame.ru:4040/app/user.sendTransfer?id=${id}&sum=${sum}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Vk-Sign": window.location.search.substring()
            }
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status == 'ok') {
                    this.setState({
                        snackbar: <Snackbar
                            layout="vertical"
                            onClose={() => this.setState({ snackbar: null })}
                            before={<Avatar size={24}  style={{backgroundColor:'green'}}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
                        >
                            Перевод отправлен!
      </Snackbar>
                    })
                    this.getInfo()
                } else {
                    this.setState({
                        snackbar: <Snackbar
                            layout="vertical"
                            onClose={() => this.setState({ snackbar: null })}
                            before={<Avatar size={24}  style={{backgroundColor:'red'}}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                        >
                            {response.error}
                        </Snackbar>
                    })
                }
            })
    }

    withdrawModal = () => {
        this.setState({ activeModal: 'vivod' })
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        const modal = (
            <ModalRoot
                activeModal={this.state.activeModal}
                onClose={() => this.setState({ activeModal: null })}
            >
                <ModalPage
                    id='stat'
                    header={
                        <ModalPageHeader

                        >
                            Статистика
            </ModalPageHeader>
                    }
                    settlingHeight={80}
                >
                    <div class="ActivityPage">
                        <div class="NumberView">
                            <div class="NumberView__description">Выиграно в Nvuti:</div>
                            <div class="NumberView__value" >{number_format(this.state.nvutis, 0, '.', ' ')}</div>

                        </div>
                        <div class="NumberView">
                            <div class="NumberView__description">Выиграно в Dice:</div>
                            <div class="NumberView__value" >{number_format(this.state.dices, 0, '.', ' ')}</div>

                        </div>
                        <div class="NumberView">
                            <div class="NumberView__description">Выиграно в Орёл/решка:</div>
                            <div class="NumberView__value" >{number_format(this.state.orelResh, 0, '.', ' ')}</div>

                        </div>
                        <div class="NumberView">
                            <div class="NumberView__description">Выиграно в Wheel:</div>
                            <div class="NumberView__value" >{number_format(this.state.wheels, 0, '.', ' ')}</div>

                        </div>
                    </div>
                </ModalPage>
                <ModalPage
                    id='oops'
                    header={
                        <ModalPageHeader

                        >
                            Информация
            </ModalPageHeader>
                    }
                    settlingHeight={80}
                >

                    <FormLayout>
                        <FormLayoutGroup top="Параметры запуска">
                            <Input type="text" defaultValue={`${window.location.search.substring()}`} readOnly />
                        </FormLayoutGroup>
                    </FormLayout>
                    <FormLayout>
                        <FormLayoutGroup top="Код ошибки">
                            <Input type="text" defaultValue={`${this.state.errorCode}`} readOnly />
                        </FormLayoutGroup>
                    </FormLayout>
                    <FormLayout>
                        <FormLayoutGroup top="Ошибка">
                            <Input type="text" defaultValue={`${this.state.errorText}`} readOnly />
                        </FormLayoutGroup>
                    </FormLayout>

                </ModalPage>
                <ModalPage
                onClose={() => this.setState({ activeModal:null   })}
                    id='wheelstavkared'
                    header={
                        <ModalPageHeader
                        left={
                            <Icon16Cancel fill={'black'} width={25} height={25} onClick={() => this.setState({ activeModal:null })} style={{ marginLeft:'10px' }} />
                        }
                        >
                            Ставка на Красное (x2)
            </ModalPageHeader>
                    }
                    settlingHeight={80}
                >


                <FormLayout style={{ padding:0 }}>
                <FormLayout>
                <span style={{ paddingLeft:'12px' }}>Номинал фишек</span>
                {this.state.active === 'VKCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : this.state.active === 'PaperScroll' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100KK</div>
                <div onClick={() => this.updatebtnwheel(2, 250000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>250KK</div>
                <div onClick={() => this.updatebtnwheel(3, 500000000)} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>500KK</div>
                <div onClick={() => this.updatebtnwheel(4, 1000000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', marginLeft:'10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>1KKK</div>
                </Div> : this.state.active === 'CoronaCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : 'Error 404'}
                </FormLayout>
                <FormLayout>
                    <span style={{ paddingLeft:'12px' }}>Количество фишек: {Number(this.state.wheelstavkavalue / Number(this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel)).toFixed(0)}</span>
                <Slider
                  step={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  min={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  max={`${this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 1000000}`}
                  value={Number(this.state.wheelstavkavalue)}
                  onChange={wheelstavkavalue => this.setState({wheelstavkavalue})}
                />
                </FormLayout>
                <FormLayout>
                <Input value={ this.state.wheelstavkavalue} onChange={e => this.setState({ wheelstavkavalue: e.target.value })} min="100000" type="number" />
                </FormLayout>
                <FormLayout>
              <center><div size="l"  onClick={() => this.wheelstavkasend(this.state.wheelstavkavalue,'color', 'red') } style={{ color:'white', marginRight:'12px', width:'90%', height:'44px', backgroundColor:'#4986CC', lineHeight: '44px', borderRadius:'10px', display:'inline-block' }} >Добавить ставку</div></center>
              </FormLayout>
              </FormLayout>


                </ModalPage>
                 <ModalPage
                onClose={() => this.setState({ activeModal:null  })}
                    id='wheelstavkablack'
                    header={
                        <ModalPageHeader
                        left={
                            <Icon16Cancel fill={'black'} width={25} height={25} onClick={() => this.setState({ activeModal:null  })} style={{ marginLeft:'10px' }} />
                        }
                        >
                            Ставка на Черное (x2)
            </ModalPageHeader>
                    }
                    settlingHeight={80}
                >


                <FormLayout style={{ padding:0 }}>
                <FormLayout>
                <span style={{ paddingLeft:'12px' }}>Номинал фишек</span>
                {this.state.active === 'VKCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : this.state.active === 'PaperScroll' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100KK</div>
                <div onClick={() => this.updatebtnwheel(2, 250000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>250KK</div>
                <div onClick={() => this.updatebtnwheel(3, 500000000)} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>500KK</div>
                <div onClick={() => this.updatebtnwheel(4, 1000000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', marginLeft:'10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>1KKK</div>
                </Div> : this.state.active === 'CoronaCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : 'Error 404'}
                </FormLayout>
                <FormLayout>
                    <span style={{ paddingLeft:'12px' }}>Количество фишек: {Number(this.state.wheelstavkavalue / Number(this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel)).toFixed(0)}</span>
                <Slider
                  step={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  min={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  max={`${this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 1000000}`}
                  value={Number(this.state.wheelstavkavalue)}
                  onChange={wheelstavkavalue => this.setState({wheelstavkavalue})}
                />
                </FormLayout>
                <FormLayout>
                <Input value={ this.state.wheelstavkavalue} onChange={e => this.setState({ wheelstavkavalue: e.target.value })} min="100000" type="number"/>
                </FormLayout>
                <FormLayout>
              <center><div size="l"  onClick={() => this.wheelstavkasend(this.state.wheelstavkavalue,'color', 'black') } style={{ color:'white', marginRight:'12px', width:'90%', height:'44px', backgroundColor:'#4986CC', lineHeight: '44px', borderRadius:'10px', display:'inline-block' }} >Добавить ставку</div></center>
              </FormLayout>
              </FormLayout>


                </ModalPage>
                 <ModalPage
                onClose={() => this.setState({ activeModal:null  })}
                    id='wheelstavkaeven'
                    header={
                        <ModalPageHeader
                        left={
                            <Icon16Cancel fill={'black'} width={25} height={25} onClick={() => this.setState({ activeModal:null  })} style={{ marginLeft:'10px' }} />
                        }
                        >
                            Ставка на Четное (x2)
            </ModalPageHeader>
                    }
                    settlingHeight={80}
                >


                <FormLayout style={{ padding:0 }}>
                <FormLayout>
                <span style={{ paddingLeft:'12px' }}>Номинал фишек</span>
                {this.state.active === 'VKCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : this.state.active === 'PaperScroll' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100KK</div>
                <div onClick={() => this.updatebtnwheel(2, 250000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>250KK</div>
                <div onClick={() => this.updatebtnwheel(3, 500000000)} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>500KK</div>
                <div onClick={() => this.updatebtnwheel(4, 1000000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', marginLeft:'10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>1KKK</div>
                </Div> : this.state.active === 'CoronaCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : 'Error 404'}
                </FormLayout>
                <FormLayout>
                    <span style={{ paddingLeft:'12px' }}>Количество фишек: {Number(this.state.wheelstavkavalue / Number(this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel)).toFixed(0)}</span>
                <Slider
                  step={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  min={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  max={`${this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 1000000}`}
                  value={Number(this.state.wheelstavkavalue)}
                  onChange={wheelstavkavalue => this.setState({wheelstavkavalue})}
                />
                </FormLayout>
                <FormLayout>
                <Input value={ this.state.wheelstavkavalue} onChange={e => this.setState({ wheelstavkavalue: e.target.value })} min="100000" type="number"/>
                </FormLayout>
                <FormLayout>
              <center><div size="l"  onClick={() => this.wheelstavkasend(this.state.wheelstavkavalue,'typenum', 'even') } style={{ color:'white', marginRight:'12px', width:'90%', height:'44px', backgroundColor:'#4986CC', lineHeight: '44px', borderRadius:'10px', display:'inline-block' }} >Добавить ставку</div></center>
              </FormLayout>
              </FormLayout>


                </ModalPage>
                 <ModalPage
                onClose={() => this.setState({ activeModal:null  })}
                    id='wheelstavkanoteven'
                    header={
                        <ModalPageHeader
                        left={
                            <Icon16Cancel fill={'black'} width={25} height={25} onClick={() => this.setState({ activeModal:null  })} style={{ marginLeft:'10px' }} />
                        }
                        >
                            Ставка на Нечетное (x2)
            </ModalPageHeader>
                    }
                    settlingHeight={80}
                >


                <FormLayout style={{ padding:0 }}>
                <FormLayout>
                <span style={{ paddingLeft:'12px' }}>Номинал фишек</span>
                {this.state.active === 'VKCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : this.state.active === 'PaperScroll' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100KK</div>
                <div onClick={() => this.updatebtnwheel(2, 250000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>250KK</div>
                <div onClick={() => this.updatebtnwheel(3, 500000000)} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>500KK</div>
                <div onClick={() => this.updatebtnwheel(4, 1000000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', marginLeft:'10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>1KKK</div>
                </Div> : this.state.active === 'CoronaCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : 'Error 404'}
                </FormLayout>
                <FormLayout>
                    <span style={{ paddingLeft:'12px' }}>Количество фишек: {Number(this.state.wheelstavkavalue / Number(this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel)).toFixed(0)}</span>
                <Slider
                  step={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  min={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  max={`${this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 1000000}`}
                  value={Number(this.state.wheelstavkavalue)}
                  onChange={wheelstavkavalue => this.setState({wheelstavkavalue})}
                />
                </FormLayout>
                <FormLayout>
                <Input value={ this.state.wheelstavkavalue} onChange={e => this.setState({ wheelstavkavalue: e.target.value })} min="100000" type="number"/>
                </FormLayout>
                <FormLayout>
              <center><div size="l"  onClick={() => this.wheelstavkasend(this.state.wheelstavkavalue,'typenum', 'noteven') } style={{ color:'white', marginRight:'12px', width:'90%', height:'44px', backgroundColor:'#4986CC', lineHeight: '44px', borderRadius:'10px', display:'inline-block' }} >Добавить ставку</div></center>
              </FormLayout>
              </FormLayout>


                </ModalPage>
                 <ModalPage
                onClose={() => this.setState({ activeModal:null  })}
                    id='wheelstavka118'
                    header={
                        <ModalPageHeader
                        left={
                            <Icon16Cancel fill={'black'} width={25} height={25} onClick={() => this.setState({ activeModal:null  })} style={{ marginLeft:'10px' }} />
                        }
                        >
                            Ставка на 1 - 18 (x2)
            </ModalPageHeader>
                    }
                    settlingHeight={80}
                >


                <FormLayout style={{ padding:0 }}>
                <FormLayout>
                <span style={{ paddingLeft:'12px' }}>Номинал фишек</span>
                {this.state.active === 'VKCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : this.state.active === 'PaperScroll' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100KK</div>
                <div onClick={() => this.updatebtnwheel(2, 250000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>250KK</div>
                <div onClick={() => this.updatebtnwheel(3, 500000000)} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>500KK</div>
                <div onClick={() => this.updatebtnwheel(4, 1000000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', marginLeft:'10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>1KKK</div>
                </Div> : this.state.active === 'CoronaCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : 'Error 404'}
                </FormLayout>
                <FormLayout>
                    <span style={{ paddingLeft:'12px' }}>Количество фишек: {Number(this.state.wheelstavkavalue / Number(this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel)).toFixed(0)}</span>
                <Slider
                  step={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  min={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  max={`${this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 1000000}`}
                  value={Number(this.state.wheelstavkavalue)}
                  onChange={wheelstavkavalue => this.setState({wheelstavkavalue})}
                />
                </FormLayout>
                <FormLayout>
                <Input value={ this.state.wheelstavkavalue} onChange={e => this.setState({ wheelstavkavalue: e.target.value })} min="100000" type="number"/>
                </FormLayout>
                <FormLayout>
              <center><div size="l"  onClick={() => this.wheelstavkasend(this.state.wheelstavkavalue,'promez', 'oe') } style={{ color:'white', marginRight:'12px', width:'90%', height:'44px', backgroundColor:'#4986CC', lineHeight: '44px', borderRadius:'10px', display:'inline-block' }} >Добавить ставку</div></center>
              </FormLayout>
              </FormLayout>


                </ModalPage>
                 <ModalPage
                onClose={() => this.setState({ activeModal:null  })}
                    id='wheelstavka1936'
                    header={
                        <ModalPageHeader
                        left={
                            <Icon16Cancel fill={'black'} width={25} height={25} onClick={() => this.setState({ activeModal:null  })} style={{ marginLeft:'10px' }} />
                        }
                        >
                            Ставка на 19 - 36 (x2)
            </ModalPageHeader>
                    }
                    settlingHeight={80}
                >


                <FormLayout style={{ padding:0 }}>
                <FormLayout>
                <span style={{ paddingLeft:'12px' }}>Номинал фишек</span>
                {this.state.active === 'VKCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : this.state.active === 'PaperScroll' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100KK</div>
                <div onClick={() => this.updatebtnwheel(2, 250000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>250KK</div>
                <div onClick={() => this.updatebtnwheel(3, 500000000)} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>500KK</div>
                <div onClick={() => this.updatebtnwheel(4, 1000000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', marginLeft:'10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>1KKK</div>
                </Div> : this.state.active === 'CoronaCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : 'Error 404'}
                </FormLayout>
                <FormLayout>
                    <span style={{ paddingLeft:'12px' }}>Количество фишек: {Number(this.state.wheelstavkavalue / Number(this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel)).toFixed(0)}</span>
                <Slider
                  step={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  min={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  max={`${this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 1000000}`}
                  value={Number(this.state.wheelstavkavalue)}
                  onChange={wheelstavkavalue => this.setState({wheelstavkavalue})}
                />
                </FormLayout>
                <FormLayout>
                <Input value={ this.state.wheelstavkavalue} onChange={e => this.setState({ wheelstavkavalue: e.target.value })} min="100000" type="number"/>
                </FormLayout>
                <FormLayout>
              <center><div size="l"  onClick={() => this.wheelstavkasend(this.state.wheelstavkavalue,'promez', 'nt') } style={{ color:'white', marginRight:'12px', width:'90%', height:'44px', backgroundColor:'#4986CC', lineHeight: '44px', borderRadius:'10px', display:'inline-block' }} >Добавить ставку</div></center>
              </FormLayout>
              </FormLayout>


                </ModalPage>
                 <ModalPage
                onClose={() => this.setState({ activeModal:null  })}
                    id='wheelstavka112'
                    header={
                        <ModalPageHeader
                        left={
                            <Icon16Cancel fill={'black'} width={25} height={25} onClick={() => this.setState({ activeModal:null  })} style={{ marginLeft:'10px' }} />
                        }
                        >
                            Ставка на 1 - 12 (x3)
            </ModalPageHeader>
                    }
                    settlingHeight={80}
                >


                <FormLayout style={{ padding:0 }}>
                <FormLayout>
                <span style={{ paddingLeft:'12px' }}>Номинал фишек</span>
                {this.state.active === 'VKCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : this.state.active === 'PaperScroll' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100KK</div>
                <div onClick={() => this.updatebtnwheel(2, 250000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>250KK</div>
                <div onClick={() => this.updatebtnwheel(3, 500000000)} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>500KK</div>
                <div onClick={() => this.updatebtnwheel(4, 1000000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', marginLeft:'10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>1KKK</div>
                </Div> : this.state.active === 'CoronaCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : 'Error 404'}
                </FormLayout>
                <FormLayout>
                    <span style={{ paddingLeft:'12px' }}>Количество фишек: {Number(this.state.wheelstavkavalue / Number(this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel)).toFixed(0)}</span>
                <Slider
                  step={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  min={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  max={`${this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 1000000}`}
                  value={Number(this.state.wheelstavkavalue)}
                  onChange={wheelstavkavalue => this.setState({wheelstavkavalue})}
                />
                </FormLayout>
                <FormLayout>
                <Input value={ this.state.wheelstavkavalue} onChange={e => this.setState({ wheelstavkavalue: e.target.value })} min="100000" type="number"/>
                </FormLayout>
                <FormLayout>
              <center><div size="l"  onClick={() => this.wheelstavkasend(this.state.wheelstavkavalue,'promez', 'ot') } style={{ color:'white', marginRight:'12px', width:'90%', height:'44px', backgroundColor:'#4986CC', lineHeight: '44px', borderRadius:'10px', display:'inline-block' }} >Добавить ставку</div></center>
              </FormLayout>
              </FormLayout>


                </ModalPage>
                 <ModalPage
                onClose={() => this.setState({ activeModal:null  })}
                    id='wheelstavka1324'
                    header={
                        <ModalPageHeader
                        left={
                            <Icon16Cancel fill={'black'} width={25} height={25} onClick={() => this.setState({ activeModal:null  })} style={{ marginLeft:'10px' }} />
                        }
                        >
                            Ставка на 13 - 24 (x3)
            </ModalPageHeader>
                    }
                    settlingHeight={80}
                >


                <FormLayout style={{ padding:0 }}>
                <FormLayout>
                <span style={{ paddingLeft:'12px' }}>Номинал фишек</span>
                {this.state.active === 'VKCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : this.state.active === 'PaperScroll' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100KK</div>
                <div onClick={() => this.updatebtnwheel(2, 250000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>250KK</div>
                <div onClick={() => this.updatebtnwheel(3, 500000000)} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>500KK</div>
                <div onClick={() => this.updatebtnwheel(4, 1000000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', marginLeft:'10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>1KKK</div>
                </Div> : this.state.active === 'CoronaCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : 'Error 404'}
                </FormLayout>
                <FormLayout>
                    <span style={{ paddingLeft:'12px' }}>Количество фишек: {Number(this.state.wheelstavkavalue / Number(this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel)).toFixed(0)}</span>
                <Slider
                  step={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  min={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  max={`${this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 1000000}`}
                  value={Number(this.state.wheelstavkavalue)}
                  onChange={wheelstavkavalue => this.setState({wheelstavkavalue})}
                />
                </FormLayout>
                <FormLayout>
                <Input value={ this.state.wheelstavkavalue} onChange={e => this.setState({ wheelstavkavalue: e.target.value })} min="100000" type="number"/>
                </FormLayout>
                <FormLayout>
              <center><div size="l"  onClick={() => this.wheelstavkasend(this.state.wheelstavkavalue,'promez', 'tt') } style={{ color:'white', marginRight:'12px', width:'90%', height:'44px', backgroundColor:'#4986CC', lineHeight: '44px', borderRadius:'10px', display:'inline-block' }} >Добавить ставку</div></center>
              </FormLayout>
              </FormLayout>


                </ModalPage>
                 <ModalPage
                onClose={() => this.setState({ activeModal:null  })}
                    id='wheelstavka2536'
                    header={
                        <ModalPageHeader
                        left={
                            <Icon16Cancel fill={'black'} width={25} height={25} onClick={() => this.setState({ activeModal:null  })} style={{ marginLeft:'10px' }} />
                        }
                        >
                            Ставка на 25 - 36 (x3)
            </ModalPageHeader>
                    }
                    settlingHeight={80}
                >


                <FormLayout style={{ padding:0 }}>
                <FormLayout>
                <span style={{ paddingLeft:'12px' }}>Номинал фишек</span>
                {this.state.active === 'VKCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : this.state.active === 'PaperScroll' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100KK</div>
                <div onClick={() => this.updatebtnwheel(2, 250000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>250KK</div>
                <div onClick={() => this.updatebtnwheel(3, 500000000)} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>500KK</div>
                <div onClick={() => this.updatebtnwheel(4, 1000000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', marginLeft:'10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>1KKK</div>
                </Div> : this.state.active === 'CoronaCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : 'Error 404'}
                </FormLayout>
                <FormLayout>
                    <span style={{ paddingLeft:'12px' }}>Количество фишек: {Number(this.state.wheelstavkavalue / Number(this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel)).toFixed(0)}</span>
                <Slider
                  step={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  min={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  max={`${this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 1000000}`}
                  value={Number(this.state.wheelstavkavalue)}
                  onChange={wheelstavkavalue => this.setState({wheelstavkavalue})}
                />
                </FormLayout>
                <FormLayout>
                <Input value={ this.state.wheelstavkavalue} onChange={e => this.setState({ wheelstavkavalue: e.target.value })} min="100000" type="number"/>
                </FormLayout>
                <FormLayout>
              <center><div size="l"  onClick={() => this.wheelstavkasend(this.state.wheelstavkavalue,'promez', 'twt') } style={{ color:'white', marginRight:'12px', width:'90%', height:'44px', backgroundColor:'#4986CC', lineHeight: '44px', borderRadius:'10px', display:'inline-block' }} >Добавить ставку</div></center>
              </FormLayout>
              </FormLayout>


                </ModalPage>
                 <ModalPage
                onClose={() => this.setState({ activeModal:null  })}
                style={{ zIndex:'1' }}
                    id='wheelstavkanum'
                    header={
                        <ModalPageHeader
                        left={
                            <Icon16Cancel fill={'black'} width={25} height={25} onClick={() => this.setState({ activeModal:null  })} style={{ marginLeft:'10px' }} />
                        }
                        >
                            Ставка на {this.state.wheelnummodal} (x36)
            </ModalPageHeader>
                    }
                    settlingHeight={80}
                >


                <FormLayout style={{ padding:0 }}>
                <FormLayout>
                <span style={{ paddingLeft:'12px' }}>Номинал фишек</span>
                {this.state.active === 'VKCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : this.state.active === 'PaperScroll' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100KK</div>
                <div onClick={() => this.updatebtnwheel(2, 250000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>250KK</div>
                <div onClick={() => this.updatebtnwheel(3, 500000000)} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>500KK</div>
                <div onClick={() => this.updatebtnwheel(4, 1000000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', marginLeft:'10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>1KKK</div>
                </Div> : this.state.active === 'CoronaCoin' ? <Div style={{ padding:0 }}>
                <div  onClick={() => this.updatebtnwheel(1, 100000)} style={{ marginLeft:'12px',display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 1 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 1 ? 'white': 'black'}` }} >100K</div>
                <div onClick={() => this.updatebtnwheel(2, 500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 2 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 2 ? 'white': 'black'}` }}>500K</div>
                <div onClick={() => this.updatebtnwheel(3, 2500000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 3 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 3 ? 'white': 'black'}` }}>2.5KK</div>
                <div onClick={() => this.updatebtnwheel(4, 10000000)} style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px', padding: '8px 15px', textAlign: 'center', background: `${this.state.selectbtnwheel == 4 ? '#3498DB': '#D8D9DC'}`, borderRadius: '12px',color: `${this.state.selectbtnwheel == 4 ? 'white': 'black'}` }}>10KK</div>
                </Div> : 'Error 404'}
                </FormLayout>
                <FormLayout>
                    <span style={{ paddingLeft:'12px' }}>Количество фишек: {Number(this.state.wheelstavkavalue / Number(this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel)).toFixed(0)}</span>
                <Slider
                  step={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  min={this.state.active == 'PaperScroll' ? this.state.stepwheelps : this.state.stepwheel }
                  max={`${this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 1000000}`}
                  value={Number(this.state.wheelstavkavalue)}
                  onChange={wheelstavkavalue => this.setState({wheelstavkavalue})}
                />
                </FormLayout>
                <FormLayout>
                <Input value={ this.state.wheelstavkavalue} onChange={e => this.setState({ wheelstavkavalue: e.target.value })} min="100000" type="number"/>
                </FormLayout>
                <FormLayout>
              <center><div size="l"  onClick={() => this.wheelstavkasend(this.state.wheelstavkavalue,'number', this.state.wheelnummodal) } style={{ color:'white', marginRight:'12px', width:'90%', height:'44px', backgroundColor:'#4986CC', lineHeight: '44px', borderRadius:'10px', display:'inline-block' }} >Добавить ставку</div></center>
              </FormLayout>
              </FormLayout>


                </ModalPage>
                <ModalPage
                onClose={() => this.setState({ activeModal:null  })}
                style={{ zIndex:'-1' }}
                    id='wheelstavkanumselect'
                    header={
                        <ModalPageHeader
                        left={
                            <Icon16Cancel fill={'black'} width={25} height={25} onClick={() => this.setState({ activeModal:null  })} style={{ marginLeft:'10px' }} />
                        }
                        >
                            Ставка на число
            </ModalPageHeader>
                    }
                    settlingHeight={80}
                >


              <Div style={{ display: 'flex', padding:0, paddingBottom:'1%'}}>
                                    <Button size="l" stretched style={{ marginLeft:'10px', marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:1 })}>1</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:2 })}>2</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:3 })}>3</Button>
                                    <Button size="l" stretched style={{ marginRight:'10px', color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:4 })}>4</Button>
                                </Div>
                                <Div style={{ display: 'flex', padding:0, paddingBottom:'1%'}}>
                                    <Button size="l" stretched style={{ marginLeft:'10px', marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:5 })}>5</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:6 })}>6</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:7 })}>7</Button>
                                    <Button size="l" stretched style={{ marginRight:'10px', color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:8 })}>8</Button>
                                </Div>
                                <Div style={{ display: 'flex', padding:0, paddingBottom:'1%'}}>
                                    <Button size="l" stretched style={{ marginLeft:'10px', marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:9 })}>9</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:10 })}>10</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:11 })}>11</Button>
                                    <Button size="l" stretched style={{ marginRight:'10px', color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:12 })}>12</Button>
                                </Div>
                                <Div style={{ display: 'flex', padding:0, paddingBottom:'1%'}}>
                                    <Button size="l" stretched style={{ marginLeft:'10px', marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:13 })}>13</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:14 })}>14</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:15 })}>15</Button>
                                    <Button size="l" stretched style={{ marginRight:'10px', color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:16 })}>16</Button>
                                </Div>
                                <Div style={{ display: 'flex', padding:0, paddingBottom:'1%'}}>
                                    <Button size="l" stretched style={{ marginLeft:'10px', marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:17 })}>17</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:18 })}>18</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:19 })}>19</Button>
                                    <Button size="l" stretched style={{ marginRight:'10px', color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:20 })}>20</Button>
                                </Div>
                                <Div style={{ display: 'flex', padding:0, paddingBottom:'1%'}}>
                                    <Button size="l" stretched style={{ marginLeft:'10px', marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:21 })}>21</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:22 })}>22</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:23 })}>23</Button>
                                    <Button size="l" stretched style={{ marginRight:'10px', color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:24 })}>24</Button>
                                </Div>
                                <Div style={{ display: 'flex', padding:0, paddingBottom:'1%'}}>
                                    <Button size="l" stretched style={{ marginLeft:'10px', marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:25 })}>25</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:26 })}>26</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:27 })}>27</Button>
                                    <Button size="l" stretched style={{ marginRight:'10px', color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:28 })}>28</Button>
                                </Div>
                                <Div style={{ display: 'flex', padding:0, paddingBottom:'1%'}}>
                                    <Button size="l" stretched style={{ marginLeft:'10px', marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:29 })}>29</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:30 })}>30</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:31 })}>31</Button>
                                    <Button size="l" stretched style={{ marginRight:'10px', color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:32 })}>32</Button>
                                </Div>
                                <Div style={{ display: 'flex', padding:0}}>
                                    <Button size="l" stretched style={{marginLeft:'10px',  marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:33 })}>33</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:34 })}>34</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:35 })}>35</Button>
                                    <Button size="l" stretched style={{ marginRight:'10px', color:'white', width:'25%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336' }} onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:36 })}>36</Button>
                                </Div>


                </ModalPage>
                <ModalPage
                    id='ref'
                    header={
                        <ModalPageHeader

                        >
                            Реф.система
            </ModalPageHeader>
                    }
                    settlingHeight={80}
                >
                    <Div>
                        <FormStatus>
                            За каждого пользователя, кто перейдет по вашей реф.ссылке, Вы получаете 100 000 коинов.
      </FormStatus>
                    </Div>
                    <SimpleCell indicator={this.state.refName} before={<Icon28SmileOutline fill='var(--button_primary_background)' />} >Вас пригласил:</SimpleCell>

                    <FormLayout>
                        <FormLayoutGroup top="Реферальная ссылка">
                            <Input type="text" defaultValue={`https://vk.com/app7633634#ref=${this.state.userId}`} readOnly />
                        </FormLayoutGroup>
                    </FormLayout>
                </ModalPage>
               <ModalPage
                    id={`vivod`}
                    onClose={() => this.setState({ activeModal: null })}
                    header={
                        <ModalPageHeader

                        >
                            Вывод
            </ModalPageHeader>
                    }
                >
                    <FormLayout>
                        <FormLayoutGroup top="Введите сумму вывода:">
                            <Input type="number" onChange={this.withdrawsumChange} defaultValue="0" />
                        </FormLayoutGroup>
                    </FormLayout>
                    <Div>
                        <Button size="xl" style={{backgroundColor:'#4986CC', color:'white'}} mode="secondary" onClick={() => this.withdraw(this.state.withdrawSum)}>Вывести</Button>
                    </Div>
                </ModalPage>
                <ModalPage
                    id={`qiwi`}
                    onClose={() => this.setState({ activeModal: null })}
                    header={
                        <ModalPageHeader

                        >
                            Данные кошелька
            </ModalPageHeader>
                    }
                >
                    <FormLayout>
                        <FormLayoutGroup top="Номер кошелька (пример: +79001230000)">
                            <Input type="text" onChange={(e) => this.setState({ numberqiwi: e.target.value })} />
                        </FormLayoutGroup>
                    </FormLayout>
                    <Div>
                        <Button size="xl" mode="secondary" onClick={() => this.qiwi(this.state.numberqiwi)}>Сохранить</Button>
                    </Div>
                </ModalPage>
                <ModalPage
                    id={`res`}
                    onClose={() => this.setState({ activeModal: null })}
                    header={
                        <ModalPageHeader

                        >
                            Результаты
            </ModalPageHeader>
                    }
                >
                    <div>
                        <CardGrid>
                            <Card size="l">
                                <div style={{ height: 30 }} />
                                <center><h2 style={{ color: '#fff' }}>{this.state.resWheelNumber}</h2></center>
                                <center><p>{this.state.resWheelColor}</p></center>
                                <div style={{ height: 30 }} />
                            </Card>
                        </CardGrid>


                    </div>
                    <center><Cell>Хэш игры: {this.state.resHash}</Cell></center>
                    <center><Cell>Кодовое слово: {this.state.resCode}</Cell></center>
                    <center><Cell>Проверка честности: {this.state.resString}</Cell></center>

                </ModalPage>
            </ModalRoot>
        );
        return (
            <ConfigProvider isWebView={true} scheme={this.state.scheme}>
                <Epic activeStory={this.state.activeStory} tabbar={this.state.can === 1 &&
                    <Tabbar>

                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'feed'}
                            data-story="feed"
                            className={"feedу"}
                            text="Главная"
                        ><Icon28HomeOutline /></TabbarItem>
                        <TabbarItem
                            /*onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'messages'}
                            data-story="messages"*/
                            className={"chat"}
                            text="Скоро"
                        ><Icon28MessagesOutline /></TabbarItem>
                        
                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'games'}
                            data-story="games"
                            className={"games"}
                            text="Игры"
                        ><Icon28GameOutline /></TabbarItem>
                        {/*<TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'services'}
                            data-story="services"
                            className={"raiting"}
                            text="Рейтинг"
                        ><Icon28GraphOutline /></TabbarItem>*/}
                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'services'}
                            data-story="services"
                            className={"raiting"}
                            text="Рейтинг"
                        ><Icon28GraphOutline /></TabbarItem>
                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'help'}
                            data-story="help"
                            className={"other"}
                            text="Другое"
                        ><Icon28HelpOutline /></TabbarItem>
                    </Tabbar>
                }>
                    <View id="feed" modal={modal} activePanel={this.state.homePanel} popout={this.state.popout}>
                        <Home id="home" go={this.go} this={this} />
                        <Panel id="buy">

                            <div>
                                <PanelHeader left={<PanelHeaderBack onClick={() => this.setState({ homePanel: 'home' })} separator={false} />}>Покупка бумаги</PanelHeader>
                                <Tabs>
                                    <TabsItem
                                        onClick={() => this.setState({ activeTab2: 'music' })}
                                        selected={this.state.activeTab2 === 'music'}
                                    >
                                        Купить
              </TabsItem>
                                    <TabsItem
                                        onClick={() => this.setState({ activeTab2: 'recomendations' })}
                                        selected={this.state.activeTab2 === 'recomendations'}
                                    >
                                        Продать
              </TabsItem>
                                </Tabs>
                                {this.state.activeTab2 === 'music' && <div> <div class="ActivityPage">
                                    <div class="NumberView">
                                        <div class="NumberView__description">Курс продажи:</div>
                                        <div class="NumberView__value" >0.005 за 1КК</div>
                                    </div>
                                </div>
                                    <div class="ActivityPage">
                                        <div class="NumberView">
                                            <div class="NumberView__description">К оплате:</div>
                                            <div class="NumberView__value" >{this.state.pay}</div>

                                        </div>
                                    </div>
                                    <FormLayout>
                                        <FormLayoutGroup top="Сумма">
                                            <Input type="number" defaultValue="" onChange={this.lolChange} />
                                        </FormLayoutGroup>
                                    </FormLayout>

                                    <Div>
                                        <a href={`https://vk.com/paperscroll_games?w=app6887721_-198338494#donate_${this.state.pay}`} target='_blank' class='xui'><Button size="xl" mode="secondary">Купить</Button></a>
                                    </Div> </div>}

                                {this.state.activeTab2 === 'recomendations' && <div> {this.state.qiwi ? <div><div><div class="ActivityPage">
                                    <div class="NumberView">
                                        <div class="NumberView__description">Курс скупки:</div>
                                        <div class="NumberView__value" >0.004 за 1КК</div>
                                    </div>
                                </div>
                                </div>
                                    <FormLayout>
                                        <FormLayoutGroup top="Сумма">
                                            <Input type="number" defaultValue="" onChange={(e) => this.setState({ sell: e.target.value })} />
                                        </FormLayoutGroup>
                                    </FormLayout>

                                    <Div>
                                        <Button size="xl" mode="secondary" onClick={() => this.check(this.state.sell)}>Продать</Button>
                                    </Div>
                                    <center><Cell><Link onClick={() => this.setState({ activeModal: 'qiwi' })}>Изменить номер QIWI-кошелька</Link></Cell></center></div> : <div><center><h2 style={{ color: '#fff' }}>Не указан QIWI-кошелек!</h2></center>
                                        <Div>
                                            <Button size="xl" onClick={() => this.setState({ activeModal: 'qiwi' })}>Указать</Button>
                                        </Div>
                                    </div>}

                                </div>}
                                {this.state.snackbar}</div>
                        </Panel>
                    </View>
                    <View id="oops" modal={modal} activePanel={this.state.oopsPanel}>
                        <Panel id="oops">
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>

                                <div style={{
                                    display: "flex",
                                    "justify-content": "center",
                                    "align-items": "center"
                                }}>
                                    <h2 style={{ textAlign: 'center', color: 'var(--text_background)' }}>Отключен от сервера.</h2>
                                </div>

                                <div style={{
                                    display: "flex",
                                    "justify-content": "center",
                                    "align-items": "center"
                                }}>
                                    <Button style={{ height: '40px' }} stretched size='l' onClick={() => window.location.reload()} data-to='home'>Переподключиться</Button> <Button stretched Component='a' href='https://vk.com/justgame_official' target='_blank' mode='secondary' style={{ marginLeft: 5, height: '40px', width: '40px' }} size='l'><Icon28LogoVkOutline width={24} height={24} /></Button>
                                </div>



                            </div>


                        </Panel>

                        <Panel id="ban">

                            <div style={{ position: 'absolute', top: '50%', width:'100%', transform: 'translate(0%, -50%)'  }}>
                                <div style={{
                                    display: "flex",
                                    "justify-content": "center",
                                    "align-items": "center"
                                }}>
                                <Icon56InfoOutline width={48} height={48} fill={"red"} />
                                </div>
                                <div style={{
                                    display: "flex",
                                    "justify-content": "center",
                                    "align-items": "center"
                                }}>
                                    <h3 style={{ marginTop: 5, marginBottom:0, textAlign: 'center', color: 'var(--text_background)' }}>Ошибка</h3>
                                   

                                </div>

                                <div style={{
                                    display: "flex",
                                    "justify-content": "center",
                                    "align-items": "center"
                                }}>
                                     <p style={{ marginTop:10, textAlign:'center' }}>Ваш аккаунт заблокирован<br />Обратитесь в службу поддержки, чтобы получить подробную информацию</p>
                                </div>
                                <div style={{
                                    display: "flex",
                                    "justify-content": "center",
                                    "align-items": "center"
                                }}>
                                    <Button stretched onClick={() => window.location.reload()} mode='secondary' style={{ backgroundColor:'transparent', height: '40px', width: '40px', color:'blue' }} size='l'>Повторить попытку</Button>
                                </div>


                            </div>
                        </Panel>
                        <Panel id="disconnectserver">

                            <div style={{ position: 'absolute', top: '50%', width:'100%', transform: 'translate(0%, -50%)' }}>
                                <div style={{
                                    display: "flex",
                                    "justify-content": "center",
                                    "align-items": "center"
                                }}>
                                    <Icon56InfoOutline width={48} height={48} fill={"red"} />
                                </div>
                                <div style={{
                                    display: "flex",
                                    "justify-content": "center",
                                    "align-items": "center"
                                }}>
                                    <h3 style={{ marginTop: 5, marginBottom:0, textAlign: 'center', color: 'var(--text_background)' }}>Ошибка</h3>
                                   

                                </div>
                                <div style={{
                                    display: "flex",
                                    "justify-content": "center",
                                    "align-items": "center"
                                }}>
                                    <p style={{ marginTop: 10, textAlign: 'center', color: 'var(--text_background)' }}>Соединение с сервером разорвано<br />Попробуйте подключиться еще раз</p>

                                </div>

                                <div style={{
                                    display: "flex",
                                    "justify-content": "center",
                                    "align-items": "center"
                                }}>
<Button stretched onClick={() => window.location.reload()} mode='secondary' style={{ backgroundColor:'transparent', height: '40px', width: '40px', color:'blue' }} size='l'>Повторить попытку</Button>                                </div>


                            </div>
                        </Panel>
                    </View>
                    <View id="help" modal={modal} activePanel={this.state.helpPanel}>

                        <Panel id="help">
                            <PanelHeader left={<React.Fragment><PanelHeaderButton><Icon28HelpOutline fill={'black'} /></PanelHeaderButton></React.Fragment>} separator={false}>Другое</PanelHeader>



                            <div style={{ height:52 }}><a href='https://vk.com/justgame_official' target='_blank' class='xui' style={{backgroundColor:'white', border:'1px', borderStyle:'ridge', borderColor:'white'}}><Banner
                                before={<Icon28LogoVkOutline style={{ color: "var(--accent)" }} />}
                                asideMode="expand"
                                header="Наша группа"  style={{ marginTop:0 }} /></a></div>
                            
                            <div style={{ height: 60 }}><a href='https://vk.com/justgame_official_tp' target='_blank' class='xui' style={{backgroundColor:'white', border:'1px', borderStyle:'ridge', borderColor:'white'}}><Banner
                                before={<Icon28ShareOutline style={{ color: "var(--accent)" }} width={24} height={24} />}
                                asideMode="expand"
                                header="Тех.Поддержка"  style={{ marginTop:0 }} /></a></div>
                            {/*<Banner
                                onClick={() => this.setState({ helpPanel: 'notify' })}
                                before={<Icon28HistoryForwardOutline style={{ color: "var(--accent)" }} />}
                                asideMode="expand"
                                header="История баланса"
                                subheader="Все пополнения и выводы" />*/}


                        </Panel>
                        <Panel id='send'>

                            <PanelHeader left={<PanelHeaderBack onClick={() => this.setState({ helpPanel: 'help' })} />}>Перевод</PanelHeader>
                            <Div>
                                <div class="wrapper_send_money">
                                    <div class="send_money_title" style={{ color: 'var(--text_background)' }}>Перевести бумагу</div>
                                    <div class="send_money_inputs">
                                        <Input id="send_to" placeholder="ID" onChange={this.idChange} />
                                        <Input id="summ_transfer" placeholder="Сумма" onChange={this.sumChange} />
                                        <Button onClick={() => this.sendTransfer(this.state.sendId, this.state.sendSum)}>Перевести</Button>
                                    </div></div>
                            </Div>
                        </Panel>
                        <Panel id="buy">
                            <PanelHeader left={<PanelHeaderBack onClick={() => this.setState({ helpPanel: 'help' })} />}>Покупка бумаги</PanelHeader>
                            <div class="ActivityPage">
                                <div class="NumberView">
                                    <div class="NumberView__description">Курс:</div>
                                    <div class="NumberView__value" >0.01 за 1КК</div>
                                </div>
                            </div>
                            <div class="ActivityPage">
                                <div class="NumberView">
                                    <div class="NumberView__description">К оплате:</div>
                                    <div class="NumberView__value" >{this.state.pay}</div>

                                </div>
                            </div>
                            <FormLayout>
                                <FormLayoutGroup top="Сумма">
                                    <Input type="number" defaultValue="" onChange={this.lolChange} />
                                </FormLayoutGroup>
                            </FormLayout>

                            <Div>
                                <a href={`https://vk.com/hui?w=app6887721_-1#donate_${this.state.pay}`} target='_blank' class='xui'><Button size="xl" mode="secondary">Купить</Button></a>
                            </Div>
                            {this.state.snackbar}
                        </Panel>
                        <Panel id='notify'>
                            <PanelHeader left={<PanelHeaderBack onClick={() => this.setState({ helpPanel: 'help' })} />}>История</PanelHeader>
                            <br />
                            {Object.keys(this.state.notify).map((post) =>
                                <div key={this.state.notify[post].id}>
                                    {this.state.notify[post].icon === 'add' &&
                                        <CardGrid>
                                            <Card size="l">
                                                <RichCell
                                                    before={<Avatar size={48} style={{ 'background-color': "var(--button_commerce_background)" }}><Icon28AddOutline width={28} height={28} fill='#fff' /></Avatar>}
                                                    multiline
                                                    caption={`${this.state.notify[post].pered}${this.state.notify[post].sum} бумаги`}
                                                >
                                                    {this.state.notify[post].text}
                                                </RichCell>
                                            </Card>
                                        </CardGrid>}
                                    {this.state.notify[post].icon === 'withdraw' &&
                                        <CardGrid>
                                            <Card size="l">
                                                <RichCell
                                                    before={<Avatar size={48} style={{ 'background-color': "var(--button_commerce_background)" }}><Icon28RefreshOutline width={28} height={28} fill='#fff' /></Avatar>}
                                                    multiline
                                                    caption={`${this.state.notify[post].pered}${this.state.notify[post].sum} бумаги`}
                                                >
                                                    {this.state.notify[post].text}
                                                </RichCell>
                                            </Card>
                                        </CardGrid>}
                                    {this.state.notify[post].icon === 'buy' &&
                                        <CardGrid>
                                            <Card size="l">
                                                <RichCell
                                                    before={<Avatar size={48} style={{ 'background-color': "var(--button_commerce_background)" }}><Icon28MarketOutline width={28} height={28} fill='#fff' /></Avatar>}
                                                    multiline
                                                    caption={`${this.state.notify[post].pered}${this.state.notify[post].sum} бумаги`}
                                                >
                                                    {this.state.notify[post].text}
                                                </RichCell>
                                            </Card>
                                        </CardGrid>}
                                    {this.state.notify[post].icon === 'ref' &&
                                        <CardGrid>
                                            <Card size="l">
                                                <RichCell
                                                    before={<Avatar size={48} style={{ 'background-color': "var(--button_commerce_background)" }}><Icon28Users3Outline width={28} height={28} fill='#fff' /></Avatar>}
                                                    multiline
                                                    caption={`${this.state.notify[post].pered}${this.state.notify[post].sum} бумаги`}
                                                >
                                                    {this.state.notify[post].text}
                                                </RichCell>
                                            </Card>
                                        </CardGrid>}
                                    {this.state.notify[post].icon === 'give' &&
                                        <CardGrid>
                                            <Card size="l">
                                                <RichCell
                                                    before={<Avatar size={48} style={{ 'background-color': "var(--button_commerce_background)" }}><Icon28StatisticsOutline width={28} height={28} fill='#fff' /></Avatar>}
                                                    multiline
                                                    caption={`${this.state.notify[post].pered}${this.state.notify[post].sum} бумаги`}
                                                >
                                                    {this.state.notify[post].text}
                                                </RichCell>
                                            </Card>
                                        </CardGrid>}
                                </div>
                            )}
                            {this.state.snackbar}
                        </Panel>
                        <Panel id="admin">
                            <PanelHeader left={<PanelHeaderBack onClick={() => this.setState({ helpPanel: 'help' })} />}>Админка</PanelHeader>

                            <Group header={<Header mode="secondary" aside={<Icon16Dropdown onClick={this.open6} style={{ transform: `rotate(${this.state.isOpen6 ? '180deg' : '0'})` }} />}>Статистика</Header>}>
                                {this.state.isOpen6 ? <div>
                                    <div class="ActivityPage">
                                        <div class="NumberView">
                                            <div class="NumberView__description">Банк всех пользователей</div>
                                            <div class="NumberView__value" >{number_format(this.state.admin.bank, 0, '.', ' ')}</div>

                                        </div>
                                        <br />
                                        <div class="NumberView">
                                            <div class="NumberView__description">Всего выиграно монет</div>
                                            <div class="NumberView__value" >{number_format(this.state.admin.win, 0, '.', ' ')}</div>

                                        </div>


                                    </div>
                                </div> : null}
                            </Group>

                            <Group header={<Header mode="secondary" aside={<Icon16Dropdown onClick={!this.state.isOpen1 ? this.open1 : this.close1} style={{ transform: `rotate(${this.state.isOpen1 ? '180deg' : '0'})` }} />}>Выдача монет</Header>}>
                                {this.state.isOpen1 && <div>
                                    <FormLayout>
                                        <FormLayoutGroup top="ID">
                                            <Input type="number" defaultValue="" onChange={this.adminidChange} />
                                        </FormLayoutGroup>
                                    </FormLayout>
                                    <FormLayout>
                                        <FormLayoutGroup top="Сумма">
                                            <Input type="number" defaultValue="" onChange={this.adminsumChange} />
                                        </FormLayoutGroup>
                                    </FormLayout>

                                    <Div>
                                        <Button size="xl" mode="secondary" onClick={() => this.give(this.state.adminId, this.state.adminSum)}>Выдать</Button>
                                    </Div>
                                </div>}
                            </Group>
                            <Group header={<Header mode="secondary" aside={<Icon16Dropdown onClick={!this.state.isOpen2 ? this.open2 : this.close2} style={{ transform: `rotate(${this.state.isOpen2 ? '180deg' : '0'})` }} />}>Бан/разбан</Header>}>
                                {this.state.isOpen2 && <div>
                                    <FormLayout>
                                        <FormLayoutGroup top="ID">
                                            <Input type="number" defaultValue="" onChange={this.adminidChange} />
                                        </FormLayoutGroup>
                                    </FormLayout>

                                    <Div>
                                        <Button size="xl" mode="destructive" onClick={() => this.ban(this.state.adminId)}>Забанить</Button>
                                    </Div>
                                    <Div>
                                        <Button size="xl" mode="commerce" onClick={() => this.unban(this.state.adminId)}>Разбанить</Button>
                                    </Div>
                                </div>}
                            </Group>
                            <Group header={<Header mode="secondary" aside={<Icon16Dropdown onClick={!this.state.isOpen3 ? this.open3 : this.close3} style={{ transform: `rotate(${this.state.isOpen3 ? '180deg' : '0'})` }} />}>Лимиты на вывод</Header>}>
                                {this.state.isOpen3 && <div>
                                    <FormLayout>
                                        <FormLayoutGroup top="ID">
                                            <Input type="number" defaultValue="" onChange={this.adminidChange} />
                                        </FormLayoutGroup>
                                    </FormLayout>
                                    <FormLayout>
                                        <FormLayoutGroup top="Сумма лимита">
                                            <Input type="number" defaultValue="" onChange={this.adminsumChange} />
                                        </FormLayoutGroup>
                                    </FormLayout>

                                    <Div>
                                        <Button size="xl" mode="secondary" onClick={() => this.limit(this.state.adminId, this.state.adminSum)}>Установить лимит</Button>
                                    </Div>
                                </div>}
                            </Group>
                            <Group header={<Header mode="secondary" aside={<Icon16Dropdown onClick={!this.state.isOpen4 ? this.open4 : this.close4} style={{ transform: `rotate(${this.state.isOpen4 ? '180deg' : '0'})` }} />}>Сообщение от имени модератора</Header>}>
                                {this.state.isOpen4 && <div>
                                    <FormLayout>
                                        <FormLayoutGroup top="Текст сообщения">
                                            <Textarea defaultValue="" onChange={this.admintextChange} />
                                        </FormLayoutGroup>
                                    </FormLayout>

                                    <Div>
                                        <Button size="xl" mode="secondary" onClick={() => this.modermsg(this.state.admintext)}>Отправить</Button>
                                    </Div>
                                </div>}
                            </Group>
                            {this.state.snackbar}
                        </Panel>
                    </View>
                    <View id="services" activePanel="services">
                        <Panel id="services">
                            <PanelHeader left={<React.Fragment><PanelHeaderButton><Icon28GraphOutline fill={'black'} /></PanelHeaderButton></React.Fragment>} separator={false}>Рейтинг</PanelHeader>

                            <div>
                                {this.state.active == 'PaperScroll' ? <div>{Object.keys(this.state.dayTop).map((post) =>
                                    <div key={this.state.dayTop[post].id} style={{ marginBottom: '10px',
    paddingRight: '3px',
    paddingLeft: '3px' }}>

                                        {post < 50 ? <div>{this.state.dayTop[post].balance >= 0 &&
                                            <a href={`https://vk.com/id${this.state.dayTop[post].id}`} target='_blank' class='xui'><Cell
                                                idtop={Number(post) + 1}
                                                style={{background: 'white',margin: '1%',borderRadius: '20px'}}
                                                indicator={ <React.Fragment>{post < 1 ? <center style={{ paddingRight:'5px' }}><span style={{ fontSize: '13px', fontWeight:'500' }}>получит</span><br/><span style={{ fontSize:'18px', color:`${this.state.topcolors[post]}`, fontWeight:'bold' }}>15 000 ₽</span></center>: ''}</React.Fragment> }
                                                key={Number(post) + 1}
                                            >

                                                <div style={{ display: 'flex' }}><span style={{ marginRight:'2.5%', color:'black', fontWeight:'bold', fontSize:'18px', paddingTop:'12px' }}>{Number(post) + 1}</span><span style={{ marginRight:'2.5%' }}><Avatar src={this.state.dayTop[post].photo } loading="lazy" /></span> {this.state.dayTop[post].name}<br />{number_format(this.state.dayTop[post].balance, 0, '.', ' ')} PS</div>  </Cell> </a>
                                        }
                                        </div> : null}
                                    </div>
                                )}</div> : <center><p style={{ color:'black' }}>Скоро будет...</p></center> }
                            </div>
                        </Panel>
                    </View>

                    <View id="messages" activePanel="messages">
                        <Panel id="messages">
                            <PanelHeader left={<React.Fragment><PanelHeaderButton><Icon28MessagesOutline /></PanelHeaderButton></React.Fragment> } separator={false}>Чат</PanelHeader>
                            {Object.keys(this.state.messages).map((post) =>
                                <div key={1}>

                                    <div class="left-messages" onClick={() => window.location.href = `https://vk.com/id${this.state.messages[post].id}`}><img  class="av-l" src={this.state.messages[post].photo} alt="Avatar" />
                                        <div class="message-l-box">
                                            <p class="message-name">{this.state.messages[post].name}</p>
                                            <p>{this.state.messages[post].msg}</p>

                                        </div>
                                    </div>

                                </div>
                            )}
                            <br />
                            <br />
                            <Div />
                            <FixedLayout vertical="bottom" style={{ 'background-color': '#F0F2F5' }}>
                                <Cell
                                    asideContent={
                                        <Button onClick={() => this.message(this.state.messageText)}
                                        >
                                            <Icon24Send />
                                        </Button>
                                    }
                                >
                                    <Input name="message" placeholder="Ваше сообщение" defaultValue={this.state.messageText} onChange={this.messageChange} /> </Cell>
                            </FixedLayout>

                            {this.state.snackbar}
                        </Panel>
                    </View>
                    <View id="games" modal={modal} popout={this.state.popoutres} activePanel={this.state.gamesPanel}>
                        <Panel id="games">
                            <PanelHeader left={<React.Fragment><PanelHeaderButton><Icon28GameOutline fill={'black'} /></PanelHeaderButton></React.Fragment> } separator={false}>Игры</PanelHeader>
                            
                            <div style={{ marginTop:'1%' }}>

                                {/*<CardGrid>
                                <Card size="l" mode="outline" onClick={this.goGames} data-to='wheel' style={{ backgroundColor:'white' }}>
                                        <div class='gameImg228'>
                                        </div>
                                        
                                        <center><p style={{ marginBottom:'1%', marginTop:0, fontFamily:'Montserrat', fontSize:'19px' }}>DREAM CATCHER</p></center>
                                        

                                    </Card>
                                </CardGrid>*/}

                                {/*<CardGrid>
                                <Card size="l" mode="outline" onClick={this.goGames} data-to='b7m' style={{ backgroundColor:'white' }}>
                                        <div class='gameImg9132'>
                                        </div>
                                        
                                        <center><p style={{ marginBottom:'1%', marginTop:0, fontFamily:'Montserrat', fontSize:'19px' }}>Down 7 Up</p></center>
                                        

                                    </Card>
                                </CardGrid>*/}


                                <CardGrid>

                                    {/*<Card size="m" mode="outline" onClick={this.goGames} data-to='wheel' style={{ backgroundColor:'white' }}>
                                        <div class='gameImg'>
                                        </div>
                                        
                                        <center><p style={{ marginBottom:'1%', marginTop:0, fontFamily:'Montserrat', fontSize:'19px' }}>WHEEL</p></center>
                                        

                                    </Card>*/}

                                    <Card size="m" mode="outline" onClick={this.goGames} data-to='wheelv2' style={{ backgroundColor:'white' }}>
                                        <div class='gameImg913'>
                                        </div>
                                        
                                        <center><p style={{ marginBottom:'1%', marginTop:0, fontFamily:'Montserrat', fontSize:'19px' }}>Wheel</p></center>
                                        

                                    </Card>
                                    
                                    <Card size="m" mode="outline" onClick={this.goGames} data-to='slots' style={{ backgroundColor:'white' }}>
                                        <div class='gameImg91323'>
                                        </div>
                                        
                                        <center><p style={{ marginBottom:'1%', marginTop:0, fontFamily:'Montserrat', fontSize:'19px' }}>Dice</p></center>
                                        

                                    </Card>
                                    {/*
                                    <Card size="m" mode="outline" onClick={this.goGames} data-to='double' style={{ backgroundColor:'white' }}>
                                        <div class='gameImg913'>
                                        </div>
                                        
                                        <center><p style={{ marginBottom:'1%', marginTop:0, fontFamily:'Montserrat', fontSize:'19px' }}>Double</p></center>
                                        

                                    </Card>*/}
                                    {/*<Card size="s" mode="outline" onClick={this.goGames} data-to='wheel' style={{ backgroundColor:'white' }}>
                                        <div class='gameImg2281'>
                                        </div>
                                        
                                        <center><h3 style={{ marginBottom:'1%', marginTop:0, fontFamily:'Montserrat', fontSize:'19px' }}>DOUBLE</h3></center>
                                        

                                    </Card>*/}



                                </CardGrid>

                                
                                {/*<CardGrid>
                                    <Card size="m" mode="outline" onClick={this.goGames} data-to='reshka'>
                                        <div class='gameImg2'>
                                        </div>
                                        
                                        <center><h3>COINFLIP</h3></center>
                                        
                                    </Card>
                                    <Card size="m" mode="outline" onClick={this.goGames} data-to='stakan'>
                                        <div class='gameImg5'>
                                        </div>
                                        
                                        <center><h3>THIMBLE</h3></center>
                                        

                                    </Card>
                                    
                                </CardGrid>*/}

                                {/*<CardGrid>
                                    <Card size="l" mode="outline" onClick={this.goGames} data-to='b7m' style={{ backgroundColor:'white' }}>
                                        <div class='gameImg913'>
                                        </div>
                                        
                                        <center><p style={{ marginBottom:'1%', marginTop:0, fontFamily:'Montserrat', fontSize:'19px' }}>Down 7 Up</p></center>
                                        

                                    </Card>
                                </CardGrid>*/}

                             
                            </div>
                            
                            
                        </Panel>
                        <Panel id="chat">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='games' /> } separator={false}>Чат</PanelHeader>
                            {Object.keys(this.state.messages).map((post) =>
                                <div key={1}>
                                    <Div>
                                        <div class="all_message_wrapp">
                                            <div style={{ display: 'flex' }}>
                                                <div class="message_wrapp">
                                                    <div class="message_title" style={{ color: '#000' }}>{this.state.messages[post].name}
                                                        <div class="flash">
                                                        </div>
                                                    </div>
                                                    <div class="message_text" style={{ color: '#000' }}>{this.state.messages[post].msg}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Div>

                                </div>
                            )}
                            <br />
                            <br />
                            <Div />
                            <FixedLayout vertical="bottom" style={{ 'background-color': 'var(--support_background)' }}>
                                <Cell
                                    asideContent={
                                        <Button onClick={() => this.message(this.state.messageText)}
                                        >
                                            <Icon24Send />
                                        </Button>
                                    }
                                >
                                    <Input name="message" placeholder="Ваше сообщение" value={this.state.messageText} onChange={this.messageChange} /> </Cell>
                            </FixedLayout>

                        </Panel>
                        <Panel id="nvuti">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='games' />}>Nvuti</PanelHeader>
                            <Div />
                            <CardGrid>
                                <Card size="l">
                                    <Div>
                                        <center><div>{number_format(this.state.balance, 0, '.', ' ')} бумаги</div></center>
                                    </Div>
                                </Card>
                            </CardGrid>
                            <CardGrid>
                                <Card size="l">
                                    <div style={{ height: 10 }} />
                                    <center><h2 style={{ color: '#fff' }}>Nvuti</h2></center>
                                    <div style={{ height: 20 }} />
                                    <center><h3>Шанс: {this.state.nvutiChance}% || Коэфицент: {this.state.nvutiChance == '85' && 'x1.12'}{this.state.nvutiChance == '80' && 'x1.19'}{this.state.nvutiChance == '75' && 'x1.27'}{this.state.nvutiChance == '70' && 'x1.36'}{this.state.nvutiChance == '65' && 'x1.46'}{this.state.nvutiChance == '60' && 'x1.58'}{this.state.nvutiChance == '55' && 'x1.73'}{this.state.nvutiChance == '50' && 'x1.90'}{this.state.nvutiChance == '45' && 'x2.11'}{this.state.nvutiChance == '40' && 'x2.38'}{this.state.nvutiChance == '35' && 'x2.71'}{this.state.nvutiChance == '30' && 'x3.17'}{this.state.nvutiChance == '25' && 'x3.80'}{this.state.nvutiChance == '20' && 'x4.75'}{this.state.nvutiChance == '15' && 'x6.33'}{this.state.nvutiChance == '10' && 'x9.50'}{this.state.nvutiChance == '5' && 'x19.00'}{this.state.nvutiChance == '1' && 'x95'}</h3></center>
                                    <div style={{ height: 5 }} />
                                    <Slider
                                        step={5}
                                        value={this.state.nvutiChance}
                                        min={5}
                                        onChange={nvutiChance => this.setState({ nvutiChance })}
                                        max={85}
                                    />
                                    <div style={{ height: 20 }} />
                                </Card>
                            </CardGrid>

                            <FormLayout>
                                <FormLayoutGroup top="Ваша ставка">
                                    <Input type="number" defaultValue="" onChange={this.nvutisumChange} />
                                </FormLayoutGroup>
                            </FormLayout>
                            <Div style={{ display: 'flex' }}>
                                <Button size="l" stretched style={{ marginRight: 8 }} onClick={() => this.nvuti(this.state.nvutiChance, this.state.nvutiSum, 'small')}>Меньше</Button>
                                <Button size="l" stretched mode="destructive" onClick={() => this.nvuti(this.state.nvutiChance, this.state.nvutiSum, 'big')}>Больше</Button>
                            </Div>
                            
                        </Panel>
                        <Panel id="stakan">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='games' />}>Стаканчики</PanelHeader>
                            <br />
                            <CardGrid>
                                <Card size="l">
                                    <Div>
                                        <center><div>{number_format(this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 0, 0, '.', ' ')} {this.state.active === 'PaperScroll' ? 'PS' : this.state.active === 'CoronaCoin' ? 'CC' : this.state.active === 'VKCoin' ? 'VKC' : this.state.active === 'GameCoin' ? 'GC' : ''}</div></center>
                                    </Div>
                                </Card>
                            </CardGrid>

                            <CardGrid>
                                <Card size="l">
                                    <div style={{ height: 10 }} />
                                    <center><h2 style={{ color: '#fff' }}>Стаканчики</h2></center>
                                    <div style={{ height: 20 }} />
                                    <center><h3>{this.state.stakans} {this.state.stakans === 3 ? 'стаканчика' : 'стаканчиков'}</h3></center>
                                    <div style={{ height: 5 }} />
                                    <Slider
                                        step={3}
                                        value={this.state.stakans}
                                        min={3}
                                        onChange={stakans => this.setState({ stakans })}
                                        max={6}
                                    />
                                    <div style={{ height: 20 }} />
                                </Card>
                            </CardGrid>

                            <FormLayout>
                                <FormLayoutGroup top="Ваша ставка">
                                    <Input type="number" defaultValue="" onChange={this.thimblesumChange} />
                                </FormLayoutGroup>
                            </FormLayout>
                            <Div>
                                <Button size="xl" onClick={this.goThimble}>Играть</Button>
                            </Div>
                            {this.state.snackbar}
                        </Panel>
                        <Panel id="wheelv2">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='games' />} separator={false}>Wheel</PanelHeader>
                            <CardGrid style={{ marginTop:0 }}>
                                <Card size="l" style={{ backgroundColor:'white' }}>
                                    <Div>
                                        <center><div style={{ color:'black' }}>{number_format(this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 0, 0, '.', ' ')} {this.state.active === 'PaperScroll' ? 'PS' : this.state.active === 'CoronaCoin' ? 'CC' : this.state.active === 'VKCoin' ? 'VKC' : this.state.active === 'GameCoin' ? 'GC' : ''}</div></center>
                                    </Div>
                                </Card>
                            </CardGrid>
                            <CardGrid>
                            <Card size="l" style={{backgroundColor:'white'}} >
                            <Header mode="secondary" style={{ color:'black', paddingLeft: '8px', height:'30px' }} className="notvidel">История игр</Header>
                                 <HorizontalScroll>
                                     <div style={{display: 'flex'}}>
                                        {Object.keys(this.state.wheelWins).map((post) =>
                                            <Div key={1} style={{paddingTop:'6px', paddingBottom:'6px', paddingRight:0, paddingLeft:'8px'}}>
                                                <div  className={'ResultsBox'} style={{ color:'white', backgroundColor: this.state.wheelWins[post].color == '8BC34A' ? '#8BC34A' : this.state.wheelWins[post].color }}>
                                                <div class='text'>{this.state.wheelWins[post].number}</div>
                                                </div>
                                            </Div>
                                        )}
                                    </div>
                                </HorizontalScroll>
                            </Card>
                            </CardGrid>
                            {!this.state.wheelRes ? <div>
                                <CardGrid>
                                    <Card size="l" style={{ backgroundColor:'white' }}>
                                        
                                       {this.state.wheelData.time == 61 ?
                                        <div style={{ marginTop: 40, marginBottom:40 }}><center><Icon56RecentOutline fill={'black'} /><h2 style={{ color: 'black' }}>Ожидание ставок...</h2></center></div>
                                            : 
                                           <div style={{ marginTop: 64.5, marginBottom: 64.5 }}><center><h1 style={{ color: 'black', marginTop:'1%', marginBottom:'1%', fontSize:'50px' }}>{this.state.wheelData.time}</h1></center></div>
                                        }

                                        
                                    </Card>
                                </CardGrid>

                                <Div style={{ display: 'flex', paddingBottom:'1%' }}>
                                    <Button size="l" stretched style={{ width:'50%', marginRight: 4, color:'white',paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#F44336'  }} onClick={() => this.setState({ activeModal:'wheelstavkared' })}>Красное</Button>
                                    <Button size="l" stretched style={{width:'50%', color:'white',  paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#101010' }} onClick={() => this.setState({ activeModal:'wheelstavkablack' })}>Черное</Button>
                                 </Div>
                                <Div style={{ display: 'flex',  paddingTop:0, paddingBottom:'1%' }}>
                                    <Button size="l" stretched style={{width:'50%',  marginRight: 4, color:'white',  paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#009688' }} onClick={() => this.setState({ activeModal:'wheelstavkaeven' })}>Четное</Button>
                                    <Button size="l" stretched style={{width:'50%',   color:'white',  paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#607D8B' }} onClick={() => this.setState({ activeModal:'wheelstavkanoteven' })}>Нечетное</Button>

                                </Div>
                                <Div style={{ display: 'flex', paddingBottom:0, paddingTop:0 }}>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'39%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#3F51B5' }} onClick={() => this.setState({ activeModal:'wheelstavka118' })}>1-18</Button>
                                                                        <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'19%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#8BC34A'  }}  onClick={() => this.setState({ activeModal:'wheelstavkanum', wheelnummodal:0 })}>0</Button>
                                    <Button size="l" stretched style={{  color:'white', width:'39%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#3F51B5' }} onClick={() => this.setState({ activeModal:'wheelstavka1936' })}>19-36</Button>

                                </Div>
                                <Div style={{ display: 'flex', paddingBottom:0, paddingTop:'1%'}}>
                                    <Button size="l" stretched style={{width:'33%',  marginRight: 4, color:'white',  paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#3F51B5' }} onClick={() => this.setState({ activeModal:'wheelstavka112' })}>1-12</Button>
                                    <Button size="l" stretched style={{width:'33%',  marginRight: 4, color:'white',  paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#3F51B5' }} onClick={() => this.setState({ activeModal:'wheelstavka1324' })}>13-24</Button>
                                    <Button size="l" stretched style={{width:'33%',   color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#3F51B5' }} onClick={() => this.setState({ activeModal:'wheelstavka2536' })}>25-36</Button>
                                </Div>
                                <Div style={{ display: 'flex', paddingTop:'1%' }}>
                                    <Button size="l" stretched mode='commerce' style={{  color:'white',  paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#2196F3' }} onClick={() => this.setState({ activeModal:'wheelstavkanumselect' })} before={<Icon24LinkCircle fill={'white'}  />}>Поставить на число</Button>

                                </Div>


                                <Group style={{color:'black'}} >
                                    
                                    {Object.keys(this.state.wheelData.users).map((post) =>
                                        <div key={1}>
                                                 <CardGrid>
                                        <Card size="l" style={{backgroundColor:'white',color:'black'}}>
                                            <Cell style={{color:'black'}}
                                                idtop={Number(post) + 1}
                                                before={<Link target="_blank" onClick={(event) => { event.preventDefault(); window.open(`https://vk.com/id${this.state.wheelData.users[post].id}`); }} ><Avatar size={40} src={this.state.wheelData.users[post].photo} /></Link>}
                                                indicator={<span style={{ background: this.state.wheelData.users[post].bg,
    color: 'white',
    padding: '20px',
    paddingRight: '10px',
    paddingLeft: '10px' }}>{this.state.wheelData.users[post].text }</span> } key={Number(post) + 1}
                                                description={<span style={{ paddingLeft:'10px'  }}>{number_format(this.state.wheelData.users[post].sum)} {this.state.wheelData.users[post].valuta}</span>}
                                            >
                                                <span style={{ paddingLeft:'10px'  }}>{this.state.wheelData.users[post].name} </span> </Cell>
                                                </Card>
                                                    </CardGrid>
                                        </div>
                                    )}
                                </Group>
                                <Footer style={{ color:'black' }} className="videl">Hash: {this.state.wheelData.hash}</Footer>
                            </div>
                                :
                                <div>
                                    <CardGrid style={{ height:210}}>
                                        <Card size="l" style={{backgroundColor:'white', height:210}}>



<div class="wheelBlock">
<div class="wheelObject">
<div class="wrapper">
<div class="wheelRotators" >
<div class="wheel">
</div>
</div>
<div className={"ballRotators"} id={`${this.state.resWheelNumber == 0 ? 'deg181' :  this.state.resWheelNumber == 1 ? 'deg44' : this.state.resWheelNumber == 2 ? 'deg239' : this.state.resWheelNumber == 3 ? 'deg161' : this.state.resWheelNumber == 4 ? 'deg220' : this.state.resWheelNumber == 5 ? 'deg365' : this.state.resWheelNumber == 6 ? 'deg277' : this.state.resWheelNumber == 7 ? 'deg122' : this.state.resWheelNumber == 8 ? 'deg336' : this.state.resWheelNumber == 9 ? 'deg83' : this.state.resWheelNumber == 10 ? 'deg355' : this.state.resWheelNumber == 11 ? 'deg316' : this.state.resWheelNumber == 12 ? 'deg142' : this.state.resWheelNumber == 13 ? 'deg297' : this.state.resWheelNumber == 14 ? 'deg64' : this.state.resWheelNumber == 15 ? 'deg200' : this.state.resWheelNumber == 16 ? 'deg25' : this.state.resWheelNumber == 17 ? 'deg258' : this.state.resWheelNumber == 18 ? 'deg103' : this.state.resWheelNumber == 19 ? 'deg210' : this.state.resWheelNumber == 20 ? 'deg54' : this.state.resWheelNumber == 21 ? 'deg229' : this.state.resWheelNumber == 22 ? 'deg93' : this.state.resWheelNumber == 23 ? 'deg345' : this.state.resWheelNumber == 24 ? 'deg15' : this.state.resWheelNumber == 25 ? 'deg249' : this.state.resWheelNumber == 26 ? 'deg171' : this.state.resWheelNumber == 27 ? 'deg287' : this.state.resWheelNumber == 28 ? 'deg132' : this.state.resWheelNumber == 29 ? 'deg112' : this.state.resWheelNumber == 30 ? 'deg326' : this.state.resWheelNumber == 31 ? 'deg74' : this.state.resWheelNumber == 32 ? 'deg190' : this.state.resWheelNumber == 33 ? 'deg34' : this.state.resWheelNumber == 34 ? 'deg268' : this.state.resWheelNumber == 35 ? 'deg152' :  this.state.resWheelNumber == 36 ? 'deg306' : 'st'}`} >

<div class="ballWrapper">
<div class="ball">
</div>
</div>
</div>
</div>
<div className={`results${this.state.resWheelColor}`}>
<div style={{ lineHeight:'60px', fontSize:'28px', fontWeight:'bold' }}>{this.state.resWheelNumber}</div>
</div>
</div>
</div>
 
                                        </Card>
                                    </CardGrid>
                                    <div>
                                        {Object.keys(this.state.resWheelPlayers).map((post) =>
                                            <div key={1}>
                                                 <CardGrid>
                                        <Card size="l" style={{backgroundColor:'white',color:'black'}}>
                                                <Cell style={{color:'white'}}
                                                    idtop={Number(post) + 1}
                                                    before={<Link target="_blank" onClick={(event) => { event.preventDefault(); window.open(`https://vk.com/id${this.state.resWheelPlayers[post].id}`); }} ><Avatar size={40} src={this.state.resWheelPlayers[post].photo}   /></Link>}
                                                indicator={<span style={{ background: this.state.resWheelPlayers[post].bg,
    color: 'white',
    padding: '20px',
    paddingRight: '10px',
    paddingLeft: '10px' }}>{this.state.resWheelPlayers[post].text}</span>} 
                                                key={Number(post) + 1}

                                                    key={Number(post) + 1}
                                                    description={<span style={{ color: this.state.resWheelPlayers[post].win  == true ? 'green' : this.state.resWheelPlayers[post].win == false ? 'red' : 'black', paddingLeft:'10px' }}>{this.state.resWheelPlayers[post].win == true ? '+' : this.state.resWheelPlayers[post].win == false ? '-' : ''}{number_format(this.state.resWheelPlayers[post].sum)} {this.state.resWheelPlayers[post].valuta}</span>}
                                                >
                                                    <span style={{ paddingLeft:'10px'  }}>{this.state.resWheelPlayers[post].name}</span> </Cell>
                                                    </Card>
                                                    </CardGrid>
                                            </div>
                                        )}
                                    </div>


                                        <Footer style={{ color:'black', marginBottom:0 }} className="videl">Hash: {this.state.wheeloldHash}</Footer>
                                        <Footer style={{ color:'black', marginTop:'1%' }} className="videl">md5: {this.state.wheeloldString}</Footer>
                                </div>
                            }

                            {this.state.snackbar}
                        </Panel>
                        <Panel id="slots">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='games' />} separator={false}>Dice</PanelHeader>
                            <CardGrid style={{ marginTop:0 }}>
                                <Card size="l" style={{ backgroundColor:'white' }}>
                                    <Div>
                                        <center><div style={{ color:'black' }}>{number_format(this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 0, 0, '.', ' ')} {this.state.active === 'PaperScroll' ? 'PS' : this.state.active === 'CoronaCoin' ? 'CC' : this.state.active === 'VKCoin' ? 'VKC' : this.state.active === 'GameCoin' ? 'GC' : ''}</div></center>
                                    </Div>
                                </Card>
                            </CardGrid>
                            <CardGrid>
                            <Card size="l" style={{backgroundColor:'white'}} >
                            <Header mode="secondary" style={{ color:'black', paddingLeft: '8px', height:'30px' }} className="notvidel">История игр</Header>
                                 <HorizontalScroll>
                                     <div style={{display: 'flex'}}>
                                        {Object.keys(this.state.diceWins).map((post) =>
                                            <Div key={1} style={{paddingTop:'6px', paddingBottom:'6px', paddingRight:0, paddingLeft:'8px'}}>
                                                <div class={`ResultsBox ${this.state.diceWins[post].color == 0 ? 'even' : 'noteven'}`}>
                                                <div class='text'>{this.state.diceWins[post].number}</div>
                                                </div>
                                            </Div>
                                        )}
                                    </div>
                                </HorizontalScroll>
                            </Card>
                            </CardGrid>
                            {!this.state.dicesRes ? <div>
                                <CardGrid>
                                    <Card size="l" style={{ backgroundColor:'white' }}>
                                        
                                       {this.state.dicesData.time == 31 ?
                                        <div style={{ marginTop: 40, marginBottom:40 }}><center><Icon56RecentOutline fill={'black'} /><h2 style={{ color: 'black' }}>Ожидание ставок...</h2></center></div>
                                            : 
                                           <div style={{ marginTop: 64.5, marginBottom: 64.5 }}><center><h1 style={{ color: 'black', marginTop:'1%', marginBottom:'1%', fontSize:'50px' }}>{this.state.dicesData.time}</h1></center></div>
                                        }

                                        
                                    </Card>
                                </CardGrid>
                                 <Div style={{ display: 'flex'}}>

                                                                        <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'24%', backgroundColor:'#FFC107' }} onClick={() => this.addddiceinput(`${this.state.active === 'PaperScroll' ? '100000000' : '100000'}`)}>{this.state.active === 'PaperScroll' ? '+100KK' : '+100K'}</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'24%', backgroundColor:'#8BC34A'   }} onClick={() => this.addddiceinput(`${this.state.active === 'PaperScroll' ? '250000000' : '1000000'}`)}>{this.state.active === 'PaperScroll' ? '+250KK' : '+1KK'}</Button>
                                    <Button size="l" stretched style={{marginRight: 4, color:'white', width:'24%', backgroundColor:'#03A9F4'  }} onClick={() => this.addddiceinput(`${this.state.active === 'PaperScroll' ? '500000000' : '10000000'}`)}>{this.state.active === 'PaperScroll' ? '+500KK' : '+10KK'}</Button>
                                    <Button size="l" stretched style={{color:'white', width:'24%', backgroundColor:'#E91E63'  }} onClick={() => this.addddiceinput(`${this.state.active === 'PaperScroll' ? '1000000000' : '50000000'}`)}>{this.state.active === 'PaperScroll' ? '+1KKK' : '+50KK'}</Button>

                                </Div>
                                <FormLayout style={{ paddingBottom:0, color:'black' }}>
                                    <FormLayoutGroup>
                                        <Input type="number" id="inputdice" defaultValue="" placeholder="Ваша ставка" onChange={(e) => this.setState({ dicesSum: e.target.value })} />
                                    </FormLayoutGroup>
                                </FormLayout>
                                <Div style={{ display: 'flex', paddingBottom:'1%', paddingTop:0 }}>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#4CAF50'  }} onClick={() => this.dices(this.state.dicesSum, 'number', '1')}>1</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#4CAF50'  }} onClick={() => this.dices(this.state.dicesSum, 'number', '2')}>2</Button>
                                    <Button size="l" stretched style={{color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#4CAF50' }} onClick={() => this.dices(this.state.dicesSum, 'number', '3')}>3</Button>
                                 </Div>
                                <Div style={{ display: 'flex', paddingBottom:0, paddingTop:0 }}>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#4CAF50' }} onClick={() => this.dices(this.state.dicesSum, 'number', '4')}>4</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#4CAF50' }} onClick={() => this.dices(this.state.dicesSum, 'number', '5')}>5</Button>
                                    <Button size="l" stretched style={{color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#4CAF50' }} onClick={() => this.dices(this.state.dicesSum, 'number', '6')}>6</Button>
                                </Div>
                                <Div style={{ display: 'flex', paddingTop:'1%' }}>
                                    <Button size="l" stretched mode='commerce' style={{ marginRight: 4, color:'white', width:'49%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#2196F3' }} onClick={() => this.dices(this.state.dicesSum, 'ev', 'even')}>Четное</Button>
                                    <Button size="l" stretched style={{color:'white', width:'49%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#607D8B'  }} mode='commerce' onClick={() => this.dices(this.state.dicesSum, 'ev', 'noteven')}>Нечетное</Button>
                                </Div>


                                <Group style={{color:'black'}} >
                                    
                                    {Object.keys(this.state.dicesData.users).map((post) =>
                                        <div key={1}>
                                                 <CardGrid>
                                        <Card size="l" style={{backgroundColor:'white',color:'black'}}>
                                            <Cell style={{color:'black'}}
                                                idtop={Number(post) + 1}
                                                before={<Link target="_blank" onClick={(event) => { event.preventDefault(); window.open(`https://vk.com/id${this.state.dicesData.users[post].id}`); }} ><Avatar size={40} src={this.state.dicesData.users[post].photo} /></Link>}
                                                indicator={<span className={`${this.state.dicesData.users[post].text == 'Ставка на 1' ? 'numberstavka' : this.state.dicesData.users[post].text == 'Ставка на 2' ? 'numberstavka' : this.state.dicesData.users[post].text == 'Ставка на 3' ? 'numberstavka' : this.state.dicesData.users[post].text == 'Ставка на 4' ? 'numberstavka' : this.state.dicesData.users[post].text == 'Ставка на 5' ? 'numberstavka' : this.state.dicesData.users[post].text == 'Ставка на 6' ? 'numberstavka' : this.state.dicesData.users[post].text == 'Ставка на четное' ? 'evenstavka' : this.state.dicesData.users[post].text == 'Ставка на нечетное' ? 'notevenstavka' : '' }`}>{this.state.dicesData.users[post].text == 'Ставка на 1' ? '1' : this.state.dicesData.users[post].text == 'Ставка на 2' ? '2' : this.state.dicesData.users[post].text == 'Ставка на 3' ? '3' : this.state.dicesData.users[post].text == 'Ставка на 4' ? '4' : this.state.dicesData.users[post].text == 'Ставка на 5' ? '5' : this.state.dicesData.users[post].text == 'Ставка на 6' ? '6' : this.state.dicesData.users[post].text == 'Ставка на четное' ? 'ЧЕТ' : this.state.dicesData.users[post].text == 'Ставка на нечетное' ? 'НЕЧЕТ' : 'U'}</span> } key={Number(post) + 1}
                                                description={<span style={{ paddingLeft:'10px'  }}>{number_format(this.state.dicesData.users[post].sum)} {this.state.dicesData.users[post].valuta}</span>}
                                            >
                                                <span style={{ paddingLeft:'10px'  }}>{this.state.dicesData.users[post].name}</span> </Cell>
                                                </Card>
                                                    </CardGrid>
                                        </div>
                                    )}
                                </Group>
                                <Footer style={{ color:'black' }} className="videl">Hash: {this.state.dicesData.hash}</Footer>
                            </div>
                                :
                                <div>
                                    <CardGrid>
                                        <Card size="l" style={{backgroundColor:'white', height:204}}>
                                            <div style={{ height: 44 }} />
                                            <center>{this.state.resDicesNumber === 1 && <img  class='diceImg' src='https://sun9-34.userapi.com/sun9-28/impg/sxiyJix05cU6cGZD27zpTI6LsBDymADg1nvL5w/6jEiCauFy6M.jpg?size=202x202&quality=96&proxy=1&sign=7a73689e2a43e6de2cf68e2f27b44a3c&type=album' width={120} height={120} />}
                                                {this.state.resDicesNumber === 2 && <img  class='diceImg' src='https://sun9-34.userapi.com/sun9-36/impg/Ti63kvDMtXBV4oS2wuUUXMAAdkliko5N4hU_Uw/WplUTj8vJ7U.jpg?size=200x200&quality=96&proxy=1&sign=f0ee7db5ca9230d3366f68bdbe27b4ba&type=album' width={120} height={120} />}
                                                {this.state.resDicesNumber === 3 && <img  class='diceImg' src='https://sun9-34.userapi.com/sun9-75/impg/_aMK-9iFWCViNvFlrcUq71sUQtO2K3oe_mhH5g/2OssJ_Jcwf4.jpg?size=202x202&quality=96&proxy=1&sign=ce4a9ae4603e09d2653edddc6d91ecbf&type=album' width={120} height={120} />}
                                                {this.state.resDicesNumber === 4 && <img  class='diceImg' src='https://sun9-34.userapi.com/sun9-67/impg/_gvMqJq_ZEkZO4F_vGtHc1Km9kihlAvuqdy4uA/KhYJFsatlvU.jpg?size=200x200&quality=96&proxy=1&sign=c9c1959249458800ffdc7e3d7562ea87&type=album' width={120} height={120} />}
                                                {this.state.resDicesNumber === 5 && <img  class='diceImg' src='https://sun9-34.userapi.com/sun9-25/impg/FoWormgG8u97aevzzWrOcsWnfjq9ZQD8VZUPYg/MyYJZyR0Zek.jpg?size=200x200&quality=96&proxy=1&sign=f243a95f9a94b366fe4c983c5363bf72&type=album' width={120} height={120} />}
                                                {this.state.resDicesNumber === 6 && <img  class='diceImg' src='https://sun9-34.userapi.com/sun9-2/impg/tGfHRv7b4NsjE4eqPKTNoELWv3wmDuqecwXbLw/Ku9WoflHbQQ.jpg?size=204x204&quality=96&proxy=1&sign=39024d8dc70061d5a7aeae9c54018407&type=album' width={120} height={120} />}<div class="resultb7mText">{this.state.resDicesNumber}</div></center>
                                            <div style={{ height: 36 }} />
                                        </Card>
                                    </CardGrid>
                                    <div>
                                        {Object.keys(this.state.resDicesPlayers).map((post) =>
                                            <div key={1}>
                                                 <CardGrid>
                                        <Card size="l" style={{backgroundColor:'white',color:'black'}}>
                                                <Cell style={{color:'white'}}
                                                    idtop={Number(post) + 1}
                                                    before={<Link target="_blank" onClick={(event) => { event.preventDefault(); window.open(`https://vk.com/id${this.state.resDicesPlayers[post].id}`); }} ><Avatar size={40} src={this.state.resDicesPlayers[post].photo}   /></Link>}
                                                indicator={<span className={`${this.state.resDicesPlayers[post].text == 'Ставка на 1' ? 'numberstavka' : this.state.resDicesPlayers[post].text == 'Ставка на 2' ? 'numberstavka' : this.state.resDicesPlayers[post].text == 'Ставка на 3' ? 'numberstavka' : this.state.resDicesPlayers[post].text == 'Ставка на 4' ? 'numberstavka' : this.state.resDicesPlayers[post].text == 'Ставка на 5' ? 'numberstavka' : this.state.resDicesPlayers[post].text == 'Ставка на 6' ? 'numberstavka' : this.state.resDicesPlayers[post].text == 'Ставка на четное' ? 'evenstavka' : this.state.resDicesPlayers[post].text == 'Ставка на нечетное' ? 'notevenstavka' : '' }`}>{this.state.resDicesPlayers[post].text == 'Ставка на 1' ? '1' : this.state.resDicesPlayers[post].text == 'Ставка на 2' ? '2' : this.state.resDicesPlayers[post].text == 'Ставка на 3' ? '3' : this.state.resDicesPlayers[post].text == 'Ставка на 4' ? '4' : this.state.resDicesPlayers[post].text == 'Ставка на 5' ? '5' : this.state.resDicesPlayers[post].text == 'Ставка на 6' ? '6' : this.state.resDicesPlayers[post].text == 'Ставка на четное' ? 'ЧЕТ' : this.state.resDicesPlayers[post].text == 'Ставка на нечетное' ? 'НЕЧЕТ' : 'U' }</span>} 
                                                key={Number(post) + 1}

                                                    key={Number(post) + 1}
                                                    description={<span style={{ color: this.state.resDicesPlayers[post].win ? 'green' : 'red', paddingLeft:'10px' }}>{this.state.resDicesPlayers[post].win ? '+' : '-'}{number_format(this.state.resDicesPlayers[post].sum)} {this.state.resDicesPlayers[post].valuta}</span>}
                                                >
                                                    <span style={{ paddingLeft:'10px'  }}>{this.state.resDicesPlayers[post].name}</span> </Cell>
                                                    </Card>
                                                    </CardGrid>
                                            </div>
                                        )}
                                    </div>


                                        <Footer style={{ color:'black', marginBottom:0 }} className="videl">Hash: {this.state.dicesHash}</Footer>
                                        <Footer style={{ color:'black', marginTop:'1%' }} className="videl">md5: {this.state.dicesString}</Footer>
                                </div>
                            }

                            {this.state.snackbar}
                        </Panel>
                        <Panel id="b7m">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='games' />} separator={false}>Down 7 Up</PanelHeader>
                            <CardGrid style={{ marginTop:0 }}>
                                <Card size="l" style={{ backgroundColor:'white' }}>
                                    <Div>
                                        <center><div style={{ color:'black' }}>{number_format(this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 0, 0, '.', ' ')} {this.state.active === 'PaperScroll' ? 'PS' : this.state.active === 'CoronaCoin' ? 'CC' : this.state.active === 'VKCoin' ? 'VKC' : this.state.active === 'GameCoin' ? 'GC' : ''}</div></center>
                                    </Div>
                                </Card>
                            </CardGrid>
                            <CardGrid>
                            <Card size="l" style={{backgroundColor:'white'}} >
                            <Header mode="secondary" style={{ color:'black', paddingLeft: '8px', height:'30px' }} className="notvidel">История игр</Header>
                                 <HorizontalScroll>
                                     <div style={{display: 'flex'}}>
                                        {Object.keys(this.state.b7mWins).map((post) =>
                                            <Div key={1} style={{paddingTop:'6px', paddingBottom:'6px', paddingRight:0, paddingLeft:'8px'}} onClick={this.openhashdice(this.state.b7mWins[post].number, this.state.b7mWins[post].hash, this.state.b7mWins[post].md5)}>
                                                <div class={`ResultsBox ${this.state.b7mWins[post].color}`}>
                                                <div class='text'>{this.state.b7mWins[post].number}</div>
                                                </div>
                                            </Div>
                                        )}
                                    </div>
                                </HorizontalScroll>
                            </Card>
                            </CardGrid>
                            {!this.state.b7mRes ? <div>

                                <CardGrid>
                                    <Card size="l" style={{ backgroundColor:'white' }}>
                                        
                                       {this.state.b7mData.time == 16 ?
                                        <div style={{ marginTop: 40, marginBottom:40 }}><center><Icon56RecentOutline fill={'black'} /><h2 style={{ color: 'black' }}>Ожидание ставок...</h2></center></div>
                                            : 
                                            <div style={{ marginTop: 64.5, marginBottom: 64.5 }}><center><h1 style={{ color: 'black', marginTop:'1%', marginBottom:'1%', fontSize:'50px' }}>{this.state.b7mData.time}</h1></center></div>
                                        }

                                        
                                    </Card>
                                </CardGrid>
                                {this.state.viewtabl == 0 ? 
                                <Div style={{ padding:0 }}>
                                 <Div style={{ display: 'flex'}}>

                                                                        <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'24%', backgroundColor:'#FFC107' }} onClick={() => this.addddiceinput2(`${this.state.active === 'PaperScroll' ? '100000000' : '100000'}`)}>{this.state.active === 'PaperScroll' ? '+100KK' : '+100K'}</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'24%', backgroundColor:'#8BC34A'   }} onClick={() => this.addddiceinput2(`${this.state.active === 'PaperScroll' ? '250000000' : '1000000'}`)}>{this.state.active === 'PaperScroll' ? '+250KK' : '+1KK'}</Button>
                                    <Button size="l" stretched style={{marginRight: 4, color:'white', width:'24%', backgroundColor:'#03A9F4'  }} onClick={() => this.addddiceinput2(`${this.state.active === 'PaperScroll' ? '500000000' : '10000000'}`)}>{this.state.active === 'PaperScroll' ? '+500KK' : '+10KK'}</Button>
                                    <Button size="l" stretched style={{color:'white', width:'24%', backgroundColor:'#E91E63'  }} onClick={() => this.addddiceinput2(`${this.state.active === 'PaperScroll' ? '1000000000' : '50000000'}`)}>{this.state.active === 'PaperScroll' ? '+1KKK' : '+50KK'}</Button>

                                </Div>
                                
                                <FormLayout style={{ paddingBottom:0, color:'black' }}>
                                    <FormLayoutGroup>
                                        <Input type="number" id="inputb7m" defaultValue="" placeholder="Ваша ставка" onChange={(e) => this.setState({ b7mSum: e.target.value })} />
                                    </FormLayoutGroup>
                                </FormLayout>
                                <Div style={{ display: 'flex', paddingBottom:0, paddingTop:0 }}>
                                    <Button size="l" stretched onClick={this.onb7mChange}
                            style={this.state.activeb7m === 'm7' ? {
                  marginRight: 4, color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#3F51B5', transitionDuration: '0s', opacity: 1
                } : { marginRight: 4, color:'black', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#D7D9DC', transitionDuration: '0s', opacity: 1  }}
                            data-story="m7"
                            ><b>&#60; 7 (x2.3)</b></Button>
                                    <Button size="l" stretched  onClick={this.onb7mChange}
                            style={this.state.activeb7m === 's7' ? {
                  marginRight: 4, color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#4CAF50', transitionDuration: '0s', opacity: 1
                } : { marginRight: 4, color:'black', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#D7D9DC', transitionDuration: '0s', opacity: 1  }}
                            data-story="s7"
                            ><b>&#61; 7 (x5.8)</b></Button>
                                    <Button size="l" stretched  onClick={this.onb7mChange}
                            style={this.state.activeb7m === 'b7' ? {
                  marginRight: 4, color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#3F51B5', transitionDuration: '0s', opacity: 1
                } : { marginRight: 4, color:'black', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#D7D9DC', transitionDuration: '0s', opacity: 1  }}
                            data-story="b7"
                            ><b>&#62; 7 (x2.3)</b></Button>
                                 </Div>
                                 <Div style={{ display: 'flex', paddingBottom:0 }}>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#4986CC'  }} onClick={() => this.b7m(this.state.b7mSum, this.state.activeb7m)}><b>Поставить</b></Button>                               
                                 </Div>
                                 </Div>  : null}            

                                {this.state.viewtabl == 1 ?  <CardGrid>
                                        <Card size="l" style={{backgroundColor:'white',color:'black'}}>
                                            <Cell style={{color:'black'}}
                                                indicator={<span className={`${this.state.myb7mtext == 'm7' ? 'bmstavka' : this.state.myb7mtext == '7' ? 'sevenstavka' : this.state.myb7mtext == 'b7' ? 'bmstavka' : ''  }`}>{this.state.myb7mview}</span> }
                                                description={<span>{number_format(this.state.myb7msum)} {this.state.myb7mvaluta}</span>}
                                            >
                                                <span>Ваша ставка:</span> </Cell>
                                                </Card>
                                                    </CardGrid> : null}

                                {this.state.b7mData.users.length > 0 ? <Group style={{color:'black'}}  header={<Header>Ставки игроков</Header>}>
                                    {Object.keys(this.state.b7mData.users).map((post) =>
                                        <div key={1}>
                                                 <CardGrid>
                                        <Card size="l" style={{backgroundColor:'white',color:'black'}}>
                                            <Cell style={{color:'black'}}
                                                idtop={Number(post) + 1}
                                                before={<Link target="_blank" onClick={(event) => { event.preventDefault(); window.open(`https://vk.com/id${this.state.b7mData.users[post].id}`); }} ><Avatar size={40} src={this.state.b7mData.users[post].photo} /></Link>}
                                                indicator={<span style={{fontWeight:600, color: this.state.b7mData.users[post].view == '< 7' ? '#5262BC' : this.state.b7mData.users[post].view == '= 7' ? '#5EB761' : '#5262BC' }}>{this.state.b7mData.users[post].view}</span> } key={Number(post) + 1}
                                                description={<span style={{ paddingLeft:'10px'  }}>{number_format(this.state.b7mData.users[post].sum)} {this.state.b7mData.users[post].valuta}</span>}
                                            >
                                                <span style={{ paddingLeft:'10px'  }}>{this.state.b7mData.users[post].name}</span> </Cell>
                                                </Card>
                                                    </CardGrid>
                                        </div>
                                    )}
                                </Group> : ''}
                                <Footer style={{ color:'black' }} className="videl">Hash: {this.state.b7mData.hash}</Footer>
                            </div>
                                :
                                <div>

                                    <CardGrid>
                                        <Card size="l" style={{backgroundColor:'white', height:204}}>
                                            <div style={{ height: 44 }} />
                                            <center>{this.state.resb7mNumberone === 1 && <img  class='b7mImg' src='https://sun9-34.userapi.com/sun9-28/impg/sxiyJix05cU6cGZD27zpTI6LsBDymADg1nvL5w/6jEiCauFy6M.jpg?size=202x202&quality=96&proxy=1&sign=7a73689e2a43e6de2cf68e2f27b44a3c&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumberone === 2 && <img  class='b7mImg firstimgb7m' src='https://sun9-34.userapi.com/sun9-36/impg/Ti63kvDMtXBV4oS2wuUUXMAAdkliko5N4hU_Uw/WplUTj8vJ7U.jpg?size=200x200&quality=96&proxy=1&sign=f0ee7db5ca9230d3366f68bdbe27b4ba&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumberone === 3 && <img  class='b7mImg' src='https://sun9-34.userapi.com/sun9-75/impg/_aMK-9iFWCViNvFlrcUq71sUQtO2K3oe_mhH5g/2OssJ_Jcwf4.jpg?size=202x202&quality=96&proxy=1&sign=ce4a9ae4603e09d2653edddc6d91ecbf&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumberone === 4 && <img  class='b7mImg' src='https://sun9-34.userapi.com/sun9-67/impg/_gvMqJq_ZEkZO4F_vGtHc1Km9kihlAvuqdy4uA/KhYJFsatlvU.jpg?size=200x200&quality=96&proxy=1&sign=c9c1959249458800ffdc7e3d7562ea87&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumberone === 5 && <img  class='b7mImg' src='https://sun9-34.userapi.com/sun9-25/impg/FoWormgG8u97aevzzWrOcsWnfjq9ZQD8VZUPYg/MyYJZyR0Zek.jpg?size=200x200&quality=96&proxy=1&sign=f243a95f9a94b366fe4c983c5363bf72&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumberone === 6 && <img  class='b7mImg' src='https://sun9-34.userapi.com/sun9-2/impg/tGfHRv7b4NsjE4eqPKTNoELWv3wmDuqecwXbLw/Ku9WoflHbQQ.jpg?size=204x204&quality=96&proxy=1&sign=39024d8dc70061d5a7aeae9c54018407&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumbertwo === 1 && <img  class='b7mImg2 secondImgb7m' src='https://sun9-34.userapi.com/sun9-28/impg/sxiyJix05cU6cGZD27zpTI6LsBDymADg1nvL5w/6jEiCauFy6M.jpg?size=202x202&quality=96&proxy=1&sign=7a73689e2a43e6de2cf68e2f27b44a3c&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumbertwo === 2 && <img  class='b7mImg2 secondImgb7m' src='https://sun9-34.userapi.com/sun9-36/impg/Ti63kvDMtXBV4oS2wuUUXMAAdkliko5N4hU_Uw/WplUTj8vJ7U.jpg?size=200x200&quality=96&proxy=1&sign=f0ee7db5ca9230d3366f68bdbe27b4ba&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumbertwo === 3 && <img  class='b7mImg2 secondImgb7m' src='https://sun9-34.userapi.com/sun9-75/impg/_aMK-9iFWCViNvFlrcUq71sUQtO2K3oe_mhH5g/2OssJ_Jcwf4.jpg?size=202x202&quality=96&proxy=1&sign=ce4a9ae4603e09d2653edddc6d91ecbf&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumbertwo === 4 && <img  class='b7mImg2 secondImgb7m' src='https://sun9-34.userapi.com/sun9-67/impg/_gvMqJq_ZEkZO4F_vGtHc1Km9kihlAvuqdy4uA/KhYJFsatlvU.jpg?size=200x200&quality=96&proxy=1&sign=c9c1959249458800ffdc7e3d7562ea87&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumbertwo === 5 && <img  class='b7mImg2 secondImgb7m' src='https://sun9-34.userapi.com/sun9-25/impg/FoWormgG8u97aevzzWrOcsWnfjq9ZQD8VZUPYg/MyYJZyR0Zek.jpg?size=200x200&quality=96&proxy=1&sign=f243a95f9a94b366fe4c983c5363bf72&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumbertwo === 6 && <img  class='b7mImg2 secondImgb7m' src='https://sun9-34.userapi.com/sun9-2/impg/tGfHRv7b4NsjE4eqPKTNoELWv3wmDuqecwXbLw/Ku9WoflHbQQ.jpg?size=204x204&quality=96&proxy=1&sign=39024d8dc70061d5a7aeae9c54018407&type=album' width={120} height={120} />}<div class="resultb7mText">{this.state.resb7mNumber}</div></center>
                                            <div style={{ height: 36 }} />
                                        </Card>
                                    </CardGrid>
                                    {this.state.viewtabl == 1 ?  <CardGrid style={{ color:'white' }}>
                                        <Card size="l" style={{ backgroundColor: this.state.myb7mwin == true ? '#1ABC9C' : '#E74C3C', color:'white'}}>
                                            <Cell style={{color:'white' }}
                                                indicator={<span style={{color:'white' }} className={`${this.state.myb7mtext == 'm7' ? 'bmstavka' : this.state.myb7mtext == '7' ? 'sevenstavka' : this.state.myb7mtext == 'b7' ? 'bmstavka' : ''  }`}>{this.state.myb7mview}</span> }
                                                description={<span style={{color:'white' }}>{number_format(this.state.myb7msum)} {this.state.myb7mvaluta}</span>}
                                            >
                                                <span style={{color:'white' }}>{ this.state.myb7mwin == true ? 'Вы выиграли' : 'Вы проиграли'}</span> </Cell>
                                                </Card>
                                                    </CardGrid> : null}
                                    <Group style={{color:'black'}}  header={<Header>Ставки игроков</Header>}>
                                        {Object.keys(this.state.resb7mPlayers).map((post) =>
                                            <div key={1}>
                                                 <CardGrid>
                                        <Card size="l" style={{backgroundColor:'white',color:'black'}}>
                                                <Cell style={{color:'white'}}
                                                    idtop={Number(post) + 1}
                                                    before={<Link target="_blank" onClick={(event) => { event.preventDefault(); window.open(`https://vk.com/id${this.state.resb7mPlayers[post].id}`); }} ><Avatar size={40} src={this.state.resb7mPlayers[post].photo}   /></Link>}
                                                indicator={<span style={{fontWeight:600, color: this.state.resb7mPlayers[post].view == '< 7' ? '#5262BC' : this.state.resb7mPlayers[post].view == '= 7' ? '#5EB761' : '#5262BC' }}>{this.state.resb7mPlayers[post].view}</span> } key={Number(post) + 1}
                                                key={Number(post) + 1}

                                                    key={Number(post) + 1}
                                                    description={<span style={{ color: this.state.resb7mPlayers[post].win ? 'green' : 'red', paddingLeft:'10px' }}>{this.state.resb7mPlayers[post].win ? '+' : '-'}{number_format(this.state.resb7mPlayers[post].sum)} {this.state.resb7mPlayers[post].valuta}</span>}
                                                >
                                                    <span style={{ paddingLeft:'10px'  }}>{this.state.resb7mPlayers[post].name}</span> </Cell>
                                                    </Card>
                                                    </CardGrid>
                                            </div>
                                        )}
                                    </Group>


                                        <Footer style={{ color:'black', marginBottom:0 }} className="videl">Hash: {this.state.b7mHash}</Footer>
                                        <Footer style={{ color:'black', marginTop:'1%' }} className="videl">md5: {this.state.b7mString}</Footer>
                                </div>
                            }

                            {this.state.snackbar}
                        </Panel>
                         <Panel id="double">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='games' />} separator={false}>Double</PanelHeader>
                            <CardGrid style={{ marginTop:0 }}>
                                <Card size="l" style={{ backgroundColor:'white' }}>
                                    <Div>
                                        <center><div style={{ color:'black' }}>{number_format(this.state.active === 'PaperScroll' ? this.state.psbalance : this.state.active === 'CoronaCoin' ? this.state.ccbalance : this.state.active === 'VKCoin' ? this.state.vkcbalance : this.state.active === 'GameCoin' ? this.state.gcbalance : 0, 0, '.', ' ')} {this.state.active === 'PaperScroll' ? 'PS' : this.state.active === 'CoronaCoin' ? 'CC' : this.state.active === 'VKCoin' ? 'VKC' : this.state.active === 'GameCoin' ? 'GC' : ''}</div></center>
                                    </Div>
                                </Card>
                            </CardGrid>
                            <CardGrid>
                            <Card size="l" style={{backgroundColor:'white'}} >
                            <Header mode="secondary" style={{ color:'black', paddingLeft: '8px', height:'30px' }} className="notvidel">История игр</Header>
                                 <HorizontalScroll>
                                     <div style={{display: 'flex'}}>
                                        {Object.keys(this.state.b7mWins).map((post) =>
                                            <Div key={1} style={{paddingTop:'6px', paddingBottom:'6px', paddingRight:0, paddingLeft:'8px'}} onClick={this.openhashdice(this.state.b7mWins[post].number, this.state.b7mWins[post].hash, this.state.b7mWins[post].md5)}>
                                                <div class={`ResultsBox ${this.state.b7mWins[post].color}`}>
                                                <div class='text'>{this.state.b7mWins[post].number}</div>
                                                </div>
                                            </Div>
                                        )}
                                    </div>
                                </HorizontalScroll>
                            </Card>
                            </CardGrid>
                            {!this.state.b7mRes ? <div>

                                <CardGrid>
                                    <Card size="l" style={{ backgroundColor:'white' }}>
                                        
                                       {this.state.b7mData.time == 31 ?
                                        <div style={{ marginTop: 40, marginBottom:40 }}><center><Icon56RecentOutline fill={'black'} /><h2 style={{ color: 'black' }}>Ожидание ставок...</h2></center></div>
                                            : 
                                            <div style={{ marginTop: 64.5, marginBottom: 64.5 }}><center><h1 style={{ color: 'black', marginTop:'1%', marginBottom:'1%', fontSize:'50px' }}>{this.state.b7mData.time}</h1></center></div>
                                        }

                                        
                                    </Card>
                                </CardGrid>
                                <Div style={{ display:`${ this.state.mydoubleingame != 0 ? 'none' : 'block' }`, padding:0 }}>
                                 <Div style={{ display: 'flex'}}>

                                                                        <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'24%', backgroundColor:'#FFC107' }} onClick={() => this.addddiceinput23(`${this.state.active === 'PaperScroll' ? '100000000' : '100000'}`)}>{this.state.active === 'PaperScroll' ? '+100KK' : '+100K'}</Button>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'24%', backgroundColor:'#8BC34A'   }} onClick={() => this.addddiceinput23(`${this.state.active === 'PaperScroll' ? '250000000' : '1000000'}`)}>{this.state.active === 'PaperScroll' ? '+250KK' : '+1KK'}</Button>
                                    <Button size="l" stretched style={{marginRight: 4, color:'white', width:'24%', backgroundColor:'#03A9F4'  }} onClick={() => this.addddiceinput23(`${this.state.active === 'PaperScroll' ? '500000000' : '10000000'}`)}>{this.state.active === 'PaperScroll' ? '+500KK' : '+10KK'}</Button>
                                    <Button size="l" stretched style={{color:'white', width:'24%', backgroundColor:'#E91E63'  }} onClick={() => this.addddiceinput23(`${this.state.active === 'PaperScroll' ? '1000000000' : '50000000'}`)}>{this.state.active === 'PaperScroll' ? '+1KKK' : '+50KK'}</Button>

                                </Div>
                                
                                <FormLayout style={{ paddingBottom:0, color:'black' }}>
                                    <FormLayoutGroup>
                                        <Input type="number" id="inputdouble" defaultValue="" placeholder="Ваша ставка" onChange={(e) => this.setState({ doubleSum: e.target.value })} />
                                    </FormLayoutGroup>
                                </FormLayout>
                                <Div style={{ display: 'flex', paddingBottom:0, paddingTop:0 }}>
                                    <Button size="l" stretched onClick={this.ondoubleChange}
                            style={this.state.activedouble === 'x2' ? {
                  marginRight: 4, color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#3F51B5', transitionDuration: '0s', opacity: 1
                } : { marginRight: 4, color:'black', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#D7D9DC', transitionDuration: '0s', opacity: 1  }}
                            data-story="x2"
                            ><b>x2</b></Button>
                                    <Button size="l" stretched  onClick={this.ondoubleChange}
                            style={this.state.activedouble === 'x3' ? {
                  marginRight: 4, color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#4CAF50', transitionDuration: '0s', opacity: 1
                } : { marginRight: 4, color:'black', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#D7D9DC', transitionDuration: '0s', opacity: 1  }}
                            data-story="x3"
                            ><b>x3</b></Button>
                                    <Button size="l" stretched  onClick={this.ondoubleChange}
                            style={this.state.activedouble === 'x5' ? {
                  marginRight: 4, color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#3F51B5', transitionDuration: '0s', opacity: 1
                } : { marginRight: 4, color:'black', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#D7D9DC', transitionDuration: '0s', opacity: 1  }}
                            data-story="x5"
                            ><b>x5</b></Button>
                            <Button size="l" stretched  onClick={this.ondoubleChange}
                            style={this.state.activedouble === 'x50' ? {
                  marginRight: 4, color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#3F51B5', transitionDuration: '0s', opacity: 1
                } : { marginRight: 4, color:'black', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#D7D9DC', transitionDuration: '0s', opacity: 1  }}
                            data-story="x50"
                            ><b>x50</b></Button>
                                 </Div>
                                 <Div style={{ display: 'flex', paddingBottom:0 }}>
                                    <Button size="l" stretched style={{ marginRight: 4, color:'white', width:'33%', paddingTop:'0.5%', paddingBottom:'0.5%', backgroundColor:'#4986CC'  }} onClick={() => this.double(this.state.doubleSum, this.state.activedouble)}><b>Поставить</b></Button>                               
                                 </Div>
                                 </Div>              


                                {this.state.b7mData.users.length > 0 ? <Group style={{color:'black'}}  header={<Header>Ставки игроков</Header>}>
                                    {Object.keys(this.state.b7mData.users).map((post) =>
                                        <div key={1}>
                                                 <CardGrid>
                                        <Card size="l" style={{backgroundColor:'white',color:'black'}}>
                                            <Cell style={{color:'black'}}
                                                idtop={Number(post) + 1}
                                                before={<Link target="_blank" onClick={(event) => { event.preventDefault(); window.open(`https://vk.com/id${this.state.b7mData.users[post].id}`); }} ><Avatar size={40} src={this.state.b7mData.users[post].photo} /></Link>}
                                                indicator={<span className={`${this.state.b7mData.users[post].text == 'm7' ? 'bmstavka' : this.state.b7mData.users[post].text == '7' ? 'sevenstavka' : this.state.b7mData.users[post].text == 'b7' ? 'bmstavka' : ''  }`}>{this.state.b7mData.users[post].view}</span> } key={Number(post) + 1}
                                                description={<span style={{ paddingLeft:'10px'  }}>{number_format(this.state.b7mData.users[post].sum)} {this.state.b7mData.users[post].valuta}</span>}
                                            >
                                                <span style={{ paddingLeft:'10px'  }}>{this.state.b7mData.users[post].name} {this.state.b7mData.users[post].familyname}</span> </Cell>
                                                </Card>
                                                    </CardGrid>
                                        </div>
                                    )}
                                </Group> : ''}
                                <Footer style={{ color:'black' }} className="videl">Hash: {this.state.b7mData.hash}</Footer>
                            </div>
                                :
                                <div>

                                    <CardGrid>
                                        <Card size="l" style={{backgroundColor:'white', height:204}}>
                                            <div style={{ height: 44 }} />
                                            <center>{this.state.resb7mNumberone === 1 && <img  class='b7mImg' src='https://sun9-34.userapi.com/sun9-28/impg/sxiyJix05cU6cGZD27zpTI6LsBDymADg1nvL5w/6jEiCauFy6M.jpg?size=202x202&quality=96&proxy=1&sign=7a73689e2a43e6de2cf68e2f27b44a3c&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumberone === 2 && <img  class='b7mImg firstimgb7m' src='https://sun9-34.userapi.com/sun9-36/impg/Ti63kvDMtXBV4oS2wuUUXMAAdkliko5N4hU_Uw/WplUTj8vJ7U.jpg?size=200x200&quality=96&proxy=1&sign=f0ee7db5ca9230d3366f68bdbe27b4ba&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumberone === 3 && <img  class='b7mImg' src='https://sun9-34.userapi.com/sun9-75/impg/_aMK-9iFWCViNvFlrcUq71sUQtO2K3oe_mhH5g/2OssJ_Jcwf4.jpg?size=202x202&quality=96&proxy=1&sign=ce4a9ae4603e09d2653edddc6d91ecbf&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumberone === 4 && <img  class='b7mImg' src='https://sun9-34.userapi.com/sun9-67/impg/_gvMqJq_ZEkZO4F_vGtHc1Km9kihlAvuqdy4uA/KhYJFsatlvU.jpg?size=200x200&quality=96&proxy=1&sign=c9c1959249458800ffdc7e3d7562ea87&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumberone === 5 && <img  class='b7mImg' src='https://sun9-34.userapi.com/sun9-25/impg/FoWormgG8u97aevzzWrOcsWnfjq9ZQD8VZUPYg/MyYJZyR0Zek.jpg?size=200x200&quality=96&proxy=1&sign=f243a95f9a94b366fe4c983c5363bf72&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumberone === 6 && <img  class='b7mImg' src='https://sun9-34.userapi.com/sun9-2/impg/tGfHRv7b4NsjE4eqPKTNoELWv3wmDuqecwXbLw/Ku9WoflHbQQ.jpg?size=204x204&quality=96&proxy=1&sign=39024d8dc70061d5a7aeae9c54018407&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumbertwo === 1 && <img  class='b7mImg2 secondImgb7m' src='https://sun9-34.userapi.com/sun9-28/impg/sxiyJix05cU6cGZD27zpTI6LsBDymADg1nvL5w/6jEiCauFy6M.jpg?size=202x202&quality=96&proxy=1&sign=7a73689e2a43e6de2cf68e2f27b44a3c&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumbertwo === 2 && <img  class='b7mImg2 secondImgb7m' src='https://sun9-34.userapi.com/sun9-36/impg/Ti63kvDMtXBV4oS2wuUUXMAAdkliko5N4hU_Uw/WplUTj8vJ7U.jpg?size=200x200&quality=96&proxy=1&sign=f0ee7db5ca9230d3366f68bdbe27b4ba&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumbertwo === 3 && <img  class='b7mImg2 secondImgb7m' src='https://sun9-34.userapi.com/sun9-75/impg/_aMK-9iFWCViNvFlrcUq71sUQtO2K3oe_mhH5g/2OssJ_Jcwf4.jpg?size=202x202&quality=96&proxy=1&sign=ce4a9ae4603e09d2653edddc6d91ecbf&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumbertwo === 4 && <img  class='b7mImg2 secondImgb7m' src='https://sun9-34.userapi.com/sun9-67/impg/_gvMqJq_ZEkZO4F_vGtHc1Km9kihlAvuqdy4uA/KhYJFsatlvU.jpg?size=200x200&quality=96&proxy=1&sign=c9c1959249458800ffdc7e3d7562ea87&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumbertwo === 5 && <img  class='b7mImg2 secondImgb7m' src='https://sun9-34.userapi.com/sun9-25/impg/FoWormgG8u97aevzzWrOcsWnfjq9ZQD8VZUPYg/MyYJZyR0Zek.jpg?size=200x200&quality=96&proxy=1&sign=f243a95f9a94b366fe4c983c5363bf72&type=album' width={120} height={120} />}
                                                {this.state.resb7mNumbertwo === 6 && <img  class='b7mImg2 secondImgb7m' src='https://sun9-34.userapi.com/sun9-2/impg/tGfHRv7b4NsjE4eqPKTNoELWv3wmDuqecwXbLw/Ku9WoflHbQQ.jpg?size=204x204&quality=96&proxy=1&sign=39024d8dc70061d5a7aeae9c54018407&type=album' width={120} height={120} />}<div class="resultb7mText">{this.state.resb7mNumber}</div></center>
                                            <div style={{ height: 36 }} />
                                        </Card>
                                    </CardGrid>
                                    
                                    <Group style={{color:'black'}}  header={<Header>Ставки игроков</Header>}>
                                        {Object.keys(this.state.resb7mPlayers).map((post) =>
                                            <div key={1}>
                                                 <CardGrid>
                                        <Card size="l" style={{backgroundColor:'white',color:'black'}}>
                                                <Cell style={{color:'white'}}
                                                    idtop={Number(post) + 1}
                                                    before={<Link target="_blank" onClick={(event) => { event.preventDefault(); window.open(`https://vk.com/id${this.state.resb7mPlayers[post].id}`); }} ><Avatar size={40} src={this.state.resb7mPlayers[post].photo}   /></Link>}
                                                indicator={<span className={`${this.state.resb7mPlayers[post].view == 'm7' ? 'bmstavka' : this.state.resb7mPlayers[post].view == 's7' ? 'sevenstavka' : this.state.resb7mPlayers[post].view == 'b7' ? 'bmstavka' : ''  }`}>{this.state.resb7mPlayers[post].view}</span> } key={Number(post) + 1}
                                                key={Number(post) + 1}

                                                    key={Number(post) + 1}
                                                    description={<span style={{ color: this.state.resb7mPlayers[post].win ? 'green' : 'red', paddingLeft:'10px' }}>{this.state.resb7mPlayers[post].win ? '+' : '-'}{number_format(this.state.resb7mPlayers[post].sum)} {this.state.resb7mPlayers[post].valuta}</span>}
                                                >
                                                    <span style={{ paddingLeft:'10px'  }}>{this.state.resb7mPlayers[post].name} {this.state.resb7mPlayers[post].familyname}</span> </Cell>
                                                    </Card>
                                                    </CardGrid>
                                            </div>
                                        )}
                                    </Group>


                                        <Footer style={{ color:'black', marginBottom:0 }} className="videl">Hash: {this.state.b7mHash}</Footer>
                                        <Footer style={{ color:'black', marginTop:'1%' }} className="videl">md5: {this.state.b7mString}</Footer>
                                </div>
                            }

                            {this.state.snackbar}
                        </Panel>
                        <Panel id="thimble">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='games' />}>Стаканчики</PanelHeader>
                            <br />
                            <CardGrid>
                                <Card size="l">
                                    <div style={{ height: 30 }} />
                                    <center><h2 style={{ color: '#fff' }}>Выберите стаканчик</h2></center>
                                    <div style={{ height: 30 }} />
                                </Card>
                            </CardGrid>
                            <center>
                                <Div style={{
                                    display: 'flex', "justify-content": "center",
                                    "align-items": "center"
                                }}>

                                    <img  onClick={() => this.thimble(1, this.state.stakans, this.state.thimbleSum)} src='https://i.ibb.co/64whbn8/20200912-092454.png' widht={110} height={110} />
                                    <img  onClick={() => this.thimble(2, this.state.stakans, this.state.thimbleSum)} src='https://i.ibb.co/64whbn8/20200912-092454.png' widht={110} height={110} />
                                    <img  onClick={() => this.thimble(3, this.state.stakans, this.state.thimbleSum)} src='https://i.ibb.co/64whbn8/20200912-092454.png' widht={110} height={110} />

                                </Div>
                                {this.state.stakans === 6 && <Div style={{
                                    display: 'flex', "justify-content": "center",
                                    "align-items": "center"
                                }}>

                                    <img  onClick={() => this.thimble(4, this.state.stakans, this.state.thimbleSum)} src='https://i.ibb.co/64whbn8/20200912-092454.png' widht={110} height={110} />
                                    <img  onClick={() => this.thimble(5, this.state.stakans, this.state.thimbleSum)} src='https://i.ibb.co/64whbn8/20200912-092454.png' widht={110} height={110} />
                                    <img  onClick={() => this.thimble(6, this.state.stakans, this.state.thimbleSum)} src='https://i.ibb.co/64whbn8/20200912-092454.png' widht={110} height={110} />

                                </Div>}
                            </center>
                        </Panel>
                        <Panel id="thimbleResult">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='stakan' />}>Стаканчики</PanelHeader>
                            {this.state.stakans === 3 && <div>
                                {this.state.thimble.stakan === 1 && <Div>
                                    <center><img  src='https://i.ibb.co/V3JTYr9/20200912-091328.png' width={300} height={300} /></center>
                                </Div>}
                                {this.state.thimble.stakan === 2 && <Div>
                                    <center><img  src='https://i.ibb.co/cTDpgxQ/20200912-091422.png' width={300} height={300} /></center>
                                </Div>}
                                {this.state.thimble.stakan === 3 && <Div>
                                    <center><img  src='https://i.ibb.co/0ry49b8/20200912-091537.png' width={300} height={300} /></center>
                                </Div>}
                            </div>
                            }
                            {this.state.stakans === 6 && <div>
                                {this.state.thimble.stakan === 1 && <Div>
                                    <center><img  src='https://i.ibb.co/BGVyRHW/20200912-212546.png' width={300} height={300} /></center>
                                </Div>}
                                {this.state.thimble.stakan === 2 && <Div>
                                    <center><img  src='https://i.ibb.co/WkwB3Xs/20200912-212627.png' width={300} height={300} /></center>
                                </Div>}
                                {this.state.thimble.stakan === 3 && <Div>
                                    <center><img  src='https://i.ibb.co/HpCXPL7/20200912-212654.png' width={300} height={300} /></center>
                                </Div>}
                                {this.state.thimble.stakan === 4 && <Div>
                                    <center><img  src='https://i.ibb.co/CMPh09t/20200912-212731.png' width={300} height={300} /></center>
                                </Div>}
                                {this.state.thimble.stakan === 5 && <Div>
                                    <center><img  src='https://i.ibb.co/MprnTKz/20200912-212801.png' width={300} height={300} /></center>
                                </Div>}
                                {this.state.thimble.stakan === 6 && <Div>
                                    <center><img  src='https://i.ibb.co/LxrYfrr/20200912-212827.png' width={300} height={300} /></center>
                                </Div>}
                            </div>}

                            <Div>
                                <FormStatus header={this.state.thimble.win ? "Вы выиграли!" : "Вы проиграли!"}>
                                    {this.state.thimble.text}
                                </FormStatus>
                            </Div>
                        </Panel>
                        <Panel id="auc">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='games' />}>Аукцион</PanelHeader>
                            <Div />
                            <Div><h3>Сейчас разыгрывается:</h3><h4>{this.state.auc.text}</h4></Div>
                            {this.state.snackbar}
                        </Panel>
                        <Panel id="wheel">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='games' />} separator={false}>Wheel</PanelHeader>
                            <Div />
                            <CardGrid>
                                <Card size="l">
                                    <Div>
                                        <center><div>{number_format(this.state.balance, 0, '.', ' ')} бумаги</div></center>
                                    </Div>
                                </Card>
                            </CardGrid>
                            {!this.state.wheelRes ? <div>
                                <CardGrid>
                                    <Card size="l">
                                        <div style={{ height: 30 }} />
                                        <center><h2 style={{ color: '#fff' }}>{this.state.wheelData.time}</h2></center>
                                        <div style={{ height: 30 }} />
                                    </Card>
                                </CardGrid>

                                <CardGrid>
                                    <Card size="l">
                                        <Header>Мои ставки</Header>
                                        <div style={{ height: 3 }} />
                                        <HorizontalScroll>
                                            <div style={{ display: 'flex' }}>
                                                {Object.keys(this.state.wheelData.users).map((post) =>
                                                    <div key={1}>
                                                        {Number(this.state.wheelData.users[post].id) === Number(this.state.fetchedUser.id) && <div>
                                                            {this.state.wheelData.users[post].text === 'Ставка на красное' ? <div style={{ "border-radius": "8px", "backgroundColor": "#e74c3c", "padding": '5px', "margin-right": "8px" }}>
                                                                <center>{this.state.wheelData.users[post].text}</center>
                                                                <br />
                                                                <center>{this.state.wheelData.users[post].sum} бумаги</center>


                                                            </div> : this.state.wheelData.users[post].text === 'Ставка на черное' ? <div style={{ "border-radius": "8px", "backgroundColor": "#7f8c8d", "padding": '5px', "margin-right": "8px" }}>
                                                                <center>{this.state.wheelData.users[post].text}</center>
                                                                <br />
                                                                <center>{this.state.wheelData.users[post].sum} бумаги</center>


                                                            </div> : null}
                                                        </div>}
                                                    </div>
                                                )}
                                            </div>
                                        </HorizontalScroll>
                                        <div style={{ height: 3 }} />
                                    </Card>
                                </CardGrid>

                                <FormLayout>
                                    <FormLayoutGroup top="Ваша ставка">
                                        <Input type="number" defaultValue="" onChange={this.wheelsumChange} />
                                    </FormLayoutGroup>
                                </FormLayout>
                                <Div style={{ display: 'flex' }}>
                                    <Button size="l" stretched mode="destructive" style={{ marginRight: 8 }} onClick={() => this.wheel(this.state.wheelSum, 'color', 'red')}>Красное</Button>
                                    <Button size="l" stretched style={{ backgroundColor: '#000' }} onClick={() => this.wheel(this.state.wheelSum, 'color', 'black')}>Черное</Button>
                                </Div>
                                <Div style={{ display: 'flex' }}>
                                    <Button size="l" stretched style={{ marginRight: 8 }} onClick={() => this.wheel(this.state.wheelSum, 'num', '1-12')}>1-12</Button>
                                    <Button size="l" stretched style={{ marginRight: 8 }} onClick={() => this.wheel(this.state.wheelSum, 'num', '13-24')}>13-24</Button>
                                    <Button size="l" stretched onClick={() => this.wheel(this.state.wheelSum, 'num', '25-36')}>25-36</Button>
                                </Div>
                                <Div style={{ display: 'flex' }}>
                                    <Button size="l" stretched mode="secondary" style={{ marginRight: 8 }} onClick={() => this.wheel(this.state.wheelSum, 'ev', 'even')}>Четное</Button>
                                    <Button size="l" stretched mode="secondary" onClick={() => this.wheel(this.state.wheelSum, 'ev', 'noteven')}>Нечетное</Button>
                                </Div>


                                <Group header={<Header mode="secondary">Ставки</Header>}>
                                    {this.state.wheelData.users.length < 1 && <center><Cell>Ожидаем ставок...</Cell></center>}
                                    {Object.keys(this.state.wheelData.users).map((post) =>
                                        <div key={1}>

                                            <Cell
                                                idtop={Number(post) + 1}
                                                indicator={`${this.state.wheelData.users[post].sum} бумаги`}
                                                key={Number(post) + 1}
                                                description={`${this.state.wheelData.users[post].text}`}
                                            >
                                                {this.state.wheelData.users[post].name} </Cell>
                                        </div>
                                    )}
                                </Group>
                                <Footer>Hash: {this.state.wheelData.hash}</Footer>
                                {this.state.resString !== '' && <center><Cell onClick={() => this.setState({ activeModal: 'res' })}><Link>Результаты прошлого раунда</Link></Cell></center>}
                            </div>
                                :
                                <div>
                                    <CardGrid>
                                        <Card size="l">
                                            <div style={{ height: 30 }} />
                                            <center><h2 style={{ color: '#fff' }}>{this.state.resWheelNumber}</h2></center>
                                            <center><p>{this.state.resWheelColor}</p></center>
                                            <div style={{ height: 30 }} />
                                        </Card>
                                    </CardGrid>
                                    <div>
                                        {Object.keys(this.state.resWheelPlayers).map((post) =>
                                            <div key={1}>

                                                <Cell
                                                    idtop={Number(post) + 1}
                                                    indicator={`${this.state.resWheelPlayers[post].win ? '+' : '-'}${this.state.resWheelPlayers[post].sum} бумаги`}
                                                    key={Number(post) + 1}
                                                    description={`${this.state.resWheelPlayers[post].win ? `${this.state.resWheelPlayers[post].text} выиграла` : `${this.state.resWheelPlayers[post].text} проиграла`}`}
                                                >
                                                    {this.state.resWheelPlayers[post].name} </Cell>
                                            </div>
                                        )}
                                    </div>
                                    <Div>
                                        <p>Хэш игры: {this.state.resHash}</p>
                                        <p>Кодовое слово: {this.state.resCode}</p>
                                        <p>Проверка честности: {this.state.resString}</p>
                                    </Div>
                                </div>
                            }
                            
                        </Panel>

                        <Panel id="dice">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='games' />}>Больше 7 Меньше</PanelHeader>
                            <Div />
                            <CardGrid>
                                <Card size="l">
                                    <Div>
                                        <center><div>{number_format(this.state.balance, 0, '.', ' ')} бумаги</div></center>
                                    </Div>
                                </Card>
                            </CardGrid>
                            <CardGrid>
                                <Card size="l">
                                    <div style={{ height: 30 }} />
                                    <center><h2 style={{ color: '#fff' }}>Больше 7 Меньше</h2></center>
                                    <div style={{ height: 30 }} />
                                </Card>
                            </CardGrid>
                            <FormLayout>
                                <FormLayoutGroup top="Ваша ставка">
                                    <Input type="number" defaultValue="" onChange={this.dicesumChange} />
                                </FormLayoutGroup>
                            </FormLayout>
                            <Div style={{ display: 'flex' }}>
                                <Button size="l" stretched style={{ marginRight: 8 }} onClick={() => this.dice(6, this.state.diceSum)}>Меньше</Button>
                                <Button size="l" stretched mode="commerce" onClick={() => this.dice(7, this.state.diceSum)} style={{ marginRight: 8 }}>7</Button>
                                <Button size="l" stretched mode="destructive" onClick={() => this.dice(8, this.state.diceSum)}>Больше</Button>
                            </Div>
                            {this.state.snackbar}
                        </Panel>
                        <Panel id="reshka">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='games' />}>Орёл/решка</PanelHeader>
                            <Div />
                            <CardGrid>
                                <Card size="l">
                                    <Div>
                                        <center><div>{number_format(this.state.balance, 0, '.', ' ')} бумаги</div></center>
                                    </Div>
                                </Card>
                            </CardGrid>
                            <CardGrid>
                                <Card size="l">
                                    <div style={{ height: 30 }} />
                                    <center><h2 style={{ color: '#fff' }}>Орел/решка</h2></center>
                                    <div style={{ height: 30 }} />
                                </Card>
                            </CardGrid>
                            <FormLayout>
                                <FormLayoutGroup top="Ваша ставка">
                                    <Input type="number" defaultValue="" onChange={this.reshsumChange} />
                                </FormLayoutGroup>
                            </FormLayout>
                            <Div style={{ display: 'flex' }}>
                                <Button size="l" stretched mode="commerce" style={{ marginRight: 8 }} onClick={() => this.reshka(1, this.state.reshkaSum)}>Орёл</Button>
                                <Button size="l" stretched mode="destructive" onClick={() => this.reshka(2, this.state.reshkaSum)}>Решка</Button>
                            </Div>
                            {this.state.snackbar}
                        </Panel>
                        <Panel id="diceResult">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='dice' />}>Больше 7 Меньше</PanelHeader>
                            <Div />

                            <CardGrid>
                                <Card size="l">
                                    <div style={{ height: 10 }} />

                                    <div>
                                        <center><h1 class='diceText'>{this.state.dice.number}</h1></center>
                                        <Div style={{
                                            display: "flex",
                                            "justify-content": "center",
                                            "align-items": "center"
                                        }}>
                                            {this.state.dice.number === 1 && <div>

                                            </div>}
                                            {this.state.dice.number === 2 && <div>
                                                <img  src='https://i.ibb.co/Dghdps5/20200918-150914.png' style={{ marginRight: 20 }} width={120} height={120} />
                                                <img  src='https://i.ibb.co/Dghdps5/20200918-150914.png' width={120} height={120} />
                                            </div>}
                                            {this.state.dice.number === 3 && <div>
                                                <img  src='https://i.ibb.co/Dghdps5/20200918-150914.png' style={{ marginRight: 20 }} width={120} height={120} />
                                                <img  src='https://i.ibb.co/cYWSnxj/20200918-151018.png' width={120} height={120} />
                                            </div>}
                                            {this.state.dice.number === 4 && <div>
                                                <img  src='https://i.ibb.co/cYWSnxj/20200918-151018.png' style={{ marginRight: 20 }} width={120} height={120} />
                                                <img  src='https://i.ibb.co/cYWSnxj/20200918-151018.png' width={120} height={120} />
                                            </div>}
                                            {this.state.dice.number === 5 && <div>
                                                <img  src='https://i.ibb.co/cYWSnxj/20200918-151018.png' style={{ marginRight: 20 }} width={120} height={120} />
                                                <img  src='https://i.ibb.co/K5kr9t6/20200918-151114.png' width={120} height={120} />
                                            </div>}
                                            {this.state.dice.number === 6 && <div>
                                                <img  src='https://i.ibb.co/K5kr9t6/20200918-151114.png' style={{ marginRight: 20 }} width={120} height={120} />
                                                <img  src='https://i.ibb.co/K5kr9t6/20200918-151114.png' width={120} height={120} />
                                            </div>}
                                            {this.state.dice.number === 7 && <div>
                                                <img  src='https://i.ibb.co/K5kr9t6/20200918-151114.png' style={{ marginRight: 20 }} width={120} height={120} />
                                                <img  src='https://i.ibb.co/N7HFGWw/20200918-151315.png' width={120} height={120} />
                                            </div>}
                                            {this.state.dice.number === 8 && <div>
                                                <img  src='https://i.ibb.co/N7HFGWw/20200918-151315.png' style={{ marginRight: 20 }} width={120} height={120} />
                                                <img  src='https://i.ibb.co/N7HFGWw/20200918-151315.png' width={120} height={120} />
                                            </div>}
                                            {this.state.dice.number === 9 && <div>
                                                <img  src='https://i.ibb.co/N7HFGWw/20200918-151315.png' style={{ marginRight: 20 }} width={120} height={120} />
                                                <img  src='https://i.ibb.co/txph6bS/20200918-151352.png' width={120} height={120} />
                                            </div>}
                                            {this.state.dice.number === 10 && <div>
                                                <img  src='https://i.ibb.co/txph6bS/20200918-151352.png' style={{ marginRight: 20 }} width={120} height={120} />
                                                <img  src='https://i.ibb.co/txph6bS/20200918-151352.png' width={120} height={120} />
                                            </div>}
                                            {this.state.dice.number === 11 && <div>
                                                <img  src='https://i.ibb.co/txph6bS/20200918-151352.png' style={{ marginRight: 20 }} width={120} height={120} />
                                                <img  src='https://i.ibb.co/1R09Dqh/20200918-151618.png' width={120} height={120} />
                                            </div>}
                                            {this.state.dice.number === 12 && <div>
                                                <img  src='https://i.ibb.co/1R09Dqh/20200918-151618.png' style={{ marginRight: 20 }} width={120} height={120} />
                                                <img  src='https://i.ibb.co/1R09Dqh/20200918-151618.png' width={120} height={120} />
                                            </div>}
                                        </Div>
                                    </div>
                                    <div style={{ height: 40 }} />
                                </Card>
                            </CardGrid>
                            <Div>
                                <FormStatus header={this.state.dice.result === 'win' ? "Вы выиграли!" : "Вы проиграли!"}>
                                    {this.state.dice.text}
                                </FormStatus>
                            </Div>
                        </Panel>
                        <Panel id="nvutiResult">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='nvuti' />}>Nvuti</PanelHeader>
                            <Div />
                            <center><h1 style={{ 'font-size': "72px" }}>{this.state.nvuti.number}</h1></center>
                            <Div>
                                <FormStatus header={this.state.nvuti.result === 'win' ? "Вы выиграли!" : "Вы проиграли!"}>
                                    {this.state.nvuti.text}
                                </FormStatus>
                            </Div>
                        </Panel>
                        <Panel id="reshkaResult">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='reshka' />}>Орёл/решка</PanelHeader>
                            <Div />
                            {this.state.reshka.res == 'orel' && <center><img  src='https://upload.wikimedia.org/wikipedia/commons/8/8c/Russia-Coin-1-2009-b.png' width={200} height={200} /></center>}
                            {this.state.reshka.res == 'reshka' && <center><img  src='https://contragents.ru/xn--80aahc6airewm.xn--p1ai/muzfo-imaginator/images/original/5263317/5263317' width={200} height={200} /></center>}
                            <Div>
                                <FormStatus header={this.state.reshka.result === 'win' ? "Вы выиграли!" : "Вы проиграли!"}>
                                    {this.state.reshka.text}
                                </FormStatus>
                            </Div>
                        </Panel>
                        <Panel id="reshkaPreResult">
                            <br />
                            <br />
                            <br />
                            <br />
                            <center><h3>Подбрасываем монетку...</h3></center>
                            <center>
                                <div class="coin1" />
                            </center>
                        </Panel>

                        <Panel id="reshkaResult">
                            <PanelHeader left={<PanelHeaderBack onClick={this.goGames} data-to='reshka' />}>Орёл/решка</PanelHeader>
                            <Div />
                            {this.state.reshka.res == 'orel' && <center><img  src='https://upload.wikimedia.org/wikipedia/commons/8/8c/Russia-Coin-1-2009-b.png' width={200} height={200} /></center>}
                            {this.state.reshka.res == 'reshka' && <center><img  src='https://contragents.ru/xn--80aahc6airewm.xn--p1ai/muzfo-imaginator/images/original/5263317/5263317' width={200} height={200} /></center>}
                            <Div>
                                <FormStatus header={this.state.reshka.result === 'win' ? "Вы выиграли!" : "Вы проиграли!"}>
                                    {this.state.reshka.text}
                                </FormStatus>
                            </Div>
                        </Panel>


                    </View>
                </Epic>
            </ConfigProvider>
        );
    }
}
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function lil_format(number){
    if (number < 1000) {
        return number
    }
    if (number > 999 && number < 1000000) {
        return (number/1000).toFixed(0)+'KK';
    }
    if (number > 999999 && number < 1000000000) {
        return (number/1000000).toFixed(0)+'KK';
    }
    if (number > 999999999 && number < 1000000000000) {
        return (number/1000000000).toFixed(0)+'KKK';
    }

}

function number_format( number, decimals, dec_point, thousands_sep ) {
var i, j, kw, kd, km;
if( isNaN(decimals = Math.abs(decimals)) ){
decimals = 0;
}
if( dec_point == undefined ){
dec_point = " ";
}
if( thousands_sep == undefined ){
thousands_sep = " ";
}

i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

if( (j = i.length) > 3 ){
j = j % 3;
} else{
j = 0;
}

km = (j ? i.substr(0, j) + thousands_sep : "");
kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
return km + kw + kd;
}

export default App;