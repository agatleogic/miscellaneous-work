const defaultOperators = [
  { name: "=", label: "=" },
  { name: "!=", label: "!=" },
  { name: "<", label: "<" },
  { name: ">", label: ">" },
  { name: "<=", label: "<=" },
  { name: ">=", label: ">=" },
  { name: "contains", label: "contains" },
  { name: "beginsWith", label: "begins with" },
  { name: "endsWith", label: "ends with" },
  { name: "doesNotContain", label: "does not contain" },
  { name: "doesNotBeginWith", label: "does not begin with" },
  { name: "doesNotEndWith", label: "does not end with" },
  { name: "null", label: "is null" },
  { name: "notNull", label: "is not null" },
  { name: "in", label: "in" },
  { name: "notIn", label: "not in" },
  { name: "between", label: "between" },
  { name: "notBetween", label: "not between" }
];

const fieldOperatorsByType = {
  boolean: {
    operators: [
      { name: "=", label: "=" },
      { name: "!=", label: "!=" }
    ]
  },
  integer: {
    operators: [
      { name: "=", label: "=" },
      { name: "!=", label: "!=" },
      { name: "<", label: "<" },
      { name: ">", label: ">" },
      { name: "<=", label: "<=" },
      { name: ">=", label: ">=" }
    ]
  },
  date: {
    operators: [
      { name: "=", label: "=" },
      { name: "!=", label: "!=" },
      { name: "<", label: "<" },
      { name: ">", label: ">" },
      { name: "<=", label: "<=" },
      { name: ">=", label: ">=" }
    ]
  },
  datetime: {
    operators: [
      { name: "=", label: "=" },
      { name: "!=", label: "!=" },
      { name: "<", label: "<" },
      { name: ">", label: ">" },
      { name: "<=", label: "<=" },
      { name: ">=", label: ">=" }
    ]
  }
};

export { defaultOperators, fieldOperatorsByType };
