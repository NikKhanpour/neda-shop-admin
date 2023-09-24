<template>
	<div class="d-flex justify-content-center pt-3 pb-2 mb-3 border-bottom">
		<h4 class="fw-bold">محصول با آیدی {{ data.data.id }}</h4>
	</div>
	<div class="container">
		<div class="row text-center">
			<div class="row justify-content-center">
				<div class="col-12 col-md-8 col-lg-6 mt-4">
					<img
						src="/images/preloader.png"
						width="350"
						height="220"
						v-img="data.data.primary_image"
					/>
				</div>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
				<label for="name" class="form-label fw-bold">نام</label>
				<input
					:value="data.data.name"
					id="name"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
				<label for="category" class="form-label fw-bold">دسته بندی</label>
				<input
					:value="data.data.category"
					id="category"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
				<label for="status" class="form-label fw-bold">وضعیت</label>
				<input
					:value="data.data.status"
					id="status"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4">
				<label for="quantity" class="form-label fw-bold">تعداد</label>
				<input
					:value="data.data.quantity"
					id="quantity"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-4 mt-4">
				<label for="price" class="form-label fw-bold">قیمت</label>
				<input
					:value="numberFormat(data.data.price)"
					id="price"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-4 mt-4">
				<label for="is_sale" class="form-label fw-bold">تخفیف</label>
				<input
					:value="data.data.is_sale ? 'دارد' : 'ندارد'"
					id="is_sale"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-4 mt-4">
				<label for="sale_price" class="form-label fw-bold">قیمت تخفیف</label>
				<input
					:value="data.data.is_sale ? data.data.sale_price : null"
					id="sale_price"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-6 mt-4">
				<label for="date_on_sale_from_jalali" class="form-label fw-bold"
					>تاریخ شروع تخفیف</label
				>
				<input
					:value="data.data.is_sale ? data.data.date_on_sale_from_jalali : null"
					id="date_on_sale_from_jalali"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<div class="col-12 col-sm-6 col-md-6 col-lg-6 mt-4">
				<label for="date_on_sale_to_jalali" class="form-label fw-bold"
					>تاریخ پایان تخفیف</label
				>
				<input
					:value="data.data.is_sale ? data.data.date_on_sale_to_jalali : null"
					id="date_on_sale_to_jalali"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<div class="col-12 mt-4">
				<label for="description" class="form-label fw-bold">توضیحات</label>
				<textarea
					:value="data.data.description"
					rows="5"
					id="description"
					type="text"
					class="form-control text-center"
					disabled
				/>
			</div>
			<h4 class="form-label fw-bold mt-4">تصاویر</h4>
			<div
				v-for="image in data.data.images"
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

const data = await $fetch(`${apiBase}/products/${route.params.id}`, {
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	},
});

definePageMeta({
	middleware: "auth",
});
</script>