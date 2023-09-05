<template>
	<FormKit type="form" @submit="update" :incomplete-message="false" :actions="false">
		<div v-if="errors.length > 0" class="alert alert-danger col-md-4 mt-5" role="alert">
			<ul class="mb-0">
				<li v-for="(error, index) in errors" :key="index">{{ error }}</li>
			</ul>
		</div>
		<div class="row gy-4 mt-2">
			<div class="col-md-3">
				<FormKit type="text" :value="coupon.code" name="code" label="کد" label-class="form-label"
					input-class="form-control" messages-class="form-text text-danger" validation="require"
					:validation-messages="{ require: 'فیلد کد اجباریست' }" />
			</div>
			<div class="col-md-3">
				<FormKit type="text" :value="coupon.percentage" name="percentage" label="درصد" label-class="form-label"
					input-class="form-control" messages-class="form-text text-danger" validation="require|number"
					:validation-messages="{ require: 'فیلد درصد اجباریست', number: 'باید عدد باشد' }" />
			</div>
			<ClientOnly>
				<div class="col-md-4">
					<label for="date-expire" class="form-label">تاریخ انقضا</label>
					<div class="input-group mb-3">
						<span class="input-group-text"><i class="bi bi-clock"></i></span>
						<input :placeholder="coupon.expired_at_jalali" type="text" class="form-control" id="date-expire">
					</div>
					<date-picker v-model="dateExpire" display-format="HH:mm jYYYY-jMM-jDD" format="YYYY-MM-DD HH:mm:ss"
						type="datetime" custom-input="#date-expire" />
				</div>
			</ClientOnly>
			<FormKit :disabled="loading" type="submit" input-class="btn btn-outline-dark mt-3">
				ویرایش
				<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
			</FormKit>
		</div>
	</FormKit>
</template>
<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const loading = ref(false);
const errors = ref([]);
const route = useRoute();
const dateExpire = ref(null)
const { data: coupon } = await useFetch("/api/global", {
	headers: useRequestHeaders(["cookie"]),
	query: { url: `/coupons/${route.params.id}` },
});

async function update(formData) {
	try {
		loading.value = true;
		errors.value = [];
		await $fetch("/api/global", {
			method: "PUT",
			body: dateExpire.value ? { ...formData, expired_at: dateExpire.value } : formData,
			query: { url: `/coupons/${coupon.value.id}` },
		});
		toast.success("ویرایش انجام شد");
		return navigateTo("/coupons");
	} catch (error) {
		errors.value = Object.values(error.data.data.message).flat();
	} finally {
		loading.value = false;
	}
}

definePageMeta({
	middleware: "auth",
});
</script>