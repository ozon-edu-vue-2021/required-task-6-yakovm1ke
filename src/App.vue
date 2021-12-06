<template>
  <div id="app">
    <TableTypeSelect
      :selectedComponent="selectedComponent"
      @onComponentSelect="selectComponent"
    />
    <BasicTable v-if="selectedComponent === 'BasicTable'" />
    <PaggingTable v-else-if="selectedComponent === 'PaggingTable'" />
    <InfiniteScroll v-else-if="selectedComponent === 'InfiniteScroll'" />
    <VirtualScroll v-else-if="selectedComponent === 'VirtualScroll'" />
  </div>
</template>

<script>
import BasicTable from "@/components/BasicTable.vue";
import PaggingTable from "@/components/PaggingTable.vue";
import TableTypeSelect from "@/components/TableTypeSelect.vue";
import InfiniteScroll from "@/components/InfiniteScroll.vue";
import VirtualScroll from "@/components/VirtualScroll.vue";

export default {
  name: "App",
  components: {
    TableTypeSelect,
    BasicTable,
    PaggingTable,
    InfiniteScroll,
    VirtualScroll,
  },
  methods: {
    selectComponent(componentName) {
      this.selectedComponent = componentName;
    },
  },
  data() {
    return {
      selectedComponent: "BasicTable",
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eeeeee;
  min-height: 100vh;
}

@media screen and (max-width: 1700px) {
  html {
    font-size: 12px;
  }
}

@media screen and (max-width: 1300px) {
  html {
    font-size: 10px;
  }
}

@media screen and (max-width: 1100px) {
  html {
    font-size: 8px;
  }
}
</style>
