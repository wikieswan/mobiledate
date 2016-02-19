$(function(){
	//date format
	Date.prototype.format = function(format) {
		var o = {
			"M+" : this.getMonth() + 1, // month
			"d+" : this.getDate(), // day
			"h+" : this.getHours(), // hour
			"m+" : this.getMinutes(), // minute
			"s+" : this.getSeconds(), // second
			"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
			"S" : this.getMilliseconds()
		// millisecond
		};
		if (/(y+)/.test(format))
			format = format.replace(RegExp.$1, (this.getFullYear() + "")
					.substr(4 - RegExp.$1.length));
		for ( var k in o)
			if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
						: ("00" + o[k]).substr(("" + o[k]).length));
		return format;
	};
	var util = {};
	util.px2number = px2number;
	util.number2Str = number2Str;
	util.daysInMonth = daysInMonth;
	util.cleanStyle = cleanStyle;
	function px2number(strpx){
		var numstr = strpx.replace(/px/,'');
		return numstr*1;
	}
	function number2Str(num){
		if(num<10){
			num = '0'+num
		}
		return num;
	}
	//Month is 1 based
	function daysInMonth(month,year) {
	    return new Date(year, month, 0).getDate();
	}
	function cleanStyle(dom,index){
		if(typeof index==='undefined'){
			$(dom).find('.md-row').removeClass('md-row-0').removeClass('md-row-1').removeClass('md-row-2')
		}
		else{
			$($(dom).find('.md-row')[index]).removeClass('md-row-0').removeClass('md-row-1').removeClass('md-row-2')
		}
	}
	var yYearStart,timeYearStart;
	$('body').on('touchstart','.md-col-mask',function(e){
		var touch = e.changedTouches[0]
		if($(this).siblings('.md-col-items').hasClass('md-year')){
			yYearStart = touch.clientY;
			timeYearStart = e.timeStamp;
		}
	})
	$('body').on('touchmove','.md-col-mask',function(e){
		var touch = e.changedTouches[0]
		var yMove,timeMove;
		if($(this).siblings('.md-col-items').hasClass('md-year')){
			yMove = touch.clientY;
			timeMove = e.timeStamp;
		}
	})
	$('body').on('touchend','.md-col-mask',function(e){
		var touch = e.changedTouches[0]
		var yEnd,timeEnd;
		if($(this).siblings('.md-col-items').hasClass('md-year')){
			yEnd = touch.clientY;
			timeEnd = e.timeStamp;
		}
		console.log(e,yEnd-yYearStart)
	})

	initYear()
	function initYear(year){
		if(typeof year==='undefined'){
			year = new Date().format('yyyy')
		}
		year = year*1;
		var baseYear = 1970;
		var yearHtml = '';
		for(var i=0;i<60;i++){
			yearHtml += '<div class="md-item">'+ (baseYear+i) +'</div>'
		}
		$('.md-year').css('top',(1970-year+3)*40);
		$('.md-year').html(yearHtml);
	}

})

















