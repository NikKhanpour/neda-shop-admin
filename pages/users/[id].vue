<template>
	<div
		class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
	>
		<h4 class="fw-bold">کاربر با آیدی {{ user.data.id }}</h4>
	</div>
	<div class="container">
		<div class="row text-center">
			<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
				<label for="name" class="form-label">نام</label>
				<input
					:value="user.data.name"
					id="name"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
				<label for="create_at" class="form-label">تاریخ عضویت</label>
				<input
					:value="user.data.created_at"
					id="create_at"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
				<label for="cellphone" class="form-label">شماره</label>
				<input
					:value="user.data.cellphone"
					id="cellphone"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
				<label for="email" class="form-label">ایمیل</label>
				<input
					:value="user.data.email"
					id="email"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<div class="col-12 mt-4">
				<button
					@click="deleteUser"
					:disabled="loading"
					class="btn btn-outline-dark w-100"
				>
					حذف
					<div
						v-if="loading"
						class="spinner-border spinner-border-sm ms-2"
					></div>
				</button>
			</div>
		</div>
	</div>
</template>
<script setup>
import { useToast } from "vue-toastification";

const route = useRoute();
const loading = ref(false);
const toast = useToast();
const {
	public: { apiBase },
} = useRuntimeConfig();
if (process.client) {
	var token = localStorage.getItem("panel-token");
}

const user = await $fetch(`${apiBase}/users/${route.params.id}`, {
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	},
});

definePageMeta({
	middleware: "auth",
});

async function deleteUser() {
	try {
		loading.value = true;
		await $fetch(`${apiBase}/users/${route.params.id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		toast.warning("کاربر حذف شد");
		return navigateTo("/users");
	} catch (error) {
		console.log(error);
	} finally {
		loading.value = false;
	}
}
</script>