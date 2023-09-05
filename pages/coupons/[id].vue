<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
		<h4 class="fw-bold mt-5">کد تخفیف: {{ coupon.code }}</h4>
	</div>
	<div>
		<div class="row gy-4 mt-3">
			<div class="col-md-3">
				<label for="code" class="form-label">کد</label>
				<input type="text" class="form-control" disabled id="code" :placeholder="coupon.code" />
			</div>
			<div class="col-md-3">
				<label for="percentage" class="form-label">درصد</label>
				<input type="text" class="form-control" disabled id="percentage" :placeholder="coupon.percentage" />
			</div>
			<div class="col-md-3">
				<label for="created_at" class="form-label">تاریخ ایجاد</label>
				<input type="text" class="form-control" disabled id="created_at" :placeholder="coupon.created_at" />
			</div>
			<div class="col-md-3">
				<label for="expired_at_jalali" class="form-label">تاریخ انقضا</label>
				<input type="text" class="form-control" disabled id="expired_at_jalali"
					:placeholder="coupon.expired_at_jalali" />
			</div>
			<CouponDelete :id="coupon.id" />
		</div>
	</div>
</template>
<script setup>
const route = useRoute();

const { data: coupon } = await useFetch("/api/global", {
	headers: useRequestHeaders(["cookie"]),
	query: { url: `/coupons/${route.params.id}` },
});

definePageMeta({
	middleware: "auth",
});
</script>