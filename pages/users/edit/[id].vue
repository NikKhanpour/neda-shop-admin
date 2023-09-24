<template>
	<div
		class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
	>
		<h4 class="fw-bold">ویرایش کاربر با آیدی {{ data.data.id }}</h4>
	</div>
	<div class="container">
		<div class="row text-center">
			<div v-if="errors.length > 0" class="alert alert-danger">
				<ul class="mb-0">
					<li v-for="(error, index) in errors" :key="index">{{ error }}</li>
				</ul>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
				<label for="name" class="form-label">نام</label>
				<input
					v-model="user.name"
					id="name"
					type="text"
					class="form-control text-center"
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
				<label for="cellphone" class="form-label">شماره</label>
				<input
					v-model="user.cellphone"
					id="cellphone"
					type="text"
					class="form-control text-center"
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
				<label for="email" class="form-label">ایمیل</label>
				<input
					v-model="user.email"
					id="email"
					type="text"
					class="form-control text-center"
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
				<label for="create_at" class="form-label">پسورد</label>
				<input
					v-model="user.password"
					id="create_at"
					type="text"
					class="form-control text-center"
				/>
			</div>
			<div class="col-12 mt-4">
				<button
					@click="update"
					:disabled="loading"
					class="btn btn-outline-dark w-100"
				>
					ویرایش
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
const toast = useToast();
const errors = ref([]);
const loading = ref(false);

const {
	public: { apiBase },
} = useRuntimeConfig();
if (process.client) {
	var token = localStorage.getItem("panel-token");
}

const data = await $fetch(`${apiBase}/users/${route.params.id}`, {
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	},
});

const user = reactive({
	name: data.data.name,
	password: "",
	email: data.data.email,
	cellphone: data.data.cellphone,
});

async function update() {
	if (user.name == "" || user.email == "" || user.cellphone == "") {
		toast.error("به غیر از پسورد بقیه فیلدها الزامیست");
		return;
	}
	try {
		loading.value = true;
		await $fetch(`${apiBase}/users/${route.params.id}`, {
			method: "PUT",
			body: user,
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		toast.success("ویرایش انجام شد");
		return navigateTo("/users");
	} catch (error) {
		errors.value = Object.values(error.data.message).flat();
	} finally {
		loading.value = false;
	}
}

definePageMeta({
	middleware: "auth",
});
</script>