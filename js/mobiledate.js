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

	var clientXstart , clientYstart;
	var xStartYear , yStartYear,
		xStartMonth , yStartMonth,
		xStartDay , yStartDay;

	var UNITHEIGHT = 40;
	
	$('.md-col-holder').on('touchstart',function(e){
		var touch = e.changedTouches[0]
		clientXstart = touch.clientX;
		clientYstart = touch.clientY;
		if($(this).hasClass('md-year')){
			xStartYear = touch.clientX;
			yStartYear = touch.clientY;
		}
		else if($(this).hasClass('md-month')){
			xStartMonth = touch.clientX;
			yStartMonth = touch.clientY;
		}
		else if($(this).hasClass('md-day')){
			xStartDay = touch.clientX;
			yStartDay = touch.clientY;
		}
	})
	$('.md-col-holder').on('touchmove',function(e){
		var touch = e.changedTouches[0]
		var clientXmove = touch.clientX;
		var clientYmove = touch.clientY;

		if($(this).hasClass('md-year')){
			touchmove(clientXmove,clientYmove,xStartYear,yStartYear,'.md-year')
		}
		else if($(this).hasClass('md-month')){
			touchmove(clientXmove,clientYmove,xStartMonth,yStartMonth,'.md-month')
		}
		else if($(this).hasClass('md-day')){
			touchmove(clientXmove,clientYmove,xStartDay,yStartDay,'.md-day')
		}
		
	})
	$('.md-col-holder').on('touchend',function(e){
		
		var yEnd = $(this).css('top');
		console.log(yEnd)
		yEnd = px2number(yEnd)
		var y = Math.round(yEnd/40)*40;
		$(this).animate({top:y},300,'ease')

	})

	function touchmove(clientXmove,clientYmove,clientXstart,clientYstart,target){
		var x = clientXmove - clientXstart,
			y = clientYmove - clientYstart;
		moveTarget(target,y)

	}
	function moveTarget(target,y){

		var rowLen = $(target).find('.md-row').length;
		var y0 = $(target).css('top');
		console.log($(target),target)
		y0 = px2number(y0)
		var ymove = y0+y/10;
		if(ymove<=80 && ymove>=(3-rowLen)*40){
			$(target).css('top',ymove)
		}

		
	}
	function px2number(strpx){
		var numstr = strpx.replace(/px/,'');
		return numstr*1;
	}
	mobileDateInit(30,12,2016);
	function mobileDateInit(day,month,year){
		if(typeof day==='undefined'){
			day = new Date().format('dd')
		}
		if(typeof month==='undefined'){
			month = new Date().format('MM')
		}
		if(typeof year==='undefined'){
			year = new Date().format('yyyy')
		}
		
		
		day = day*1;
		month = month*1;
		year = year*1;
		if(year<1970||year>2029){
			console.error('year must between 1970 and 2029')
			return false;
		}
		if(month<1||month>12){
			console.error('month must between 1 and 12')
			return false;
		}
		var days = daysInMonth(month,year);
		if(day<1||day>days){
			console.error('day must between 1 and '+days)
			return false;
		}
		initYear(year);
		initMonth(month);
		initDay(day);
	}

	
	function initYear(year){
		if(typeof year==='undefined'){
			year = new Date().format('yyyy')
		}
		year = year*1;
		var baseYear = 1970;
		var yearHtml = '';
		for(var i=0;i<60;i++){
			yearHtml += '<div class="md-row">'+ (baseYear+i) +'</div>'
		}
		$('.md-year').css('top',(1970-year+2)*40);
		$('.md-year').html(yearHtml);
	}
	function initMonth(month){
		if(typeof month==='undefined'){
			month = new Date().format('MM')
		}
		month = month*1;
		var monthHtml = '';
		for(var i=1;i<13;i++){
			monthHtml += '<div class="md-row">'+ number2Str(i) +'</div>'
		}
		$('.md-month').css('top',(3-month)*40);
		$('.md-month').html(monthHtml);
	}
	function number2Str(num){
		if(num<10){
			num = '0'+num
		}
		return num;
	}
	function initDay(day,month,year){
		if(typeof year==='undefined'){
			year = new Date().format('yyyy')
		}
		if(typeof month==='undefined'){
			month = new Date().format('MM')
		}
		if(typeof day==='undefined'){
			day = new Date().format('dd')
		}
		day = day*1;
		month = month*1;
		year = year*1;
		var days = daysInMonth(month,year);
		var dayHtml = ''
		for(var i=1;i<=days;i++){
			dayHtml += '<div class="md-row">'+ number2Str(i) +'</div>'
		}
		$('.md-day').css('top',(3-day)*40);
		$('.md-day').html(dayHtml);
	}

	//Month is 1 based
	function daysInMonth(month,year) {
	    return new Date(year, month, 0).getDate();
	}










	
	

})














