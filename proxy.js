const http = require('http');
const https = require('https');

const PORT = 3000;

const requestHandler = (clientReq, clientRes) => {
    const options = {
        hostname: 'cdn.shopify.com',
        port: 443,
        path: '/s/files/1/0564/3685/0790/files/multiProduct.json',
        method: clientReq.method,
        headers: clientReq.headers,
    };

    const proxyReq = https.request(options, (proxyRes) => {
        clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(clientRes, {
            end: true
        });
    });

    clientReq.pipe(proxyReq, {
        end: true
    });

    proxyReq.on('error', (err) => {
        console.error('Proxy Error:', err);
        clientRes.end();
    });
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
