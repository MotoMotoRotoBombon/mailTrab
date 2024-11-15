require("dotenv").config(); // Cargar variables de entorno desde el archivo .env
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

// Configurar Nodemailer con las credenciales SMTP de Mailtrap
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io", // Host correcto de Mailtrap para SMTP
  port: 2525,               // Puerto de Mailtrap
  auth: {
    user: process.env.MAILTRAP_USER, // Usuario SMTP de Mailtrap desde .env
    pass: process.env.MAILTRAP_PASS  // Contraseña SMTP de Mailtrap desde .env
  }
});

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Prueba de Envío de Correos");
});


// Endpoint para enviar correos
app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  // Validación de datos
  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  // Configuración del correo
  const mailOptions = {
    from: '"API de Pruebas" <noreply@example.com>', // Remitente
    to,           // Destinatario
    subject,      // Asunto
    text,         // Contenido en texto plano
    html          // Contenido en HTML
  };

  try {
    // Enviar el correo
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ success: false, error: "Error al enviar el correo" });
  }
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
