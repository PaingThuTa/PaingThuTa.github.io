let productsData = [];
let currentItems = [];

$(document).ready(function() {
    loadProductsData();
    updateCurrentDate();
    setupEventHandlers();
    calculateTotals();
});

function loadProductsData() {
    $.getJSON('./data/data.json', function(data) {
        productsData = data;
        populateProductSelect();
    }).fail(function() {
        console.error('Failed to load products data');
    });
}

function populateProductSelect() {
    const select = $('#productSelect');
    select.empty();
    select.append('<option value="">Select a product...</option>');
    
    productsData.forEach((product, index) => {
        select.append(`<option value="${index}">${product.description}</option>`);
    });
}

function updateCurrentDate() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
    $('#currentDate').text(formattedDate);
}

function setupEventHandlers() {
    $('#productSelect').on('change', function() {
        const selectedIndex = $(this).val();
        if (selectedIndex !== '') {
            const product = productsData[selectedIndex];
            $('#unitPriceDisplay').val(formatCurrency(product.unitPrice));
            updateModalAmount();
        } else {
            $('#unitPriceDisplay').val('');
            $('#amountDisplay').val('');
        }
    });

    $('#quantityInput').on('input', function() {
        updateModalAmount();
    });

    $('#addProductBtn').on('click', function() {
        addProductToTable();
    });

    $(document).on('click', '.delete-btn', function() {
        deleteProduct($(this).data('index'));
    });
}

function updateModalAmount() {
    const selectedIndex = $('#productSelect').val();
    const quantity = parseInt($('#quantityInput').val()) || 0;
    
    if (selectedIndex !== '' && quantity > 0) {
        const product = productsData[selectedIndex];
        const amount = product.unitPrice * quantity;
        $('#amountDisplay').val(formatCurrency(amount));
    } else {
        $('#amountDisplay').val('');
    }
}

function addProductToTable() {
    const selectedIndex = $('#productSelect').val();
    const quantity = parseInt($('#quantityInput').val());
    
    if (selectedIndex === '' || quantity <= 0) {
        alert('Please select a product and enter a valid quantity');
        return;
    }

    const product = productsData[selectedIndex];
    const amount = product.unitPrice * quantity;
    
    const newItem = {
        quantity: quantity,
        description: product.description,
        unitPrice: product.unitPrice,
        amount: amount
    };

    currentItems.push(newItem);
    renderTable();
    calculateTotals();
    
    $('#addProductModal').modal('hide');
    $('#productForm')[0].reset();
    $('#unitPriceDisplay').val('');
    $('#amountDisplay').val('');
}

function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this item?')) {
        currentItems.splice(index, 1);
        renderTable();
        calculateTotals();
    }
}

function renderTable() {
    const tbody = $('#dataTable');
    tbody.empty();
    
    currentItems.forEach((item, index) => {
        const row = `
            <tr>
                <td class="data">${item.quantity}</td>
                <td class="data">${item.description}</td>
                <td class="data">${formatCurrency(item.unitPrice)}</td>
                <td class="data">${formatCurrency(item.amount)}</td>
                <td class="data">
                    <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">
                        Delete
                    </button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });
}

function calculateTotals() {
    const subtotal = currentItems.reduce((sum, item) => sum + item.amount, 0);
    const vatRate = 0.07;
    const vatAmount = subtotal * vatRate;
    const shipping = 0.00;
    const totalDue = subtotal + vatAmount + shipping;

    $('#subTotal').text(formatCurrency(subtotal));
    $('#vatAmount').text(formatCurrency(vatAmount));
    $('#totalDue').text(formatCurrency(totalDue));
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 2
    }).format(amount);
} 