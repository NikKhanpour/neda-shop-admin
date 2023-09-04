<template>
	<div>
		<button @click="deleteItem" :disabled="loading" class="btn btn-dark">
			حذف
			<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
		</button>
	</div>
</template>
<script setup>
import { useToast } from "vue-toastification";
const props = defineProps(["id"]);
const loading = ref(false);
const toast = useToast();
async function deleteItem() {
	try {
		loading.value = true;
		await $fetch("/api/global", {
			method: "DELETE",
			headers: useRequestHeaders(["cookie"]),
			query: { url: `/products/${props.id}` },
		});
		toast.success("حذف محصول انجام شد");
		return navigateTo("/products");
	} catch (error) {
		return error;
	} finally {
		loading.value = false;
	}
}
</script>