<template>
	<ClientOnly>
		<div class="d-flex justify-content-center pt-3 pb-2 mb-3 border-bottom">
			<h4 class="fw-bold">ایجاد تخفیف</h4>
		</div>
		<div class="container ms-2">
			<div class="row text-center">
				<div class="row justify-content-center">
					<div
						class="col-12 col-sm-12 col-lg-6 alert alert-danger"
						v-if="errors.length > 0"
					>
						<ul class="mb-0">
							<li v-for="(error, index) in errors" :key="index">{{ error }}</li>
						</ul>
					</div>
					<div class="row justify-content-center">
						<div class="col-12 col-sm-6 col-lg-3 mt-4">
							<label for="name" class="form-label fw-bold">کد</label>
							<input
								v-model="formData.code"
								id="name"
								type="text"
								class="form-control text-center"
							/>
						</div>
						<div class="col-12 col-sm-6 col-lg-3 mt-4">
							<label for="price" class="form-label fw-bold">درصد</label>
							<input
								v-model="formData.percentage"
								id="price"
								type="number"
								class="form-control text-center"
							/>
						</div>
					</div>
					<div class="row justify-content-center">
						<div class="col-12 col-sm-12 col-lg-6 mt-4">
							<label class="form-label">تاریخ پایان حراجی</label>
							<div class="input-group mb-3">
								<span class="input-group-text"
									><i class="bi bi-clock"></i
								></span>
								<input
									type="text"
									class="form-control"
									id="sale-date-to-picker"
								/>
								<date-picker
									v-model="formData.expired_at"
									type="datetime"
									display-format="HH:mm jYYYY-jMM-jDD"
									format="YYYY-MM-DD HH:mm:ss"
									custom-input="#sale-date-to-picker"
								/>
							</div>
						</div>
					</div>
					<div class="row justify-content-center">
						<div class="col-12 col-sm-12 col-lg-6 mt-4">
							<button
								@click="create"
								:disabled="loading"
								class="btn btn-outline-dark w-100 fw-bold"
							>
								ایجاد تخفیف
								<div
									v-if="loading"
									class="spinner-border spinner-border-sm ms-2"
								></div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<template #fallback>
			<div class="d-flex justify-content-center" style="margin-top: 300px">
				<div class="spinner-border" style="height: 4rem; width: 4rem"></div>
			</div>
		</template>
	</ClientOnly>
</template>
<script setup>
import { useToast } from "vue-toastification";

const loading = ref(false);
const errors = ref([]);
const toast = useToast();
const formData = reactive({
	code: "",
	percentage: "",
	expired_at: "",
});

const {
	public: { apiBase },
} = useRuntimeConfig();
if (process.client) {
	var token = localStorage.getItem("panel-token");
}

async function create() {
	try {
		loading.value = true;
		await $fetch(`${apiBase}/coupons`, {
			method: "POST",
			body: formData,
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		toast.success("کد تخفیف ساخته شد");
		return navigateTo("/coupons");
	} catch (error) {
		errors.value = Object.values(error.data.message).flat();
	} finally {
		loading.value = false;
	}
}
</script>