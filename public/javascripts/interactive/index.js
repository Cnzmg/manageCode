new Vue({
    el: '#c-container-body',
    data: () => {
        return {
            loading: false,
            imageShow: false
        }
    },
    created: function () {
        $('body').on('click', '.template-skins > a', function(e){
			e.preventDefault();
			var skin = $(this).data('skin');
			$('body').attr('id', skin);
			localStorage.setItem("skin",JSON.stringify({skin:skin}));
        });
        //if body not bg
        if(JSON.parse(localStorage.getItem("skin"))){
            $('body').attr('id', JSON.parse(localStorage.getItem("skin")).skin);
        };
    },
    methods: {
        Error(err) {
            this.$message.error('错了哦，' + err);
        }
    }
});