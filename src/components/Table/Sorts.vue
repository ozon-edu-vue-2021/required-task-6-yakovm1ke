<template>
  <div :class="$style.sorts">
    <div :class="$style.sortTitle">
      Sorts
      <font-awesome-icon
        icon="trash"
        :class="$style.sortDeleteIcon"
        @click="$emit('onSortsDelete')"
      />
    </div>
    <div
      :class="$style.sortBodyItem"
      :key="index"
      v-for="(sortItem, index) in sorts"
    >
      <div :class="$style.sortItemContent">
        Prop: {{sortItem.prop}}
        Direction: {{sortItem.direction}}
      </div>
      <font-awesome-icon
        icon="times"
        :class="$style.sortDeleteIcon"
        @click="$emit('onSortDelete', index)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sorts: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style module>
.sorts {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.6rem;
  gap: 0.6rem;
}

.sortTitle {
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  gap: 0.6rem;
}

.sortBodyItem {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem;
  border-radius: 0.6rem;
  font-weight: normal;
  color: #3366cc;
  background-color: #fff;
}

.sortItemContent {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.sortDeleteIcon:hover {
  cursor: pointer;
}
</style>