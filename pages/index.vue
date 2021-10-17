<template>
  <div class="xl:container mx-auto p-5 xl:py-12">
    <header class="pb-5 mb-5 border-b flex flex-col lg:flex-row item-center justify-between">
      <div class>
        <h1 class="flex items-center space-x-2 text-3xl font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6">
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm1.67 14h-3.34l-1.38 1.897.554 1.706A7.993 7.993 0 0 0 12 20c.871 0 1.71-.14 2.496-.397l.553-1.706L13.669 16zm-8.376-5.128l-1.292.937L4 12c0 1.73.549 3.331 1.482 4.64h1.91l1.323-1.82-1.028-3.17-2.393-.778zm13.412 0l-2.393.778-1.028 3.17 1.322 1.82h1.91A7.964 7.964 0 0 0 20 12l-.003-.19-1.291-.938zM12 9.536l-2.344 1.702.896 2.762h2.895l.896-2.762L12 9.536zm2.291-5.203L13 5.273V7.79l2.694 1.957 2.239-.727.554-1.703a8.014 8.014 0 0 0-4.196-2.984zm-4.583 0a8.014 8.014 0 0 0-4.195 2.985l.554 1.702 2.239.727L11 7.79V5.273l-1.292-.94z"
            />
          </svg>
          <span>Cotecalcs</span>
        </h1>
        <p class="block text-gray-600">Les meilleurs paris en fonction des cotes</p>
      </div>
      <div class="mt-4 lg:mt-0">
        <label class="block font-semibold text-xs uppercase tracking-wide mb-1" for="stateZ">Z Number</label>
        <input
          class="border rounded p-2 w-full lg:w-auto"
          type="number"
          step="0.01"
          id="stateZ"
          name="stateZ"
          v-model="z"
        />
      </div>
    </header>
    <main>
      <section>
        <cote-table :state="games" :z="z" />
      </section>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    z: {
      get() {
        return this.$store.state.games.z
      },
      set(value) {
        this.$store.commit('updateZ', value)
      }
    },
    games: {
      get() {
        if(localStorage.getItem('games')) {
          this.$store.commit('setGames', JSON.parse(localStorage.getItem('games'))) 
        }
        return this.$store.state.games
      },
      set(value) {
        this.$store.commit('setGames', value)
      }
    },
  },
  mounted() {
    this.setLocalstorage()
  },
  methods: {
    setLocalstorage() {
      if(localStorage) {
        localStorage.setItem('games', JSON.stringify(this.games))

      }
    },
  }
}
</script>
