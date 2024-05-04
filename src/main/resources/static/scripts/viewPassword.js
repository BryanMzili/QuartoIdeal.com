function viewIcon() {
    iconView.style.display = 'block';
    iconView.src = '../../images/visualizar.png';
}

function noViewIcon() {
    iconView.style.display = 'block';
    iconView.src = '../../images/nao_visualizar.png';
}

function noIcon() {
    iconView.removeEventListener('click',changeInputType);
    iconView.style.display = 'none';
}

function addListenerView() {
    viewIcon(iconView);
    iconView.addEventListener('click', changeInputType);
}

function changeInputType() {
    if(field_2.type === 'password'){
        field_2.setAttribute('type','text');
        noViewIcon(iconView);
    }else{
        field_2.setAttribute('type','password');
        viewIcon(iconView);
    }
}
