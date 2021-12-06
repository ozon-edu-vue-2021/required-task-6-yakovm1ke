<template>
  <div
    :class="$style.tableHeadColumn"
    v-click-outside="hideDropdown"
  >
    {{ title }}
    <div :class="$style.tableHeadIcons">
      <font-awesome-icon
        :icon="sortIcon"
        @click="$emit('onSortClick', prop)"
      />
      <font-awesome-icon
        icon="filter"
        @click="toggleDropdownShow"
      />
    </div>
    <FilterDropdown
      v-if="isDropdownShow"
      @onFilterSubmit="onFilterSubmit"
    />
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import FilterDropdown from "./FilterDropdown";

export default {
  name: "TableHeadColumn",
  props: {
    title: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      required: true,
    },
    sorts: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    FilterDropdown,
  },
  directives: {
    ClickOutside,
  },
  computed: {
    sortIcon() {
      const index = this.sorts.findIndex(
        (sortItem) => sortItem.prop === this.prop
      );
      if (index !== -1) {
        return this.sorts[index].direction === "asc"
          ? "sort-amount-down-alt"
          : "sort-amount-down";
      } else {
        return "sort";
      }
    },
  },
  methods: {
    toggleDropdownShow() {
      this.isDropdownShow = !this.isDropdownShow;
    },
    hideDropdown() {
      this.isDropdownShow = false;
    },
    onFilterSubmit(value) {
      this.isDropdownShow = false;
      this.$emit("onFilterSubmit", { prop: this.prop, value: value });
    },
  },
  data() {
    return {
      isDropdownShow: false,
    };
  },
};
</script>

<style module>
.tableHeadColumn {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.6rem;
  position: relative;
}

.tableHeadIcons {
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
}

.tableHeadIcons svg:hover {
  cursor: pointer;
}
</style>