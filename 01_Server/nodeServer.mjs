import http from "http";
const hostname = "127.0.0.1";
const port = 3000;

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Styled Page</title>
    <style>
        body {
            background-color: green;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <h1>Greet from node server !!</h1>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end("Greet from Node Server !!");
    } else if (req.url === "/style") {
        res.statusCode = 201;
        res.setHeader("Content-Type", "text/html");
        res.end(htmlContent);
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<h2>Sorry, Page Not Found</h2>");
    }
});

server.listen(port, hostname, () => {
    console.log(`Node server is listening on http://${hostname}:${port}`);
});
