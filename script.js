const localStorageKey = 'contas-salvas'
const display = document.querySelector('#display');
function insertAtCursor(n) {
    if (display) {
        const start = display.selectionStart;
        const end = display.selectionEnd;
        display.setRangeText(n, start, end, 'end');
        display.focus();
    } else {
        console.error('Display not found.');
    }
}
function calculate() {
    try {
        if (display.value === '') {
            $('.alerta').stop(true, true).hide();
            $("#emptymsg").stop(true, true).show(1000).fadeOut(7500);
        } else {
            const result = math.evaluate(display.value);
            display.value += ` = ${result}`;
            addInputToHistory();
            $('.alerta').stop(true, true).hide();
            $("#savedmsg").stop(true, true).show(1000).fadeOut(7500);
        }
    } catch {
        display.value
        $('.alerta').stop(true, true).hide();
        $("#invalidmsg").stop(true, true).show(1000).fadeOut(7500);
    }
}
document.addEventListener('keydown',function(e){if(e.key==='Enter'){calculate();};});
function save(){
    if (display.value === "") {
        $('.alerta').stop(true, true).hide();
        $("#blankmsg").stop(true, true).show(1000).fadeOut(7500);
    } else {
        addInputToHistory();
        $('.alerta').stop(true, true).hide();
        $("#savemsg").stop(true, true).show(1000).fadeOut(7500);
    }
};
$('.tab').on('click',()=>{$('.col').blur();});
$('.tab').on('touchstart',e=>{e.preventDefault();});$('.tab').on('touchend',e=>{e.target.click();});
const historyContainer = document.getElementById('storage');
historyContainer.addEventListener('touchstart', function(e) {
    if (e.target && e.target.id === 'resultado' || e.target.id === 'calculum') {
        e.preventDefault();
    };
});
historyContainer.addEventListener('touchend', function(e) {
    if (e.target && e.target.id === 'resultado' || e.target.id === 'calculum') {
        display.value = e.target.textContent.trim();
    };
});
historyContainer.addEventListener('touchstart', function(e) {
    if (e.target && e.target.id === 'btn-trash' || e.target.id === 'svg-trash') {
        const btn = e.target.id === 'btn-trash' ? e.target : e.target.closest('#btn-trash');
        e.preventDefault();
        btn.style.backgroundColor = 'var(--color-red)';
    }
})
historyContainer.addEventListener('touchend', function(e) {
    if (e.target && e.target.id === 'btn-trash' || e.target.id === 'svg-trash') {
        const btn = e.target.id === 'btn-trash' ? e.target : e.target.closest('#btn-trash');
        btn.click();
        btn.style.backgroundColor = 'var(--color-grey)';
    }
})
function resetDisplay() {
    display.value = ""
}
function addInputToHistory(input)
{
    if(display.value)
    {
        let contas = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        contas.unshift({
            conta: display.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(contas))
        showContas()
    }
}
function showContas()
{
    let tabela = document.getElementById('tabela');
    let contas = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('storage')
    list.innerHTML = ""
    if (contas.length === 0) {
        tabela.style.overflow = 'hidden';
        return;
    }
    if (contas.length === 1) tabela.style.maxHeight = '100px';
    if (contas.length > 1) tabela.style.maxHeight = '200px';
    tabela.style.overflowY = 'scroll';
    for(let i=0; i<contas.length; i++)
    {
        list.innerHTML += `<tr scope="row" tabindex="-1">
            <td id='resultado' tabindex="-1">
                <span tabindex="0" id='calculum' onclick="addDisplay('${contas[i]['conta']}')">${contas[i]['conta']}</span>
            </td>
            <td id='botao_trash' tabindex="-1">
                <button tabindex="0" id='btn-trash' onclick='removeConta("${contas[i]['conta']}")'>
                    <svg id='svg-trash' xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </button>
            </td>
        </tr>
        <hr class="taghr" style="opacity:0 !important">`;
    }

    const resultadoEls = list.querySelectorAll('#resultado');
    resultadoEls.forEach(el => {
        el.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); });
    });
    resultadoEls.forEach(el => {
        el.addEventListener('touchend', (e) => { e.preventDefault(); e.stopPropagation(); });
    });

    const calculumEls = list.querySelectorAll('#calculum');
    calculumEls.forEach(el => {
        el.tabIndex = 0;
        el.addEventListener('keydown', function(e) {
            const isSpace = e.key === ' ' || e.code === 'Space' || e.key === 'Spacebar' || e.keyCode === 32;
            if (isSpace) {
                e.preventDefault();
                display.value = el.textContent.trim();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        el.addEventListener('click', () => { display.value = el.textContent.trim(); });
    });

    calculumEls.forEach(el => {
        el.addEventListener('touchstart', () => { addDisplay(el.textContent.trim()); });
    });

    const trashBtns = list.querySelectorAll('#btn-trash');
    trashBtns.forEach(btn => {
        btn.tabIndex = 0;
        btn.addEventListener('keydown', function(e) {
            const isSpace = e.key === ' ' || e.code === 'Space' || e.key === 'Spacebar' || e.keyCode === 32;
            if (isSpace) {
                e.preventDefault();
                btn.click();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });

}
function addDisplay(resultado) {
    display.value = resultado
}
function removeConta(data)
{
    let contas = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let indice = contas.findIndex(x => x.conta == data)
    contas.splice(indice,1)
    localStorage.setItem(localStorageKey, JSON.stringify(contas))
    showContas()
    $('.alerta').stop(true, true).hide();
    $("#trashmsg").stop(true, true).show(1000).fadeOut(7500);
}
showContas()
function setaEsquerda() {
    let pos = display.selectionStart;
    if (pos > 0) pos -= 1;
    display.selectionStart = display.selectionEnd = pos;
    display.focus();
}
function setaDireita() {
    display.selectionStart = display.selectionEnd = Math.min(display.selectionEnd + 1, display.value.length);
    display.focus();
}
function botaoComeco() {
    display.selectionStart = display.selectionEnd = 0;
    display.focus();
}
function botaoFim() {
    display.selectionStart = selectionEnd = display.value.length;
    display.focus();
}
document.getElementById('botaoEnd').addEventListener('click', botaoFim);
document.getElementById('botaoHome').addEventListener('click', botaoComeco);
function botaoBackspace(){
    let startPos = display.selectionStart;
    let endPos = display.selectionEnd;
    if (startPos === endPos && startPos > 0) {
        display.value = display.value.slice(0, startPos - 1) + display.value.slice(endPos);
        display.selectionStart = display.selectionEnd = startPos - 1;
    } else if (startPos !== endPos) {
        display.value = display.value.slice(0, startPos) + display.value.slice(endPos);
        display.selectionStart = display.selectionEnd = startPos;
    }
    display.focus();
}
