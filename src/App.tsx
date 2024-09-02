import React from "react";
import ChatComponent from "./components/chat";
import AutoForm, { JsonSchema } from "./components/auto-form";
import {StockForecast,ChatBot,Textbox} from "./components/gradio";
import { IconArrowDown } from "@arco-design/web-react/icon";

const formSchema: JsonSchema[] = [
  {
    id: "uuid-1",
    type: "Select",
    label: "选择一个选项",
    defaultValue: "option1",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    trigger: [
      {
        event: "change",
        actions: [
          {
            target: "uuid-2",
            actionType: "setValue",
            value: "Updated by uuid-1",
          },
          {
            target: "uuid-3",
            actionType: "show",
          },
        ],
      },
    ],
  },
  {
    id: "uuid-2",
    type: "Input",
    label: "输入框",
  },
  {
    id: "uuid-3",
    type: "Checkbox",
    label: "是否同意",
  },
];

const App: React.FC = () => {
  return (
    <>
      <ChatComponent/>
      <IconArrowDown />
      <AutoForm schema={formSchema} />
      <StockForecast />
      <ChatBot />
    </>
  );
};

export default App;
