import fs from "fs";

const url = "http://localhost:3030/api/problems/081b6655-a486-41fd-b738-54cca06e1a56";

async function main() {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${fs.readFileSync("tests/token.txt", "utf-8")}`
    },
  });

  const data = await res.json();
  console.log("Response:", data);
}

main().catch(console.error);
