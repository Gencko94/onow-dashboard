import { UseFormSetError } from "react-hook-form";

import { useMutation, useQueryClient } from "react-query";
import { useHistory, useLocation } from "react-router";
import { LOGIN_FORM } from "../../interfaces/auth/auth";
import { userLogin } from "../../utils/queries";

interface IProps {
  setError: UseFormSetError<LOGIN_FORM>;
}

export const useLogin = ({ setError }: IProps) => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const location = useLocation<{ state: string }>();

  const { mutateAsync, isLoading } = useMutation(userLogin, {
    onSuccess: (data) => {
      localStorage.setItem("dshtid", data.result.token);
      queryClient.setQueryData("auth", data.result.userInfo);
      history.replace(location.state ?? "/dashboard");
      if (location.state) {
        history.push(location.state);
      } else {
      }
    },
  });

  return { mutateAsync, isLoading };
};
