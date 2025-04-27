import { StoryFn, Meta } from "@storybook/react";
import { Input } from "./input";

export default {
  title: "Componentes Básicos/Input",
  component: Input,
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Texto de ejemplo",
};
