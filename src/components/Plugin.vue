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
      nextJScommand: false,
      param: [],
      data: ''
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
    pluginLoad: function() {
      this.html = '';
      this.fullhtml = '';
      this.nextJScommand = '';
      if(this.socketsConnected) {
        this.$socket.send(`sm_BPtemplate "`+ this.$route.query.name +`"`);
      }
    },
    flag: function(code) {
      return './images/flags/' + code + '.png';
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
    this.pluginLoad(); //when page loaded from navigation click

    this.$set(this, 123, {})

  },

  watch: {
    socketsConnected(newVal, oldVal) {
      this.pluginLoad(); //when connects to socket server successfully
    },
    socketsNewMessage(data, oldData) {
      let json = JSON.parse(data.data);

      /* TEMPLATE */
      if (json.type == "templateline") {
        
        //If template start
        if (this.html.length == 0)
         this.html = '<div class="row">';
        
        //Execute javascript command or add everything to html variable
        if(this.nextJScommand && !json.data.includes('</onload>')) {
          eval((json.data))
        } else if(!json.data.includes('<onload>') && !json.data.includes('</onload>'))
          this.html += json.data;

        //Check if it is not javascript to execute
        if(json.data.includes('<onload>'))
          this.nextJScommand = true;
        else if(json.data.includes('</onload>'))
          this.nextJScommand = false;
      }

      if (json.type == "templateend") {
        this.fullhtml = (this.html + '</div>').replace(/(\r\n|\n|\r)/gm, "");
      }
      /* TEMPLATE END */

      /* DATA */
      if (json.type == "datastart") {
        this.data = {[json.name]: []};
      }
      if (json.type == "data") {
        this.data[json.name].push(JSON.parse(json.data))
      }
      if (json.type == "dataend") {

      }
      /* DATA END */

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