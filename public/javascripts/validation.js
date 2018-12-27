// function registervalid() {
//     var firstname = document.forms["registerForm"]["firstname"].value;
//     var secondname = document.forms["registerForm"]["secondname"].value;
//     var username = document.forms["registerForm"]["username"].value;
//     var email = document.forms["registerForm"]["email"].value;
//     var password = document.forms["registerForm"]["password"].value;
//     var flag1 = true;
//     var flag2 = true;
//     var flag3 = true;
//     var flag4 = true;
//     var flag5 = true;
//     var filtermail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//     var filterpass = /^([a-zA-Z0-9]){8,32}$/;
//
//     if (firstname == "") {
//         document.getElementById('fname').innerText = "*firstname require";
//         flag4 = false;
//     } else if (firstname.length > 20) {
//         document.getElementById('fname').innerText = "*firstname too long";
//         flag4 = false;
//     } else {
//         document.getElementById('fname').innerText = "";
//         flag4 = true;
//     }
//
//     if (secondname == "") {
//         document.getElementById('sname').innerText = "*secondname require";
//         flag5 = false;
//     } else if (secondname.length > 20) {
//         document.getElementById('sname').innerText = "*secondname too long";
//         flag5 = false;
//     } else {
//         document.getElementById('sname').innerText = "";
//         flag5 = true;
//     }
//
//     if (username == "") {
//         document.getElementById('uname').innerText = "*Username require";
//         flag1 = false;
//     } else if (username.length > 20) {
//         document.getElementById('uname').innerText = "*Username too long";
//         flag1 = false;
//     } else {
//         document.getElementById('uname').innerText = "";
//         flag1 = true;
//     }
//     if (email == "") {
//         document.getElementById('em').innerText = "*Email require";
//         flag2 = false;
//     } else if (!filtermail.test(email)) {
//         document.getElementById('em').innerText = "*Email not valid";
//         flag2 = false;
//     } else {
//         document.getElementById('em').innerText = "";
//         flag2 = true;
//     }
//
//     if (password == "") {
//         document.getElementById('pass').innerText = "*Password require";
//         flag3 = false;
//     } else if (!filterpass.test(password)) {
//         document.getElementById('pass').innerText = "*Password should [8-32]";
//         flag3 = false;
//     } else if (password.length > 32) {
//         document.getElementById('pass').innerText = "*Password too long";
//         flag3 = false;
//     } else if (password.length < 8) {
//         document.getElementById('pass').innerText = "*Password too short";
//         flag3 = false;
//     } else {
//         document.getElementById('pass').innerText = "";
//         flag3 = true;
//     }
//
//     if (flag1 && flag2 && flag3)
//         return true;
//     else {
//         return false;
//     }
// }