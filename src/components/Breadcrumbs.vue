<template>
  <div class="breadcrumbs">
    <div class="col-sm-4">
      <div class="page-header float-left">
        <div class="page-title">
          <h1>{{this.$route.meta.title}}</h1>
        </div>
      </div>
    </div>
    <div class="col-sm-8">
      <div class="page-header float-right">
        <div class="page-title">
          <ol class="breadcrumb text-right">
            <li class="active">{{this.$route.meta.title}}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumbs",

  methods: {
    updateTitle: function() {
      document.title = "BoomPanel 3 - " + this.$route.meta.title;
    }
  },

  mounted() {
    this.updateTitle();
  },

  watch:{
    $route (to, from){
      this.$nextTick(()=>{
        this.updateTitle();
      });
    }
  } 
};
</script>

<style lang="scss" scoped>
.breadcrumbs .col-sm-8 {
  display: none;
}
</style>