<template>
	<ClientOnly>
		<template #fallback>
			<div class="d-flex justify-content-center" style="margin-top: 100px">
				<div class="spinner-border" style="height: 5rem; width: 5rem"></div>
			</div>
		</template>
		<div class="row mt-5 justify-content-center align-items-center">
			<div class="col-md-3">
				<div class="card">
					<div class="card-body py-5">
						<h4 class="mb-5 text-center">ورود به پنل ادمین</h4>
						<div v-if="errors.length > 0" class="alert alert-danger">
							<ul class="mb-0">
								<li v-for="(error, index) in errors" :key="index">
									{{ error }}
								</li>
							</ul>
						</div>
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
									v-if="loading.value"
									class="spinner-border spinner-border-sm ms-2"
								></div>
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</ClientOnly>
</template>
<script setup>
import { useToast } from "vue-toastification";

definePageMeta({
	layout: false,
	middleware: "guest",
});

const { authUser } = useAuth();
const toast = useToast();
const errors = ref([]);
const loading = ref(false);
const {
	public: { apiBase },
} = useRuntimeConfig();

const formData = reactive({
	email: "",
	password: "",
});

async function login() {
	if (formData.email == "" || formData.password == "") {
		toast.error("تمامی فیلدها الزامیست");
		return;
	}
	try {
		loading.value = true;
		errors.value = [];
		const data = await $fetch(`${apiBase}/auth/login`, {
			method: "POST",
			body: formData,
		});
		authUser.value = data.user;
		if (process.client) {
			localStorage.setItem("panel-token", data.data.token);
		}
		location.reload();
	} catch (error) {
		errors.value = Object.values(error.data.message).flat();
	} finally {
		loading.value = false;
	}
}
</script>