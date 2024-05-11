import { serve } from "bun"

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

serve({
    fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/") {
            return new Response("Greet from bun server !!", { status: 200 })
        } else if (url.pathname === "/style") {
            return new Response(htmlContent, { status: 201 });
        } else {
            return new Response("<h2>Sorry, Page Not Found !!</h2>", { status: 404 })
        }
    },
    port: 3000,
    hostname: "127.0.0.1"
}).listen(port, hostname, () => {
    console.log(`Server is listening on http://${hostname}:${port}`);
});