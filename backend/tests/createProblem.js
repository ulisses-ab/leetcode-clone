import fs from "fs";

const url = "http://localhost:3030/api/problems";

async function main() {
  const payload = {
    title: "TESTPROBLEM2",
    statement: fs.readFileSync("tests/markdown.md", "utf8"),
    difficulty: "MEDIUM",
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${fs.readFileSync("tests/token.txt", "utf-8")}`
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log("Response:", data);
}

main().catch(console.error);
