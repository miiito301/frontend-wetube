
<template>
<!--Form.vue-->
    <form @submit.prevent="submitForm" 
    class="max-w-4xl mx-auto p-6 flex flex-col items-center gap-6"> 

        <div class="w-full">
            <input type="text" v-model="keyword" placeholder="keyword"
            class="w-full border border-gray-300 rounded-md px-4 py-3 placeholder-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"> 
        </div><!--keywordはrefで管理されているリアクティブな変数-->

            <div class="flex gap-6 w-full">
                <select v-model="videoDuration"
                class="flex-1 border border-gray-300 rounded-md px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"> 
                    <option value="">Length</option>
                    <option value="short">~４min</option>
                    <option value="medium">~２０min</option>
                    <option value="long">２０min~</option>
                </select>

                <select v-model="order" 
                class="flex-1 border border-gray-300 rounded-md px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition">
                    <option value="">Sorting</option>
                    <option value="viewCount">Views</option>
                    <option value="relevance">Relevance</option>
                    <option value="date">Date</option>
                </select>
            </div>

            <div>
                <button type="submit" class="bg-white font-semibold px-12 py-2 rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition">
                    🔎</button> <!--submitボタンを押すとsubmit-form関数が呼び出される-->
            </div>
        
    </form>

</template>



<script setup>

    import {ref} from "vue"

    const keyword=ref("")
    const videoDuration=ref("")
    const order=ref("")


    const submitForm=()=>{ /*emits("submit-form",リアクティブ変数) で親コンポーネント（App.vue）に入力値を渡します。 */
        emits("submit-form", {
            keyword:keyword.value, 
            videoDuration:videoDuration.value,
            order:order.value,
            })
        keyword.value="", /*emits後にフォームを空にする */
        videoDuration.value="",
        order.value=""
    }

    const emits=defineEmits([
        "submit-form"
    ])

</script>