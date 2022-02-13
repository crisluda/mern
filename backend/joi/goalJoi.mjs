import Joi from "joi";

const goalJoi = async (text) => {
  //   console.log(text);
  const goalJoi = Joi.object({
    text: Joi.string().required().trim(),
  });
  return goalJoi.validate(text);
};
export { goalJoi };
