import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

// 引入redux，react-redux，react-router-redux，它们各有各的职责
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import thunk from 'redux-thunk';

// 默认的App根路由，作为组件容器
import Container from "../component/Container";

// 各种小组件在这里引入
import MsgListPage from "../component/MsgListPage/MsgListPage";
import MsgDetailPage from "../component/MsgDetailPage/MsgDetailPage";
import MsgCreatePage from "../component/MsgCreatePage/MsgCreatePage";

// 引入reducer
import MsgDetailPageReduer from "../component/MsgDetailPage/reducer";
import MsgListPageReducer from "../component/MsgListPage/reducer";
import SliderReducer from "../component/Slider/reducer";

// 聚集所有reducer
// 注：这里的key就是全局store的1级key，用于划分不同reducer的state集合，避免互相污染
const reducer = combineReducers({
    MsgDetailPageReduer: MsgDetailPageReduer,
    MsgListPageReducer: MsgListPageReducer,
    SliderReducer: SliderReducer,
    routing: routerReducer,  // react-router所需要的reducer
}, );

// 创建redux的store
const store = createStore(
    reducer,    // 全部的reducer
    applyMiddleware(    // 安装若干中间件
        thunk,
    ),
);

// 增强react-router的history能力，其实就是把history相关信息也存储到store中
// 在<Router>中取代原有的hashHistory
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
    (
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={Container}>
                    <IndexRoute component={MsgListPage} />
                    <Route path="msg-list-page" component={MsgListPage}/>
                    <Route path="msg-detail-page/:msgId" component={MsgDetailPage}/>
                    <Route path="msg-create-page" component={MsgCreatePage}/>
                </Route>
            </Router>
        </Provider>
    ),
    document.getElementById('reactRoot')
);