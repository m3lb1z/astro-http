<template>
  <div v-if="isLoading">Loading...</div>
  <button v-else-if="likeCount === 0" @click="likePost">Like this post</button>
  <button v-else @click="likePost">
    Likes <span>{{ likeCount }}</span>
  </button>
  {{ likeClicks }} clicks
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import debounce from "lodash.debounce";

interface Props {
  postId: string;
}

const props = defineProps<Props>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch(
  likeCount,
  debounce(() => {
    fetch(`/api/posts/likes/${props.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: likeClicks.value }),
    });
    likeClicks.value = 0;
  }, 500)
);

const likePost = () => {
  likeCount.value++;
  likeClicks.value++;
};

const getCurrentLikes = async () => {
  const resp = await fetch(`/api/posts/likes/${props.postId}`);
  if (!resp.ok) {
    console.error("Error fetching likes");
    return;
  }
  const data = await resp.json();
  likeCount.value = data.likes;
  isLoading.value = false;
};

getCurrentLikes();
</script>

<style scoped>
button {
  background-color: #482bd7; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
}

button:hover {
  background-color: #42377d; /* Darker green */
}
</style>
