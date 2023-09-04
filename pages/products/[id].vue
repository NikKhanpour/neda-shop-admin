<template>
	<div
		class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3"
	>
		<h4 class="fw-bold my-3">{{ product.name }}</h4>
	</div>
	<div>
		<div class="row gy-4">
			<div class="col-md-12 text-center mb-4">
				<div class="row justify-content-center">
					<div class="col-md-3">
						<img
							src="/images/preloader.png"
							width="350"
							height="235"
							v-img="product.primary_image"
						/>
					</div>
				</div>
			</div>
			<div class="col-md-3">
				<label for="name" class="form-label">نام</label>
				<input
					:placeholder="product.name"
					type="text"
					id="name"
					class="form-control"
					disabled
				/>
			</div>
			<div class="col-md-3">
				<label for="category" class="form-label">دسته بندی</label>
				<input
					:placeholder="product.category"
					type="text"
					id="category"
					class="form-control"
					disabled
				/>
			</div>
			<div class="col-md-3">
				<label for="price" class="form-label">قیمت</label>
				<input
					:placeholder="product.price"
					type="text"
					id="price"
					class="form-control"
					disabled
				/>
			</div>
			<div class="col-md-3">
				<label for="status" class="form-label">وضعیت</label>
				<input
					:placeholder="product.status"
					type="text"
					id="status"
					class="form-control"
					disabled
				/>
			</div>
			<div class="col-md-3">
				<label for="quantity" class="form-label">تعداد</label>
				<input
					:placeholder="product.quantity"
					type="text"
					id="quantity"
					class="form-control"
					disabled
				/>
			</div>
			<div class="col-md-3">
				<label for="sale_price" class="form-label">قیمت تخفیفی</label>
				<input
					:placeholder="product.sale_price"
					type="text"
					id="sale_price"
					class="form-control"
					disabled
				/>
			</div>
			<div class="col-md-3">
				<label for="date_on_sale_from_jalali" class="form-label"
					>تاریخ شروع حراجی</label
				>
				<input
					:placeholder="product.date_on_sale_from_jalali"
					type="text"
					id="date_on_sale_from_jalali"
					class="form-control"
					disabled
				/>
			</div>
			<div class="col-md-3">
				<label for="date_on_sale_to_jalali" class="form-label"
					>تاریخ پایان حراجی</label
				>
				<input
					:placeholder="product.date_on_sale_to_jalali"
					type="text"
					id="date_on_sale_to_jalali"
					class="form-control"
					disabled
				/>
			</div>
			<div class="col-md-12">
				<label for="description" class="form-label">توضیحات</label>
				<textarea
					:placeholder="product.description"
					type="text"
					id="description"
					class="form-control"
					disabled
				></textarea>
			</div>

			<ProductDelete :id="product.id" />

			<div class="col-md-12 text-center">
				<img
					v-for="image in product.images"
					:key="image.id"
					v-img="image.image"
					src="/images/preloader.png"
					class="mx-3 mt-5"
					width="300"
				/>
			</div>
		</div>
	</div>
</template>
<script setup>
const route = useRoute();
definePageMeta({
	middleware: "auth",
});
const { data: product } = await useFetch("/api/global", {
	headers: useRequestHeaders(["cookie"]),
	query: { url: `/products/${route.params.id}` },
});
</script>