<template>
	<div class="row mt-5 justify-content-center align-items-center">
		<div class="col-md-3">
			<div class="card">
				<div class="card-body py-5">
					<div v-if="errors.length > 0" class="alert alert-danger">
						<ul class="mb-0">
							<li v-for="(error, index) in errors" :key="index">{{ error }}</li>
						</ul>
					</div>
					<h4 class="mb-5 text-center">ورود به پنل ادمین</h4>
					<form @submit.prevent="login">
						<div class="mb-3">
							<label htmlFor="email" class="form-label">ایمیل</label>
							<input
								v-model="formData.email"
								type="email"
								class="form-control"
								id="email"
							/>
						</div>
						<div class="mb-3">
							<label htmlFor="password" class="form-label">رمز عبور</label>
							<input
								v-model="formData.password"
								type="password"
								class="form-control"
							/>
						</div>
						<button :disabled="loading" type="submit" class="btn btn-dark">
							ورود
							<div
								v-if="loading"
								class="spinner-border spinner-border-sm ms-2"
							></div>
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { useToast } from "vue-toastification";
definePageMeta({
	layout: false,
	middleware: "guest",
});
const loading = ref(false);
const errors = ref([]);
const toast = useToast();
const { authUser } = useAuth();
const formData = reactive({
	email: "",
	password: "",
});
async function login() {
	if (formData.email == "" || formData.password == "") {
		toast.error("فیلدها الزامیست");
		return;
	}
	try {
		loading.value = true;
		errors.value = [];
		const user = await $fetch("/api/auth/login", {
			method: "POST",
			body: formData,
		});
		authUser.value = user;
		toast.success("وارد سیستم شدید");
		return navigateTo("/");
	} catch (error) {
		errors.value = Object.values(error.data.data.message).flat();
	} finally {
		loading.value = false;
	}
}
</script>