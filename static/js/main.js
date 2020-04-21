$(document).ready(function () {
	svg4everybody({});
});

// Lang switch
var arrLang = {
	en: {
		main: "Main",
		about: "About",
		contact: "Contact",
		send: "Send",
	},
	ru: {
		main: "Главная",
		about: "О компании",
		contact: "Контакты",
		send: "Отправить",
	},
};

$(function () {
	$(".translate").on("click", function () {
		var lang = $(this).attr("id");

		$(".lang").each(function (index, el) {
			$(this).text(arrLang[lang][$(this).attr("key")]);
		});
	});
});
// End of Lang switch

// Menu app
function toggleClassMenu() {
	myMenu.classList.add("menu--animatable");
	if (!myMenu.classList.contains("menu--visible")) {
		myMenu.classList.add("menu--visible");
	} else {
		myMenu.classList.remove("menu--visible");
	}
}

function OnTransitionEnd() {
	myMenu.classList.remove("menu--animatable");
}

var myMenu = document.querySelector(".menu");
var oppMenu = document.querySelector(".menu-icon");
myMenu.addEventListener("transitionend", OnTransitionEnd, false);
oppMenu.addEventListener("click", toggleClassMenu, false);
// myMenu.addEventListener("click", toggleClassMenu, false);

$(".menu-icon").click(function () {
	$(this).toggleClass("shown");
});

// Menu button stilization
$(".nav_a").on("click", function () {
	$(".nav_a").removeClass("nav_active");
	$(this).addClass("nav_active");
});
// -----------------------

// popup forms
$(".show_popup").click(function () {
	$(".popup").addClass("visible");
});

$("body").click(function (e) {
	var closeClassList = ["popup_bg", "close_icon", "svg-inline--fa", "fas"];
	if (!closeClassList.includes(e.target.classList[0])) return true;
	$(".popup").removeClass("visible");
});

//Form validation
let form_name = $('input[name="name"]').val();

let alphaRegexp = /[.,:;&~_@"'“”‘*+!?^$#{}()|\d\f\n\r\t\v\-]/gim;
let emailRegex = "/^[A-z0-9._-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$/";
let textRegexp = "/[A-zА-яds\r\n.,!?:()/%+=_-]/g";

// var str = $('#input').val();
// var regexp = /[.,:;&~_@"'“”‘*+!?^$#{}()|\d\f\n\r\t\v\-]/gim;
// //[\/\\][\[][\]]

var err = {
	badname: "bad name",
	bademail: "bad email",
};

function validation_name(err) {
	$("#input").keyup(function () {
		$("#msg").text("");
		let regexpName = /[\d.,:;&~_@"'“”‘*+!?^$#{}()|-]/gim; //[\/\\][\[][\]] \f\n\r\t\v\
		let str = $("#input").val();
		let res = regexpName.test(str);
		// console.log(res);

		if (str != "" && res == true) {
			$("#msg").text(err.badname);
		} else {
			$("#msg").text("");
		}
	});
}
validation_name(err);

// ----------------------------------

function del(val) {
	this.slice(0, -1);
}

function ab_valid() {
	if (form_name != alphaRegexp) {
		del(this);
	}
}

//Send form data
$("form").submit((e) => {
	e.preventDefault();

	let formData = $("form").serialize();

	$.ajax({
		type: "POST",
		url: $("form").attr("action"),
		data: formData,
		success: (xhr, statusCode, textStatus) => {
			console.log(textStatus.status);
		},
		complete: (xhr, statusCode, textStatus) => {
			console.log(xhr.status);

			if (xhr.status == 201) {
				$(".popup_form .cont form").remove();
				$(".cont").html(
					'<div class="form_result">Your offer was succesfuly sent. Thank you! :)</div>'
				);
			} else {
				$(".popup_form .cont form").remove();
				$(".cont").html(
					'<div class="form_result">Something went wrong :( Contact me on socials.</div>'
				);
			}
		},
	});
});

// -----------------------------
