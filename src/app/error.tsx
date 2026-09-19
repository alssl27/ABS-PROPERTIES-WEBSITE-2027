"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container section">
      <h1>Something went wrong.</h1>
      <p>Please try again in a moment.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
