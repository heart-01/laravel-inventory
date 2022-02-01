<template>
    <button :disabled="disabled" @click="delay" class="border" >Increase</button>
</template>

<script>
  export default {
    data () {
      return {
        disabled: false,
        timeout: null
      }
    },
    methods: {
      delay () {
        this.disabled = true

        // Re-enable after 5 seconds
        this.timeout = setTimeout(() => {
          this.disabled = false
        }, 5000)

        this.myFunction()
      },
      myFunction () {
        // Your function
      }
    }
  }
</script>