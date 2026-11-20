const test = require("node:test");
const assert = require("node:assert/strict");

const createApp = require("../app");

test("health check reports service readiness", async () => {
    process.env.SECRET = "health-check-test-secret";
    const app = createApp();
    const server = app.listen(0);

    try {
        await new Promise((resolve) => server.once("listening", resolve));
        const address = server.address();
        const response = await fetch(`http://127.0.0.1:${address.port}/healthz`);

        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), { status: "ok" });
    } finally {
        await new Promise((resolve, reject) => {
            server.close((error) => error ? reject(error) : resolve());
        });
    }
});
