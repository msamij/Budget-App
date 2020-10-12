export const DOMElements = {
  addBtn: document.querySelector(`.add__btn`),
  expense: document.querySelector(`.expense`),
  income: document.querySelector(`.income`),
  budgetDescription: document.querySelector(`.budget-description`),

  inputValue: <HTMLInputElement>document.querySelector(`.input__value`),
  inputSelect: <HTMLInputElement>document.querySelector(`.input__select`),

  inputDescription: <HTMLInputElement>(
    document.querySelector(`.input__description`)
  ),
  totalBudget: <HTMLSpanElement>(
    document.querySelector(`.budget__monthly-value`)
  ),
  totalIncome: <HTMLParagraphElement>(
    document.querySelector(`.budget__total-value--income`)
  ),
  totalExpense: <HTMLParagraphElement>(
    document.querySelector(`.budget__total-value--expense`)
  ),
  totalPercentage: <HTMLParagraphElement>(
    document.querySelector(`.budget__total-percentage`)
  ),
};

export const renderIncome = (
  description: string,
  value: number,
  id: string
): void => {
  const income: string = `
     <div class="budget-description__list clear-fix" id=${id}>
        <p class="budget-description__type">${description}</p>
        <button class="btn-delete btn-delete--inc">
        <ion-icon name="close-circle-outline" class="btn-delete__icon btn-delete__icon--inc"></ion-icon>
        </button>
         <p class="budget-description__value">${value}</p>
     </div>`;
  DOMElements.income.insertAdjacentHTML(`beforeend`, income);
};

export const renderExpense = (
  description: string,
  value: number,
  percentage: number,
  id: string
): void => {
  const expense: string = `
    <div class="budget-description__list clear-fix" id=${id}>
        <p class="budget-description__type">${description}</p>
        <button class="btn-delete btn-delete--exp">
        <ion-icon name="close-circle-outline" class="btn-delete__icon btn-delete__icon--exp"></ion-icon>
        </button>
        <p class="budget-description__value">${value}</p>
        <p class="budget__description-percentage">${percentage}%</p>
    </div>`;
  DOMElements.expense.insertAdjacentHTML(`beforeend`, expense);
};

export const renderBudget = (budget: number): void => {
  DOMElements.totalBudget.textContent = `${budget.toString()}`;
};

export const renderGlobalIncome = (income: number): void => {
  DOMElements.totalIncome.textContent = `${income.toString()}`;
};

export const renderGlobalExpense = (expense: number): void => {
  DOMElements.totalExpense.textContent = `${expense.toString()}`;
};

export const renderGlobalExpensePercent = (percent: number): void => {
  // DOMElements.totalPercentage.textContent = `${percent.toString()}%`;
  DOMElements.totalPercentage.textContent = `${
    percent > 0 ? percent.toString() + `%` : `---`
  }`;
};

export const updateExpensePercent = (percents: number[]): void => {
  const expensePercent = document.querySelectorAll(
    `.budget__description-percentage`
  );
  //*- Loop over every expense percentage and update it.
  Array.from(expensePercent).forEach((percent, index) => {
    percent.textContent = `${
      percents[index] > 0 ? percents[index].toString() + `%` : `---`
    }`;
  });
};

export const deleteElement = (id: string): void => {
  const el = document.getElementById(id);
  el.parentElement.removeChild(el);
};
