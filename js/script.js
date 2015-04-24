$(function() {
	
	var colorpicker = $("#colorpicker");
	
	function toggleButtonState() {
        var options = colorpicker.spectrum("option");
        $(".toggleBtn").each(function() {
            $(this).toggleClass("active", !!options[$(this).data("rule")]);
        });
    }
	
	function defaultSpectrumState() {
		$("#colorpicker").spectrum({
			showPalette: true,
			showSelectionPalette: true,
			palette: [ ],
			preferredFormat: "hex",
			showInput: true,
			showInitial: true,
			flat: true,
			maxSelectionSize: 20
		});
		
	}

    $(document).on("click", ".toggleBtn", function() {
        var option = $(this).data("rule");
        var existing = colorpicker.spectrum("option", option);

        colorpicker.spectrum("option", option, !existing);
        toggleButtonState();
    });
	
	//localStorageKey: "spectrum.homepage",
	defaultSpectrumState();	
	
	$("#generatecode").click(function() {
		var xml = '';
		xml += '<?xml version="1.0" encoding="UTF-8"?>';
		xml += '\n<resources>';
		var counter = 1;
		$("#generatedcode").html('');
		$('.sp-palette-row > span').each(function () {
			xml += '\n\t';
			xml += '<color name="Color_' + counter + '">' + this.title + '</color>';
			counter++;
		});
		xml += '\n</resources>';
		
		/* If only there is at least one color in the palette
		   , we should generate the xml code. This check is
		   simply implemented by searching if our xml var contains
		   the string pattern "color". */
		if(xml.indexOf("color") != -1) { 
			$("#generatedcode").text(xml);
		} else {
			// Otherwise, an erroneous alert informs the user.
			
			/* We firstly have to hide relative to palette elements,
			   as by default, they are presented in the foreground. */
			$(".sp-picker-container").hide();
			$(".sp-palette-container").hide();
			
			swal({   
				title: "Your palette's empty!",
				type: "error",
				}, 
				
				/* And when our work is done (user confirmed the alert),
				   we redisplay them. */
				function() {
					$(".sp-picker-container").show();
					$(".sp-palette-container").show(); 
				});
		}
	});
	
	$("#size").change(function() {
        var size = Math.min(500, Math.max(50, $(this).val()));
        $(".sp-picker-container").width(size);

        colorpicker.spectrum("reflow");
    });

    $("#huesize").change(function() {
        var size = Math.min(80, Math.max(5, $(this).val()));

        $(".sp-hue").css("left", (103 - size) + "%");
        $(".sp-color").css("right", size + "%");
        $(".sp-fill").css("padding-top", (100 - size) + "%");

        colorpicker.spectrum("reflow");
    });
	
	$("#clear").click(function() {
		$("#generatedcode").html('');
		defaultSpectrumState();
		
		$("#size").val(250);
		$(".sp-picker-container").width(250);
	    $("#colorpicker").spectrum("reflow");
		
	});

    toggleButtonState();
});

$( document ).ready(function() {
	$(".sp-picker-container").width(250);
	$("#colorpicker").spectrum("reflow");
});