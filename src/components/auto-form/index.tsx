import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Switch,
  Radio,
  Cascader,
  InputNumber,
  Rate,
  Slider,
  Upload,
  DatePicker,
} from "@arco-design/web-react";
const componentMap: { [key in string]: any } = {
  Input: Input,
  Select,
  Checkbox,
  Switch,
  Radio,
  Cascader,
  InputNumber,
  Rate,
  Slider,
  Upload,
  DatePicker,
};

export interface JsonSchema {
  id: string;
  type: string;
  label: string;
  defaultValue?: any;
  options?: Array<{ label: string; value: any }>;
  validations?: Array<{ rule: string; message: string }>;
  trigger?: Array<Trigger>;
  dependencies?: Array<Dependency>;
}

interface Trigger {
  event: string;
  actions: Array<{
    target: string;
    actionType: "enable" | "disable" | "show" | "hide" | "setValue";
    value?: any;
  }>;
}

interface Dependency {
  source: string;
  condition: {
    operator: "==" | "!=" | ">" | "<" | ">=" | "<=";
    value: any;
  };
  actions: Array<{
    actionType: "enable" | "disable" | "show" | "hide" | "setValue";
    value?: any;
  }>;
}

const AutoForm = ({ schema }: { schema: JsonSchema[] }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const initialVisibility: Record<string, boolean> = {};
    schema.forEach((item) => {
      initialVisibility[item.id] = true; // 默认所有组件可见
    });
    setVisibilityMap(initialVisibility);
  }, [schema]);

  const handleValueChange = (id: string, value: any) => {
    const updatedData = { ...formData, [id]: value };
    setFormData(updatedData);

    schema.forEach((item) => {
      if (item.trigger) {
        item.trigger.forEach((trigger) => {
          if (trigger.event === "change") {
            trigger.actions.forEach((action) => {
              if (
                action.actionType === "setValue" &&
                action.target in updatedData
              ) {
                setFormData((prev) => ({
                  ...prev,
                  [action.target]: action.value,
                }));
              }
              if (
                action.actionType === "show" ||
                action.actionType === "hide"
              ) {
                setVisibilityMap((prev) => ({
                  ...prev,
                  [action.target]: action.actionType === "show",
                }));
              }
            });
          }
        });
      }

      if (item.dependencies) {
        item.dependencies.forEach((dependency) => {
          if (updatedData[dependency.source] !== undefined) {
            const conditionMet = eval(
              `${updatedData[dependency.source]} ${
                dependency.condition.operator
              } ${dependency.condition.value}`
            );
            if (conditionMet) {
              dependency.actions.forEach((action) => {
                if (
                  action.actionType === "setValue" &&
                  action.value !== undefined
                ) {
                  setFormData((prev) => ({ ...prev, [item.id]: action.value }));
                }
                if (
                  action.actionType === "show" ||
                  action.actionType === "hide"
                ) {
                  setVisibilityMap((prev) => ({
                    ...prev,
                    [item.id]: action.actionType === "show",
                  }));
                }
              });
            }
          }
        });
      }
    });
  };

  return (
    <Form>
      {schema.map((item) => {
        if (!visibilityMap[item.id]) return null;
        const Component = componentMap[item.type as string] as any;
        if (!Component) return null;

        return (
          <Form.Item key={item.id} label={item.label}>
            <Component
              {...(item.options && { options: item.options })}
              value={formData[item.id]}
              onChange={(value: any) => handleValueChange(item.id, value)}
            />
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default AutoForm;
