<template>
	<div class="col-4">
		<button @click="deleteCoupon" :disabled="loading" class="btn btn-dark mt-4">
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

async function deleteCoupon() {
	try {
		loading.value = true;
		await $fetch("/api/global", {
			method: "DELETE",
			query: { url: `/coupons/${props.id}` },
		});
		toast.warning("کد تخفیف حذف شد");
		return navigateTo("/coupons");
	} catch (error) {
		return error;
	} finally {
		loading.value = false;
	}
}
</script>