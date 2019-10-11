<template>
    <div :id="radomId">
        <slot name="main"></slot>
        <slot name="page"></slot>
    </div>
</template>

<script>
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
export default {
    /*
        * @{updata} Boolean 属性为true更新滚动条 并返回事件名 onUpdata
    */
    props: {
        updata: Boolean
    },
    data() {
        return {
            scrollEvent: null
        };
    },
    mounted() {
        /*
        * 开始注册滚动
        */
        this.scrollEvent = new PerfectScrollbar(`#${this.radomId}`, {
            wheelSpeed: 2,
            wheelPropagation: true,
            minScrollbarLength: 10
        });
        this.$emit("getScroll", document.getElementById(this.radomId).scrollWidth);
    },
    computed: {
        radomId() {
            /* 随机生成一个ID */
            return "SC" + (Date.now() + parseInt(Math.random() * 1000));
        }
    },
    destroyed() {
        /* 离开后删除 */
        this.scrollEvent.destroy();
    },
    methods: {
        init(){
            this.scrollEvent = new PerfectScrollbar(`#${this.radomId}`, {
                wheelSpeed: 2,
                wheelPropagation: true,
                minScrollbarLength: 10
            });
            this.$emit("getScroll", document.getElementById(this.radomId).scrollWidth);
        },
        top(far) {
            if(far){
                document.getElementById(this.radomId).scrollTop = far;
            }else{
                document.getElementById(this.radomId).scrollTop = 0;
            }

        },
        bottom(){
            setTimeout(x=>{
                let Top = document.getElementById(this.radomId).scrollHeight;
                document.getElementById(this.radomId).scrollTop = Top;
            },700)
        },
        left(scroll) {
            /* let Width = document.getElementById(this.radomId).scrollWidth;
            document.getElementById(this.radomId).scrollLeft = Width+100; */
            setTimeout(x=>{
                let Width = document.getElementById(this.radomId).scrollWidth;
                document.getElementById(this.radomId).scrollLeft = Width+100;
                console.log(Width)
            },500)
        },
        right() {
            //滚动到最右侧
            let left = document.getElementById(this.radomId).scrollLeft;
            console.log(left);
        },
        updataEvent(state) {
            /* 传参，如果为true 更新滚动条 */
            console.log(1);
            let dom = document.getElementById(this.radomId);
            this.scrollEvent.update();
            dom.scrollLeft = 0;
            dom.scrollTop = 0;
        }
    },
    watch: {
        updata(state) {
            if (state) {
                /* 传参，如果为true 更新滚动条 */
                this.scrollEvent.update();
                this.emit("onUpdata", !state);
            }
        }
    }
};
</script>
<style>
</style>
