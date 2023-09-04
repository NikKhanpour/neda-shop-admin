<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
		<h4 class="fw-bold mt-4">نام دسته بندی: {{ category.name }}</h4>
	</div>
	<div>
		<div class="row gy-4 mt-3">
			<div class="col-md-3">
				<label for="name" class="form-label">نام</label>
				<input type="text" class="form-control" disabled id="name" :placeholder="category.name" />
			</div>
			<div class="col-md-3">
				<label for="cellphone" class="form-label">توضیحات</label>
				<input type="text" class="form-control" disabled id="description" :placeholder="category.description" />
			</div>
			<div class="col-md-12">
				<CategoryDelete :id="category.id" />
			</div>
		</div>
	</div>
</template>
<script setup>
const route = useRoute();

const { data: category } = await useFetch("/api/global", {
	headers: useRequestHeaders(["cookie"]),
	query: { url: `/categories/${route.params.id}` },
});

definePageMeta({
	middleware: "auth",
});
</script>