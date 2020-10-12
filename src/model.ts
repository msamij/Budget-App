import uniqid from "uniqid";

const data = {
  inc: [],
  exp: [],
  budget: 0,
  percentage: 0,
  totalInc: 0,
  totalExp: 0,
};

interface income {
  id: string;
  description: string;
  value: number;
}

interface expense {
  id: string;
  description: string;
  value: number;
  percentage: number;
}

export const services = {
  addIncome(income: income): void {
    data.inc.push(income);
  },

  addExpense(expense: expense): void {
    data.exp.push(expense);
  },

  updateGlobalIncome(income: number, type: string): number {
    // *- If we add income increase income count,
    // *- if we delete income decrease income count.
    type === `+` ? (data.totalInc += income) : (data.totalInc -= income);
    return data.totalInc;
  },

  updateGlobalExpense(expense: number, type: string): number {
    // *- If we add expense increase expense count,
    // *- if we delete expense decrease expense count.
    type === `+` ? (data.totalExp += expense) : (data.totalExp -= expense);
    return data.totalExp;
  },

  addGlobalExpensePercent(): number {
    if (data.totalInc === 0) data.percentage = 0;
    else {
      data.percentage = Math.round((data.totalExp / data.totalInc) * 100);
    }
    return data.percentage;
  },

  updateExpensePercent(): number[] {
    const percentages: number[] = [];

    if (data.totalInc === 0) {
      data.exp.forEach((exp) => {
        exp.percentage = 0;
      });
      data.exp.forEach((exp) => {
        percentages.push(exp.percentage);
      });
    } else {
      data.exp.forEach((exp) => {
        exp.percentage = Math.round((exp.value / data.totalInc) * 100);
      });
      data.exp.forEach((exp) => {
        percentages.push(exp.percentage);
      });
    }
    return percentages;
  },

  addBudget(budget: number, type: string): number {
    type === `+` ? (data.budget += budget) : (data.budget -= budget);
    return data.budget;
  },

  deleteIncome(id: string): void {
    data.inc.splice(
      data.inc.findIndex((inc) => inc.id === id),
      1
    );
  },

  deleteExpense(id: string): void {
    data.exp.splice(
      data.exp.findIndex((exp) => exp.id === id),
      1
    );
  },

  getValue(id: string, type: string): number {
    let value: number;
    if (type === `+`) {
      data.inc.forEach((inc) => {
        if (inc.id === id) value = inc.value;
      });
    } else {
      data.exp.forEach((exp) => {
        if (exp.id === id) value = exp.value;
      });
    }
    return value;
  },
};

export class Income {
  id: string = uniqid();
  description: string;
  value: number;

  constructor(description: string, value: number) {
    this.description = description;
    this.value = value;
  }
}

export class Expense {
  id: string = uniqid();
  description: string;
  value: number;
  percentage: number;

  constructor(description: string, value: number) {
    this.description = description;
    this.value = value;
    this.percentage = Math.round((this.value / data.totalInc) * 100);
  }
}
