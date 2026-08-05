export type User = {
  id: string;
  name: string;
  coupleId?: string;
  coupleCode?: string;
  partnerId?: string;
  partnerName?: string;
};




export function getCurrentUser(): User {


  if (typeof window === "undefined") {

    return {
      id: "",
      name: "",
    };

  }



  const saved =
    localStorage.getItem("currentUser");



  if (!saved) {

    return {
      id: "",
      name: "",
    };

  }




  try {


    return JSON.parse(saved);



  } catch {


    return {
      id: "",
      name: "",
    };


  }


}







export function setCurrentUser(
  user: User
) {


  localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
  );


}






export async function createUser(
  user: User
) {


  const response =
    await fetch("/api/users", {

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:
        JSON.stringify(user),

    });



  return await response.json();


}






export async function getUsers() {


  const response =
    await fetch("/api/users");


  return await response.json();


}







export async function updateUser(
  user: User
) {


  const response =
    await fetch("/api/users", {

      method:"PUT",

      headers:{
        "Content-Type":"application/json",
      },

      body:
        JSON.stringify(user),

    });



  return await response.json();


}