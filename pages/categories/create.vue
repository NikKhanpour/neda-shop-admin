<template>
	<div class="d-flex justify-content-center pt-3 pb-2 mb-3 border-bottom">
		<h4 class="fw-bold">ایجاد دسته بندی</h4>
	</div>
	<div class="container">
		<div class="row d-flex justify-content-center text-center">
			<div class="col-12 alert alert-danger" v-if="errors.length > 0">
				<ul class="mb-0">
					<li v-for="(error, index) in errors" :key="index">{{ error }}</li>
				</ul>
			</div>
			<div class="col-12 col-sm-6 col-md-4 mt-4">
				<label for="name" class="form-label fw-bold">نام</label>
				<input
					v-model="formData.name"
					id="name"
					type="text"
					class="form-control text-center"
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-4 mt-4">
				<label for="status" class="form-label fw-bold">وضعیت</label>
				<select
					v-model="formData.status"
					name="status"
					id="status"
					class="form-select text-center"
				>
					<option value="فعال">فعال</option>
					<option value="">غیرفعال</option>
				</select>
			</div>
			<div class="col-12 col-md-8 mt-4">
				<button
					@click="updateCategory"
					:disabled="loading"
					class="btn btn-outline-dark w-100 fw-bold"
				>
					ایجاد
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

const loading = ref(false);
const route = useRoute();
const toast = useToast();
const errors = ref([]);

const formData = reactive({
	name: "",
	status: "",
});

const {
	public: { apiBase },
} = useRuntimeConfig();

if (process.client) {
	var token = localStorage.getItem("panel-token");
}

async function updateCategory() {
	try {
		loading.value = true;
		await $fetch(`${apiBase}/categories`, {
			method: "POST",
			body: { name: formData.name, description: formData.status },
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		toast.success("دسته بندی آپدیت شد");
		return navigateTo("/categories");
	} catch (error) {
		errors.value = Object.values(error.data.message).flat();
	} finally {
		loading.value = false;
	}
}
</script>