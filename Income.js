class Income extends Data {
  static counterIncomes = 0;
  constructor(description, value) {
    super(description, value);
    this._id = ++Income.counterIncomes;
  }
  get id() {
    return this._id;
  }
}