function calcularIRT(valorLiquido) {
    if (valorLiquido <= 100000) return 0;
    if (valorLiquido >= 100001 && valorLiquido <= 150000) return 0.13 * (valorLiquido - 100000);
    if (valorLiquido >= 150001 && valorLiquido <= 200000) return 12500 + 0.16 * (valorLiquido - 150000);
    if (valorLiquido >= 200001 && valorLiquido <= 300000) return 31250 + 0.18 * (valorLiquido - 200000);
    if (valorLiquido >= 300001 && valorLiquido <= 500000) return 49259 + 0.19 * (valorLiquido - 300000);
    if (valorLiquido >= 500001 && valorLiquido <= 1000000) return 87250 + 0.2 * (valorLiquido - 500000);
    if (valorLiquido >= 1000001 && valorLiquido <= 1500000) return 187249 + 0.21 * (valorLiquido - 1000000);
    if (valorLiquido >= 1500001 && valorLiquido <= 2000000) return 292249 + 0.22 * (valorLiquido - 1500000);
    if (valorLiquido >= 2000001 && valorLiquido <= 2500000) return 402249 + 0.23 * (valorLiquido - 2000000);
    if (valorLiquido >= 2500001 && valorLiquido <= 5000000) return 517249 + 0.24 * (valorLiquido - 2500000);
    return 1117249 + 0.245 * (valorLiquido - 5000000);
}

function calcular() {
    const valorBruto = parseFloat(document.getElementById('valor-bruto').value.replace(/\s/g, '').replace(/,/g, '.'));
    const subsTransporte = parseFloat(document.getElementById('subs-transporte').value.replace(/\s/g, '').replace(/,/g, '.'));
    const subsAlimentacao = parseFloat(document.getElementById('subs-alimentacao').value.replace(/\s/g, '').replace(/,/g, '.'));

    let segSocial = valorBruto * 0.03;
    const segSocialInput = document.getElementById('seg-social');
    if (segSocialInput.disabled) {
        segSocial = 0;
    }
    segSocialInput.value = formatarNumero(segSocial);

    const valorLiquido = valorBruto - subsTransporte - subsAlimentacao - segSocial;
    document.getElementById('valor-liquido').value = formatarNumero(valorLiquido);

    const irt = calcularIRT(valorLiquido);
    document.getElementById('calculo-irt').value = formatarNumero(irt);

    // Armazenar os resultados nos campos de resultado
    document.getElementById('res-valor-bruto').value = formatarNumero(valorBruto);
    document.getElementById('res-subs-transporte').value = formatarNumero(subsTransporte);
    document.getElementById('res-subs-alimentacao').value = formatarNumero(subsAlimentacao);
    document.getElementById('res-seg-social').value = formatarNumero(segSocial);
    document.getElementById('res-valor-liquido').value = formatarNumero(valorLiquido);
    document.getElementById('res-calculo-irt').value = formatarNumero(irt);
}

function formatarNumero(numero) {
    return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\./g, ' ').replace(/,/g, ',');
}

function formatInput(input) {
    let value = input.value.replace(/\s/g, '').replace(/,/g, '.');
    if (!isNaN(value) && value.trim() !== '') {
        input.value = formatarNumero(parseFloat(value));
    }
}

function limparFormulario() {
    document.querySelectorAll('tbody#resultados-tabela input').forEach(input => input.value = '');
}

function toggleSegurancaSocial() {
    const segSocialInput = document.getElementById('seg-social');
    segSocialInput.disabled = !segSocialInput.disabled;
    document.getElementById('toggle-seg-social').innerText = segSocialInput.disabled ? 'Habilitar Segurança Social' : 'Desabilitar Segurança Social';
}
