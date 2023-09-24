<template>
	<div class="table-responsive mt-3">
		<table class="table align-middle">
			<thead>
				<tr>
					<th>شماره سفارش</th>
					<th>آدرس</th>
					<th>وضعیت پرداخت</th>
					<th>قیمت کل</th>
					<th>تاریخ</th>
					<th>جزییات</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="order in data.data.orders" :key="order.id">
					<th>{{ order.id }}</th>
					<td>{{ order.address_title }}</td>
					<td>
						<span
							:class="{
								'text-success': order.payment_status == 'موفق',
								'text-danger': order.payment_status == 'ناموفق',
							}"
							>{{ order.payment_status }}</span
						>
					</td>
					<td>{{ numberFormat(order.paying_amount) }} تومان</td>
					<td>{{ order.created_at }}</td>
					<td>
						<button
							@click="checkAddressForOrder(order)"
							type="button"
							class="btn btn-outline-dark"
							data-bs-toggle="modal"
							:data-bs-target="`#modal-${order.id}`"
						>
							محصولات
						</button>
						<div class="modal fade" :id="`modal-${order.id}`">
							<div class="modal-dialog modal-lg">
								<div class="modal-content">
									<div class="modal-header">
										<h6 class="modal-title">
											محصولات سفارش شماره {{ order.id }}
										</h6>
										<button
											type="button"
											class="btn-close"
											data-bs-dismiss="modal"
											aria-label="Close"
										></button>
									</div>
									<div class="modal-body">
										<table class="table align-middle">
											<thead>
												<tr>
													<th>محصول</th>
													<th>نام</th>
													<th>قیمت</th>
													<th>تعداد</th>
													<th>قیمت کل</th>
												</tr>
											</thead>
											<tbody>
												<tr
													v-for="product in order.order_items"
													:key="product.id"
												>
													<th>
														<img
															v-img="product.product_primary_image"
															src="/images/preloader.png"
															width="80"
														/>
													</th>
													<td class="fw-bold">
														{{ product.product_name }}
													</td>
													<td>{{ numberFormat(product.price) }} تومان</td>
													<td>{{ product.quantity }}</td>
													<td>{{ numberFormat(product.subtotal) }} تومان</td>
												</tr>
											</tbody>
										</table>
										<div class="d-flex justify-content-between">
											<h6 class="fw-bold">قیمت کل با احتساب تخفیف:</h6>
											<h6 class="me-5">
												{{ numberFormat(order.paying_amount) }} تومان
											</h6>
										</div>
										<hr />
										<div class="row ms-1 me-1">
											<div class="col-12 col-md-6 mt-3">
												<label for="cellphone" class="form-label">شماره</label>
												<input
													:value="validCellphone"
													type="text"
													id="cellphone"
													class="form-control"
													disabled
												/>
											</div>
											<div class="col-12 col-md-6 mt-3">
												<label for="postal_code" class="form-label"
													>کد پستی</label
												>
												<input
													:value="validPostalCode"
													type="text"
													id="postal_code"
													class="form-control"
													disabled
												/>
											</div>
											<div class="col-12 mt-3">
												<label for="address" class="form-label">آدرس</label>
												<textarea
													:value="validAddress"
													class="form-control"
													rows="5"
													type="text"
													id="address"
													disabled
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</td>
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

const { data, refresh } = await useFetch(() => `${apiBase}/orders`, {
	query: { page },
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	},
});

const users = await $fetch(`${apiBase}/users`, {
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	},
});

const validAddress = ref(null);
const validPostalCode = ref(null);
const validCellphone = ref(null);
function checkAddressForOrder(order) {
	users.data.users.forEach((user) => {
		if (user.id == order.user_id) {
			user.addresses.forEach((address) => {
				if (address.address_title == order.address_title) {
					validAddress.value = address.address;
					validPostalCode.value = address.postal_code;
					validCellphone.value = address.cellphone_address;
				}
			});
		}
	});
	// data.value.data.orders.forEach((order) => {
	// 	users.data.users.forEach((user) => {
	// 		if (order.user_id == user.id) {
	// 			user.addresses.forEach((address) => {
	// 				if (address.address_title == order.address_title) {
	// 					validAddress.value = address.address;
	// 				}
	// 			});
	// 		}
	// 	});
	// });
}

function paginate(link) {
	page.value = link;
	refresh();
}

definePageMeta({
	middleware: "auth",
});
</script>