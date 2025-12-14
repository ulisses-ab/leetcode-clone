const url = "http://localhost:3030/auth/register";

async function main() {
  const payload = {
    handle: "Test User",
    email: "test@example.com",
    password: "123456"
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log("Response:", data);
}

main().catch(console.error);
