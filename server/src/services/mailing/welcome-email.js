import transporter from '#config/mailer.js';

export function sendWelcomeEmail (user, token) {
    if( !user || !token ) {
        throw new Error('Missing user or token');
    }

    const messageToUser = {
        from: process.env.EMAIL_SENDER,
        to: user.email,
        subject: 'Welcome to the API',
        html: `<h1>Voici votre code de validation : ${token}</h1>`
    }

    return transporter.sendMail(messageToUser);

}