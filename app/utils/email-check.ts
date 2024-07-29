import dns from 'dns';
import net from 'net';

// Функция для проверки существования почтового домена
export async function checkDomainExists(domain: string): Promise<boolean> {
    return new Promise((resolve) => {
        dns.resolveMx(domain, (error, addresses) => {
            if (error) {
                console.error('Error checking domain existence:', error);
                resolve(false);
            } else {
                // Если почтовые серверы найдены для домена, то считаем, что домен существует
                resolve(addresses && addresses.length > 0);
            }
        });
    });
}

// Функция для проверки существования конкретного почтового ящика
export async function verifyEmailAddress(email: string): Promise<boolean> {
    const domain = email.split('@')[1];
    const mxRecords = await new Promise((resolve, reject) => {
        dns.resolveMx(domain, (error, addresses) => {
            if (error) {
                reject(error);
            } else {
                resolve(addresses);
            }
        });
    });

    if (!mxRecords || (mxRecords as any[]).length === 0) {
        return false;
    }

    const mxRecord = (mxRecords as any[]).sort((a, b) => a.priority - b.priority)[0];
    const address = mxRecord.exchange;

    return new Promise((resolve) => {
        const client = net.createConnection(25, address);

        client.on('connect', () => {
            client.write('HELO test.com\r\n');
            client.write(`MAIL FROM: <test@test.com>\r\n`);
            client.write(`RCPT TO: <${email}>\r\n`);
        });

        client.on('data', (data) => {
            if (data.toString().includes('250')) {
                resolve(true);
            } else if (data.toString().includes('550')) {
                resolve(false);
            }
            client.end();
        });

        client.on('error', () => {
            resolve(false);
        });

        client.on('end', () => {
            resolve(false);
        });
    });
}
