function vazio(field,msg_field, text){
    if (field.value.replaceAll(" ", "") == '') {
        msg_field.textContent = 'Campo '+text+' vazio';
        field.value = '';
        field.focus();
        msgErro(field);
        field.addEventListener('input',removeMsg);
        return true;
    }
    return false;
}

function removeMsg(event){
    let field = event.target;
    field.style.border = 'solid 1px #000';
    field.style.color = '#FFF';

    if(field.id == 'field_1'){
        msg_field1.textContent = '';
    }else{
        msg_field2.textContent = '';
    }
}

function msgErro(field){
    field.style.border = 'solid 2px #F00';
    field.style.color = '#F00';
}