<template>
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <strong>Server list</strong>
            </div>
            <div class="card-body card-block">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">IP</th>
                            <th scope="col">Port</th>
                            <th scope="col">User</th>
                            <th scope="col">Pass</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in servers" :key="index" @click="editID = index">
                            <td data-label="Name">
                                <span v-if="editID != index">{{ item.name }}</span>
                                <input type="text" class="form-control" v-else v-model="item.name" v-focus @keyup.enter="editID = -1;"/>
                            </td>
                            <td data-label="IP">
                               <span v-if="editID != index">{{ item.ip }}</span>
                               <input type="text" class="form-control" v-else v-model="item.ip" v-focus @keyup.enter="editID = -1;"/>
                            </td>
                            <td data-label="Port">
                                <span v-if="editID != index">{{ item.port }}</span>
                                <input type="number" class="form-control" v-else v-model="item.port" v-focus @keyup.enter="editID = -1;"/>
                            </td>
                            <td data-label="User">
                                <span v-if="editID != index">{{ item.user }}</span>
                                <input type="text" class="form-control" v-else v-model="item.user" v-focus @keyup.enter="editID = -1;"/>
                            </td>
                            <td data-label="Pass">
                                <span v-if="editID != index">{{ item.pass }}</span>
                                <input type="text" class="form-control"t v-else v-model="item.pass" v-focus @keyup.enter="editID = -1;"/>
                            </td>
                            <td data-label="Delete">
                                <button type="button" v-on:click="deleteButton(index)" class="btn btn-danger btn-sm">
                                    <i class="fa fa-times"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ServerList",
    data() {
        return {
            servers: (localStorage.servers) ? JSON.parse(localStorage.servers) : [],
            editID: -1
        }
    },
    computed: {
        getLiveServerList() {
            return this.$store.getters.getServers;
        }
    },

    methods: {
        deleteButton: function (index) {
            if(confirm("Are you sure you want to delete this server?")) {
                let servers = JSON.parse(localStorage.servers);
                servers.splice(index, 1);
                localStorage.servers = JSON.stringify(servers);
                this.$store.commit("updateServers");
            }
        }
    },

    watch: {
        getLiveServerList(newVal, oldVal) {
            this.servers = newVal;
        },
        editID(newVal, oldVal) {
            if (newVal == -1) {
                localStorage.servers = JSON.stringify(this.servers);
                this.$store.commit("updateServers"); 

                if (oldVal == localStorage.activeServer) {
                    this.$store.commit('setActiveServer', oldVal)
                }

            }
        }
    },

    directives: {
        focus: {
            inserted (el) {
                el.focus()
            }
        }
    }
};
</script>