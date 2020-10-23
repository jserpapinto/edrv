<!-- @format -->

<template>
  <b-modal
    v-model="computedModalState"
    has-modal-card
    trap-focus
    :destroy-on-hide="false"
    aria-role="dialog"
    aria-modal
  >
    <template #default="props">
      <div class="modal-card" style="min-width: 680px">
        <header class="modal-card-head">
          <p class="modal-card-title">Charge Station details</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <h5 class="title is-5 mt-4">
            Information
            <span class="icon">
              <i class="mdi  mdi-information-outline"></i>
            </span>
          </h5>
          <div class="row">
            <div class="columns">
              <div class="column is-4 has-text-weight-bold">
                Address
              </div>
              <div class="column is-8">
                {{ getModalChargestation.address }}
              </div>
            </div>
            <div class="columns">
              <div class="column is-4 has-text-weight-bold">
                City
              </div>
              <div class="column is-8">
                {{ getModalChargestation.city }}
              </div>
            </div>
            <div class="columns">
              <div class="column is-4 has-text-weight-bold">
                # of Charge Stations
              </div>
              <div class="column is-8">
                {{ getModalChargestation.chargestations }}
              </div>
            </div>
          </div>
          <hr />
          <div class="pt-4">
            <div class="columns">
              <div class="column is-8">
                <h5 class="title is-5">
                  Open hours
                  <span class="icon">
                    <i class="mdi  mdi-alarm"></i>
                  </span>
                </h5>
              </div>
              <div v-if="isAdmin" class="column is-4">
                <div class="buttons is-right">
                  <button @click="handleAddHoursClick" class="button is-info">
                    Add hours
                  </button>
                </div>
              </div>
            </div>

            <div v-if="addHoursForm" class="mb-4 new-hours">
              <div class="box">
                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <h6 class="is-6">Add new hours</h6>
                      <div class="columns">
                        <div class="column is-4">
                          <div class="select">
                            <select v-model="form.weekDay">
                              <option v-for="day in days">{{ day }}</option>
                            </select>
                          </div>
                        </div>
                        <div class="column is-4">
                          <VueCtkDateTimePicker
                            :only-time="true"
                            format="hh:mm A"
                            formatted="hh:mm A"
                            output-format="hh:mm A"
                            label="Starting hours"
                            v-model="form.start"
                          />
                        </div>
                        <div class="column is-4">
                          <VueCtkDateTimePicker
                            :only-time="true"
                            format="hh:mm A"
                            formatted="hh:mm A"
                            output-format="hh:mm A"
                            label="Ending hours"
                            v-model="form.end"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="columns">
                        <div class="column is-12">
                          <button
                            @click="handleSave"
                            class="button is-primary"
                            type="button"
                            :disabled="formInvalid"
                          >
                            Save
                          </button>
                          <button
                            class="button"
                            type="button"
                            @click="handleCloseAddHours"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div v-for="hour in getModalChargestation.hours" class="box">
              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong class="mr-2"
                        >{{ getDayName(hour.weekDay) }}:</strong
                      >
                      <span>{{ hour.start }}</span> -
                      <span>{{ hour.end }}</span>
                      <span v-if="isAdmin" class="is-pulled-right">
                        <span
                          style="cursor: pointer"
                          @click="handleHoursDelete(hour)"
                          class="icon is-medium has-text-danger"
                        >
                          <i class="mdi mdi-24px mdi-delete-forever"></i> </span
                      ></span>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$emit('close')">
            Close
          </button>
        </footer>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ChargestationModal',
  computed: {
    ...mapGetters(['getModalState', 'getModalChargestation', 'getUserType']),
    computedModalState: {
      get() {
        return this.getModalState
      },
      set(val) {
        val ? this.openModal() : this.closeModal()
      }
    },
    isAdmin() {
      console.log(this.getUserType)
      return this.getUserType === 'admin'
    }
  },
  data() {
    return {
      addHoursForm: false,
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      form: {
        weekDay: null,
        start: null,
        end: null
      },
      formInvalid: false
    }
  },
  methods: {
    ...mapActions(['closeModal', 'openModal', 'addHours', 'deleteHours']),
    getDayName(dayIndex) {
      return this.days[dayIndex]
    },
    handleAddHoursClick() {
      this.addHoursForm = true
    },
    handleCloseAddHours() {
      this.addHoursForm = false
      this.form = {
        weekDay: null,
        start: null,
        end: null
      }
    },
    handleSave() {
      const data = this.form
      console.log(this.form.weekDay)
      data.weekDay = this.days.indexOf(this.form.weekDay)
      this.addHours({ id: this.getModalChargestation.id, hour: data }).then(
        () => {
          this.handleCloseAddHours()
        }
      )
    },
    handleHoursDelete(hours) {
      console.log(hours)
      this.deleteHours({
        id: this.getModalChargestation.id,
        hour: hours
      })
    }
  }
}
</script>

<style scoped></style>
