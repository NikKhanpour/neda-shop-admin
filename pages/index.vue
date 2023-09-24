<template>
	<div
		class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
	>
		<h4 class="fw-bold">داشبورد</h4>
	</div>
	<ClientOnly>
		<Chart :chartData="data.data" />
	</ClientOnly>
</template>
<script setup>
definePageMeta({
	middleware: "auth",
});

const {
	public: { apiBase },
} = useRuntimeConfig();

if (process.client) {
	var token = localStorage.getItem("panel-token");
}

const data = await $fetch(`${apiBase}/transactions/chart`, {
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	},
});
</script>
