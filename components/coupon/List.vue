<template>
	<div class="table-responsive">
		<table class="table align-middle">
			<thead>
				<tr>
					<th>کد</th>
					<th>درصد</th>
					<th>تاریخ ایجاد</th>
					<th>تاریخ انقضا</th>
					<th>عملیات</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="coupon in coupons" :key="coupon.id">
					<td>{{ coupon.code }}</td>
					<td>{{ coupon.percentage }}</td>
					<td>{{ coupon.created_at }}</td>
					<td>{{ coupon.expired_at_jalali }}</td>
					<td>
						<NuxtLink :to="`/coupons/${coupon.id}`" class="btn btn-sm btn-dark">نمایش</NuxtLink>
						<NuxtLink :to="`/coupons/edit/${coupon.id}`" class="btn btn-sm ms-2 btn-outline-dark">ویرایش
						</NuxtLink>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script setup>
const props = defineProps(["coupons"]);
</script>