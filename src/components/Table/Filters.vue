<template>
  <div :class="$style.filters">
    <div :class="$style.filterTitle">
      Filters
      <font-awesome-icon
        icon="trash"
        :class="$style.filterDeleteIcon"
        @click="$emit('onFiltersDelete')"
      />
    </div>
    <div
      :class="$style.filterBodyItem"
      :key="index"
      v-for="(filterItem, index) in filters"
    >
      <div :class="$style.filterItemContent">
        Prop: {{filterItem.prop}}
        Filter: {{filterItem.value}}
      </div>
      <font-awesome-icon
        icon="times"
        :class="$style.filterDeleteIcon"
        @click="$emit('onFilterDelete', index)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style module>
.filters {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.6rem;
  gap: 0.6rem;
}

.filterTitle {
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  gap: 0.6rem;
}

.filterBodyItem {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem;
  border-radius: 0.6rem;
  font-weight: normal;
  color: #3366cc;
  background-color: #fff;
}

.filterItemContent {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.filterDeleteIcon:hover {
  cursor: pointer;
}
</style>