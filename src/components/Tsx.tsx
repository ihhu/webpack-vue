import { ref, defineComponent } from "vue";
import Common from "@/components/Common.vue"


export default defineComponent({
    component:{
        Common
    },
    setup(){
        let compStr = ref<string>("this is tsx view setup");
        let App = ()=>(
            <div class="tsx">
                <Common/>
                <h2>{compStr.value}</h2>    
            </div>
        )
        return ()=>(
            <App/>
        )
    }
});