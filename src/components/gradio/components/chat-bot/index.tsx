const ChatBot = () => {
  // useEffect(() => {
  //   const cssLink = document.createElement("link");
  //   cssLink.rel = "stylesheet";
  //   cssLink.href = "lite.css"; // 从 public 文件夹加载 CSS
  //   document.head.appendChild(cssLink);

  //   const script = document.createElement("script");
  //   script.src = "lite.js"; // 从 public 文件夹加载 JS
  //   script.type = "module";
  //   script.crossOrigin = "anonymous";
  //   document.body.appendChild(script);

  //   return () => {
  //     document.head.removeChild(cssLink);
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <div>
      <h1>ChatBot</h1>
      {/* @ts-ignore */}
      <gradio-lite>
        {`
        import random
        import gradio as gr

        def random_response(message, history): 
            return random.choice(["Yes", "No"])

        demo = gr.ChatInterface(random_response)

        if __name__ == "__main__":
            demo.launch()
          `}
        {/* @ts-ignore */}
      </gradio-lite>
    </div>
  );
};

export default ChatBot;
