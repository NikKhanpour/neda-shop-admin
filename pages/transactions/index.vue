<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
		<h4 class="fw-bold">تراکنش ها</h4>
	</div>

	<TransactionList :transactions="data.transactions" />

	<div class="d-flex justify-content-center">
		<nav aria-label="navigation">
			<ul class="pagination">
				<li v-for="link in data.meta.links.slice(1, -1)" :key="link.label" class="page-item"
					:class="{ active: link.active }">
					<button @click="paginate(link.label)" class="page-link">
						{{ link.label }}
					</button>
				</li>
			</ul>
		</nav>
	</div>
</template>
<script setup>
const page = ref(0);
const { data, refresh } = await useFetch(() => "/api/global", {
	headers: useRequestHeaders(["cookie"]),
	query: { url: "/transactions", page },
});

function paginate(value) {
	page.value = value;
	refresh();
}
definePageMeta({
	middleware: "auth",
});
</script>