import users from "../data/users.json";

export const login = (email, senha) => {
  const usuario = users.find(
    (u) => u.email === email && u.senha === senha
  );

  if (usuario) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    return true;
  }

  return false;
};

export const logout = () => {
  localStorage.removeItem("usuario");
};

export const usuarioLogado = () => {
  return JSON.parse(localStorage.getItem("usuario"));
};