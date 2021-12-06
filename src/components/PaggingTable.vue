<template>
  <div :class="$style.paggingTable">
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
    <div
      :class="$style.tableBody"
      v-if="filteredUsers.length || filters.length"
    >
      <div
        :class="$style.tableRow"
        v-for="user in currentPageUsers"
        :key="user.uuid"
      >
        <div
          :class="$style.tableColumn"
          prop="macAddress"
        >
          {{ user.macAddress }}
        </div>
        <div
          :class="$style.tableColumn"
          prop="ip"
        >
          {{ user.ip }}
        </div>
        <div
          :class="$style.tableColumn"
          prop="firstname"
        >
          {{ user.firstname }}
        </div>
        <div
          :class="$style.tableColumn"
          prop="lastname"
        >
          {{ user.lastname }}
        </div>
        <div
          :class="$style.tableColumn"
          prop="email"
        >
          <a :href="`mailto:${user.email}`">{{ user.email }}</a>
        </div>
        <div
          :class="$style.tableColumn"
          prop="password"
        >
          {{ user.password }}
        </div>
      </div>
      <PagesControl
        :currentPage="currentPage"
        :totalPages="totalPages"
        @onPageClick="goToPage"
        @goToFirstPage="goToFirstPage"
        @goToPreviousPage="goToPreviousPage"
        @goToNextPage="goToNextPage"
        @goToLastPage="goToLastPage"
      />
    </div>
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
import PagesControl from "@/components/Table/PagesControl.vue";
import LoadingSpinner from "@/assets/svg/loading-spinner.svg";

export default {
  name: "PaggingTable",
  components: {
    TableHeadColumn,
    Sorts,
    Filters,
    PagesControl,
    LoadingSpinner,
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
    totalPages() {
      return (this.filteredUsers.length / this.pageSize) % 1
        ? Math.trunc(this.filteredUsers.length / this.pageSize) + 1
        : this.filteredUsers.length / this.pageSize;
    },
    currentPageUsers() {
      if (this.currentPage === this.totalPages) {
        return this.filteredUsers.slice((this.currentPage - 1) * this.pageSize);
      } else {
        return this.filteredUsers.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
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
      this.currentPage = 1;
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
      this.currentPage = 1;
      this.filters.splice(index, 1);
    },
    deleteFilters() {
      this.currentPage = 1;
      this.filters.splice(0, this.filters.length);
    },
    goToFirstPage() {
      this.currentPage = 1;
    },
    goToPreviousPage() {
      if (this.currentPage !== 1) {
        this.currentPage--;
      }
    },
    goToNextPage() {
      if (this.currentPage !== this.totalPages) {
        this.currentPage++;
      }
    },
    goToLastPage() {
      this.currentPage = this.totalPages;
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },
  data() {
    return {
      users: [],
      sorts: [],
      filters: [],
      currentPage: 1,
      pageSize: 10,
    };
  },
};
</script>

<style module>
.paggingTable {
  width: 75rem;
  margin: 0 auto;
  box-shadow: 0.2rem 0.2rem 1rem #ccc;
  position: relative;
}

.tableHead {
  position: sticky;
  top: 0;
  background-color: #3366cc;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  flex-direction: column;
}

.tableBody {
  background-color: #ffffff;
}

.tableRow {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1.5fr) 3fr 2.5fr;
}

.tableColumn {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tableHeadIcons {
  display: flex;
  justify-content: space-between;
  gap: 0.2rem;
}
</style>