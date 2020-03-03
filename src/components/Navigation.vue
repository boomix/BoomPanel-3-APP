<template>
  <aside id="left-panel" class="left-panel">
    <nav class="navbar navbar-expand-sm navbar-default">
      <div class="navbar-header">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#main-menu"
          aria-controls="main-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fa fa-bars"></i>
        </button>
        <router-link to="/" class="navbar-brand">
          <img src="assets/img/logo.png" alt="Logo" />
        </router-link>
        <router-link to="/" class="navbar-brand hidden">
          <img src="assets/img/logo2.png" alt="Logo" />
        </router-link>
      </div>

      <div id="main-menu" class="main-menu collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/">
              <i class="menu-icon fa fa-dashboard"></i>Home
            </router-link>
          </li>
          <li>
            <router-link to="/servers">
              <i class="menu-icon fa fa-dashboard"></i>Servers
            </router-link>
          </li>
          <h3 class="menu-title">Plugins</h3>
          <li v-for="item in items" v-bind:key="item.id">
            <router-link :to="{path: '/plugin', query: { name: item }}">
              <i class="menu-icon fa fa-puzzle-piece"></i>
              {{ item }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "Navigation",

  data: function() {
    return {
      items: []
    };
  },

  computed: {
    socketsConnected() {
      return this.$store.getters.socketsConnected;
    },
    socketsNewMessage() {
      return this.$store.getters.socketsNewMessage;
    }
  },

  methods: {
    updateNavigation() {
      this.$socket.send(`sm_BPnavigation`);
    }
  },

  watch: {
    socketsConnected(newVal, oldVal) {
      if (newVal) this.updateNavigation();
      else this.items = []
    },
    socketsNewMessage(data, oldVal) {
      let json = JSON.parse(data.data);
      if (json.type == "navigation") {
        this.items = json.data;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>