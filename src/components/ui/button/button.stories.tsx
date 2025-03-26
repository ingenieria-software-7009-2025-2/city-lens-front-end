import { StoryFn, Meta } from "@storybook/react";
import { Button } from "./button";

export default {
  title: "Componentes Básicos/Botón Básico",
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

// Nota: los nombres (al menos al 24/03/2025), no pueden ser en español.
export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "Botón Primario",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  children: "Botón Secundario",
};

export const Submit = Template.bind({});
Submit.args = {
  type: "submit",
  children: "Botón Submit",
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  className: "custom-class",
  children: "Botón con Clase Personalizada",
};
