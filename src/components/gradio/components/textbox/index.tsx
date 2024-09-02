import React, { useEffect, useRef } from "react";

const Textbox = () => {
  const gradioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // You can still do some initialization here if needed
  }, []);

  return (
    <div>
      <h1>Gradio Lite Integration Example</h1>
      <div ref={gradioRef}></div>
      {/* @ts-ignore */}
      <gradio-lite>
      {`
      import gradio as gr

      def greet(name):
        return "Hello, " + name + "!"
      
      gr.Interface(greet, "textbox", "textbox").launch()
      `}
      {/* @ts-ignore */}
      </gradio-lite>
    </div>
  );
};

export default Textbox;
