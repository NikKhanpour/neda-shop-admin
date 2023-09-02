<template>
	<div
		class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
	>
		<h4 class="fw-bold">ایجاد محصول</h4>
	</div>
	<div v-if="errors.length > 0" class="alert alert-danger">
		<ul class="mb-0">
			<li v-for="(error, index) in errors" :key="index">{{ error }}</li>
		</ul>
	</div>
	<ClientOnly fallback-tag="span" fallback="در حال بارگذاری...">
		<FormKit
			type="form"
			@submit="create"
			:incomplete-message="false"
			:actions="false"
		>
			<div class="row">
				<ProductPrimaryImage
					@setPrimaryImage="(image) => (primaryImage = image)"
				/>
				<div class="col-md-3 mt-5">
					<FormKit
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
				<div class="col-md-3 mt-5">
					<FormKit
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
							v-for="category in categories.categories"
							:key="category.id"
							:value="category.id"
						>
							{{ category.name }}
						</option>
					</FormKit>
				</div>
				<div class="col-md-3 mt-5">
					<FormKit
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
				<div class="col-md-3 mt-5">
					<FormKit
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
				<div class="col-md-3 mt-4">
					<FormKit
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
				<div class="col-md-3 mt-4">
					<FormKit
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
				<div class="col-md-3 mt-4">
					<label for="start-sale-date" class="form-label"
						>تاریخ شروع حراجی</label
					>
					<div class="input-group mb-3">
						<span class="input-group-text"> <i class="bi bi-clock"></i></span>
						<input type="text" class="form-control" id="start-sale-date" />
					</div>
					<date-picker
						v-model="saleDateFrom"
						custom-input="#start-sale-date"
						type="datetime"
						format="YYYY-MM-DD HH:mm:ss"
						display-format="HH:mm jYYYY-jMM-jDD"
					/>
				</div>
				<div class="col-md-3 mt-4">
					<label for="start-sale-date" class="form-label"
						>تاریخ پایان حراجی</label
					>
					<div class="input-group mb-3">
						<span class="input-group-text"> <i class="bi bi-clock"></i></span>
						<input type="text" class="form-control" id="end-sale-date" />
					</div>
					<date-picker
						v-model="saleDateEnd"
						custom-input="#end-sale-date"
						type="datetime"
						format="YYYY-MM-DD HH:mm:ss"
						display-format="HH:mm jYYYY-jMM-jDD"
					/>
				</div>
				<div class="col-md-3 mt-4">
					<label for="images" class="form-label">تصاویر</label>
					<input
						@change="setImages"
						type="file"
						id="images"
						class="form-control"
						multiple
					/>
				</div>
				<div class="col-md-12 mt-5">
					<FormKit
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

				<FormKit
					:disabled="loading"
					type="submit"
					input-class="btn btn-outline-dark my-5"
				>
					ایجاد محصول
					<div
						v-if="loading"
						class="spinner-border spinner-border-sm ms-2"
					></div>
				</FormKit>
			</div>
		</FormKit>
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

const { data: categories } = await useFetch("/api/global", {
	headers: useRequestHeaders(["cookie"]),
	query: { url: "/categories" },
});

function setImages(el) {
	images.value = el.target.files;
}

async function create(data) {
	if (!primaryImage.value) {
		toast.error("عکس اصلی اجباری است");
		return;
	}
	if (!images.value) {
		toast.error("تصاویر اجباری است");
		return;
	}

	const formData = new FormData();
	for (let index = 0; index < images.value.length; index++) {
		formData.append("images", images.value[index]);
	}

	formData.append("primary_image", primaryImage.value);
	formData.append("name", data.name);
	formData.append("category_id", data.category_id);
	formData.append("status", data.status);
	formData.append("price", data.price);
	formData.append("quantity", data.quantity);
	formData.append("sale_price", data.sale_price);
	formData.append("date_on_sale_from", saleDateFrom.value);
	formData.append("date_on_sale_to", saleDateEnd.value);
	formData.append("description", data.description);

	try {
		loading.value = true;
		errors.value = [];
		await $fetch("/api/product/create", {
			method: "POST",
			body: formData,
		});
		toast.success("ایجاد محصول باموفقیت انجام شد");
		return navigateTo("/products");
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