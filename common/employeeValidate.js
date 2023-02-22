import joi from "joi";

const employeeValidate = (data) => {
  const emloyeeSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    address: joi.string().required(),
    phone: joi.string().required(),
  });
  return emloyeeSchema.validate(data);
};

export default employeeValidate;
