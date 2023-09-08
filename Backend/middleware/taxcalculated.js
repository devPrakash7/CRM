

exports.calculateIncomeTax = (income)  => {

    if (typeof income !== 'number') {
      throw new Error('Income must be a number');
    }
  
    let tax = 0;
  
    if (income <= 300000) {
      // No tax for income up to Rs. 3,00,000
      tax = 0;
    } else if (income <= 600000) {
      // 5% tax for income from Rs. 3,00,001 to Rs. 6,00,000
      tax = (income - 300000) * 0.05;
    } else if (income <= 900000) {
      // 10% tax for income from Rs. 6,00,001 to Rs. 9,00,000
      tax = (600000 - 300000) * 0.05 + (income - 600000) * 0.1;
    } else if (income <= 1200000) {
      // 15% tax for income from Rs. 9,00,001 to Rs. 12,00,000
      tax = (600000 - 300000) * 0.05 + (900000 - 600000) * 0.1 + (income - 900000) * 0.15;
    } else if (income <= 1500000) {
      // 20% tax for income from Rs. 12,00,001 to Rs. 15,00,000
      tax = (600000 - 300000) * 0.05 + (900000 - 600000) * 0.1 + (1200000 - 900000) * 0.15 + (income - 1200000) * 0.2;
    } else {
      // 30% tax for income above Rs. 15,00,000
      tax = (600000 - 300000) * 0.05 + (900000 - 600000) * 0.1 + (1200000 - 900000) * 0.15 + (1500000 - 1200000) * 0.2 + (income - 1500000) * 0.3;
    }
  
    return tax;
  }
  