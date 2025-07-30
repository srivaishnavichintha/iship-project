import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import "./Frontcompiler.css";

export default function Compiler() {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const [languageId, setLanguageId] = useState("71");
  const [output, setOutput] = useState("");

  const languageMap = {
    "71": "python",
    "50": "c",
    "54": "cpp",
    "62": "java",
    "63": "javascript",
  };

  useEffect(() => {
    if (editorRef.current && !monacoRef.current) {
      monacoRef.current = monaco.editor.create(editorRef.current, {
        value: 'print("Hello World!")',
        language: languageMap[languageId],
        theme: "vs-dark",
        fontFamily: "Fira Code",
        fontSize: 14,
        fontLigatures: true,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        lineNumbers: "on",
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 3,
      });

      // 🟢 Align to top on load
      setTimeout(() => {
        monacoRef.current.revealLineInCenter(1);
        monacoRef.current.setScrollTop(0);
      }, 100);
    }
    self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    return `/monaco-editor-workers/${label}.worker.js`;
  }
};

    // Cleanup
    return () => {
      monacoRef.current?.dispose();
      monacoRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (monacoRef.current) {
      const model = monacoRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, languageMap[languageId]);
      }

      // Reset scroll to top on language change
      setTimeout(() => {
        monacoRef.current?.setScrollTop(0);
      }, 100);
    }
  }, [languageId]);

  const runCode = async () => {
    const code = monacoRef.current.getValue();
    setOutput("⏳ Executing...");

    try {
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "8cc4b00922msh23ed947ec83e1c5p17e8b5jsnfc26e4851a9f",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code: code,
            language_id: parseInt(languageId),
            stdin: "",
          }),
        }
      );

      const result = await response.json();
      setOutput(result.stdout || result.stderr || result.compile_output || "No output");
    } catch (error) {
      setOutput("❌ Error: " + error.message);
    }
  };

  return (
    <div className="compiler-container">
      <div className="compiler-toolbar">
        <select value={languageId} onChange={(e) => setLanguageId(e.target.value)}>
          <option value="71">Python</option>
          <option value="63">JavaScript</option>
          <option value="54">C++</option>
          <option value="50">C</option>
          <option value="62">Java</option>
        </select>
        <button onClick={runCode}>Run Code</button>
      </div>
      <div className="editor-container">
        <div className="editor" ref={editorRef}></div>
      </div>
      <div className="output-section">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}
