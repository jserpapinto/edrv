<!-- @format -->

<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Charge Stations
          </h1>
          <h2 class="subtitle">
            Check the charge stations' availability hours
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <b-table
        :striped="true"
        :hoverable="true"
        :data="data"
        :columns="columns"
        sortIcon="arrow-up"
        sortIconSize="is-small"
        :loading="$fetchState.pending"
        :selected.sync="selected"
        @click="handleRowClick"
      ></b-table>
    </section>

    <transition name="slide-fade">
      <ChargestationModal v-if="getModalState" @close="handleModalClose" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ChargestationModal from '~/components/ChargestationModal'

export default {
  name: 'Chargestations',
  components: { ChargestationModal },
  async fetch() {
    this.data = this.getChargestations
  },
  created() {
    if (this.getUserType === null) {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['getModalState', 'getChargestations', 'getUserType'])
  },
  data() {
    return {
      modal: {
        open: false,
        chargestation: null
      },
      selected: null,
      data: [],
      columns: [
        {
          field: 'address',
          label: 'Address',
          sortable: true
        },
        {
          field: 'city',
          label: 'City',
          sortable: true
        },
        {
          field: 'chargestations',
          label: '# Chargestations',
          width: '160',
          sortable: true
        },
        {
          field: 'menu',
          label: ''
        }
      ]
    }
  },
  methods: {
    ...mapActions(['setModalChargestation', 'openModal', 'closeModal']),
    handleRowClick(row) {
      this.selected = row
      this.setModalChargestation(row)
      this.openModal()
    },
    handleModalClose() {
      this.selected = null
      this.closeModal()
    }
  }
}
</script>

<style lang="css">
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
