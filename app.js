require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express(); // Definir app antes de usarlo
app.use(express.json());

// Configura Nodemailer con las credenciales de Mailtrap en modo de producción
const transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api", // Usuario de Mailtrap
    pass: "81a1f79d3ef47473cce2ba105debfddd" // Contraseña de Mailtrap
  }
});

// Endpoint para enviar correos
app.post("/send-email", async (req, res) => {
  const { to, subject } = req.body;

  // HTML del correo
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Correo de Prueba</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f7;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 8px;
        overflow: hidden;
      }
      .header {
        background-color: #007bff;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
      }
      .content p {
        font-size: 16px;
        line-height: 1.6;
        margin: 10px 0;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 4px;
      }
      .footer {
        background-color: #f4f4f7;
        color: #999999;
        text-align: center;
        padding: 20px;
        font-size: 14px;
      }
      .footer p {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>¡Hola desde Mailtrap!</h1>
      </div>
      <div class="content">
        <p>Hola,</p>
        <p>Este es un correo de prueba enviado desde nuestra API utilizando Mailtrap y Nodemailer. El propósito de este correo es verificar que la API de envío de correos está funcionando correctamente.</p>
        <p>Para más información, puedes hacer clic en el siguiente botón:</p>
        <a href="https://example.com" class="button">Ver más detalles</a>
        <p>Gracias por probar nuestro sistema.</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Mi Proyecto. Todos los derechos reservados.</p>
        <p><a href="https://example.com">Desuscribirse</a></p>
      </div>
    </div>
  </body>
  </html>
  `;

  // Configuración del correo
  const mailOptions = {
    from: '"Mailtrap Test" <hello@demomailtrap.com>', // Remitente
    to,                                               // Destinatario
    subject,                                          // Asunto del correo
    html: htmlContent                                 // Contenido en HTML
  };

  try {
    await transport.sendMail(mailOptions);
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
