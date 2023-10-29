import { postData, fetchData } from "./axiosAPI";

interface User {
  email: RegExp;
  password: string;
}

class Info {
  id!: number;
  name!: string | null;
  picture!: string | null;
  email!: string;
  is_verified!: number;
}

export async function signup(user: User) {
  try {
    const response = await postData<User>("/user/signup", user);

    const { data, error } = response;
    if (error !== null) throw new Error(error);

    localStorage.setItem("jwtToken", data as string);
  } catch (error) {
    console.error(error);
  }
}

export async function login(user: User) {
  try {
    const response = await postData<User>("/user/login", user);

    const { data, error } = response;
    if (error !== null) throw new Error(error);

    localStorage.setItem("jwtToken", data as string);
    return getCurrentUser();
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  localStorage.removeItem("jwtToken");
}

export async function getCurrentUser() {
  try {
    const response = await fetchData("/user/user");

    const { data, error } = response;
    if (error !== null) throw new Error(error);

    return data as Info;
  } catch (error) {
    console.error(error);

    return new Info();
  }
}

// export async function updateCurrentUser({ password, fullName, avatar }) {
//   //1. update passowrd or fullname

//   let updateData;
//   if (password) updateData = { password };
//   if (fullName) updateData = { data: { fullName } };

//   const { data, error } = await supabase.auth.updateUser(updateData);

//   if (error) throw new Error(error.message);

//   if (!avatar) return data;

//   //2. upload the avator image
//   const fileName = `avatar-${data.user.id}-${Math.random()}`;

//   const { error: storageError } = await supabase.storage
//     .from("avatars")
//     .upload(fileName, avatar);

//   if (storageError) throw new Error(storageError.message);

//   // 3. update avatar in the user

//   const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
//     data: {
//       avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
//     },
//   });

//   if (error2) throw new Error(error2.message);

//   return updatedUser;
// }
