import Common from '@/components/Common.vue';
import { defineComponent, ref } from 'vue';


export default defineComponent({
  component:{
    Common
  },
  setup(){
    const compStr = ref<string>('this is tsx view setup');
    const App = ()=>(
      <div class="tsx">
        <Common/>
        <h2>{compStr.value}</h2>    
      </div>
    );
    return ()=>(
      <App/>
    );
  }
});