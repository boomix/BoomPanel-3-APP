<template>
  <div class="main-left">
    <notifications group="main" />
    <Navigation />
    <div id="right-panel" class="right-panel">
      <Topbar />
      <Breadcrumbs />
      <div class="content mt-3">
        <div class="animated fadeIn">
          <router-view></router-view>
        </div>
      </div>

      <!--<button @click="send">Send message</button>
      <button @click="connect">Connect</button>
      <button @click="disconnect">Disconnect</button>-->
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import Topbar from "./components/Topbar";
import Breadcrumbs from "./components/Breadcrumbs";

export default {
  name: "App",
  components: {
    Navigation,
    Topbar,
    Breadcrumbs
  },

  methods: {
    send: function() {
      this.$socket.send(`sm_navigation`);
    },

    connect: function() {
      this.$store.commit("socketConnect");
    },

    disconnect: function() {
      this.$store.commit("socketDisconnect");
    },

    track () {
      this.$ga.page('/')
    }
  },

  mounted() {
    //Connect to default socket server
    if(this.$store.state.activeServer > -1)
      this.$store.commit("setActiveServer", this.$store.state.activeServer);

    if (window.location.href.includes('file://'))
      this.$options.sockets.onmessage = data => console.log('APP.vue new socket data: ' + data.data);
  }
};
</script>

<style scoped>
.main-left {
  width: 100%;
  display: inline-table;
}
</style>