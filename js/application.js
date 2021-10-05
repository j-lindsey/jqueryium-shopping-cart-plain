//Function to calculate Total Price of items
let updateTotalPrice = function () {
    $('tbody tr').each(function (i, ele) {
        let pricePerUnit = parseFloat(($(ele).children('.pricePerUnit').text()).substring(1));
        let qty = parseFloat($(ele).find('.qty input').val());
        if(isNaN(qty)){
            qty = 0;
        }
        let totalPrice = pricePerUnit * qty;
        $(ele).children('.totalItemPrice').html('$' + totalPrice.toFixed(2));
    });
    $('#totalPrice').html("");
}


$(document).ready(function () {
    updateTotalPrice();

    $(document).on('input', '.qty input', function () {
        updateTotalPrice();
    });

    $(document).on('click', '.cancel button', function(){
        $(this).closest('tr').remove();
    })

    $('#addItem').on('submit', function (event) {
        event.preventDefault();
        let item = $(this).children('[name=item]').val();
        let pricePerUnit = parseFloat($(this).children('[name=pricePerUnit]').val()).toFixed(2);
        let qty = $(this).children('[name=qty]').val();
        
        $('tbody').append(`<tr><td class="item">${item}</td><td class="pricePerUnit">$${pricePerUnit}</td><td class="qty"><input value=${qty} /></td><td class="cancel"><button>Cancel</button></td><td class="totalItemPrice"></td></tr>`);
        
        updateTotalPrice();
    });

    $('.btn.calculatePrice').on('click', function () {
        let sum = 0;
        $('tbody tr').each(function (i, ele) {
            sum += parseFloat(($(ele).children('.totalItemPrice').text()).substring(1));
        });
        $('#totalPrice').html('$' + sum.toFixed(2));
    })
});


