exports.calculateTax = (salary) => {
  const taxRate = 0.2; // 20% tax rate (you can adjust this as needed)
  const taxAmount = salary * taxRate;
  return taxAmount;
}


exports.calculateInsurance = (salary) =>  {
  const insuranceRate = 0.1; // 10% insurance rate (you can adjust this as needed)
  const insuranceAmount = salary * insuranceRate;
  return insuranceAmount;
}


exports.calculateBonuses = (bonuses) => {
  // Sample bonus calculation logic (replace with your actual bonus calculation rules)
  let totalBonus = 0;
  for (const bonus of bonuses) {
    // Assuming each bonus has a 'amount' property
    if (bonus.amount) {
      totalBonus += bonus.amount;
    }
  }
  return totalBonus;
}
