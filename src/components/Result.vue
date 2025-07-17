

<template>
<!---Result.vue-->
        <div v-if="videos.length > 0" class="space-y-6">

            <div v-for="video in videos" :key="video.id.videoId"
            class="flex flex-col bg-white border rounded-lg shadow-md p-4">

                <!-- 横並びレイアウト -->
                <div class="flex gap-4">
                <!-- サムネイル左側 -->
                    <img
                    :src="video.snippet.thumbnails.medium.url"
                    :alt="video.snippet.title"
                    class="w-48 h-auto rounded　m-2"
                    />

                    <!-- 右側の情報 -->
                    <div class="flex flex-col justify-between">
                        <a :href="`https://www.youtube.com/watch?v=${video.id.videoId}`"　target="_blank"　rel="noopener noreferrer"
                        class="text-lg font-semibold text-blue-600 hover:underline">
                            {{ video.snippet.title }}
                        </a>
                        <p class="text-gray-600"><strong>Channel:</strong> {{ video.snippet.channelTitle }}</p>
                        <p class="text-gray-600"><strong>Posted:</strong> {{ video.snippet.publishTime }}</p>
                    </div>
                </div>

                <!-- Review ボタン -->
                <div class="mt-4">
                    <button
                        @click="toggleReview(video.id.videoId)"
                        class="rounded px-6 py-2 border bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-semibold transition"
                    >
                        Review
                    </button>
                </div>

                <!-- ✅ Reviewフォームを flex-row の外に置く -->
                <transition name="fade">
                    <div v-if="showReviewFormId === video.id.videoId" class="mt-6">
                    <ReviewForm :video="video" @submit-review="handleSubmitReview" />
                    </div>
                </transition>
            </div>
        </div>

        <div v-else class="text-center text-gray-500 mt-6">
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
