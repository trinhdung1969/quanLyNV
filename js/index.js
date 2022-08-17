//<============== Các hàm dùng chung ===============>

// DOM hàm lấy giá trị từ input, select
function dom(selector) {
    return document.querySelector(selector);
}

// Hàm tạo đối tượng nhân viên

function Staff(tknv, name, email, password, datepicker, luongCB, chucvu, gioLam) {
    this.tknv = tknv;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datepicker = datepicker;
    this.luongCB = luongCB;
    this.chucvu = chucvu;
    this.gioLam = gioLam;
}

// Hàm tính lương nhân viên
Staff.prototype.totalWage = function () {
    let total = 0;
    if (this.chucvu === "Sếp") {
        total = this.luongCB * 3;
    }
    if (this.chucvu === "Trưởng phòng") {
        total = this.luongCB * 2;
    }
    if (this.chucvu === "Nhân viên") {
        total = this.luongCB;
    }
    return total;
}

//Hàm xếp loại nhân viên
Staff.prototype.arrange = function () {
    let type = "";
    if (this.gioLam < 160) {
        type = "Trung bình";
    } else if (this.gioLam < 176) {
        type = "Khá";
    } else if (this.gioLam < 192) {
        type = "Giỏi";
    } else {
        type = "xuất sắc";
    }
    return type;
}

// Hàm reset lại các input và select
function resetEls() {
    dom("#tknv").value = '';
    dom("#name").value = '';
    dom("#email").value = '';
    dom("#password").value = '';
    dom("#datepicker").value = '';
    dom("#luongCB").value = '';
    dom("#chucvu").value = '';
    dom("#gioLam").value = '';

    dom("#tknv").disabled = false;
    dom("#btnThemNV").disabled = false;
}

// Hàm xoá nhân viên
function deletedStaff(staffTknv) {
    staffs = staffs.filter((staff) => {
        return staff.tknv != staffTknv
    })
    display(staffs);
}

//Hàm chọn nhân viên để hiển thị lên login để cập nhật thông tin
function selectStaff(staffTknv) {
    let staff = staffs.find((staff) => {
        return staff.tknv === staffTknv
    })

    if (!staff) {
        return
    }

    dom("#tknv").value = staff.tknv;
    dom("#name").value = staff.name;
    dom("#email").value = staff.email;
    dom("#password").value = staff.password;
    dom("#datepicker").value = staff.datepicker;
    dom("#luongCB").value = staff.luongCB;
    dom("#chucvu").value = staff.chucvu;
    dom("#gioLam").value = staff.gioLam;

    dom("#tknv").disabled = true;
    dom("#btnThemNV").disabled = true;
}

//Hàm hiển thị thông tin ra HTML
function display(staffs) {
    let html = staffs.reduce((result, staff) => {
        return result + `
    <tr>
        <td>${staff.tknv}</td>
        <td>${staff.name}</td>
        <td>${staff.email}</td>        
        <td>${staff.gioLam}</td>
        <td>${staff.chucvu}</td>
        <td>${staff.totalWage()}</td>
        <td>${staff.arrange()}</td>
        <td>
        <button
            class = "btn btn-success"
            data-toggle="modal"
            data-target="#myModal"
            onclick = "selectStaff('${staff.tknv}')"
            >
            Edit
            </button>

            <button 
            class= "btn btn-dange"
            onclick = "deletedStaff('${staff.tknv}')"
            >
            Delete
            </button>
        </td>        
    </tr>
    `
    }, "")
    // DOM tới tbody và gán chuổi html vừa tạo
    dom("#tableDanhSach").innerHTML = html;

}

let staffs = [];

//<=============  các sự kiện   =====================>
//Thêm nhân viên
document.getElementById("btnThemNV").onclick = function () {
    // B1 : Đầu vào
    let tknv = dom("#tknv").value;
    let name = dom("#name").value;
    let email = dom("#email").value;
    let password = dom("#password").value;
    let datepicker = dom("#datepicker").value;
    let luongCB = dom("#luongCB").value;
    let chucvu = dom("#chucvu").value;
    let gioLam = dom("#gioLam").value;

    let isValid = validateForrm();
    //Kiểm tra nếu form không hợp lệ
    if (!isValid) {       
        return false;
    }

    // Tạo một object nhân viên chứa các thông tin trên
    let staff = new Staff(tknv, name, email, password, datepicker, luongCB, chucvu, gioLam);

    // Thêm object nhân viên vào mảng nhân viên
    staffs.push(staff);

    // reset lại các input và select
    resetEls();

    display(staffs);

    console.log(staffs);
    let total = staff.totalWage();
    console.log(total);
}

//Cập nhật nhân viên

document.getElementById("btnCapNhat").onclick = function () {
    //B1 DOM
    let tknv = dom("#tknv").value;
    let name = dom("#name").value;
    let email = dom("#email").value;
    let password = dom("#password").value;
    let datepicker = dom("#datepicker").value;
    let luongCB = +dom("#luongCB").value;
    let chucvu = dom("#chucvu").value;
    let gioLam = +dom("#gioLam").value;

    let isValid = validateForrm();
    //Kiểm tra nếu form không hợp lệ
    if (!isValid) {       
        return false;
    }
    
    //B2 : Tạo object student chứa các thông tin trên

    let staff = new Staff(tknv, name, email, password, datepicker, luongCB, chucvu, gioLam);


    //Cập nhật thông tin nhân viên lưu trử và mảng nhân viên
    let index = staffs.findIndex((item) => item.tknv === staff.tknv);
    staffs[index] = staff;

    // reset lại các input và select
    resetEls();

    display(staffs);
}


//<============= CÁC HÀM KIỂM TRA ============================>

//Kiểm tra tài khoảng nhân viên
function validateTknv() {
    let tknv = dom("#tknv").value;
    let spanEl = dom("#tbTKNV");

    if (!tknv) {
        spanEl.style.display = "block"
        spanEl.innerHTML = "Tài khoản nhân viên không được để trống"
        return false;
    }

    if (tknv.length < 4 || tknv.length > 6) {
        spanEl.innerHTML = "Tài khoảng nhân viên phải từ 4 đến 6 ký tự"
        return false;
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = "";
    return true;
}

//Kiểm tra tên nhân viên
function validateName() {
    let name = dom("#name").value;
    let spanEl = dom("#tbTen");
    let number1=0;

    if (!name) {
        spanEl.style.display = "block";
        spanEl.innerHTML = "Tên nhân viên không được để trống";
        return false;
    }

    spanEl.style.display = "none";
    spanEl.innerHTML = "";
    return true;

}

// Hàm kiểm tra enmail
function validateEmail(){
    let email = dom("#email").value;
    let spanEL = dom("#tbEmail");
    if(!email){
        spanEL.style.display = "block";
        spanEL.innerHTML="email không được để trống"
        return false
    }
    //Kiểm tra định dạng email https://regexr.com/
    let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    if(!regex.test(email)){
        spanEL.style.display = "block";
        spanEL.innerHTML="email không đúng định dạng"
        return false
    }
    spanEL.style.display = "none";
    spanEL.innerHTML=""
    return true
}

//Hàm kiểm tra password
function validatePassword(){
    let password = dom("#password").value;
    let spanEL = dom("#tbMatKhau");
    if(!password){
        spanEL.style.display = "block";
        spanEL.innerHTML="mật khẩu không được để trống"
        return false
    }
    //
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    if (!regex.test(password)){
        spanEL.style.display = "block";
        spanEL.innerHTML="mật khẩu bao gồm chữ thường, hoa, số, ký tự đặc biệt"
        return false
    }
    spanEL.style.display = "none";
    spanEL.innerHTML=""
    return true
}

// Hàm kiểm tra ngày làm 
function validateDate(){
    let date = dom("#datepicker").value;
    let spanEL = dom("#tbNgay");
    if(!date){
        spanEL.style.display = "block";
        spanEL.innerHTML="Ngày làm không được để trống"
        return false
    }

    spanEL.style.display = "none";
    spanEL.innerHTML=""
    return true
}

//Kiểm tra tên lương cơ bản
function validaVage() {
    let Vage = dom("#luongCB").value;
    let spanEl = dom("#tbLuongCB");
    

    if (!Vage) {
        spanEl.style.display = "block";
        spanEl.innerHTML = "Lương cơ bản không được để trống";
        return false;
    }

    if (Vage < 1000000 || Vage > 20000000) {
        spanEl.style.display = "block";
        spanEl.innerHTML = "Lương cơ bản phải từ 1000000 đến 20000000 ký tự"
        return false;
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = "";
    return true;

}

//Kiểm tra chức vụ
function validaPosition() {
    let position = dom("#chucvu").value;
    let spanEl = dom("#tbChucVu");
    

    if (position === "") {
        spanEl.style.display = "block";
        spanEl.innerHTML = "Chức vụ không hợp lệ, chọn sếp, trưởng phòng, nhân viên";
        return false;
    }

    spanEl.style.display = "none";
    spanEl.innerHTML = "";
    return true;

}

//Kiểm tra số giờ làm
function validaWorkTime() {
    let workTime = dom("#gioLam").value;
    let spanEl = dom("#tbGiolam");
    

    if (!workTime) {
        spanEl.style.display = "block";
        spanEl.innerHTML = "Giờ làm không để trống";
        return false;
    }

    if (workTime < 80 || workTime > 200) {
        spanEl.style.display = "block";
        spanEl.innerHTML = "Giờ làm phải từ 80 gời đến 200giờ"
        return false;
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = "";
    return true;

}

// Hàm kiểm tra form có hợp lệ hay không
function validateForrm() {
    //Kỹ thuật đặt cờ hiệu, mặc định ban đầu form hợp lệ
    let isValid = true;

    isValid = validateTknv() & validateName() & validateEmail() & validatePassword () & validateDate() & validaVage () & validaPosition() &validaWorkTime()

    if (!isValid) {
        return false;
    }
    return true;
}