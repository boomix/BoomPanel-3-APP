<template>
  <div class="row">
    <div class="col-md-5">
      <div class="card">
        <div class="card-header">
          <strong>About BoomPanel 3</strong>
        </div>
        <div class="card-body">
          BoomPanel 3 is new kind of admin panel, with the big difference, 
          where frontend is made with Vue.js, and sourcemod/SRCDS server runs 
          as backend for the panel. For communication to server panel is using websockets. 
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">
          <strong>Changelog</strong>
        </div>
        <div class="card-body">here will go BoomPanel 3 changes</div>
      </div>
    </div>
    <div class="col-lg-3 col-md-6">
      <a href="https://discord.gg/rfw96Gj" target="_blank">
        <div class="social-box discord" style="min-height: 100px;">
            <i class="fab fa-discord"></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style lang="scss" scoped>
.social-box.discord i {
  background: #7289da;
  color: #fff;
}
</style>