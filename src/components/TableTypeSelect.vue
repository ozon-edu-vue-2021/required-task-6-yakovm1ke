<template>
  <div :class="$style.tableTypeSelect">
    <button
      :class="basicTableClass"
      @click="onComponentSelect('BasicTable')"
    >
      <font-awesome-icon icon="home" />
      Basic
    </button>
    <button
      :class="paggingTableClass"
      @click="onComponentSelect('PaggingTable')"
    >
      <font-awesome-icon icon="ellipsis-h" />
      Pagging
    </button>
    <button
      :class="infiniteTableClass"
      @click="onComponentSelect('InfiniteScroll')"
    >
      <font-awesome-icon icon="infinity" />
      Infinite scroll
    </button>
    <button
      :class="virtualTableClass"
      @click="onComponentSelect('VirtualScroll')"
    >
      <font-awesome-icon icon="vr-cardboard" />
      Virtual scroll
    </button>
  </div>
</template>

<script>
export default {
  name: "TableTypeSelect",
  props: {
    selectedComponent: {
      type: String,
      default: "",
    },
  },
  computed: {
    basicTableClass() {
      if (this.selectedComponent === "BasicTable") {
        return this.$style.tableButton_selected;
      } else {
        return this.$style.tableButton;
      }
    },
    paggingTableClass() {
      if (this.selectedComponent === "PaggingTable") {
        return this.$style.tableButton_selected;
      } else {
        return this.$style.tableButton;
      }
    },
    infiniteTableClass() {
      if (this.selectedComponent === "InfiniteScroll") {
        return this.$style.tableButton_selected;
      } else {
        return this.$style.tableButton;
      }
    },
    virtualTableClass() {
      if (this.selectedComponent === "VirtualScroll") {
        return this.$style.tableButton_selected;
      } else {
        return this.$style.tableButton;
      }
    },
  },
  methods: {
    onComponentSelect(selectComponent) {
      this.$emit("onComponentSelect", selectComponent);
    },
  },
};
</script>

<style module>
.tableTypeSelect {
  height: 100%;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  padding: 0.6em;
  z-index: 2;
  background-color: #ccc;
}

.tableButton {
  padding: 1rem;
  width: 13rem;
  border: none;
  border-radius: 0.6rem;
  background-color: white;
  color: #3366cc;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  gap: 0.6rem;
}

.tableButton:hover {
  cursor: pointer;
  background-color: #eee;
}

.tableButton_selected {
  composes: tableButton;
  color: #fff;
  background-color: #3366cc;
}

.tableButton_selected:hover {
  background-color: #3366cc;
}
</style>
