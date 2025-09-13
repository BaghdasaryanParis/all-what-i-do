from http.server import SimpleHTTPRequestHandler, HTTPServer

HOST = "localhost"
PORT = 8000

with HTTPServer((HOST, PORT), SimpleHTTPRequestHandler) as server:
    print(f"Сервер запущен: http://{HOST}:{PORT}")
    server.serve_forever()
