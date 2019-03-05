<template>
	<div class="w-full px-2 lg:flex">
	  <div class="mb-8 border border-grey-light lg:border-grey-light bg-white rounded p-4 flex flex-col justify-between leading-normal">
	    <div class="mb-2">
	      
	      <div class="text-black font-bold text-xl mb-2">{{ tool.title }}</div>
	      
	    </div>
	    
	  </div>
	</div>
</template>

<script>
export default {
  props: ['tool']
}
</script>