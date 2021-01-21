<script lang="tsx">
import { defineComponent, ref } from 'vue';
import Common from '@/components/Common.vue';
export default defineComponent({
  components:{
    Common
  },
  setup(){
    let compStr = ref('this is a view setup ');
    // a = "a";
    return ()=>(
      <div>
        <Common/>
        <h2>{compStr.value}</h2>    
      </div>
    );
  }
});
</script>
<style lang="scss" scoped>

</style>