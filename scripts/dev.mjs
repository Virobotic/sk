import { spawn } from "node:child_process";
import process from "node:process";

let shuttingDown = false;
let server;
let vite;

function startServer() {
  server = spawn(process.execPath, ["server/index.js"], { stdio: "inherit" });
  server.on("error", (error) => console.error("Unable to start the API server:", error));
  server.on("exit", (code, signal) => {
    if (shuttingDown) return;
    console.warn(`API server stopped unexpectedly (${signal || `code ${code}`}); restarting...`);
    setTimeout(startServer, 500);
  });
}

function stop(child) {
  if (child && !child.killed) child.kill();
}

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  stop(server);
  stop(vite);
  process.exitCode = exitCode;
}

process.on("SIGINT", () => shutdown());
process.on("SIGTERM", () => shutdown());

startServer();
vite = spawn(process.execPath, ["node_modules/vite/bin/vite.js"], { stdio: "inherit" });
vite.on("error", (error) => {
  console.error("Unable to start Vite:", error);
  shutdown(1);
});
vite.on("exit", (code, signal) => {
  if (shuttingDown) return;
  console.error(`Vite stopped (${signal || `code ${code}`}).`);
  shutdown(code ?? 1);
});
