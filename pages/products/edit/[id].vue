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
					<FormKit
						type="form"
						@submit="edit"
						:incomplete-message="false"
						:actions="false"
					>
						<div class="row">
							<div class="col-12 d-flex justify-content-center">
								<ProductPrimaryImage
									@setPrimaryImage="(image) => (primaryImage = image)"
									:primaryImage="product.data.primary_image"
								/>
							</div>

							<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
								<FormKit
									:value="product.data.name"
									type="text"
									name="name"
									id="name"
									label="نام"
									label-class="form-label"
									input-class="form-control"
									messages-class="form-text text-danger"
									validation="required"
									:validation-messages="{ required: 'فیلد نام اجباریست' }"
								/>
							</div>
							<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
								<FormKit
									:value="product.data.category_id"
									type="select"
									name="category_id"
									id="category_id"
									label="دسته بندی"
									label-class="form-label"
									input-class="form-select"
									messages-class="form-text text-danger"
									validation="required"
									:validation-messages="{ required: 'فیلد دسته بندی اجباریست' }"
								>
									<option
										v-for="category in categories.data.categories"
										:key="category.id"
										:value="category.id"
									>
										{{ category.name }}
									</option>
								</FormKit>
							</div>
							<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
								<FormKit
									:value="product.data.status_value"
									type="select"
									name="status"
									id="status"
									label="وضعیت"
									label-class="form-label"
									input-class="form-select"
									messages-class="form-text text-danger"
									validation="required"
									:validation-messages="{ required: 'فیلد وضعیت اجباریست' }"
								>
									<option value="1">فعال</option>
									<option value="0">غیرفعال</option>
								</FormKit>
							</div>
							<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
								<FormKit
									:value="product.data.quantity"
									type="text"
									name="quantity"
									id="quantity"
									label="تعداد"
									label-class="form-label"
									input-class="form-control"
									messages-class="form-text text-danger"
									validation="required|number"
									:validation-messages="{
										required: 'فیلد تعداد اجباریست',
										number: 'مقدار تعداد باید عدد باشد',
									}"
								/>
							</div>
							<div class="col-12 col-sm-6 col-md-6 col-lg-4 mt-4">
								<FormKit
									:value="product.data.price"
									type="text"
									name="price"
									id="price"
									label="قیمت"
									label-class="form-label"
									input-class="form-control"
									messages-class="form-text text-danger"
									validation="required|number"
									:validation-messages="{
										required: 'فیلد قیمت اجباریست',
										number: 'مقدار قیمت باید عدد باشد',
									}"
								/>
							</div>
							<div class="col-12 col-sm-6 col-md-6 col-lg-4 mt-4">
								<label for="is_sale" class="form-label fw-bold">تخفیف</label>
								<input
									:value="product.data.sale_price ? 'دارد' : 'ندارد'"
									id="is_sale"
									type="text"
									class="form-control text-center"
									disabled
								/>
							</div>
							<div class="col-12 col-sm-6 col-md-6 col-lg-4 mt-4">
								<FormKit
									:value="product.data.sale_price"
									type="text"
									name="sale_price"
									id="sale_price"
									label="قیمت حراجی"
									label-class="form-label"
									input-class="form-control"
									messages-class="form-text text-danger"
									validation="number"
									:validation-messages="{
										number: 'مقدار تعداد باید عدد باشد',
									}"
								/>
							</div>
							<div class="col-12 col-sm-6 col-md-6 col-lg-6 mt-4">
								<label for="start-sale-date" class="form-label"
									>تاریخ شروع حراجی</label
								>
								<div class="input-group mb-3">
									<span class="input-group-text">
										<i class="bi bi-clock"></i
									></span>
									<input
										:placeholder="product.data.date_on_sale_from_jalali"
										type="text"
										class="form-control"
										id="start-sale-date"
									/>
								</div>
								<date-picker
									v-model="saleDateFrom"
									custom-input="#start-sale-date"
									type="datetime"
									format="YYYY-MM-DD HH:mm:ss"
									display-format="HH:mm jYYYY-jMM-jDD"
								/>
							</div>
							<div class="col-12 col-sm-6 col-md-6 col-lg-6 mt-4">
								<label for="start-sale-date" class="form-label"
									>تاریخ پایان حراجی</label
								>
								<div class="input-group mb-3">
									<span class="input-group-text">
										<i class="bi bi-clock"></i
									></span>
									<input
										:placeholder="product.data.date_on_sale_to_jalali"
										type="text"
										class="form-control"
										id="end-sale-date"
									/>
								</div>
								<date-picker
									v-model="saleDateEnd"
									custom-input="#end-sale-date"
									type="datetime"
									format="YYYY-MM-DD HH:mm:ss"
									display-format="HH:mm jYYYY-jMM-jDD"
								/>
							</div>

							<div class="col-12 mt-4">
								<FormKit
									:value="product.data.description"
									type="textarea"
									name="description"
									rows="5"
									id="description"
									label="توضیحات"
									label-class="form-label"
									input-class="form-control"
									messages-class="form-text text-danger"
									validation="required"
									:validation-messages="{ required: 'فیلد توضیحات اجباریست' }"
								/>
							</div>
							<div class="col-12 mt-4">
								<FormKit
									:disabled="loading"
									type="submit"
									input-class="btn btn-outline-dark w-100 fw-bold"
								>
									ویرایش
									<div
										v-if="loading"
										class="spinner-border spinner-border-sm ms-2"
									></div>
								</FormKit>
							</div>
							<div class="col-12 mt-4">
								<h4 class="form-label fw-bold mt-4">تصاویر</h4>
								<input
									@change="setImages"
									type="file"
									id="images"
									class="form-control"
									multiple
								/>
							</div>
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
					</FormKit>
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
const saleDateFrom = ref(null);
const saleDateEnd = ref(null);
const images = ref(null);
const loading = ref(false);
const errors = ref([]);
const toast = useToast();
const route = useRoute();
if (process.client) {
	var token = localStorage.getItem("panel-token");
}
const {
	public: { apiBase },
} = useRuntimeConfig();

// const { data: product } = await useFetch("/api/global", {
// 	headers: useRequestHeaders(["cookie"]),
// 	query: { url: `/products/${route.params.id}` },
// });
// const { data: categories } = await useFetch("/api/global", {
// 	headers: useRequestHeaders(["cookie"]),
// 	query: { url: "/categories" },
// });

const { data: categories } = await useFetch(`${apiBase}/categories`, {
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	},
});

const { data: product } = await useFetch(
	`${apiBase}/products/${route.params.id}`,
	{
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	}
);

function setImages(el) {
	images.value = el.target.files;
}

async function edit(data) {
	const formData = new FormData();
	if (images.value) {
		for (let i = 0; i < images.value.length; i++) {
			formData.append(`images[${i}]`, images.value[i]);
		}
	}
	if (primaryImage.value != null) {
		formData.append("primary_image", primaryImage.value);
	}
	formData.append("name", data.name);
	formData.append("category_id", data.category_id);
	formData.append("status", data.status);
	formData.append("price", data.price);
	formData.append("quantity", data.quantity);
	formData.append("description", data.description);
	formData.append("_method", "PUT");
	if (data.sale_price != null) {
		formData.append("sale_price", data.sale_price);
	}
	if (saleDateFrom.value != null) {
		formData.append("date_on_sale_from", saleDateFrom.value);
	}
	if (saleDateEnd.value != null) {
		formData.append("date_on_sale_to", saleDateEnd.value);
	}
	try {
		loading.value = true;
		errors.value = [];

		await $fetch(`${apiBase}/products/${product.value.data.id}`, {
			method: "POST",
			body: formData,
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		toast.success("ایجاد محصول با موفقیت انجام شد");
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