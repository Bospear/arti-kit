import { Button } from "../button"
import { ButtonProps } from "../button";

export default {
  title: "Components/Button",
  component: Button,
};

export const Default = (args: ButtonProps) => <Button {...args} />;
Default.args = {
  label: "Click Me",
  onClick: () => alert("Button clicked!"),
};