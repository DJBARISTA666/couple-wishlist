export type User = {
  id: string;
  name: string;
  coupleId?: string;
  coupleCode?: string;
  partnerId?: string;
  partnerName?: string;
};


export function getCurrentUser(): User | null {

  if (typeof window === "undefined") {
    return null;
  }

  const saved = localStorage.getItem("currentUser");

  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}



export function setCurrentUser(user: User) {

  localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
  );

}



export async function createUser(user: User) {

  const response = await fetch("/api/users", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),

  });


  const data = await response.json();


  if (!response.ok) {

    console.error("CREATE USER ERROR:", data);

    throw new Error(
      data.error || "User create failed"
    );

  }


  return data;

}



export async function getUser(id:string) {


  const response = await fetch(
    `/api/users?id=${id}`
  );


  const data = await response.json();


  if(!response.ok){

    throw new Error(
      data.error || "User fetch failed"
    );

  }


  return data;


}