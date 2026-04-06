// var x = 5
// var y = 7
// var z = x + y
// console.log(z)

// A = "Hello "
// B = "world!"
// var C = A + B
// console.log(C)

// // function name(params) {

// // }

// function sumnPrint(x1, x2) {
//     x = x1 + x2
//     console.log(x)
// }

// sumnPrint(x, y)
// sumnPrint(A, B)

// if (C.length > z) {
//     console.log(C)
// } else if (C.length < z) {
//     console.log(z)
// } else {
//     console.log("good job!")
// }

// L1 = ["Watermelon","Pineapple","Pear","Banana"];
// L2 = ["Apple","Banana","Kiwi","Orange"];

// function findTheBanana(arr) {
//     for (element of arr) {
//         if (element === "Banana") {
//             alert(`Found Banana in ${arr}`)
//         }
//     }
// }

// findTheBanana(L1)
// findTheBanana(L2)

// L1.forEach((element) => {
//     if (element === "Banana") {
//         alert("We found a banana in the first array");
//     }
// });

// L2.forEach((element) => {
//     if (element === "Banana") {
//         alert("We found a banana in the second array");
//     }
// });

var now = new Date();
var hour = now.getHours();

function greeting(x) {
    var greet = document.getElementById("greeting");
    if (greet) {
        if (x < 5 || x >= 20) {
            greet.innerHTML = "Good night, Welcome to MonoMuse!";
        } else if (x < 12) {
            greet.innerHTML = "Good morning, Welcome to MonoMuse!";
        } else if (x < 18) {
            greet.innerHTML = "Good afternoon, Welcome to MonoMuse!";
        } else {
            greet.innerHTML = "Good evening, Welcome to MonoMuse!";
        }
    }
}

greeting(hour);


function addYear(x) {
    var curr_year = new Date().getFullYear();
    var message = document.getElementById("copyYear");

    message.innerHTML = "&copy; " + curr_year + " MonoMuse. All rights reserved."
}

function ActiveNav() {
    const navLinks = document.querySelectorAll('.nav_bar a');
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
}
ActiveNav();

$(document).ready(function() {
    $("#readMore").click(function() {
        $("#longIntro").show();
        $("#readLess").show();
        $("#readMore").hide();
    });

    $("#readLess").click(function() {
        $("#longIntro").hide();
        $("#readLess").hide();
        $("#readMore").show();
    });
});

function showForm(date) {
    document.getElementById("pDate").value = date;
    document.getElementById("purchaseForm").style.display = "block";
    document.getElementById("purchaseForm").scrollIntoView({ behavior: "smooth" });
}