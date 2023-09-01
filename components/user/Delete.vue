<template>
	<div class="col-4">
		<button @click="deleteUser" :disabled="loading" class="btn btn-dark mt-4">
			حذف
			<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
		</button>
	</div>
</template>
<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const loading = ref(false);
const props = defineProps(["id"]);

async function deleteUser() {
	try {
		loading.value = true;
		await $fetch("/api/global", {
			method: "DELETE",
			query: { url: `/users/${props.id}` },
		});
		toast.warning("کاربر حذف شد");
		return navigateTo("/users");
	} catch (error) {
		return error;
	} finally {
		loading.value = false;
	}
}
</script>