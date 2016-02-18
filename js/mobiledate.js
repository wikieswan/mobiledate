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
	
	$('body').on('touchstart','.md-col-holder',function(e){
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
	$('body').on('touchmove','.md-col-holder',function(e){
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
	$('body').on('touchend','.md-col-holder',function(e){
		var days ;
		var yEnd = $(this).css('top');
		yEnd = px2number(yEnd)

		if($(this).hasClass('md-year')){
			var y = Math.round(yEnd/40)*40;
			$(this).animate({top:y},300,'ease')
			reInitDay();
			$('.md-selected-year').html(getYear())
		}
		else if($(this).hasClass('md-month')){
			
			var index = Math.round(yEnd/40)
			setTouchendCyclePosition(index,12,this)	
			reInitDay();
			initMonthStyle()
			$('.md-selected-month').html(getMonth())
		}
		else if($(this).hasClass('md-day')){
			
			_year = getYear();
			_month = getMonth();
			
			days = daysInMonth(_month,_year);

			var index = Math.round(yEnd/40)

			setTouchendCyclePosition(index,days,this)
			initDayStyle()	
			$('.md-selected-day').html(getDay())
			return false;
		}
		setWeekDay()

	})

	$('body').on('touchend','.md-cancel',function(){
		closeMobiledate();
	})
	$('body').on('touchend','.md-sure',function(){
		closeMobiledate()
	})

	function closeMobiledate(){
		$('.md-mask').animate({
			'background': 'rgba(0,0,0,0)'
		},300,'ease',function(){
			$('.md-holder').hide();
		})
		
	}

	function setWeekDay(){
		var year ,
			month ,
			day;
		year = getYear();
		month = getMonth();
		day = getDay();

		var date = new Date(year+'/'+month+'/'+day)
		var weekIndex = date.getDay();
		var weeks = {
			'zh-CN': ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'],
			'en':['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
		}
		var weekday =  weeks['zh-CN'][weekIndex];
		$('.md-selected-weekday').html(weekday)
	}

	function reInitDay(){
		var _year ,
			_month ,
			_day;
		_year = getYear();
		_month = getMonth();
		_day = getDay();
		days = daysInMonth(_month,_year);
		if(_day>days){
			_day = days
		}
		initDay(_day,_month,_year);

	}

	function setTouchendCyclePosition(index,cycleLen,dom){
		var indexVal =  -((index-3)%cycleLen) ;
		$(dom).css('top',-(cycleLen+indexVal-3)*40);
	}

	function touchmove(clientXmove,clientYmove,clientXstart,clientYstart,target){
		var x = clientXmove - clientXstart,
			y = clientYmove - clientYstart;
		
		if($(target).hasClass('md-year')){
			moveTargetYear(target,y)
		}
		else{
			moveTarget(target,y)
		}

	}
	function moveTargetYear(target,y){
		var rowLen = $(target).find('.md-row').length;
		var y0 = $(target).css('top');
		y0 = px2number(y0)
		var ymove = y0+y/10;
		if(ymove<=80 && ymove>=(3-rowLen)*40){
			$(target).css('top',ymove)
		}
		initYearStyle()
	}
	function moveTarget(target,y){
		var y0 = $(target).css('top');
		y0 = px2number(y0)
		var ymove = y0+y/10;
		$(target).css('top',ymove)
		if($(target).hasClass('md-month')){
			initMonthStyle()
		}
		else{
			initDayStyle()
		}
	}

	
	
	
	mobileDateInit(18,2,2016);
	
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
		initDay(day,month,year);
		$('.md-selected-year').html(getYear())
		$('.md-selected-month').html(getMonth())
		$('.md-selected-day').html(getDay())
		setWeekDay()
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
		initYearStyle();
	}
	function initMonth(month){
		if(typeof month==='undefined'){
			month = new Date().format('MM')
		}
		month = month*1;
		var monthHtml = '';
		for(var n=0;n<3;n++){
			for(var i=1;i<13;i++){
				monthHtml += '<div class="md-row">'+ number2Str(i) +'</div>'
			}
		}
		
		$('.md-month').css('top',(3-month-12)*40);
		$('.md-month').html(monthHtml);
		initMonthStyle(month);
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
		for(var n=0;n<3;n++){
			for(var i=1;i<=days;i++){
				dayHtml += '<div class="md-row">'+ number2Str(i) +'</div>'
			}
		}
		$('.md-day').css('top',(3-day-days)*40);
		$('.md-day').html(dayHtml);
		initDayStyle(days);
	}

	//Month is 1 based
	function daysInMonth(month,year) {
	    return new Date(year, month, 0).getDate();
	}
	function initYearStyle(){
		var y = $('.md-year').css('top');
		y = - px2number(y);
		var index = Math.round(y/40)  + 2;
		var $rows = $('.md-year').find('.md-row');
		cleanStyle('.md-year')
		$($rows[index]).addClass('md-row-0');

		if(index-1>0){
			$($rows[index-1]).addClass('md-row-1');
		}
		if(index-2>0){
			$($rows[index-2]).addClass('md-row-2');
		}
		$($rows[index+1]).addClass('md-row-1');
		$($rows[index+2]).addClass('md-row-2');

	}
	function initMonthStyle(){
		initCycleStyle(12,'.md-month')
	}
	function initDayStyle(){
		var _year ,
			_month ,
			_day;
		_year = getYear();
		_month = getMonth();
		_day = getDay();
		days = daysInMonth(_month,_year);

		initCycleStyle(days,'.md-day')
	}
	function initCycleStyle(cycleLen,dom){
		var y = $(dom).css('top');
		y =  px2number(y);
		var dateValue = 3 - Math.round(y/40) - cycleLen;
		cleanStyle(dom)
		var index = dateValue + cycleLen - 1;
		var $rows = $(dom).find('.md-row');
		$($rows[index]).addClass('md-row-0');
		$($rows[index-1]).addClass('md-row-1');
		$($rows[index-2]).addClass('md-row-2');
		$($rows[index+1]).addClass('md-row-1');
		$($rows[index+2]).addClass('md-row-2');
	}

	function cleanStyle(dom,index){
		if(typeof index==='undefined'){
			$(dom).find('.md-row').removeClass('md-row-0').removeClass('md-row-1').removeClass('md-row-2')
		}
		else{
			$($(dom).find('.md-row')[index]).removeClass('md-row-0').removeClass('md-row-1').removeClass('md-row-2')
		}
	}

	function getYear(){
		var y = $('.md-year').css('top');
		y = - px2number(y);
		var year = y/40 + 2 + 1970;
		return year;
	}
	function getMonth(){
		var y = $('.md-month').css('top');
		y = px2number(y);
		var index = y/40
		var month =  -((index-3)%12) ;
		month = month===0?12:month
		return month;
	}

	function getDay(){
		var y = $('.md-day').css('top');
		y = px2number(y);
		var index = y/40;
		var days = $('.md-day').find('.md-row').length/3;
		var day = -((index-3)%days)
		day = day===0?days:day;
		return day;
	}







	function px2number(strpx){
		var numstr = strpx.replace(/px/,'');
		return numstr*1;
	}

	
	

})














