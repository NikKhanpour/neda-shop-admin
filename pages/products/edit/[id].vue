<template>
	<div class="d-flex justify-content-center pt-3 pb-2 mb-3 border-bottom">
		<h4 class="fw-bold">ویرایش محصول</h4>
	</div>
	<ClientOnly>
		<div class="container">
			<div class="row text-center">
				<div class="row justify-content-center">
					<div class="col-12 alert alert-danger" v-if="errors.length > 0">
						<ul class="mb-0">
							<li v-for="(error, index) in errors" :key="index">{{ error }}</li>
						</ul>
					</div>

					<div class="col-12 d-flex justify-content-center">
						<ProductPrimaryImage
							@setPrimaryImage="(image) => (primaryImage = image)"
							:primaryImage="product.data.primary_image"
						/>
					</div>

					<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
						<label for="name" class="form-label fw-bold">نام</label>
						<input
							v-model="formData.name"
							id="name"
							type="text"
							class="form-control text-center"
						/>
					</div>
					<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
						<label for="category" class="form-label fw-bold">دسته بندی</label>
						<select
							v-model="formData.category_id"
							class="form-select text-center"
							name="category"
							id="category"
						>
							<option
								v-for="category in data.data.categories"
								:key="category.id"
								:value="category.id"
							>
								{{ category.name }}
							</option>
						</select>
					</div>
					<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
						<label for="status" class="form-label fw-bold">وضعیت</label>
						<select
							v-model="formData.status"
							name="status"
							class="form-select text-center"
							id="status"
						>
							<option value="1">فعال</option>
							<option value="0">غیرفعال</option>
						</select>
					</div>
					<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
						<label for="quantity" class="form-label fw-bold">تعداد</label>
						<input
							v-model="formData.quantity"
							id="quantity"
							type="number"
							class="form-control text-center"
						/>
					</div>
					<div class="col-12 col-sm-6 col-md-6 col-lg-4 mt-4">
						<label for="price" class="form-label fw-bold">قیمت</label>
						<input
							v-model="formData.price"
							id="price"
							type="number"
							class="form-control text-center"
						/>
					</div>
					<div class="col-12 col-sm-6 col-md-6 col-lg-4 mt-4">
						<label for="is_sale" class="form-label fw-bold">تخفیف</label>
						<input
							:value="formData.sale_price ? 'دارد' : 'ندارد'"
							id="is_sale"
							type="text"
							class="form-control text-center"
							disabled
						/>
					</div>
					<div class="col-12 col-sm-6 col-md-6 col-lg-4 mt-4">
						<label for="sale_price" class="form-label fw-bold"
							>قیمت حراجی</label
						>
						<input
							v-model="formData.sale_price"
							id="sale_price"
							type="number"
							class="form-control text-center"
						/>
					</div>
					<div class="col-12 col-sm-6 col-md-6 col-lg-6 mt-4">
						<label for="date_on_sale_from_jalali" class="form-label fw-bold"
							>تاریخ شروع حراجی</label
						>
						<div class="input-group mb-3">
							<span class="input-group-text"><i class="bi bi-clock"></i></span>
							<input
								type="text"
								class="form-control"
								id="sale-date-from-picker"
								:value="formData.date_on_sale_from"
							/>
							<date-picker
								v-model="formData.date_on_sale_from"
								type="datetime"
								display-format="HH:mm jYYYY-jMM-jDD"
								format="YYYY-MM-DD HH:mm:ss"
								custom-input="#sale-date-from-picker"
							/>
						</div>
					</div>
					<div class="col-12 col-sm-6 col-md-6 col-lg-6 mt-4">
						<label class="form-label">تاریخ پایان حراجی</label>
						<div class="input-group mb-3">
							<span class="input-group-text"><i class="bi bi-clock"></i></span>
							<input
								type="text"
								class="form-control"
								id="sale-date-to-picker"
								:value="formData.date_on_sale_to"
							/>
							<date-picker
								v-model="formData.date_on_sale_to"
								type="datetime"
								display-format="HH:mm jYYYY-jMM-jDD"
								format="YYYY-MM-DD HH:mm:ss"
								custom-input="#sale-date-to-picker"
							/>
						</div>
					</div>
					<div class="col-12 mt-4">
						<h4 class="form-label fw-bold mt-4">تصاویر</h4>
						<input
							@change="imagesFile"
							class="form-control"
							type="file"
							id="images"
							multiple
						/>
					</div>
					<div class="col-12 mt-4">
						<label for="description" class="form-label fw-bold">توضیحات</label>
						<textarea
							v-model="formData.description"
							rows="5"
							id="description"
							type="text"
							class="form-control text-center"
						/>
					</div>
					<div class="col-12 mt-4">
						<button
							@click="edit"
							:disabled="loading"
							class="btn btn-outline-dark w-100 fw-bold"
						>
							ویرایش محصول
							<div
								v-if="loading"
								class="spinner-border spinner-border-sm ms-2"
							></div>
						</button>
					</div>
					<h4 class="form-label fw-bold mt-4">تصاویر</h4>
					<div
						v-for="image in product.data.images"
						:key="image.id"
						class="col-12 mt-4"
					>
						<img
							width="350"
							height="220"
							src="/images/preloader.png"
							v-img="image.image"
						/>
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

const primaryImage = ref(null);
const images = ref([]);
const loading = ref(false);
const errors = ref([]);
const toast = useToast();
const route = useRoute();
const formData = reactive({
	name: "",
	category_id: "",
	description: "",
	status: "",
	price: "",
	quantity: "",
	sale_price: "",
	date_on_sale_from: "",
	date_on_sale_to: "",
});

const {
	public: { apiBase },
} = useRuntimeConfig();
if (process.client) {
	var token = localStorage.getItem("panel-token");
}

const data = await $fetch(`${apiBase}/categories`, {
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	},
});

const product = await $fetch(`${apiBase}/products/${route.params.id}`, {
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	},
});

formData.name = product.data.name;
formData.category_id = product.data.category_id;
formData.description = product.data.description;
formData.status = product.data.status;
formData.price = product.data.price;
formData.quantity = product.data.quantity;
formData.sale_price = product.data.sale_price;
formData.date_on_sale_from = product.data.date_on_sale_from_jalali;
formData.date_on_sale_to = product.data.date_on_sale_to_jalali;
// primaryImage.value = product.data.primary_image;

product.data.images.forEach((image) => {
	images.value.push(image.image);
});

function imagesFile(el) {
	images.value = el.target.files;
}

async function edit() {
	const data = new FormData();

	if (images.value) {
		for (let index = 0; index < images.value.length; index++) {
			data.append(`images[${index}]`, images.value[index]);
		}
	} else {
		data.append("images", null);
	}

	data.append(
		"date_on_sale_from",
		formData.date_on_sale_from
			? formData.date_on_sale_from
			: product.data.date_on_sale_from
	);
	data.append(
		"date_on_sale_to",
		formData.date_on_sale_to
			? formData.date_on_sale_to
			: product.data.date_on_sale_to
	);
	data.append("primary_image", primaryImage.value ? primaryImage.value : null);
	data.append("category_id", formData.category_id);
	data.append("description", formData.description);
	data.append("sale_price", formData.sale_price);
	data.append("quantity", formData.quantity);
	data.append("status", formData.status);
	data.append("price", formData.price);
	data.append("name", formData.name);
	data.append("_method", "PUT");
	try {
		loading.value = true;
		errors.value = [];
		await $fetch(`${apiBase}/products/${route.params.id}`, {
			method: "POST",
			body: data,
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		toast.success("ویرایش محصول انجام شد");
		return navigateTo("/products");
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