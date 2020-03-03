<template>
  <header id="header" class="header">
    <div class="header-menu">
      <div class="col-sm-7">
        <a id="menuToggle" class="menutoggle pull-left">
          <i class="fa fa fa-tasks"></i>
        </a>
        <div class="header-left">
          <div class="dropdown for-notification">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="notification"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Server: {{ getActiveServer }}
              <i class="fa fa-sort-down"></i>
              <span v-if="socketsConnected" class="badge badge-success">Connected</span>
              <span v-if="!socketsConnected" class="badge badge-danger">Disconnected</span>
            </button>
            <i @click="refresh" class="fa fa-refresh" title="Manually reconnect"></i>
            <div class="dropdown-menu" aria-labelledby="notification">
              <a class="dropdown-item media" href="#" @click="serverSelect(index)" v-for="(item, index) in getAllServers" :key="index">
                <i class="fa fa-check"></i>
                <p>{{ item.name }}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Topbar",

  computed: {

    getActiveServer() {
      if(this.$store.state.activeServer == -1)
        return 'No server selected';
      else
        return this.$store.getters.getServers[this.$store.state.activeServer].name
    },

    getAllServers() {
      return this.$store.getters.getServers;
    },

    socketsConnected() {
      return this.$store.getters.socketsConnected;
    }
  },

  methods: {
    serverSelect: function(index) {
      this.$store.commit('setActiveServer', index)
    },

    refresh: function() {
      this.$store.commit('setActiveServer', this.$store.state.activeServer)
    }
  },

};
</script>

<style lang="scss" scoped>
.fa-sort-down {
  font-size: 23px;
}
.fa-refresh {
  cursor: pointer;
  margin-top: 11px;
  display: block;
  float: right;
}
button {
  .badge {
    margin-left: 10px;
  }
}

.dropdown-menu {
  .dropdown-item {
    &:hover {
      background-color: #dcdcdc !important;
    }
  }
}
</style>