<template>
  <section>
    <b-table
      :data="users"
      ref="table"
      paginated
      per-page="10"
      default-sort="id"
      detailed
      detail-key="id"
      :show-detail-icon="true"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      striped
      @click="toggle"
      hoverable
    >
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric sortable>
          {{ props.row.id }}
          </b-table-column>

        <b-table-column field="first_name" label="First Name" searchable sortable>
          {{ props.row.first_name }}
          </b-table-column>

        <b-table-column field="last_name" label="Last Name" searchable sortable>
          {{ props.row.last_name }}
          </b-table-column>

        <b-table-column field="mac" label="MAC" searchable sortable>
          {{ props.row.mac }}
          </b-table-column>

        <b-table-column field="phone" label="Phone" searchable sortable>
          {{ props.row.phone }}
          </b-table-column>
      </template>

      <template slot="detail" slot-scope="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
               <ve-histogram :data="props.row.signals" :settings="chartSettings" />
            </div>
          </div>
        </article>
      </template>
    </b-table>
  </section>
</template>

<script>
export default {
  name: 'TableOfUsers',
  data() {
    this.chartSettings = {
      yAxisName: ['‒ RSSI'],
    };
    return {
      users: this.$store.state.users,
    };
  },
  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },
  },

  created() {
    this.$store.dispatch('getAllUsers');
  },
};
</script>
