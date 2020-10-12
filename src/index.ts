import { Income, Expense, services } from "./model";
import * as view from "./view";

const setupEventListeners = (): void => {
  view.DOMElements.addBtn.addEventListener(`click`, (): void =>
    validateInput()
  );
  view.DOMElements.inputSelect.addEventListener(`click`, (): void =>
    focusSelected()
  );
  view.DOMElements.budgetDescription.addEventListener(
    `click`,
    (event: Event): void => {
      if ((<HTMLDivElement>event.target).closest(`.btn-delete`))
        deleteController(event);
    }
  );
};

const validateInput = (): void => {
  const description = view.DOMElements.inputDescription.value;
  const value = parseInt(view.DOMElements.inputValue.value);

  if (description !== "" && value !== NaN && value > 0)
    addController(description, value);
};

const addController = (description: string, value: number): void => {
  clearFields();
  const selectedType = view.DOMElements.inputSelect.value;

  if (selectedType === `+`) {
    createIncome(description, value);
    handleGlobalIncome(value);
    //*- Any time we add new income update Percentages of expenses.
    updatePercentages();
  } else {
    createExpense(description, value);
    handleGlobalExpense(value);
  }

  // *- Update global budget.
  updateBudget(value, selectedType);
};

const deleteController = (event: Event): void => {
  const className = (<HTMLDivElement>event.target)
    .closest(`.btn-delete`)
    .className.split(` `)[1];

  const id = (<HTMLDivElement>event.target).closest(`.btn-delete`).parentElement
    .id;

  className === `btn-delete--inc` ? deleteIncome(id) : deleteExpense(id);
};

const updateBudget = (value: number, type: string): void => {
  //*- Update global budget.
  const budget = services.addBudget(value, type);
  //*- Render global budget on the UI.
  view.renderBudget(budget);
};

const updatePercentages = (): void => {
  //*- Update global expense percentage.
  const globalExpPercent = services.addGlobalExpensePercent();

  //*- Update global expense percentage on the UI.
  view.renderGlobalExpensePercent(globalExpPercent);
  //*- Update Percentages for every expense.
  view.updateExpensePercent(services.updateExpensePercent());
};

const createIncome = (description: string, value: number): void => {
  const income = new Income(description, value);
  //*- Add income in dataStructure.
  services.addIncome(income);
  //*- Render Income on UI.
  view.renderIncome(income.description, income.value, income.id);
};

const createExpense = (description: string, value: number): void => {
  const expense = new Expense(description, value);
  //*- Add expense in dataStructure.
  services.addExpense(expense);
  //*- Render expense on UI.
  view.renderExpense(
    expense.description,
    expense.value,
    expense.percentage,
    expense.id
  );
};

const handleGlobalIncome = (value: number): void => {
  //*- Update global income.
  const globalIncome = services.updateGlobalIncome(value, `+`);
  //*- Render global income on the UI.
  view.renderGlobalIncome(globalIncome);
};

const handleGlobalExpense = (value: number): void => {
  //*- Update global expense.
  const globalExpense = services.updateGlobalExpense(value, `+`);
  //*- Update global expense percentage.
  const globalExpPercent = services.addGlobalExpensePercent();
  //*- Render global expense on the UI.
  view.renderGlobalExpense(globalExpense);
  //*- Render global expense percentage on the UI.
  view.renderGlobalExpensePercent(globalExpPercent);
};

const deleteIncome = (id: string): void => {
  // *- Get value to update it when we delete income.
  const value = services.getValue(id, `+`);
  //*- Delete income from dataStructure.
  services.deleteIncome(id);
  //*- Delete income from UI.
  view.deleteElement(id);
  //*- Update global income.
  view.renderGlobalIncome(services.updateGlobalIncome(value, `-`));
  //*- Update global and expense percentage.
  updatePercentages();
  //*- Update global budget.
  updateBudget(value, `-`);
};

const deleteExpense = (id: string): void => {
  // *- Get value to update it when we delete expense.
  const value = services.getValue(id, `-`);
  //*- Delete income from dataStructure.
  services.deleteExpense(id);
  //*- Delete income from UI.
  view.deleteElement(id);
  //*- Update global expense.
  view.renderGlobalExpense(services.updateGlobalExpense(value, `-`));
  //*- Update global and expense percentage.
  updatePercentages();
  //*- Update global budget.
  updateBudget(value, `+`);
};

const clearFields = (): void => {
  view.DOMElements.inputDescription.value = ``;
  view.DOMElements.inputValue.value = ``;
};

const focusSelected = (): void => {
  const selectedType = view.DOMElements.inputSelect.value;

  const focusedElement = [
    view.DOMElements.inputDescription,
    view.DOMElements.inputValue,
    view.DOMElements.inputSelect,
  ];

  if (selectedType === `+`) {
    focusedElement.forEach((element) => {
      element.classList.remove(`select__exp`);
      element.classList.add(`select__inc`);
    });
  } else {
    focusedElement.forEach((element) => {
      element.classList.remove(`select__inc`);
      element.classList.add(`select__exp`);
    });
  }
};

setupEventListeners();
