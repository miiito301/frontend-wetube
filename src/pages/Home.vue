
<template>
    <!--Home.vue-->
    <div>
        <Form @submit-form="getYoutube" />
        <Result :videos="videos" @submit-review="handleReviewSubmit" /><!--内部でreviewform.vueを表示-->
    </div>
</template>

<script setup>
//src/pages/Home.vue

    const getYoutube=(paramsFromForm)=>{

        const {keyword, order, videoDuration} =paramsFromForm

        //vercelのURL|ローカルURL
        axios.get(`${import.meta.env.VITE_API_URL}/youtube-search`,{

        params:{
        part:"snippet",
        q: keyword,
        type: "video",               
        videoEmbeddable: "true", 
        maxResults:15,
        order: order||"relevance",
        videoDuration: videoDuration || "any" ,
        key: import.meta.env.VITE_YOUTUBE_API_KEY 
        }
        })
        .then(response => {
        console.log("APIレスポンス:", response.data); //response.dataに動画配列が格納
        videos.value = response.data.items; //response.dataをResult.vueのリアクティブ変数に変換
        })
        .catch(error => {
        console.error('API error:', error.response?.data || error.message);
        })
    }

    import Form from '../components/Form.vue'
    import Result from '../components/Result.vue'
    import { ref } from 'vue'
    import axios from 'axios'

    const videos=ref([])
    

    // ReviewForm から送られたレビューを受け取りバックエンドへ送信

    const API_BASE = import.meta.env.VITE_RENDER_URL

    const handleReviewSubmit = async (reviewData) => {
    try { 
        await fetch(`${API_BASE}/reviews`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reviewData)
        })
        alert("感想を保存しました")
    } catch (error) {
        console.error("感想の保存に失敗：", error)
        alert("保存に失敗しました")
    }
    }
</script>