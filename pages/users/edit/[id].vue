<template>
	<FormKit
		type="form"
		@submit="update"
		:incomplete-message="false"
		:actions="false"
	>
		<div
			v-if="errors.length > 0"
			class="alert alert-danger col-md-4 mt-5"
			role="alert"
		>
			<ul class="mb-0">
				<li v-for="(error, index) in errors" :key="index">{{ error }}</li>
			</ul>
		</div>
		<div class="row gy-4 mt-2">
			<div class="col-md-3">
				<FormKit
					type="text"
					:value="user.name"
					name="name"
					label="نام"
					label-class="form-label"
					input-class="form-control"
					messages-class="form-text text-danger"
					validation="require"
					:validation-messages="{ require: 'فیلد نام اجباریست' }"
				/>
			</div>
			<div class="col-md-3">
				<FormKit
					type="email"
					:value="user.email"
					name="email"
					label="ایمیل"
					label-class="form-label"
					input-class="form-control"
					messages-class="form-text text-danger"
					validation="require"
					:validation-messages="{ require: 'فیلد ایمیل اجباریست' }"
				/>
			</div>
			<div class="col-md-3">
				<FormKit
					type="text"
					:value="user.cellphone"
					name="cellphone"
					label="شماره تماس"
					label-class="form-label"
					input-class="form-control"
					messages-class="form-text text-danger"
					:validation="[['require'], ['matches', /^(\+98|0)?9\d{9}$/i]]"
					:validation-messages="{
						require: 'فیلد ایمیل اجباریست',
						matches: 'فرمت شماره تماس معتبر نمیباشد',
					}"
				/>
			</div>
			<FormKit
				:disabled="loading"
				type="submit"
				input-class="btn btn-outline-dark mt-3"
			>
				ایجاد ویرایش
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
const { data: user } = await useFetch("/api/global", {
	headers: useRequestHeaders(["cookie"]),
	query: { url: `/users/${route.params.id}` },
});

async function update(formData) {
	try {
		loading.value = true;
		errors.value = [];
		await $fetch("/api/global", {
			method: "PUT",
			body: formData,
			query: { url: `/users/${user.value.id}` },
		});
		toast.success("ویرایش انجام شد");
		return navigateTo("/users");
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