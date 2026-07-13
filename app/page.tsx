"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Home() {
  const [tasks, setTasks] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyze() {
    if (!tasks.trim()) {
      alert("Please enter at least one task.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tasks }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.response || "Something went wrong");
      }

      setResult(data.response);
    } catch (err: any) {
      setResult(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function downloadPDF() {
    const report = document.getElementById("report");

    if (!report) {
      alert("Generate the AI report first.");
      return;
    }

    const canvas = await html2canvas(report);

    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 190;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(img, "PNG", 10, 10, pdfWidth, pdfHeight);

    pdf.save("AI-Focus-Planner-Report.pdf");
  }

  return (
    <main className="min-h-screen bg-gray-100">

      {/* HERO */}

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-14">

          <h1 className="text-5xl font-bold">
            🚀 AI Focus Planner
          </h1>

          <p className="mt-4 text-xl text-blue-100 max-w-3xl">
            AI-powered productivity assistant using Amazon Bedrock Nova Lite.
            Prioritize tasks, build a smart schedule and improve daily
            productivity.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">

            <span className="bg-white/20 px-4 py-2 rounded-full">
              🤖 Amazon Bedrock
            </span>

            <span className="bg-white/20 px-4 py-2 rounded-full">
              ⚡ Nova Lite
            </span>

            <span className="bg-white/20 px-4 py-2 rounded-full">
              ▲ Next.js
            </span>

            <span className="bg-white/20 px-4 py-2 rounded-full">
              ☁ AWS Amplify
            </span>

            <span className="bg-white/20 px-4 py-2 rounded-full">
              📄 PDF Export
            </span>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT */}

          <div className="bg-white rounded-2xl shadow-xl p-8">

            <h2 className="text-3xl font-bold">
              📝 Today's Tasks
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              Enter one task per line.
            </p>

            <textarea
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              placeholder={`Prepare AWS Workshop

Reply Client Emails

Create LinkedIn Article

Study Amazon Bedrock

Deploy to AWS Amplify`}
              className="w-full h-80 border rounded-xl p-5 text-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />

            <button
              onClick={analyze}
              disabled={loading}
              className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-semibold transition disabled:bg-gray-400"
            >
              {loading
                ? "🤖 Amazon Nova is analyzing..."
                : "🚀 Analyze with AI"}
            </button>

            <button
              onClick={downloadPDF}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition"
            >
              📄 Export AI Report as PDF
            </button>

            <div className="mt-8">

              <h3 className="text-xl font-semibold mb-4">
                ✨ Features
              </h3>

              <div className="grid grid-cols-2 gap-3 text-sm">

                <div className="bg-blue-50 rounded-lg p-3">
                  🔥 AI Prioritization
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  📅 Smart Schedule
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  💡 Productivity Tips
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  ⭐ Productivity Score
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  ☁ Amazon Bedrock
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  📄 PDF Export
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="bg-white rounded-2xl shadow-xl p-8">

            <div className="flex justify-between items-center">

              <h2 className="text-3xl font-bold">
                📊 AI Productivity Report
              </h2>

              {result && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  AI Generated
                </span>
              )}

            </div>

            {!result ? (

              <div className="flex flex-col items-center justify-center h-[520px] text-center">

                <div className="text-8xl">
                  🤖
                </div>

                <h3 className="text-2xl font-semibold mt-5">
                  Ready to Analyze
                </h3>

                <p className="text-gray-500 mt-3 max-w-sm">
                  Enter your daily tasks and let Amazon Nova Lite
                  prioritize your work automatically.
                </p>

              </div>

            ) : (

              <div
                id="report"
                className="mt-6 bg-gray-50 rounded-xl p-6 border prose max-w-none"
              >

                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {result}
                </ReactMarkdown>

              </div>

            )}

          </div>

        </div>

      </section>

      {/* ARCHITECTURE */}

      <section className="max-w-7xl mx-auto px-6 pb-10">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            ☁ AWS Architecture
          </h2>

          <div className="grid md:grid-cols-5 gap-4 text-center">

            <div className="bg-blue-50 rounded-xl p-5">
              🌐
              <br />
              Browser
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              ▲
              <br />
              Next.js
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              ⚙
              <br />
              API Route
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              🤖
              <br />
              Amazon Bedrock
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              ⚡
              <br />
              Nova Lite
            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-gray-900 text-center py-8 text-gray-300">

        <h3 className="text-2xl font-bold text-white">
          AI Focus Planner
        </h3>

        <p className="mt-3">
          Powered by Amazon Bedrock Nova Lite
        </p>

        <p className="mt-2 text-gray-500">
          Built for the AWS Weekend Productivity Challenge 2026
        </p>

      </footer>

    </main>
  );
}
