const Joi = require("joi");
const { STEP_STATUS } = require("./model");

const statusValues = STEP_STATUS;

const stepCreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional().allow(""),
  timeEstimate: Joi.string().optional().allow(""),
  assignee: Joi.string().optional().allow(null, ""),
  notes: Joi.string().optional().allow(""),
  status: Joi.string()
    .valid(...statusValues)
    .optional(),
});

const validateCreateStepInputs = (data) => {
  const schema = Joi.object({
    processId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
    title: Joi.string().required(),
    description: Joi.string().optional().allow(""),
    timeEstimate: Joi.string().optional().allow(""),
    assignee: Joi.string().optional().allow(null, ""),
    notes: Joi.string().optional().allow(""),
    status: Joi.string()
      .valid(...statusValues)
      .optional(),
  });

  const result = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
  return {
    error: result?.error,
    msg: result?.error?.details?.[0]?.message,
    value: result?.value,
  };
};

const validateUpdateStepInputs = (data) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional().allow(""),
    timeEstimate: Joi.string().optional().allow(""),
    assignee: Joi.string().optional().allow(null, ""),
    notes: Joi.string().optional().allow(""),
    status: Joi.string()
      .valid(...statusValues)
      .optional(),
  }).min(1);

  const result = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
  return {
    error: result?.error,
    msg: result?.error?.details?.[0]?.message,
    value: result?.value,
  };
};

const validateStepIdParam = (data) => {
  const schema = Joi.object({
    stepId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
  });

  const result = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
  return {
    error: result?.error,
    msg: result?.error?.details?.[0]?.message,
    value: result?.value,
  };
};

module.exports = {
  stepCreateSchema,
  validateCreateStepInputs,
  validateUpdateStepInputs,
  validateStepIdParam,
};
