<template>
  <div :class="'alert ' + alertType">
    {{ alertMessage }}
    <button
      @click="close"
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
</template>
<style lang="scss" scoped>
.alert {
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}
.primary {
  color: #084298;
  background-color: #cfe2ff;
  border-color: #b6d4fe;
}
.secondary {
  color: #41464b;
  background-color: #e2e3e5;
  border-color: #d3d6d8;
}
.success {
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;
}
.warning {
  color: #664d03;
  background-color: #fff3cd;
  border-color: #ffecb5;
}
.error {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
}
.btn-close {
  background: transparent
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e")
    center/1em auto no-repeat;
  border: 0;
  border-radius: 0.25rem;
  box-sizing: content-box;
  color: #000;
  cursor: pointer;
  height: 1em;
  opacity: 0.5;
  padding: 0.25em 0.25em;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 1em;
  z-index: 2;
}

button {
  width: 10px !important;
}
</style>
<script>
export default {
	data(){
		return {
			alertType : this.type,
			alertMessage : this.message
		}
	},
	props:{
		type:{
			type: String,
			default: "primary"
		},
		message:{
			type: String,
			required : true
		},

	},
	watch:{
			type : function(newType){
				this.alertType = newType
			},
			message: function(newMsg){
				this.alertMessage = newMsg
			}
	},
	methods:{
		close(){
			this.$emit('CLOSE_ALERT')
		}
	},
}
</script>