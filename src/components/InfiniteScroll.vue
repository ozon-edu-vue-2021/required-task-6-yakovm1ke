<template>
  <div :class="$style.infiniteScroll">
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
        v-for="user in loadedUsers"
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
      <div
        :class="$style.loader"
        v-view="onViewHandler"
        v-if="filteredUsers.length > loadedUsers.length"
      >
        <DotsLoader />
      </div>
      <div
        v-else
        :class="$style.loader"
      >
        All users are loaded
      </div>
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
import checkVue from "vue-check-view";
import TableHeadColumn from "@/components/Table/TableHeadColumn.vue";
import Filters from "@/components/Table/Filters.vue";
import Sorts from "@/components/Table/Sorts.vue";
import DotsLoader from "@/assets/svg/dots-loader.svg";
import LoadingSpinner from "@/assets/svg/loading-spinner.svg";

Vue.use(checkVue);

export default {
  name: "InfiniteScroll",
  components: {
    TableHeadColumn,
    Sorts,
    Filters,
    DotsLoader,
    LoadingSpinner,
  },
  directives: {
    checkVue,
  },
  created() {
    this.blockingPromise = this.getData();
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
      this.reloadUsers();

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
      this.reloadUsers();

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
      this.reloadUsers();
      this.sorts.splice(index, 1);
    },
    deleteSorts() {
      this.reloadUsers();
      this.sorts.splice(0, this.sorts.length);
    },
    deleteFilter(index) {
      this.reloadUsers();
      this.filters.splice(index, 1);
    },
    deleteFilters() {
      this.reloadUsers();
      this.filters.splice(0, this.filters.length);
    },
    reloadUsers() {
      this.loadedUsers.splice(0, this.loadedUsers.length);
      this.onViewHandler();
    },
    async onViewHandler() {
      this.blockingPromise && (await this.blockingPromise);
      let length = this.loadedUsers.length;
      let mainCounter = this.filteredUsers.length;

      if (mainCounter < 30) {
        for (let i = 0; i < mainCounter; i++) {
          this.loadedUsers.push(this.filteredUsers[i]);
        }
      } else {
        if (length === 0) {
          for (let i = 0; i < 30; i++) {
            this.loadedUsers.push(this.filteredUsers[i]);
          }
        } else if (length < this.filteredUsers.length) {
          let counter = this.filteredUsers.length - length;
          if (counter > 10) {
            counter = 10;
          }
          for (let i = 0; i < counter; i++) {
            this.loadedUsers.push(this.filteredUsers[length + i]);
          }
        }
      }
    },
  },
  data() {
    return {
      users: [],
      sorts: [],
      filters: [],
      loadedUsers: [],
    };
  },
};
</script>

<style module>
.infiniteScroll {
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

.loader {
  padding: 0.5rem;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>