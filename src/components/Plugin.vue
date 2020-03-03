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
      param: '',
      param1: '',
      param2: '',
      param3: '',
      param4: '',
      param5: '',
      param6: '',
      param7: '',
      param8: '',
      param9: '',
      data: ''
    }
  },

  components: {
    VRuntimeTemplate
  },

  methods: {
    sendcommand: function(command) {
      this.$socket.send(command);
    },
    pluginLoad: function() {
      this.html = '';
      this.fullhtml = '';
      this.nextJScommand = '';
      if(this.socketsConnected) {
        this.$socket.send(`sm_BPtemplate "`+ this.$route.query.name +`"`);
      }
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
  },

  watch: {
    socketsConnected(newVal, oldVal) {
      this.pluginLoad(); //when connects to socket server successfully
    },
    socketsNewMessage(data, oldData) {
      let json = JSON.parse(data.data);

      if (json.type == "templateline") {

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

      if (json.type == "data") {
        console.log('NEW DATA:' + json.data)
        this.data = json.data;
      }

    },
  }
};
</script>

<style lang="scss" scoped>
</style>