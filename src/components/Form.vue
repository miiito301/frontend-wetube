
<template>
<!--Form.vue-->
    <form @submit.prevent="submitForm" 
    class="max-w-4xl mx-auto p-6 flex flex-col items-center"> 

        <div class="flex gap-6 mb-6">
            <input type="text" v-model="keyword" placeholder="キーワード（スペース区切り）"
            class="flex1 border border-gray-300 rounded-md px-4 py-3 placeholder-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"> <!--keywordはrefで管理されているリアクティブな変数-->

            <div class="flex gap-6 mb-6">
                <select v-model="videoDuration"
                class="flex1 border border-gray-300 rounded-md px-4 py-3 placeholder-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"> 
                    <option value="">長さ</option>
                    <option value="short">４分未満</option>
                    <option value="medium">２０分未満</option>
                    <option value="long">２０分以上</option>
                </select>
                <select v-model="order" 
                class="flex1 border border-gray-300 rounded-md px-4 py-3 placeholder-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition">
                    <option value="">ソート方法</option>
                    <option value="viewCount">再生回数順</option>
                    <option value="relevance">関連度順</option>
                    <option value="date">日付順</option>
                </select>
            </div>

            <div class="text-center">
                <button type="submit" class="bg-white text-blue-700 font-semibold px-12 py-1 rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition">
                    Search</button> <!--submitボタンを押すとsubmit-form関数が呼び出される-->
            </div>
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