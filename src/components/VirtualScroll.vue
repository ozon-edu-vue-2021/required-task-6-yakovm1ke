<template>
  <div :class="$style.virtualScroll">
    <div :class="$style.tableHead">
      <div
        :class="$style.row"
        v-if="sorts.length"
      >
        <Sorts
          :sorts="sorts"
          @onSortDelete="deleteSort"
          @onSortsDelete="deleteSorts"
        />
      </div>
      <div
        :class="$style.row"
        v-if="filters.length"
      >
        <Filters
          :filters="filters"
          @onFilterDelete="deleteFilter"
          @onFiltersDelete="deleteFilters"
        />
      </div>
      <div :class="$style.tableRow">
        <TableHeadColumn
          :sorts="sorts"
          title="Mac address"
          prop="macAddress"
          @onFilterSubmit="setFilter"
          @onSortClick="toggleSortDirection"
        />
        <TableHeadColumn
          :sorts="sorts"
          title="IP"
          prop="ip"
          @onFilterSubmit="setFilter"
          @onSortClick="toggleSortDirection"
        />
        <TableHeadColumn
          :sorts="sorts"
          title="First name"
          prop="firstname"
          @onFilterSubmit="setFilter"
          @onSortClick="toggleSortDirection"
        />
        <TableHeadColumn
          :sorts="sorts"
          title="Last name"
          prop="lastname"
          @onFilterSubmit="setFilter"
          @onSortClick="toggleSortDirection"
        />
        <TableHeadColumn
          :sorts="sorts"
          title="Email"
          prop="email"
          @onFilterSubmit="setFilter"
          @onSortClick="toggleSortDirection"
        />
        <TableHeadColumn
          :sorts="sorts"
          title="Password"
          prop="password"
          @onFilterSubmit="setFilter"
          @onSortClick="toggleSortDirection"
        />
      </div>
    </div>
    <RecycleScroller
      v-if="filteredUsers.length || filters.length"
      :class="$style.tableBody"
      :items="filteredUsers"
      :item-size="55"
      :buffer="2000"
      page-mode
      key-field="uuid"
      v-slot="{ item }"
    >
      <VirtualRow :item="item" />
    </RecycleScroller>

    <div
      v-else
      :class="$style.tableBody"
    >
      <LoadingSpinner />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import _ from "lodash";
import TableHeadColumn from "@/components/Table/TableHeadColumn.vue";
import Filters from "@/components/Table/Filters.vue";
import Sorts from "@/components/Table/Sorts.vue";
import LoadingSpinner from "@/assets/svg/loading-spinner.svg";
import { RecycleScroller } from "vue-virtual-scroller";
import VirtualRow from "@/components/Table/VirtualRow.vue";

Vue.component("RecycleScroller", RecycleScroller);

export default {
  name: "VirtualScroll",
  components: {
    TableHeadColumn,
    Sorts,
    Filters,
    LoadingSpinner,
    VirtualRow,
  },
  created() {
    this.getData();
  },
  computed: {
    sortedUsers() {
      if (!Object.keys(this.sorts).length) {
        return this.users;
      } else {
        const sortProps = [];
        const sortDirections = [];

        this.sorts.forEach((sortItem) => {
          sortProps.push(sortItem.prop);
          sortDirections.push(sortItem.direction);
        });

        return _.orderBy(this.users, sortProps, sortDirections);
      }
    },
    filteredUsers() {
      if (!this.filters.length) {
        return this.sortedUsers;
      } else {
        return this.filters.reduce((acc, curr) => {
          return [
            ...acc.filter((item) => {
              return item[curr.prop]
                .toLowerCase()
                .includes(curr.value.toLowerCase());
            }),
          ];
        }, this.sortedUsers);
      }
    },
  },
  methods: {
    async getData() {
      try {
        const res = await fetch(
          "https://fakerapi.it/api/v1/users?_quantity=1000"
        );
        if (!res.ok) {
          throw [res.status, res.statusText];
        }
        let data = await res.json();
        this.users = data.data;
      } catch (e) {
        const [status, statusText] = e;
        console.error(
          `The response finished with ${status} status (${statusText})`
        );
      }
    },
    toggleSortDirection(sortProp) {
      const index = this.sorts.findIndex(
        (sortItem) => sortItem.prop === sortProp
      );

      if (index !== -1) {
        if (this.sorts[index].direction === "asc") {
          Vue.set(this.sorts[index], "direction", "desc");
        } else {
          Vue.set(this.sorts[index], "direction", "asc");
        }
      } else {
        this.sorts.push({ prop: sortProp, direction: "asc" });
      }
    },
    setFilter(filterObj) {
      const index = this.filters.findIndex(
        (filterItem) => filterItem.prop === filterObj.prop
      );
      if (index !== -1) {
        this.filters.splice(index, 1, filterObj);
      } else {
        this.filters.push(filterObj);
      }
    },
    deleteSort(index) {
      this.sorts.splice(index, 1);
    },
    deleteSorts() {
      this.sorts.splice(0, this.sorts.length);
    },
    deleteFilter(index) {
      this.filters.splice(index, 1);
    },
    deleteFilters() {
      this.filters.splice(0, this.filters.length);
    },
  },
  data() {
    return {
      users: [],
      sorts: [],
      filters: [],
    };
  },
};
</script>

<style module>
.virtualScroll {
  width: 75rem;
  margin: 0 auto;
  box-shadow: 0.2rem 0.2rem 1rem #ccc;
}

.tableHead {
  position: sticky;
  top: 0;
  background-color: #3366cc;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.tableBody {
  background-color: #ffffff;
  z-index: 0;
}

.tableRow {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1.5fr) 3fr 2.5fr;
}
</style>