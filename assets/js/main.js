$(function() {
	$("a#upload_pic").click(function (e) {		
		e.preventDefault();		
	  $("input#img_upload").trigger('click');	  
	});	
});