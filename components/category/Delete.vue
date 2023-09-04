<template>
	<div class="col-4">
		<button @click="categoryDelete" :disabled="loading" class="btn btn-dark mt-4">
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

async function categoryDelete() {
	try {
		loading.value = true;
		await $fetch("/api/global", {
			method: "DELETE",
			query: { url: `/categories/${props.id}` },
		});
		toast.warning("دسته بندی حذف شد");
		return navigateTo("/categories");
	} catch (error) {
		return error;
	} finally {
		loading.value = false;
	}
}
</script>