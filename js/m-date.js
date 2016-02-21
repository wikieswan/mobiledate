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
	function getTargetTopNumber(target){
		var top = $(target).css('top');
		top  = util.px2number(top)
		return top;
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
			touchMoveSlide('.md-year',yMove-yYearStart)
		}
	})
	$('body').on('touchend','.md-col-mask',function(e){
		var touch = e.changedTouches[0]
		var yEnd,timeEnd;
		if($(this).siblings('.md-col-items').hasClass('md-year')){
			yEnd = touch.clientY;
			timeEnd = e.timeStamp;
		}
		
		var y0 = getTargetTopNumber('.md-year');
		var sMinus = touchEndMinusLength(timeEnd,timeYearStart,yEnd,yYearStart)
		y0 = y0 + sMinus;

		touchEndSlide('.md-year',y0);
	})


	function touchEndMinusLength(timeEnd,timeStart,yTouchEnd,yTouchStart){
		var aMinus = 0.005;
		var t = timeEnd - timeStart,
			s = yTouchEnd - yTouchStart,
			v = 2*s/t,
			vEnd = 2*s/t,
			sMinus = v*v/2/aMinus;
		if(v>0){
			//dowm

		} 
		else{
			//up
			sMinus = -1 * sMinus 
		}
		return sMinus;
	}

	function touchEndSlide(target,y){
		var targetHeight = util.px2number($(target).css('height'))
		var n = targetHeight/40;
		if(y<(4-n)*40){
			y = (4-n)*40
		}
		else if(y>3*40){
			y = 3*40
		}
		y = Math.round(y/40)*40;
		$(target).css({
			'transition': 'top 1s',
			'-webkit-transition': 'top 1s',
			'top': y
		});
		
	}

	function touchMoveSlide(target,y){
		var y0 = getTargetTopNumber(target)
		var ymove = y0+y/10;
		var targetHeight = util.px2number($(target).css('height'))
		var n = targetHeight/40;
		if(ymove<(3.5-n)*40||ymove>3.5*40){
			return false;
		}
		
		$(target).css({
			'transition': 'top 0s',
			'-webkit-transition': '0s',
			'top': ymove
		})
	}


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
		
		$('.md-year').html(yearHtml);
		$('.md-year').css('top',(1970-year+3)*40);
		
	}
	function straightMoveEngine(target,y){
		var y0 = getTargetTopNumber(target)
		var ymove = y0+y/10;
		var targetHeight = util.px2number($(target).css('height'))
		var n = targetHeight/40;
		if(ymove<(3.5-n)*40||ymove>3.5*40){
		}
		else{
			touchMoveSlide(target,ymove)
		}
	}
	
})

















