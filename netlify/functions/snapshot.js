const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  try {
    const store = getStore("pgs-snapshots", {
      siteID: process.env.SITE_ID,
      token: process.env.NETLIFY_BLOBS_TOKEN,
    });

    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: "",
      };
    }

    if (event.httpMethod === "GET") {
      const data = await store.get("latest", { type: "json" });

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data || null),
      };
    }

    if (event.httpMethod === "POST") {
      let body;

      try {
        body = JSON.parse(event.body || "{}");
      } catch {
        return {
          statusCode: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            error: "Invalid JSON body",
          }),
        };
      }

      await store.setJSON("latest", body);

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ok: true }),
      };
    }

    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Method not allowed",
      }),
    };

  } catch (error) {
    console.error("SNAPSHOT ERROR:", error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
