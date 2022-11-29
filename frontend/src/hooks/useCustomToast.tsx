import { AlertStatus, ToastPosition, useToast } from "@chakra-ui/react";

export interface userCustomToastOptions {
  title: string;
  message?: string;
  position?: ToastPosition;
  duration?: number;
  status?: AlertStatus;
  isClosable?: boolean;
}

const useCustomToast = ({
  title,
  message,
  position = "top",
  duration = 5000,
  status = "success",
  isClosable = true,
}: userCustomToastOptions) => {
  const toast = useToast();
  const displayToast = () => {
    if (!toast.isActive(title)) {
      toast({
        id: title,
        position: position,
        title: title,
        description: message,
        status: status,
        duration: duration,
        isClosable: isClosable,
      });
    }
  };
  return displayToast;
};

export default useCustomToast;
