<template>
    <div class="col-md-6">
        <div class="card">
        <div class="card-header">
            <strong>Add server</strong>
        </div>
        <form action="#" @submit="checkForm" method="post" autocomplete="off" novalidate="true">
            <div class="card-body card-block">
                <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon"><i class="fa fa-desktop"></i></div>
                    <input v-model="server.name" type="text" placeholder="Server name" class="form-control" />
                </div>
                </div>

                <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon"><i class="fa fa-terminal"></i></div>
                    <input v-model="server.ip" type="text" placeholder="Server IP" class="form-control" />
                </div>
                </div>

                <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon"><i class="fa fa-sort-numeric-desc"></i></div>
                    <input v-model="server.port" type="number" placeholder="Server PORT (27020)" class="form-control" />
                </div>
                </div>

                <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon"><i class="fa fa-user"></i></div>
                    <input v-model="server.user" type="text" placeholder="Username" class="form-control" />
                </div>
                </div>

                <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon"><i class="fa fa-asterisk"></i></div>
                    <input v-model="server.pass" type="password" placeholder="Password" class="form-control" />
                </div>
                </div>
            </div>
            <div class="card-footer">
                <button type="submit" class="btn btn-primary btn-sm">
                    <i class="fa fa-dot-circle-o"></i> Save
                </button>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
export default {
  name: "AddServer",

  data: function() {
    return {
      server: {
        name: '',
        ip: '',
        port: '',
        user: '',
        pass: ''
      }
    }
  },

  methods: {
    checkForm: function(e) {

      //Update local storage server list
      let servers = [];
      if (localStorage.servers) {
        servers = JSON.parse(localStorage.servers);
      }
      servers.push(this.server);
      localStorage.servers = JSON.stringify(servers);
      this.$store.commit("updateServers");

      //Reset back input field
      this.server = {
        name: '',
        ip: '',
        port: '',
        user: '',
        pass: ''
      }

      e.preventDefault();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>