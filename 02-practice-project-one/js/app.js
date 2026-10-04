const { createApp, reactive, computed } = Vue

const createDefaultState = () => ({
  state: true,
  inputName: '',
  names: [],
  error: '',
  result: ''
})

createApp({

  setup() {

    const data = reactive(createDefaultState())

    const isReady = computed(() => data.names.length >= 2)

    const addNameToList = () => {

      const userName = data.inputName

      if (!userName) {
        data.error = 'Please enter a name'
        return
      }

      if (data.names.includes(userName)) {
        data.error = `"${userName}" is already on the list`
        return
      }

      data.names.push(userName)
      data.inputName = ''
      data.error = ''
    }

    const removeName = (index) => {
      data.names.splice(index, 1)
    }

    const showResults = () => {

      const randomIndex = Math.floor(
        Math.random() * data.names.length
      )

      data.result = data.names[randomIndex]
      data.state = false
    }

    const resetApp = () => {
      Object.assign(data, createDefaultState())
    }

    const getNewResult = () => {

      if (data.names.length < 2) return

      const availableNames = data.names.filter(
        name => name !== data.result
      )

      const randomIndex = Math.floor(
        Math.random() * availableNames.length
      )

      data.result = availableNames[randomIndex]
    }

    return {
      data,
      isReady,
      addNameToList,
      removeName,
      showResults,
      resetApp,
      getNewResult
    }
  }

}).mount('#app')
