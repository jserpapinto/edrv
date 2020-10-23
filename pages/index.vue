<!-- @format -->

<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1 has-text-centered">Charge Stations</h1>
          <h2 class="subtitle has-text-centered">
            What is your role?
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="row">
        <div class="columns is-mobile is-centered">
          <div class="column is-8">
            <div class="tile is-ancestor">
              <div class="tile is-vertical is-12">
                <div class="tile">
                  <div class="tile is-parent is-vertical">
                    <article
                      @click="handleUserRoleClick('admin')"
                      class="tile is-child notification is-primary box"
                    >
                      <p class="title">Admin</p>
                      <p class="subtitle">
                        Set your charge station availability
                      </p>
                    </article>
                  </div>
                  <div class="tile is-parent">
                    <article
                      @click="handleUserRoleClick('user')"
                      class="tile is-child notification is-info"
                    >
                      <p class="title">User</p>
                      <p class="subtitle">
                        Check charge stations' availability
                      </p>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'HomePage',
  computed: {
    ...mapGetters(['getUserType'])
  },
  methods: {
    ...mapActions(['setUserType']),
    handleUserRoleClick(type) {
      this.setUserType(type)
      this.$router.push({ name: 'chargestations' })
    }
  }
}
</script>

<style lang="css">
.tile.is-parent {
  cursor: pointer;
}
.tile.is-child:hover {
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.3);
}
</style>
