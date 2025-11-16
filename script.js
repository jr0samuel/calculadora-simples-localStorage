const localStorageKey = 'contas-salvas'
const display = document.querySelector('#display');

function addInputToDisplay(input) {
    const displayValue = display.value
    display.value = displayValue + input
}
function addInputToDisplay1() {
    const valueDisplay = display.value
    display.value = valueDisplay + "("
}
function addInputToDisplay2() {
    display.value += ")"
}
function addInputForDisplay(v) {
    const valorTela = display.value
    if (v == 1) {
        display.value = valorTela + "[";
    } else if (v == 2) {
        display.value = valorTela + "]";
    } else if (v == 3) {
        display.value = valorTela + "{";
    } else if (v == 4) {
        display.value = valorTela + "}";
    }
}
function calculate() {
    if (display.value === '') return
    try {
        const result = math.evaluate(display.value);
        display.value += ` = ${result}`;
        addInputToHistory();
    } catch {
        display.value
        $("#invalidmsg").stop(true, true).show(1000).fadeOut(7500);
    }
}
document.addEventListener('keydown',function(e){if(e.key==='Enter'){calculate()}});
$('.tab').on('click',()=>{$('.tab').blur()});
function removeLastInput() {
    display.value = display.value.slice(0, -1)
}
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
    let contas = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('storage')
    list.innerHTML = ""
    for(let i = 0; i < contas.length; i++)
    {
        list.innerHTML += `<tr scope="row">
            <td id='resultado' onclick="addDisplay('${contas[i]['conta']}')" tabindex="-1">
                <span id='calculum' tabindex="0">${contas[i]['conta']}</span>
            </td>
            <td id='botao_trash' tabindex="-1">
                <button tabindex="0" id='btn-trash' onclick='removeConta("${contas[i]['conta']}")'>
                    <svg tabindex="0" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </button>
            </td>
        </tr>
        <hr class="taghr" style="opacity:0 !important">`;
    }
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
document.getElementById('botaoFoco').addEventListener('click', () => { document.getElementById('display').focus() })
/**/document.getElementById('botaoDesfoco').addEventListener('click', () => { document.getElementById('display').blur() })//
