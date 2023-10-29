import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from '../../services/apiAuth';
import { toast } from "react-hot-toast";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: loginApi,
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user);
            navigate("/", { replace: true })
        },
        onError: () => {
            toast.error('Provided email or password are incorrect');
        }
    })
    return { login, isLoading }
}