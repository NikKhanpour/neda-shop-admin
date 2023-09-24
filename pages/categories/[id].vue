<template>
	<div class="d-flex justify-content-center pt-3 pb-2 mb-3 border-bottom">
		<h4 class="fw-bold">دسته بندی با آیدی {{ data.data.id }}</h4>
	</div>
	<div class="container">
		<div class="col-12 alert alert-danger" v-if="error">
			<ul class="mb-0">
				<li>{{ error }}</li>
			</ul>
		</div>
		<div class="row d-flex justify-content-center text-center">
			<div class="col-4 mt-4">
				<label for="name" class="form-label fw-bold">نام</label>
				<input
					:value="data.data.name"
					id="name"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<div class="col-9 mt-4">
				<label for="status" class="form-label fw-bold">وضعیت</label>
				<select
					v-model="formData.status"
					name="status"
					id="status"
					class="form-select text-center"
				>
					<option value="">غیرفعال</option>
					<option value="فعال">فعال</option>
				</select>
			</div>
		</div>
	</div>
</template>
<script setup>
import { useToast } from "vue-toastification";

const route = useRoute();
const loading = ref(false);
const toast = useToast();
const error = ref("");

const {
	public: { apiBase },
} = useRuntimeConfig();

if (process.client) {
	var token = localStorage.getItem("panel-token");
}

const data = await $fetch(`${apiBase}/categories/${route.params.id}`, {
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	},
});

const products = await $fetch(`${apiBase}/products`, {
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	},
});

definePageMeta({
	middleware: "auth",
});
</script>