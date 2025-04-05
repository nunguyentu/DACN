export const customers = JSON.parse(localStorage.getItem("customers")) || [];

export const addCustomer = (newCustomer) => {
  customers.push(newCustomer);
  localStorage.setItem("customers", JSON.stringify(customers));
};
