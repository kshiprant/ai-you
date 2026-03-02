async function send() {
  const msg = input.value;
  input.value = "";

  messages.innerHTML += `<div><b>You:</b> ${msg}</div>`;

  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: msg,
      character: character.value
    })
  });

  const data = await res.json();
  messages.innerHTML += `<div><b>AI:</b> ${data.reply}</div>`;
}
