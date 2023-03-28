module.exports.getUsers = (req, res, next) => {
  res.status(200).json({usuario: "encontrado"})
}

module.exports.getUser = (req, res, next) => {
  const criterial = {};
  
  const { nickname } = req.params;

  if (nickname) {
    criterial.nickname = nickname;
  }

  res.status(200).json({usuario: criterial})
}