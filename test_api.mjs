async function test() {
  const url = "http://localhost:3000/api/uploadthing?actionType=upload&slug=serverImage";
  const origin = "http://localhost:8081";

  console.log("Testing OPTIONS request...");
  const optionsRes = await fetch(url, {
    method: "OPTIONS",
    headers: {
      "Origin": origin,
      "Access-Control-Request-Method": "POST",
      "Access-Control-Request-Headers": "x-uploadthing-package, traceparent"
    }
  });

  console.log("OPTIONS Status:", optionsRes.status);
  console.log("Allow-Headers:", optionsRes.headers.get("access-control-allow-headers"));
  console.log("Allow-Origin:", optionsRes.headers.get("access-control-allow-origin"));

  console.log("\nTesting POST request (simulated)...");
  const postRes = await fetch(url, {
    method: "POST",
    headers: {
      "Origin": origin,
      "Content-Type": "application/json",
      "x-uploadthing-package": "@uploadthing/expo"
    },
    body: JSON.stringify({
      files: [{ name: "test.png", size: 1000, type: "image/png" }]
    })
  });

  console.log("POST Status:", postRes.status);
  console.log("POST Response Headers:", Object.fromEntries(postRes.headers.entries()));
  
  try {
    const data = await postRes.json();
    console.log("POST Response Body (partial):", JSON.stringify(data).substring(0, 100) + "...");
  } catch (e) {
    console.log("Could not parse JSON:", e.message);
  }
}

test().catch(console.error);
