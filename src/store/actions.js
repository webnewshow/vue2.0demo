export default {
    //触发的变动,异步操作，一般发起请求在这里面写
    tokenchange:function(context){
        //action提交的是mutation，而且可以包含任意异步操作
		context.commit('change');
    }
}