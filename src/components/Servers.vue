<template>
  <div class="row">
    <AddServer/>
    <ServerList/>
  </div>
</template>

<script>
import AddServer from "./AddServer";
import ServerList from "./ServerList";
export default {
  name: "Servers",
  components: {
    AddServer,
    ServerList
  }
};
</script>

<style lang="scss" scoped>
</style>