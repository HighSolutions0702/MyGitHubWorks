/*******************************
 *
 * Created: 3/17/2016
 *
 *******************************/


(function($){
	"use strict";

	// document ready
	$(document).ready(function(){
		
		// calculate price
		var calculatePrice = function(){
			var result = 0;
			$("#calculator").find(".form-field").each(function(){
				if(($(this).is("input[type=checkbox]") || $(this).is("input[type=radio]")) && $(this).is(":checked")){
					result += parseInt($(this).val());
				} else {
					if($(this).is("select")){
						result += parseInt($(this).val());
					}
				}
			});

			var roundResult = function(num){
				return Math.round(num).toFixed(2);
			};
			
			$("#result-per-day-hire-default-price-from").text(roundResult(result));
			$("#per-day-hire-default-price-from").val(roundResult(result));

			$("#result-per-day-hire-default-price-to").text(roundResult(result * 1.15));
			$("#per-day-hire-default-price-to").val(roundResult(result * 1.15));

			$("#result-per-day-hire-peak-price-from").text(roundResult(result * 1.25));
			$("#per-day-hire-peak-price-from").val(roundResult(result * 1.25));

			$("#result-per-day-hire-peak-price-to").text(roundResult(result * 1.15 * 1.25));			
			$("#per-day-hire-peak-price-to").val(roundResult(result * 1.15 * 1.25));
		};
		
		// init calculator as default values
		calculatePrice();

		// function as event
		$("#calculator").find(".form-field").each(function(){
			if($(this).is("input[type=checkbox]") || $(this).is("input[type=radio]")){
				$(this).click(function(){
					calculatePrice();
				});
			} else {
				if($(this).is("select")){
					$(this).change(function(){
						calculatePrice();
					});
				}
			}
		});

	});

//////////////////////
})(jQuery);