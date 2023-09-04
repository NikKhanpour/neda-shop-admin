<template>
	<div class="col-md-12 my-3">
		<div class="row justify-content-center">
			<div class="col-md-4 text-center">
				<div v-if="image" class="position-relative">
					<img :src="image" width="350" height="220" />
					<div class="position-absolute remove-icon-image">
						<i @click="removeImage" class="bi bi-x text-danger fs-1 cursor-pointer"></i>
					</div>
				</div>
				<div v-else>
					<label for="formFile" class="form-label">تصویر اصلی</label>
					<input :disabled="loading" @change="imageFile" type="file" id="formFile" class="form-control" />
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
const props = defineProps({
	primaryImage: {
		type: String,
		default: null,
	},
});

const image = ref(props.primaryImage);
const loading = ref(false);
const emit = defineEmits(["setPrimaryImage"]);

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