<template>
	<div class="table-responsive">
		<table class="table align-middle">
			<thead>
				<tr>
					<th>تصویر</th>
					<th>نام</th>
					<th>قیمت</th>
					<th>تعداد</th>
					<th>وضعیت</th>
					<th>عملیات</th>
					<th>حذف</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="product in products" :key="product.id">
					<th>
						<img src="/images/preloader.png" width="80" height="53" v-img="product.primary_image" />
					</th>
					<td>{{ product.name }}</td>
					<td>{{ numberFormat(product.price) }}</td>
					<td>{{ product.quantity }}</td>
					<td>{{ product.status }}</td>
					<td>
						<div class="d-flex">
							<NuxtLink :to="`/products/${product.id}`" class="btn btn-sm btn-outline-dark me-2">نمایش
							</NuxtLink>
							<NuxtLink :to="`/products/edit/${product.id}`" class="btn btn-sm btn-dark">ویرایش</NuxtLink>
						</div>
					</td>
					<td>
						<div class="d-flex">
							<ProductDelete :id="product.id" />
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script setup>
const props = defineProps(["products"]);
</script>