<template>
	<div
		class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
	>
		<h4 class="fw-bold">تراکنش ها</h4>
	</div>

	<div class="table-responsive">
		<table class="table align-middle">
			<thead>
				<tr>
					<th>آیدی</th>
					<th>مقدار</th>
					<th>وضعیت</th>
					<th>شناسه</th>
					<th>تاریخ پرداخت</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="trans in data.data.transactions" :key="trans.id">
					<td>{{ trans.id }}</td>
					<td>{{ numberFormat(trans.amount) }}</td>
					<td
						:class="{
							'text-success': trans.status == 'موفق',
							'text-danger': trans.status == 'ناموفق',
						}"
					>
						{{ trans.status }}
					</td>
					<td>{{ trans.trans_id }}</td>
					<td>{{ trans.created_at }}</td>
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

const { data, refresh } = await useFetch(() => `${apiBase}/transactions`, {
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