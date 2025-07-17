

<template>
<!---Result.vue-->

    <h2>SEARCH RESULTS</h2>
        <div v-if="videos.length > 0">
            <div v-for="video in videos" :key="video.id.videoId">
                <a
                :href="`https://www.youtube.com/watch?v=${video.id.videoId}` "target="_blank" rel="noopener noreferrer" class="video-title">
                    <p>{{ video.snippet.title }}</p>
                </a>
                <p class="channel-name"><strong>Channel Name</strong>：{{ video.snippet.channelTitle }}</p>
                <p>Post Date{{ video.snippet.publishTime }}</p>
                <iframe  
                    width="560"
                    height="315"
                    :src="`https://www.youtube.com/embed/${video.id.videoId}`"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>

                    <!-- Review ボタン -->
            <button
                @click="toggleReview(video.id.videoId)"
                class="rounded px-6 py-2 border bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-semibold transition mt-4"
            >
                Review
            </button>

            <!-- ✅ Reviewフォームを flex-row の外に置く -->
            <transition name="fade">
                <div v-if="showReviewFormId === video.id.videoId" class="mt-6">
                <ReviewForm :video="video" @submit-review="handleSubmitReview" />
                </div>
            </transition>

            </div>
        </div>
    <div v-else>
        No Video Found
    </div>

</template>

<script setup>

    defineProps({
    videos: {
        type: Array,
        default: () => []
    }
    })

    import {ref} from "vue"
    import ReviewForm from "./Reviewform.vue"

    const showReviewFormId =ref(null) //表示中の感想フォームのID

    const toggleReview = (videoId) => {
        showReviewFormId.value =showReviewFormId.value === videoId ? null : videoId
    }

    const emit = defineEmits(['submit-review'])

    //感想の送信イベントを受け取り、バックエンドに送信
    const handleSubmitReview = (reviewData) => {
        emit('submit-review', reviewData)
    }


</script>