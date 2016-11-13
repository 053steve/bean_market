$(function() {	

	$("a#upload_pic").click(function (e) {		
		e.preventDefault();		
	  $("input#img_upload").trigger('click');	  
	});	

	// $("input#img_upload").change(function() {
	//  		console.log('yo');
	// });

	$('input#img_upload').on('change', prepareUpload);

	// $('input#img_upload').on('change', prepareUpload);

	// Grab the files and set them to our variable
	function prepareUpload(e) {
		console.log(e.target.files[0]);
		var blobFile = e.target.files[0];
		// $("form#upload_form").submit();
		// console.log($("form#upload_form"));
		var fd = new FormData();
	  console.log(JSON.stringify(fd));
	  fd.append("userPhoto", blobFile);

    $.ajax({
        url: '/upload/dropUpload',
        type: 'POST',
        data: fd,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR)
        {
            if(typeof data.error === 'undefined')
            {
                // Success so call function to process the form
                alert('Picture Sent :D')

                // submitForm(event, data);
            }
            else
            {
                // Handle errors here
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            // Handle errors here
            console.log('ERRORS: ' + textStatus);
            // STOP LOADING SPINNER
        }
    });
	}

});