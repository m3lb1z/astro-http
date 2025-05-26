<template>
  <div v-if="isLoading">Loading...</div>
  <button v-else-if="likeCount === 0" @click="likePost">Like this post</button>
  <button v-else @click="likePost">
    Likes <span>{{ likeCount }}</span>
  </button>
  {{ likeClicks }} clicks
</template>

<script setup lang="ts">
import { actions } from "astro:actions";
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
  debounce(async () => {
    await actions.updatePostLikes({
      postId: props.postId,
      increment: likeClicks.value,
    });
    likeClicks.value = 0;
  }, 500)
);

const likePost = async () => {
  likeCount.value++;
  likeClicks.value++;
};

const getCurrentLikes = async () => {
  const { data, error } = await actions.getPostLikes(props.postId);
  if (error) {
    console.error("Error fetching likes", error);
    return;
  }

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
