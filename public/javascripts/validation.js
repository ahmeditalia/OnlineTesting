function validationLogin() {
    let filterpass = /^([a-zA-Z0-9]){8,32}$/;
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;

    let flag1 = true;
    let flag2 = true;

    if (username === "") {
        document.getElementById('usererror').innerText = "*Username require";
        flag1 = false;
    } else if (username.length > 20) {
        document.getElementById('usererror').innerText = "*Username too long";
        flag1 = false;
    } else {
        document.getElementById('usererror').innerText = "";
        flag1 = true;
    }

    if (password === "") {
        document.getElementById('passerror').innerText = "*Password require";
        flag2 = false;
    } else if (!filterpass.test(password)) {
        document.getElementById('passerror').innerText = "*Invalid Password [8-32],digit,chars";
        flag2 = false;
    } else {
        document.getElementById('passerror').innerText = "";
        flag2 = true;
    }
    if (flag1 && flag2)
        return true;
    return false;
}

function validationٌRegister() {
    let filterpass = /^([a-zA-Z0-9]){8,32}$/;
    let filtermail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let username = document.getElementById("user2").value;
    let password = document.getElementById("pass2").value;
    let email = document.getElementById("email").value;
    let contact = document.getElementById("contact").value;
    let cv = document.getElementById("cv").value;

    let flag1 = true;
    let flag2 = true;
    let flag3 = true;
    let flag4 = true;
    let flag5 = true;

    if (username === "") {
        document.getElementById('usererroru').innerText = "*Username require";
        flag1 = false;
    } else if (username.length > 20) {
        document.getElementById('usererroru').innerText = "*Username too long";
        flag1 = false;
    } else {
        document.getElementById('usererroru').innerText = "";
        flag1 = true;
    }

    if (password === "") {
        document.getElementById('passerroru').innerText = "*Password require";
        flag2 = false;
    } else if (!filterpass.test(password)) {
        document.getElementById('passerroru').innerText = "*Invalid Password [8-32],digit,chars";
        flag2 = false;
    } else {
        document.getElementById('passerroru').innerText = "";
        flag2 = true;
    }

    if (email === "") {
        document.getElementById('emailerroru').innerText = "*Email require";
        flag3 = false;
    } else if (!filtermail.test(email)) {
        document.getElementById('emailerroru').innerText = "*Invalid Email";
        flag3 = false;
    } else {
        document.getElementById('emailerroru').innerText = "";
        flag3 = true;
    }

    if (contact === "") {
        document.getElementById('contacterroru').innerText = "*Contact require";
        flag4 = false;
    } else {
        document.getElementById('contacterroru').innerText = "";
        flag4 = true;
    }

    if (cv === "") {
        document.getElementById('cverroru').innerText = "*CV require";
        flag5 = false;
    } else {
        document.getElementById('cverroru').innerText = "";
        flag5 = true;
    }


    if (flag1 && flag2 && flag3 && flag4 && flag5)
        return true;
    return false;
}