<style lang="scss" scoped>

</style>
<script lang="tsx">
    import { defineComponent,ref } from "vue";
    import common from "@/Components/common.vue"
    export default defineComponent({
        setup(){
            let compStr = ref("this is a view setup ");
            // a = "a";
            return ()=>(
                <div>
                    <common/>
                    <h2>{compStr.value}</h2>    
                </div>
            )
        },
        components:{
            common
        }
    })
</script>