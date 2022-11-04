const yup = require("yup")

exports.userSchema = yup.object({
  password: yup.string().min(8, "password 8 caractere minimum").max(32).required(),
  email: yup.string().email("Le champs email est requis").required(),
});