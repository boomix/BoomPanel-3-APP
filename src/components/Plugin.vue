<template>
    <v-runtime-template :template="fullhtml"></v-runtime-template>
</template>

<script>
import VRuntimeTemplate from "v-runtime-template";

export default {
  name: "Plugin",

  data() {
    return {
      html: '',
      fullhtml: '',
      param: [],
      predata: '',
      data: '',
    }
  },

  components: {
    VRuntimeTemplate
  },

  methods: {
    createParams: function(params) {
      let newobject = {};
      params.forEach(function(param) {
        newobject[param] = '';
      })
      this.param = newobject;
    },
    sendcommand: function(command) {
      this.$socket.send(command);
    },
    secondsToHoursMinutes(seconds) {
      let d = Number(seconds);
      let h = Math.floor(d / 3600);
      let m = Math.floor(d % 3600 / 60);
      let hDisplay = h > 0 ? h +"h " : "";
      let mDisplay = m > 0 ? m + "m" : "";
      return hDisplay + mDisplay; 
    },
    reloadTemplate: function() {
      this.html = '';
      this.fullhtml = '';
      this.nextJScommand = '';
      if(this.socketsConnected) {
        this.$socket.send(`sm_BPtemplate "`+ this.$route.query.name +`"`);
      }
    },
    flag: function(code) {
      return './assets/img/flags/' + code.toLowerCase() + '.png';
    }
  },

  computed: {
    socketsConnected() {
      return this.$store.getters.socketsConnected;
    },
    socketsNewMessage() {
      return this.$store.getters.socketsNewMessage;
    }
  },
  mounted() {
    let name = this.$route.query.name;
    if(!name) this.$router.push({ path: '/' })
    this.reloadTemplate(); //when page loaded from navigation click
  },

  watch: {
    '$route.query.name'() {
        this.reloadTemplate();
    },
    socketsConnected(newVal, oldVal) {
      this.reloadTemplate(); //when connects to socket server successfully
    },
    socketsNewMessage(data, oldData) {
      let json = JSON.parse(data.data);

      /* TEMPLATE */
      if (json.type == "templateline") {
        if (this.html.length == 0) this.html = '<div class="row">';
        this.html += json.data;
      }

      else if (json.type == "templateend") {
        //Execute javascript that is in template
        if(this.html.includes('<onload>') && this.html.includes('</onload>')) {
          let script = this.html.split('<onload>')[1].split('</onload>')[0];
          eval(script);
          this.html = this.html.split('</onload>')[1];
        }

        //Finish template load
        this.fullhtml = (this.html + '</div>').replace(/(\r\n|\n|\r)/gm, "");
        this.html = '';
      }
      /* TEMPLATE END */

      /* DATA */
      else if (json.type == "datastart") {
        this.predata = [];
      }
      else if (json.type == "data") {
        this.predata.push(JSON.parse(json.data))
      }
      else if (json.type == "dataend") {
        this.data = {[json.name]: this.predata};
      }
      /* DATA END */

      /* NOTIFICATION */
      else if (json.type == "notification") {
        this.$notify({
          group: 'main',
          type: json.notification_type,
          title: json.title,
          text: json.message
        })
      }
      /* NOTIFICATION END */
    },
  }
};
</script>

<style>
.modal {
  background: rgba(0,0,0,0.5);
}
.modal-backdrop {
  display: none;
}
</style>

<style lang="scss" scoped>
</style>