const professionals = [
    { role: "Front End Developer", inhouse: 165480, nearshore: 116787 },
    { role: "Back End Developer", inhouse: 211140, nearshore: 136661 },
    { role: "Full Stack Developer", inhouse: 213360, nearshore: 116323 },
    { role: "Mobile Developer", inhouse: 236880, nearshore: 129223 },
    { role: "UX/Ui Designer", inhouse: 161880, nearshore: 112787 },
    { role: "DevOps Engineer", inhouse: 224700, nearshore: 149168 },
    { role: "QA Engineer", inhouse: 161700, nearshore: 115144 },
    { role: "Data Engineer", inhouse: 242760, nearshore: 111624 },
    { role: "Project Manager", inhouse: 200340, nearshore: 131335 }

];

function populateRoleTable() {
    const tableBody = document.querySelector('#rolesTable tbody');
    professionals.forEach(professional => {
        const row = document.createElement('tr');
        row.setAttribute('data-role', professional.role);
        row.innerHTML = `
            <td>${professional.role}</td>
            <td>
                <div class="quantity-controls">
                    <button type="button" onclick="adjustTableQuantity(this, -1)">-</button>
                    <input type="number" class="roleQuantity" value="0" readonly>
                    <button type="button" onclick="adjustTableQuantity(this, 1)">+</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function adjustTableQuantity(button, amount) {
    const quantityInput = button.parentElement.querySelector('.roleQuantity');
    let currentValue = parseInt(quantityInput.value);
    currentValue = isNaN(currentValue) ? 0 : currentValue;
    currentValue += amount;
    if (currentValue < 0) currentValue = 0;
    quantityInput.value = currentValue;
}

function calculateSavings() {
    const rows = document.querySelectorAll('#rolesTable tbody tr');
    let totalAnnualSavings = 0;

    rows.forEach(row => {
        const role = row.getAttribute('data-role');
        const quantity = parseInt(row.querySelector('.roleQuantity').value);
        
        const professional = professionals.find(prof => prof.role === role);
        const inHouseAnnualCost = professional.inhouse * quantity;
        const nearshoreAnnualCost = professional.nearshore * quantity;
        const annualSavings = inHouseAnnualCost - nearshoreAnnualCost;
        
        totalAnnualSavings += annualSavings;
    });

    document.getElementById('savingsResult').innerHTML = `<strong>Annual Savings: $${totalAnnualSavings.toLocaleString()}</strong>`;
}
