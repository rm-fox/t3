import { useState } from "react";

const AiApiComponent = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
    setError(""); // Clear any previous errors
  };

  const handleSubmit = async () => {
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("http://t3-age-publi-uembkg5pse1q-2090016753.us-east-1.elb.amazonaws.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          question,
          thread_id: 0,
        }),
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      const content = data.result[0]?.assistant?.messages?.content || "No response received";
      setResponse(content);
    } catch (error) {
      console.error("API Error:", error);
      setError(error instanceof Error ? error.message : "An error occurred while fetching the response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">AI Assistant</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={handleInputChange}
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          {loading ? "Loading..." : "Submit"}
        </button>

        {error && (
          <div className="p-3 rounded bg-red-100 border border-red-400 text-red-700">
            {error}
          </div>
        )}

        {(response || loading) && (
          <div className="mt-4 border p-4 rounded bg-gray-50">
            <strong>Response:</strong>
            <p className="mt-2 whitespace-pre-wrap">
              {loading ? "Loading..." : response}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiApiComponent;