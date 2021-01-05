// MyBook.vue

import { h, ref, reactive, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const readersNumber = ref(0)
    const book = reactive({ title: 'Vue 3 Guide' })
    // Please note that we need to explicitly expose ref value here
    return () => (<div>{readersNumber.value}, {book.title}</div>)
  }
})