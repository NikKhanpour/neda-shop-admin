<template>
	<h1>index page</h1>
</template>
<script setup>
definePageMeta({
	middleware: "auth",
});

const { data: chartData } = await useFetch("/api/global", {
	headers: useRequestHeaders(["cookie"]),
	query: { url: "/transactions/chart" },
});
console.log(chartData.value);
</script>