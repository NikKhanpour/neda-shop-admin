<template>
	<div
		class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
	>
		<h4 class="fw-bold">محصولات</h4>
		<NuxtLink
			to="/products/create"
			type="button"
			class="btn btn-sm btn-outline-dark"
		>
			ایجاد محصول
		</NuxtLink>
	</div>

	<div class="table-responsive">
		<table class="table align-middle">
			<thead>
				<tr>
					<th>تصویر</th>
					<th>نام</th>
					<th>دسته بندی</th>
					<th>قیمت</th>
					<th>تعداد</th>
					<th>وضعیت</th>
					<th>عملیات</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="product in data.data.products" :key="product.id">
					<th>
						<img
							src="/images/preloader.png"
							v-img="product.primary_image"
							width="80"
						/>
					</th>
					<td>{{ product.name }}</td>
					<td>{{ product.category }}</td>
					<td>{{ numberFormat(product.price) }}</td>
					<td>{{ product.quantity }}</td>
					<td>{{ product.status }}</td>
					<td>
						<div class="d-flex">
							<NuxtLink
								:to="`/products/${product.id}`"
								class="btn btn-sm btn-outline-dark me-2"
								>نمایش</NuxtLink
							>
							<NuxtLink
								:to="`/products/edit/${product.id}`"
								class="btn btn-sm btn-dark"
								>ویرایش</NuxtLink
							>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="d-flex justify-content-center">
		<nav aria-label="navigation">
			<ul class="pagination">
				<li
					v-for="(link, index) in data.data.meta.links.slice(1, -1)"
					:key="index"
					class="page-item"
					:class="{ active: link.active }"
				>
					<button @click="paginate(link.label)" class="page-link">
						{{ link.label }}
					</button>
				</li>
			</ul>
		</nav>
	</div>
</template>
<script setup>
const page = ref(1);

const {
	public: { apiBase },
} = useRuntimeConfig();
if (process.client) {
	var token = localStorage.getItem("panel-token");
}

const { data, refresh } = await useFetch(() => `${apiBase}/products`, {
	query: { page },
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	},
});

function paginate(link) {
	page.value = link;
	refresh();
}

definePageMeta({
	middleware: "auth",
});
</script>