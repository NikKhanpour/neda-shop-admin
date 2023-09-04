<template>
	<div class="table-responsive">
		<table class="table align-middle">
			<thead>
				<tr>
					<th>شماره سفارش</th>
					<th>وضعیت</th>
					<th>مبلغ</th>
					<th>trans_id</th>
					<th>تاریخ ایجاد</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="transaction in transactions" :key="transaction.id">
					<td>{{ transaction.id }}</td>
					<td>{{ transaction.status }}</td>
					<td>{{ transaction.payment_status }}</td>
					<td>{{ transaction.trans_id }}</td>
					<td>{{ transaction.created_at }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script setup>
const props = defineProps(["transactions"]);
</script>