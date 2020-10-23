<!-- @format -->

<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link to="/">
          <a class="navbar-item">
            <img src="~assets/edrv-logo.png" alt="Buefy" height="28" />
          </a>
        </nuxt-link>
      </div>
    </nav>

    <section class="main-content columns">
      <div class="container column is-12">
        <transition name="slide-fade">
          <nuxt />
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
export default {}
</script>
