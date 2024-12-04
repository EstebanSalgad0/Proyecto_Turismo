import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import "../styles/InicioSesion.css";

const InicioSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores
  const navigate = useNavigate();
  const captchaKEY = "6LcH3o4qAAAAAKlHasSy5RQD2oxcvtAkHXR29WrP";

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Alterna entre mostrar y ocultar
  };

  useEffect(() => {
    // Cargar el script de reCAPTCHA
    const loadRecaptcha = () => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${captchaKEY}`;
      script.async = true;
      script.onload = () => {
        console.log("reCAPTCHA script loaded");
      };
      document.body.appendChild(script);
    };

    loadRecaptcha();
  }, [captchaKEY]);

  // Función para validar el formato del correo electrónico
  const validateEmail = (email) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  // Función para validar la contraseña
  const validatePassword = (password) =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/.test(password);

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar formato de email y contraseña antes de enviar
    if (!validateEmail(email)) {
      setErrorMessage("Por favor ingrese un correo electrónico válido.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        "La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una mayúscula, un número y un símbolo."
      );
      return;
    }

    // Obtener el token de reCAPTCHA V3
    try {
      const captchaToken = await window.grecaptcha.execute(captchaKEY, {
        action: "login",
      }); // Acción asociada con 'login'

      const response = await axios.post('https://8600a7b2b57e7a9a11c9a6510b6a0f48.loophole.site/api/login/', {
        email: email,
        password: password,
        captcha: captchaToken, // Enviar el token del captcha al backend
      });

      const { token, role, is_first_login } = response.data; // Asegurarse de que el backend devuelva el token y rol correctamente
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role); // Guardar el rol en el localStorage
      localStorage.setItem("is_first_login", is_first_login); // Guardar el rol en el localStorage

      console.log("is_first_login:", is_first_login); // Verifica el valor antes de la redirección

      // Comprobar si es la primera vez que el usuario inicia sesión
      if (is_first_login) {
        navigate("/bienvenida"); // Navega a la página de bienvenida
      } else {
        navigate("/"); // Navega directamente al index
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setErrorMessage(
        "Credenciales incorrectas o error en la verificación del captcha. Inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="inicio-sesion-container">
      <div className="wrapper-is">
        <form onSubmit={handleSubmit}>
          <div className="Logo"></div>

          <h1>Te damos la Bienvenida a Visita Colbún</h1>

          {/* Alerta flotante para mostrar errores */}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <div className="input-box-is">
            <label>Correo electrónico</label>
            <div className="input-box-email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="visitacolbun@turismo.cl"
                required
              />
              <i className="bx bx-user"></i>
            </div>
          </div>

          <div className="input-box-is-ps">
            <div
              className="input-box-password"
              style={{ position: "relative" }}
            >
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Cambia entre texto y contraseña
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                style={{ paddingRight: "40px" }} // Espacio para el ícono
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                
              >
                <i
                  className={`bx ${
                    showPassword ? "bx-lock-open-alt" : "bx-lock-alt"
                  }`}
                ></i>
              </button>
            </div>
          </div>

          <button type="submit" className="btn-is">
            Iniciar sesión
          </button>

          <div className="remember-forgot">
            <Link to="/OlvideContrasena">¿Olvidaste tu contraseña?</Link>
          </div>

          <div className="register-link">
            <p>
              ¿Aún no estás en Turismo y Cultura?{" "}
              <Link to="/registrarse">Regístrate</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;