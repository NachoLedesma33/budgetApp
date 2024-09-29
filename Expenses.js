class Expense extends Data {
  static counterExpenses = 0;
  constructor(description, value) {
    super(description, value);
    this._id = ++Expense.counterExpenses;
  }
  get id() {
    return this._id;
  }
}
