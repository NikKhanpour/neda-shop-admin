<template>
	<div
		class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3"
	>
		<h4 class="fw-bold mt-5">نام کاربر: {{ user.name }}</h4>
	</div>
	<div>
		<div class="row gy-4 mt-3">
			<div class="col-md-3">
				<label for="name" class="form-label">نام</label>
				<input
					type="text"
					class="form-control"
					disabled
					id="name"
					:placeholder="user.name"
				/>
			</div>
			<div class="col-md-3">
				<label for="email" class="form-label">ایمیل</label>
				<input
					type="email"
					class="form-control"
					disabled
					id="email"
					:placeholder="user.email"
				/>
			</div>
			<div class="col-md-3">
				<label for="cellphone" class="form-label">شماره</label>
				<input
					type="text"
					class="form-control"
					disabled
					id="cellphone"
					:placeholder="user.cellphone"
				/>
			</div>
			<UserDelete :id="user.id" />
		</div>
	</div>
</template>
<script setup>
const route = useRoute();

const { data: user } = await useFetch("/api/global", {
	headers: useRequestHeaders(["cookie"]),
	query: { url: `/users/${route.params.id}` },
});

definePageMeta({
	middleware: "auth",
});
</script>