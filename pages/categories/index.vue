<template>
	<div
		class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
	>
		<h4 class="fw-bold">دسته بندی</h4>
		<NuxtLink
			to="/categories/create"
			type="button"
			class="btn btn-sm btn-outline-dark"
		>
			ایجاد دسته بندی
		</NuxtLink>
	</div>

	<div class="table-responsive">
		<table class="table align-middle">
			<thead>
				<tr>
					<th>آیدی</th>
					<th>نام</th>
					<th>وضعیت</th>
					<th>عملیات</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="category in data.data.categories" :key="category.id">
					<th>
						{{ category.id }}
					</th>
					<td>{{ category.name }}</td>
					<td>{{ category.description }}</td>
					<td>
						<div class="d-flex">
							<NuxtLink
								:to="`/categories/edit/${category.id}`"
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

const { data, refresh } = await useFetch(() => `${apiBase}/categories`, {
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