import { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("English");
  const [response, setResponse] = useState("");

  async function generateResponse() {
    try {
      const result = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: language,
          prompt: prompt,
        }),
      });

      const data = await result.json();

      console.log(data);
      setResponse(data.response);
    } catch (error) {
      console.error("Generate failed:", error);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>NaijaDev Studio</h1>
          <p>Build and test Nigerian AI with N-ATLAS</p>
        </div>

        <span className="status">● N-ATLAS</span>
      </header>

      <main className="workspace">
        <section className="panel">
          <div className="panel-header">
            <h2>Playground</h2>
            <span>Powered by N-ATLAS</span>
          </div>

          <label htmlFor="language">Language</label>

          <select
            id="language"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            <option>English</option>
            <option>Hausa</option>
            <option>Igbo</option>
            <option>Yoruba</option>
          </select>

          <label htmlFor="prompt">Prompt</label>

          <textarea
            id="prompt"
            placeholder="Ask N-ATLAS something..."
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          />

          <div className="prompt-footer">
            <span>{prompt.length} characters</span>

            <button
              type="button"
              onClick={generateResponse}
              disabled={!prompt.trim()}
            >
              Generate
            </button>
          </div>
        </section>

        <section className="panel response-panel">
          <div className="panel-header">
            <h2>Response</h2>
            <span>
              {response ? "Response received" : "Waiting for prompt"}
            </span>
          </div>

          {response ? (
            <div className="generated-response">
              <p>{response}</p>
            </div>
          ) : (
            <div className="empty-response">
              <div className="ai-icon">AI</div>

              <h3>N-ATLAS output will appear here</h3>

              <p>
                Select a Nigerian language, enter a prompt and generate a
                response.
              </p>
            </div>
          )}
        </section>
      </main>

      <section className="developer-section">
        <div>
          <h2>Integration Code</h2>
          <p>Turn your tested prompt into application code.</p>
        </div>

        <div className="code-tabs">
          <button type="button">JavaScript</button>
          <button type="button">Python</button>
          <button type="button">cURL</button>
        </div>
      </section>

      <footer>
        N-ATLaS is an initiative of the Federal Ministry of Communications,
        Innovation and Digital Economy, and powered by Awarri Technologies.
      </footer>
    </div>
  );
}

export default App;