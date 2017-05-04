$(document).ready(function(){
	console.log("LOAD");
	$.getJSON("json_data.json", function(data){
		console.log(data);
		$.each(data.person, function(){
			console.log(this);
			$("#movie-container").append('<div class="row" style="margin: 5px 0; "><div class="col-md-7"><a href="#"><img align="left" class="img-responsive" src="'+this["img"]+'" alt=""></a></div><div class="col-md-5" ><h3><font face="Impact" color="white" size="10">'+this["title"]+'</font></h3><h4><font face="Verdana" size="5" color="#00ff80">'+this["studio"]+'</font></h4><p><font face="Verdana" color="white">'+ this["description"] +'</font></p></div><br/></div><br/><br/><hr>');
		});
	});
});

/* "<img src=" + this['img'] + " width='200px' height = '200px' />" +
				"<br/>" +"TITLE:" + 
				this['title'] + 
				"<br/>" + 
				"DESCRIPTION:" + 
				"<br/>" + 
				this['description'] + 
				"<br/>" + "Runtime: " + 
				this['runtime'] + 
				"<br/><br/>"
				*/