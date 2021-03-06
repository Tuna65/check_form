//root
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

//=================
const fullName = $('#fullname')
const Email = $('#email')
const passWord = $('#password')
const passConfirm = $('#password_confirmation')
const btnSubmid = $('.form-submit')
var isInvalid = false;
const formElement = $('.form')
// const enableInput = $$('[name]')
const enableInput = formElement.querySelectorAll('[name]')

//========================
function getParent(Element, selector) {
    while(Element.parentElement) {
        if(Element.parentElement.matches(selector)) {
            return Element.parentElement
        }
    }
}

function valueChecks(Elements, text) {
    const _this = getParent(Elements, '.form-group');

    Elements.onblur = function() {
        const formMessage = _this.querySelector('.form-message')
        if(this.value == ''){
            formMessage.innerText = `${text}`;
            _this.classList.add('invalid')
        }
        else{
            formMessage.innerText = '';
            _this.classList.remove('invalid')
        }
    }
    focusCheck(Elements);
}
function mailCheck (Elements, text1, text2) {
    const _this = getParent(Elements, '.form-group');

    Elements.onblur = function(){
        const formMessage = _this.querySelector('.form-message')
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(this.value == '') {
            formMessage.innerText = `${text1}`;
            _this.classList.add('invalid')
        }
        else{
            if(!regex.test(this.value)){
                formMessage.innerText = `${text2}`;
                _this.classList.add('invalid')
            }
            else{
                formMessage.innerText = '';
                _this.classList.remove('invalid')
            }
        }
    }
    focusCheck(Elements);
}
function passWordCheck(Elements, text1, text2) {
    const _this = getParent(Elements, '.form-group');

    Elements.onblur = function() {
        const formMessage = _this.querySelector('.form-message')
        if(this.value =='') {
            formMessage.innerText = `${text1}`;
            _this.classList.add('invalid')
        }else {
            if(this.value.length < 6){
                formMessage.innerText = `${text2}`;
                _this.classList.add('invalid')
            }
            else{
                formMessage.innerText = '';
                _this.classList.remove('invalid')
            }
        }
    }           
}
function checkConfirm (Elements, text1, text2) {
    const _this = getParent(Elements, '.form-group');

    Elements.onblur = function() {
        const formMessage = _this.querySelector('.form-message')
        if(this.value == '') {
            formMessage.innerText = `${text1}`;
            _this.classList.add('invalid')
        }else{
            if(passWord.value !== this.value){
                formMessage.innerText = `${text2}`;
                _this.classList.add('invalid')
            }
            else{
                formMessage.innerText = '';
                _this.classList.remove('invalid')
            }
        }
    }
}
function focusCheck(Elements) {
    const _this = getParent(Elements, '.form-group');

    Elements.onfocus = function() {
        const formMessage = _this.querySelector('.form-message')
        this.parentElement.classList.remove('invalid')
        formMessage.innerText = '';
    }
}
function submitCheck(Elements){
    const _this = getParent(Elements, '.form-group');

    const formMessage = _this.querySelector('.form-message')
    if(Elements.value == '') {
        formMessage.innerText = 'Tr?????ng n??y l?? b??t bu???c';
        _this.classList.add('invalid')
        isInvalid = true;
    }
}

btnSubmid.onclick = function(e) {
    submitCheck(fullName);
    submitCheck(Email);
    submitCheck(passWord);
    submitCheck(passConfirm);
    if(isInvalid){
        e.preventDefault();

        var formValue = Array.from(enableInput).reduce(function(value,input) {
            (value[input.name] = input.value) 
            return value
        },{})
        console.log(formValue)
    }
}

function app () {
    valueChecks(fullName,'Vui l??ng nh???p t??n c???a b???n');
    mailCheck(Email,'Vui l??ng nh???p v??o ????y','Tr?????ng n??y ph???i l?? email');
    passWordCheck(passWord,'Vui l??ng nh???p m???t kh???u c???a b???n','M???t kh???u ph???i t???i thi???u 6 k?? t???');
    checkConfirm(passConfirm, 'Vui l??ng nh???p l???i m???t kh???u x??c nh???n', 'M???t kh???u x??c nh???n ch??a ????ng');
}
app();
