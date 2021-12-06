<template>
  <div :class="$style.pagesControl">
    <font-awesome-icon
      icon="angle-double-left"
      :class="$style.pagesControlIcon"
      @click="goToFirstPage"
    />
    <font-awesome-icon
      icon="angle-left"
      :class="$style.pagesControlIcon"
      @click="goToPreviousPage"
    />

    <div
      :class="$style.pagesControlButtons"
      v-if="totalPages <= 5"
    >
      <button
        v-for="(pageButton, index) in totalPages"
        :key="index"
        @click="$emit('onPageClick', index + 1)"
        :class="isPageSelected(index + 1)"
      >
        {{ index + 1 }}
      </button>
    </div>

    <div
      :class="$style.pagesControlButtons"
      v-else-if="totalPages > 5 && currentPage > 2 && currentPage < (totalPages - 1)"
    >
      <button
        v-for="(pageButton, index) in 5"
        :key="index"
        @click="$emit('onPageClick', currentPage - 2 + index)"
        :class="isPageSelected(currentPage - 2 + index)"
      >{{ currentPage - 2 + index }}</button>
    </div>

    <div
      :class="$style.pagesControlButtons"
      v-else-if="totalPages > 5 && currentPage <= 2"
    >
      <button
        v-for="(pageButton, index) in 5"
        :key="index"
        @click="$emit('onPageClick', index + 1)"
        :class="isPageSelected(index + 1)"
      >{{ index + 1 }}</button>
    </div>

    <div
      :class="$style.pagesControlButtons"
      v-else-if="totalPages > 5 && currentPage >= totalPages - 1"
    >
      <button
        v-for="(pageButton, index) in 5"
        :key="index"
        @click="$emit('onPageClick', totalPages + index - 4)"
        :class="isPageSelected(totalPages + index - 4)"
      >{{ totalPages + index - 4 }}</button>
    </div>

    <font-awesome-icon
      icon="angle-right"
      :class="$style.pagesControlIcon"
      @click="goToNextPage"
    />
    <font-awesome-icon
      icon="angle-double-right"
      :class="$style.pagesControlIcon"
      @click="goToLastPage"
    />
  </div>
</template>

<script>
export default {
  name: "PagesControl",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToFirstPage() {
      this.$emit("goToFirstPage");
    },
    goToPreviousPage() {
      this.$emit("goToPreviousPage");
    },
    goToNextPage() {
      this.$emit("goToNextPage");
    },
    goToLastPage() {
      this.$emit("goToLastPage");
    },
    isPageSelected(pageNumber) {
      if (pageNumber === this.currentPage) {
        return this.$style.pageControlButton_selected;
      } else {
        return this.$style.pageControlButton;
      }
    },
  },
};
</script>

<style module>
.pagesControl {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 0.6rem;
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  background-color: #ccc;
  color: #3366cc;
}

.pagesControlIcon {
  cursor: pointer;
}

.pagesControlIcon:hover {
  color: #000;
}

.pagesControlButtons {
  display: flex;
  gap: 0.6rem;
}

.pageControlButton {
  width: 4rem;
  background-color: #fff;
  color: #3366cc;
  font-weight: bold;
  border: none;
  border-radius: 0.6rem;
}

.pageControlButton:hover {
  cursor: pointer;
  background-color: #eee;
}

.pageControlButton_selected {
  composes: pageControlButton;
  background-color: #3366cc;
  color: #fff;
}

.pageControlButton_selected:hover {
  background-color: #3366cc;
}
</style>