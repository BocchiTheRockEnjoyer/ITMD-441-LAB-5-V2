var form = document.getElementById('tipForm');
var errorMessage = document.getElementById('errorMessage');

form.addEventListener('input', function() {
    calculateTip();
});

function calculateTip() {
    var billInput = document.getElementById('Bill').value;
    var Bill = parseFloat(billInput);
    var tipSlider = document.getElementById('tipSlider').value;
    var currency = document.getElementById('currency').value;

    if (billInput == "0") {
        document.getElementById('tipForm').reset();
        document.getElementById('errorMessage').style.display = 'none';
    } else if (isNaN(Bill) || Bill < 0 || billInput == "") {
        document.getElementById('errorMessage').style.display = 'inline';
        document.getElementById('billWithTax').value = '';
        document.getElementById('tipPercentage').value = tipSlider;
        document.getElementById('tipAmount').value = '';
        document.getElementById('totalWithTipAndTax').value = '';
    } else {
        document.getElementById('errorMessage').style.display = 'none';
        document.getElementById('tipPercentage').value = tipSlider;

        var tax = 0;
        if (Bill > 0) {
            tax = Bill * 0.11;
        }

        var billWithTax = Bill + tax;
        document.getElementById('billWithTax').value = billWithTax.toFixed(2);

        var tipAmountUSD = Bill * (tipSlider / 100);
        var totalUSD = billWithTax + tipAmountUSD;
        
        var conversionRate = 1;
        if (currency == 'EUR') {
            conversionRate = 0.95;
        }
        if (currency == 'INR') {
            conversionRate = 85;
        }

        var finalTip = tipAmountUSD * conversionRate;
        var finalTotal = totalUSD * conversionRate;
        document.getElementById('tipAmount').value = finalTip.toFixed(2);
        document.getElementById('totalWithTipAndTax').value = finalTotal.toFixed(2);
    }
}