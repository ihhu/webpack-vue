<style lang="scss" scoped>

</style>
<script lang="tsx">
    import { defineComponent,ref } from "vue";
    import Common from "@/components/Common.vue"
    export default defineComponent({
        setup(){
            let compStr = ref("this is a view setup ");
            // a = "a";
            return ()=>(
                <div>
                    <Common/>
                    <h2>{compStr.value}</h2>    
                </div>
            )
        },
        components:{
            Common
        }
    })
</script>