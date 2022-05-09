const tokenCreator = () => {
  const rand = () => {
    return Math.random().toString(36).substr(2);
  };

  const token = () => {
    return rand();
  };

  return token();
};

module.exports = tokenCreator;
