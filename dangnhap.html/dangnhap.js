/* ==========================================================
   HỆ THỐNG THIỆN NGUYỆN - SCRIPT TỔNG HỢP (ĐÃ FIX LỖI)
   ========================================================== */

/* --- 1. CÁC HÀM BỔ TRỢ (HELPERS) --- */
function togglePassword(id) {
    const pass = document.getElementById(id);
    if (pass) {
        pass.type = pass.type === "password" ? "text" : "password";
    }
}

// Kiểm tra mật khẩu: 8 ký tự, 1 hoa, 1 thường, 1 số, 1 đặc biệt
function checkPassword(pass) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return regex.test(pass);
}

// Kiểm tra email cơ bản
function validateEmail(email) {
    return String(email).toLowerCase().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
}

/* --- 2. XỬ LÝ ĐĂNG KÝ --- */
const regForm = document.getElementById("registerForm");
if (regForm) {
    regForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const emailInput = document.getElementById("email");
        const nameInput = document.getElementById("name");
        const pass1Input = document.getElementById("password1");
        const pass2Input = document.getElementById("password2");

        // Reset lỗi
        ["emailError", "nameError", "passError", "pass2Error"].forEach(id => document.getElementById(id).innerText = "");

        let valid = true;
        if (!validateEmail(emailInput.value)) {
            document.getElementById("emailError").innerText = "Email không hợp lệ";
            valid = false;
        }
        if (nameInput.value.trim() === "") {
            document.getElementById("nameError").innerText = "Vui lòng nhập họ tên";
            valid = false;
        }
        if (!checkPassword(pass1Input.value)) {
            document.getElementById("passError").innerText = "Mật khẩu yếu (Cần 8 ký tự, đủ loại)";
            valid = false;
        }
        if (pass1Input.value !== pass2Input.value) {
            document.getElementById("pass2Error").innerText = "Mật khẩu xác nhận không khớp";
            valid = false;
        }

        if (valid) {
            // CHUẨN HÓA EMAIL VỀ CHỮ THƯỜNG TRƯỚC KHI LƯU
            const normalizedEmail = emailInput.value.trim().toLowerCase();
            const userData = { 
                email: normalizedEmail, 
                name: nameInput.value, 
                password: pass1Input.value 
            };
            
            localStorage.setItem(normalizedEmail, JSON.stringify(userData));
            alert("Đăng ký thành công tài khoản: " + normalizedEmail);
            window.location.href = "login.html";
        }
    });
}

/* --- 3. XỬ LÝ ĐĂNG NHẬP --- */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const emailInput = document.getElementById("loginEmail");
        const passInput = document.getElementById("password");
        const emailErr = document.getElementById("loginEmailError");
        const passErr = document.getElementById("loginPassError");

        emailErr.innerText = "";
        passErr.innerText = "";

        // CHUẨN HÓA EMAIL KHI TÌM KIẾM
        const normalizedEmail = emailInput.value.trim().toLowerCase();
        const storedData = localStorage.getItem(normalizedEmail);

        if (storedData) {
            const user = JSON.parse(storedData);
            if (user.password === passInput.value) {
                alert("Chào mừng " + user.name + " đã quay trở lại!");
                // window.location.href = "index.html"; 
            } else {
                passErr.innerText = "Mật khẩu không chính xác!";
            }
        } else {
            emailErr.innerText = "Email này chưa được đăng ký!";
        }
    });
}

/* --- TRÌNH XỬ LÝ QUÊN MẬT KHẨU - PHIÊN BẢN TESTER CHUYÊN NGHIỆP --- */
const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const otpInputs = document.querySelectorAll(".otp-input");
    const forgotEmailInput = document.getElementById("forgotEmail");
    let fakeOTP = "123456";

    // 1. Xử lý OTP: Nhập, Xóa, và DÁN (Paste)
    otpInputs.forEach((input, index) => {
        // Nhập và nhảy ô
        input.addEventListener("input", (e) => {
            const val = e.target.value;
            if (val.length >= 1) {
                e.target.value = val.slice(-1); // Chỉ giữ lại ký tự cuối cùng nhập vào
                if (index < otpInputs.length - 1) otpInputs[index + 1].focus();
            }
        });

        // Xóa lùi ô
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !input.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });

        // TÍNH NĂNG CAO CẤP: Dán mã xác thực (Ví dụ copy 123456 rồi dán vào ô 1)
        input.addEventListener("paste", (e) => {
            e.preventDefault();
            const data = e.clipboardData.getData("text").trim();
            if (data.length === 6 && /^\d+$/.test(data)) {
                otpInputs.forEach((inp, i) => inp.value = data[i]);
                otpInputs[5].focus(); // Nhảy đến ô cuối cùng
            }
        });
    });

    // 2. Gửi mã (Vẫn giữ logic chuẩn hóa email)
    forgotForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const emailVal = forgotEmailInput.value.trim().toLowerCase();
        if (localStorage.getItem(emailVal)) {
            step1.style.display = "none";
            step2.style.display = "block";
            document.getElementById("statusMsg").innerHTML = `Mã xác thực đã gửi tới: <br><b>${emailVal}</b>`;
            alert("Mã OTP: " + fakeOTP);
        } else {
            document.getElementById("forgotEmailError").innerText = "Email không tồn tại!";
        }
    });

    // 3. Xác nhận (Dùng btnVerifyFinal)
    const btnVerifyFinal = document.getElementById("btnVerifyFinal");
    if (btnVerifyFinal) {
        btnVerifyFinal.addEventListener("click", () => {
            let resOTP = "";
            otpInputs.forEach(inp => resOTP += inp.value);

            if (resOTP === fakeOTP) {
                const newPass = document.getElementById("newPass").value;
                if (!checkPassword(newPass)) {
                    document.getElementById("otpError").innerText = "Mật khẩu mới không đủ mạnh!";
                    return;
                }
                const emailVal = forgotEmailInput.value.trim().toLowerCase();
                let user = JSON.parse(localStorage.getItem(emailVal));
                user.password = newPass;
                localStorage.setItem(emailVal, JSON.stringify(user));

                alert("Thành công! Chuyển hướng...");
                // Dùng replace để chặn người dùng quay lại trang này bằng nút Back
                window.location.replace("login.html");
            } else {
                document.getElementById("otpError").innerText = "Mã xác thực không đúng!";
            }
        });
    }
}