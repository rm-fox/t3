
import { useState } from "react";

const AiApiComponent: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // try {
    const res = await fetch("http://t3-age-publi-uembkg5pse1q-2090016753.us-east-1.elb.amazonaws.com/generate", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    },
    body: JSON.stringify({
        question,
        thread_id: 0,
    }),
    });

    if (!res.ok) {
    throw new Error("API call failed");
    }

    const data = await res.json();
    const content = data.result[0]?.assistant?.messages?.content || "No response received";
    setResponse(content);
    // } catch (error) {
    //   console.error(error);
    //   setResponse("An error occurred while fetching the response.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">AI Assistant</h1>
      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={handleInputChange}
        className="border p-2 w-full rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? "opacity-50" : "hover:bg-blue-600"}`}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
      <div className="mt-4 border p-4 rounded bg-gray-100">
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default AiApiComponent;

