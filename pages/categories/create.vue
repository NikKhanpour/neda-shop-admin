<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
		<h4 class="fw-bold">ایجاد دسته بندی</h4>
	</div>
	<div v-if="errors.length > 0" class="alert alert-danger col-md-3 m-auto mb-4" role="alert">
		<ul class="mb-0">
			<li v-for="(error, index) in errors" :key="index">{{ error }}</li>
		</ul>
	</div>
	<FormKit type="form" @submit="create" :incomplete-message="false" :actions="false">
		<div class="row gy-4">
			<div class="col-md-3">
				<FormKit type="text" id="name" name="name" label="نام" label-class="form-label" input-class="form-control"
					messages-class="form-text text-danger" validation="required"
					:validation-messages="{ required: 'فیلد نام اجباریست' }" />
			</div>
			<div class="col-md-3">
				<FormKit type="text" id="description" name="description" label="توضیحات" label-class="form-label"
					input-class="form-control" messages-class="form-text text-danger" />
			</div>
			<FormKit :disabled="loading" type="submit" input-class="btn btn-outline-dark mt-3">
				ایجاد دسته بندی
				<div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
			</FormKit>
		</div>
	</FormKit>
</template>
<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const errors = ref([]);
const loading = ref(false);

async function create(formData) {
	try {
		loading.value = true;
		errors.value = [];
		const data = await $fetch("/api/global", {
			method: "POST",
			body: formData,
			query: { url: "/categories" },
		});
		toast.success("دسته بندی ایجاد شد");
		return navigateTo("/categories");
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