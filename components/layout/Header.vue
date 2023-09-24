<template>
	<header
		class="navbar text-center navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
	>
		<NuxtLink class="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/"
			>NedaShop</NuxtLink
		>
		<button
			class="navbar-toggler position-absolute d-md-none collapsed"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#sidebarMenu"
			aria-controls="sidebarMenu"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="w-100"></div>
		<div class="navbar-nav">
			<div class="nav-item text-nowrap d-flex align-items-center">
				<span class="nav-link">{{ authUser.name }}</span>
				<div @click="logout" class="nav-link px-3">خروج</div>
			</div>
		</div>
	</header>
</template>
<script setup>
const { authUser } = useAuth();
if (process.client) {
	var token = localStorage.getItem("panel-token");
}
const {
	public: { apiBase },
} = useRuntimeConfig();

async function logout() {
	try {
		await $fetch(`${apiBase}/auth/logout`, {
			method: "POST",
			headers: {
				Accept: "application/josn",
				Authorization: `Bearer ${token}`,
			},
		});
		authUser.value = null;
		if (process.client) {
			localStorage.removeItem("panel-token");
		}
		location.reload();
	} catch (error) {
		return error;
	}
}
</script>