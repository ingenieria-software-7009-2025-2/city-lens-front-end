import { Meta, StoryFn } from "@storybook/react";
import Nav from "./nav";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export default {
  title: "Componentes Moleculares/Nav",
  component: Nav,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    logout: {
      action: "logout",
    },
    onClick: {
      action: "onClick",
      description:
        "Abre el menu de edición de información o de cierre de sesión",
    },
  },
  tags: ["autodocs"],
  args: {
    logout: () => console.log("Logout triggered"),
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            logout: () => console.log("Logout triggered"),
          }}
        >
          {Story()}
        </AuthContext.Provider>
      </BrowserRouter>
    ),
  ],
} as Meta<typeof Nav>;

const Template: StoryFn<typeof Nav> = () => <Nav />;

export const Default = Template.bind({});
