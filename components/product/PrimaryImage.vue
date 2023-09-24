<template>
	<div class="col-12 col-md-8 col-lg-6 mt-4">
		<div v-if="image">
			<img :src="image" width="350" height="220" />
			<div @click="removeImage" class="btn btn-dark ms-5 mt-2">حذف عکس</div>
		</div>
		<div v-else>
			<label for="formFile" class="form-label">تصویر اصلی</label>
			<div class="position-relative">
				<input
					@change="imageFile"
					:disabled="loading"
					class="form-control"
					type="file"
					id="formFile"
				/>
				<div
					v-if="loading"
					class="spinner-border spinner-border-sm text-primary position-absolute start-50"
					style="top: 32%"
				></div>
			</div>
		</div>
	</div>
</template>
<script setup>
const emit = defineEmits(["setPrimaryImage"]);
const props = defineProps({
	primaryImage: {
		type: String,
		default: null,
	},
});

const image = ref(props.primaryImage);
const loading = ref(false);

function imageFile(el) {
	loading.value = true;

	const reader = new FileReader();
	reader.readAsDataURL(el.target.files[0]);

	reader.onloadend = () => {
		image.value = reader.result.toString();
		loading.value = false;
	};
	emit("setPrimaryImage", el.target.files[0]);
}

function removeImage() {
	image.value = null;
	emit("setPrimaryImage", null);
}
</script>