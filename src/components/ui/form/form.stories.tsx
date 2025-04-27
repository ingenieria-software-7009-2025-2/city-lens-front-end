import { StoryFn, Meta } from "@storybook/react";
import { Form } from "./form";

export default {
  title: "Componentes Básicos/Formulario",
  component: Form,
} as Meta<typeof Form>;

const Template: StoryFn<typeof Form> = (args) => <Form {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: "Formulario Básico",
};
