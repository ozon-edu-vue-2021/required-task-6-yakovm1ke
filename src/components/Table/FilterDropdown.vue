<template>
  <div :class="$style.filterDropdown">
    <input
      :class="$style.filterInput"
      ref="filterInput"
      type="text"
      placeholder="Set filter"
      @keydown.enter="onSubmit"
    />
    <font-awesome-icon
      :class="$style.filterIcon"
      icon="check"
      @click="onSubmit"
    />
  </div>
</template>

<script>
export default {
  name: "FilterDropdown",
  props: {
    filterShow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onSubmit() {
      if (this.$refs.filterInput.value)
        this.$emit("onFilterSubmit", this.$refs.filterInput.value);
    },
  },
};
</script>

<style module>
.filterDropdown {
  box-sizing: border-box;
  position: absolute;
  bottom: -2rem;
  right: 0.6rem;
  width: 90%;
  min-width: 10rem;
  background-color: #eeeeee;
  padding: 0.6rem;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
  border-radius: 0.6rem;
  box-shadow: 0 0.2rem 0.6rem #aaaaaa;
}

.filterIcon {
  color: #000;
  cursor: pointer;
}

.filterInput {
  border: none;
  padding: 0.2rem;
  width: 100%;
  outline: 2px solid #ccc;
  border-radius: 0.2rem;
}
</style>