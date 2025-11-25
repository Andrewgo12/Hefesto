<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperación de Contraseña - HEFESTO</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 36px;
            font-weight: bold;
            color: #2563eb;
        }
        h1 {
            color: #333;
            font-size: 24px;
        }
        p {
            color: #666;
            line-height: 1.6;
        }
        .token-box {
            background-color: #f9fafb;
            border: 2px dashed #2563eb;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .token {
            font-family: monospace;
            font-size: 18px;
            color: #2563eb;
            font-weight: bold;
            word-break: break-all;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #2563eb;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #9ca3af;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">HEFESTO</div>
            <h1>Recuperación de Contraseña</h1>
        </div>
        
        <p>Hola,</p>
        
        <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta asociada al correo <strong>{{ $email }}</strong>.</p>
        
        <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
        
        <div style="text-align: center;">
            <a href="http://localhost:8080/reset-password/{{ $token }}?email={{ urlencode($email) }}" class="button">
                Restablecer Contraseña
            </a>
        </div>
        
        <p style="font-size: 14px; color: #6b7280;">O copia y pega este enlace en tu navegador:</p>
        <p style="font-size: 12px; color: #2563eb; word-break: break-all;">
            http://localhost:8080/reset-password/{{ $token }}?email={{ urlencode($email) }}
        </p>
        
        <div class="token-box">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Token de recuperación:</p>
            <div class="token">{{ $token }}</div>
        </div>
        
        <p><strong>Nota importante:</strong></p>
        <ul>
            <li>Este enlace expirará en 60 minutos.</li>
            <li>Si no solicitaste este cambio, puedes ignorar este correo.</li>
            <li>No compartas este enlace con nadie.</li>
        </ul>
        
        <div class="footer">
            <p>Este es un correo automático de HEFESTO - Sistema de Gestión.</p>
            <p>Por favor, no respondas a este mensaje.</p>
        </div>
    </div>
</body>
</html>
