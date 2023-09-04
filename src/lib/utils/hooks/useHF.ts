import { useState } from "react";

export const useHF = (bio: string) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async (question: string) => {
    setLoading(true);
    try {

        const res = await fetch("/api/ask", {
          method: "POST",
          body: JSON.stringify({
            question,
            context: bio,
          }),
        })

        const data = await res.json();
        setAnswer(data.answer);
        setLoading(false);
    } catch (e) {
        console.log(e)
        setLoading(false)
        setAnswer("Something went wrong")
    }
  }

  return { answer, loading, askQuestion}
};
