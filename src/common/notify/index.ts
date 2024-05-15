import { notifications } from "@mantine/notifications";

// type NotifyType {
//      message: string;

// }

export class NotifySystem {
  static success = (message: string) => {
    notifications.show({
      message: message,
      title: "Successfully",
      color: "green",
    });
  };

  static error = (message: string) => {
    notifications.show({
      message: message,
      title: "Error",
      color: "red",
    });
  };

  static warn = (message: string) => {
    notifications.show({
      message: message,
      title: "Warn",
      color: "yellow",
    });
  };
}
