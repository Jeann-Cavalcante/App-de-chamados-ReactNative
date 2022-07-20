import { Button, IButtonProps, Text, useTheme, VStack } from "native-base";

type Props = IButtonProps & {
  title: string;
  isActive?: boolean;
  type: "open" | "close";
};
export function Filter({ title, isActive = false, type, ...rest }: Props) {
  return <VStack></VStack>;
}
