<template>
	<div
		class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
	>
		<h4 class="fw-bold">کاربران</h4>
	</div>

	<div class="table-responsive">
		<table class="table align-middle">
			<thead>
				<tr>
					<th>آیدی</th>
					<th>نام</th>
					<th>ایمیل</th>
					<th>شماره</th>
					<th>تاریخ عضویت</th>
					<th>عملیات</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="user in data.data.users" :key="user.id">
					<td>{{ user.id }}</td>
					<td>{{ user.name }}</td>
					<td>{{ user.email }}</td>
					<td>{{ user.cellphone }}</td>
					<td>{{ user.created_at }}</td>
					<td>
						<div class="d-flex">
							<NuxtLink
								:to="`/users/${user.id}`"
								class="btn btn-sm btn-outline-dark me-2"
								>نمایش</NuxtLink
							>
							<NuxtLink
								:to="`/users/edit/${user.id}`"
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

const { data, refresh } = await useFetch(() => `${apiBase}/users`, {
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