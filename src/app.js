import Vue from 'vue';
import 'es6-promise/auto'
import VueNativeSock from 'vue-native-websocket'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home'
import Plugin from './components/Plugin'
import Servers from './components/Servers'

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
    state: {
        socket: {
            isConnected: false,
            message: ''
        },
        servers: localStorage.servers,
        activeServer: (localStorage.activeServer) ? localStorage.activeServer : -1
    },
    mutations: {
        SOCKET_ONOPEN(state, event) {
            Vue.prototype.$socket = event.currentTarget
            state.socket.isConnected = true
        },
        SOCKET_ONCLOSE(state, event) {
            state.socket.isConnected = false
        },
        SOCKET_ONERROR(state, event) {

            //Check if reconnection is not happening after has already connected to some ws server
            let targetURL = event.target.url;
            let srv = store.getters.getServers[state.activeServer];
            let neededURL = srv.ip + ':' + srv.port;
            if (targetURL.indexOf(neededURL) === -1) {
                store.commit('setActiveServer', state.activeServer);
            }
            // console.log(store.getters.getServers[state.activeServer])
            //console.error(state, event)
        },
        SOCKET_ONMESSAGE(state, message) {
            state.socket.message = message
        },
        // mutations for reconnect methods
        SOCKET_RECONNECT(state, count) {
            //console.info(state, count)
        },
        SOCKET_RECONNECT_ERROR(state) {
            //state.socket.reconnectError = true;
        },
        updateServers: function (state) {
            state.servers = localStorage.servers;
        },
        setActiveServer: function (state, index) {
            state.activeServer = index;
            localStorage.activeServer = index;

            //Try to connect to new server
            Vue.prototype.$disconnect();

            let activeSrv = store.getters.getServers[state.activeServer];
            let url = 'ws://' + activeSrv.ip + ':' + activeSrv.port + '?steamid=' + activeSrv.user + '&password=' + activeSrv.pass;
            Vue.prototype.$connect(url);
        }
    },

    actions: {
        sendMessage: function (context, message) {
            Vue.prototype.$socket.send(message)
        }
    },

    getters: {
        socketsConnected: (state) => {
            return state.socket.isConnected;
        },
        socketsNewMessage: (state) => {
            return state.socket.message;
        },
        getServers: (state) => {
            if (state.servers)
                return JSON.parse(state.servers);
            return [];
        }
    },
})

const routes = [
    { path: '/', component: Home, meta: { title: 'Home' } },
    { path: '/plugin', component: Plugin, meta: { title: 'Plugin' } },
    { path: '/servers', component: Servers, meta: { title: 'Servers' } }
]

const router = new VueRouter({
    routes // short for `routes: routes`
})

Vue.use(VueNativeSock, 'ws://194.19.248.93:7897?steamid=STEAM_1:1:55473534&password=safepass', {
    store,
    reconnection: true,
    connectManually: true
});

const vm = new Vue({
    el: '#app',
    store,
    router,
    components: {
        App
    }
})