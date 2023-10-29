import { postData, authToken } from "./axiosAPI";

interface User {
  email: RegExp;
  password: string;
}

export async function signup(user: User) {
  try {
    const response = await postData<User>("/user/signup", user);

    const { data, error } = response;
    if (error !== null) throw new Error(error);

    authToken("add", data as string);
  } catch (error) {
    console.error(error);
  }
}

export async function login(user: User) {
  try {
    const response = await postData<User>("/user/login", user);

    const { data, error } = response;
    if (error !== null) throw new Error(error);

    authToken("add", data as string);
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  authToken("remove");
}

export async function getCurrentUser() {
  //   const { data: session } = await supabase.auth.getSession();
  //   if (!session.session) return null;

  //   const { data, error } = await supabase.auth.getUser();

  //   if (error) throw new Error(error.message);

  //   return data?.user;
  return "tst";
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
