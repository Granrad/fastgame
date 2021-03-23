import React from "react";
import PropTypes from "prop-types";
import connect from "@vkontakte/vkui-connect";
import Icon28FavoriteOutline from '@vkontakte/icons/dist/28/favorite_outline';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import { Icon28MoneySendOutline } from '@vkontakte/icons';
import { Icon28MoneyRequestOutline } from '@vkontakte/icons';
import Icon28MarketOutline from '@vkontakte/icons/dist/28/market_outline';
import Icon28MoneyHistoryBackwardOutline from '@vkontakte/icons/dist/28/money_history_backward_outline';
import {
    Panel,
    Button,
    Group,
    PanelHeaderButton,
    Gallery,
    Banner,
    Div,
    Avatar,
    PanelHeaderContext,
    Separator,
    PanelHeader,
    Footer,
    Search,
    CardGrid,
    SimpleCell,
    HorizontalScroll,
    RichCell,
    Card,
    List,
    Cell,
    Header,
    TabsItem,
    Progress,
    InfoRow,
    Link,
    FormLayoutGroup,
    FormLayout,
    Input,
    PanelHeaderContent,
    Tabs,
    Tooltip,
    Title,
    FormStatus,
    FixedLayout,
    Epic,
    Tabbar,
    TabbarItem,
    PullToRefresh,
    PanelSpinner,
    View
} from "@vkontakte/vkui";
import Icon24StorefrontOutline from "@vkontakte/icons/dist/24/storefront_outline";
import { Icon36CoinsStacks3Outline } from '@vkontakte/icons';
import "@vkontakte/vkui/dist/vkui.css";

import './Home.css'



    const Home = (props) => (

        <Panel id={props.id} separator={false}>
            <PanelHeader left={<React.Fragment><PanelHeaderButton><Avatar size={36} src={props.this.state.fetchedUser.photo_100}  /></PanelHeaderButton></React.Fragment>} separator={false}>Профиль</PanelHeader>
            {/*<PanelHeaderContext opened={props.this.state.contextOpened} onClose={props.this.toggleContext}>
            
                <List>


                    <Cell

                        asideContent={props.this.state.active === 'VKCoin' ? <Icon24Done fill="var(--accent)" /> : null}
                        onClick={props.this.select}
                        data-mode="VKCoin"
                    >
                        VKCoin
              </Cell>

                    <Cell

                        asideContent={props.this.state.active === 'PaperScroll' ? <Icon24Done fill="var(--accent)" /> : null}
                        onClick={props.this.select}
                        data-mode="PaperScroll"
                    >
                        PaperScroll
              </Cell>



                </List>
            </PanelHeaderContext>*/}

            





            { props.this.state.vkcbalance != 'Loading...' ? <PullToRefresh onRefresh={props.this.onRefresh} isFetching={props.this.state.fetching} popout={props.this.state.loading}>


            <CardGrid style={{ marginTop: '1%' }}>
                <Card className="BalanceImg" size="l">


                     <Div style={{ marginTop: 20, marginBottom: 20}}>
                                               

                        <center><p style={{ marginTop:0, marginBottom:'1%', color:'white' }}>Баланс</p><Title level="1" weight="bold" style={{color: '#fff', marginBottom: '0px', width: '100%' }}>{number_format(props.this.state.active === 'PaperScroll' ? props.this.state.psbalance : props.this.state.active === 'CoronaCoin' ? props.this.state.ccbalance : props.this.state.active === 'VKCoin' ? props.this.state.vkcbalance : props.this.state.active === 'GameCoin' ? props.this.state.gcbalance : 0, 0, '.', ' ')} {props.this.state.active === 'PaperScroll' ? 'PS' : props.this.state.active === 'CoronaCoin' ? 'CC' : props.this.state.active === 'VKCoin' ? 'VKC' : props.this.state.active === 'GameCoin' ? 'GC' : ''}</Title></center>

                    
                    </Div>

                </Card>
            </CardGrid>


            <CardGrid>
                <Card className="PopolImg" size="m" onClick={() => props.this.state.active === 'PaperScroll' ? connect.send("VKWebAppOpenApp", { "app_id": 7420483, "location": "m677_1_1234" }) : props.this.state.active === 'VKCoin' ? connect.send("VKWebAppOpenApp", { "app_id": 6915965, "location": "x389246356_1000000_1234_1" }) : props.this.state.active === 'CoronaCoin' ? connect.send("VKWebAppOpenApp", { "app_id": 7349811, "location": "merchant389246356_100000" }) : props.this.state.active === 'GameCoin' ? connect.send("VKWebAppOpenApp", { "app_id": 7652467, "location": "m608762142_100_1234" }) : ''}>
                    
                    <center><span><Icon28MoneySendOutline width={32} height={32} fill={'white'} style={{ marginTop: '5%', marginBottom: '1%'}} /></span><h3 style={{ color: '#fff', marginTop:0, marginBottom:'5%' }}>Пополнить</h3></center>
                    
                </Card>
                <Card className="VivodImg" size="m"  onClick={props.this.withdrawModal}>

                    
                    <center><span><Icon28MoneyRequestOutline  width={32} height={32} fill={'white'} style={{ marginTop: '5%', marginBottom: '1%'}} /></span><h3 style={{ color: '#fff', marginTop:0, marginBottom:'5%' }}>Вывести</h3></center>
                    

                </Card>
            </CardGrid>

             <div>
                <CardGrid>
                    <Card size="l">

                        <div class="NumberView">
                            <div class="NumberView__description" >Выиграно коинов за сегодня:</div>
                            <div class="NumberView__value" >{lil_format(props.this.state.active === 'PaperScroll' ? `${props.this.state.psday}` : props.this.state.active === 'CoronaCoin' ? `${props.this.state.ccday}` : props.this.state.active === 'VKCoin' ? `${props.this.state.vkcday}` : props.this.state.active === 'GameCoin' ? `${props.this.state.gcday}` : 0, 0, '.', ' ')} {props.this.state.active === 'PaperScroll' ? 'PS' : props.this.state.active === 'CoronaCoin' ? 'CC' : props.this.state.active === 'VKCoin' ? 'VKC' : props.this.state.active === 'GameCoin' ? 'GC' : ''}</div>

                        </div>
                    </Card></CardGrid>
                    {/*<CardGrid>
                    <Card size="l">

                        <div class="NumberView">
                            <div class="NumberView__description" >Выиграно коинов за всё время:</div>
                            <div class="NumberView__value" >{lil_format(props.this.state.active === 'PaperScroll' ? `${props.this.state.pswin}` : props.this.state.active === 'CoronaCoin' ? `${props.this.state.ccwin}` : props.this.state.active === 'VKCoin' ? `${props.this.state.vkcwin}` : props.this.state.active === 'GameCoin' ? `${props.this.state.gcwin}` : 0, 0, '.', ' ')} {props.this.state.active === 'PaperScroll' ? 'PS' : props.this.state.active === 'CoronaCoin' ? 'CC' : props.this.state.active === 'VKCoin' ? 'VKC' : props.this.state.active === 'GameCoin' ? 'GC' : ''}</div>

                        </div>
                    </Card></CardGrid>*/}</div>
            

                

           
            <Footer style={{ color:'black' }}>Онлайн: {props.this.state.online}</Footer>
            </PullToRefresh> : null }
            {props.this.state.snackbar}

        </Panel>



    );

Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

function number_format(number, decimals, dec_point, thousands_sep) {

    var i, j, kw, kd, km;

    // input sanitation & defaults
    if (isNaN(decimals = Math.abs(decimals))) {
        decimals = 2;
    }
    if (dec_point === undefined) {
        dec_point = ",";
    }
    if (thousands_sep === undefined) {
        thousands_sep = ".";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    if ((j = i.length) > 3) {
        j = j % 3;
    } else {
        j = 0;
    }

    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


    return km + kw + kd;
}

function lil_format(number){
    if (number < 1000) {
        return number
    }
    if (number > 999 && number < 1000000) {
        return (number/1000).toFixed(3)+'k';
    }
    if (number > 999999 && number < 1000000000) {
        return (number/1000000).toFixed(3)+'kk';
    }
    if (number > 999999999 && number < 1000000000000) {
        return (number/1000000000).toFixed(3)+'kkk';
    }
    if (number > 999999999999 && number < 1000000000000000) {
        return (number/1000000000000).toFixed(3)+'kkkk';
    }

}
export default Home;
