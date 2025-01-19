import { getAuthUser, getOrCreateDbUser, fetchUserLatestPosts } from "../utils/actions";
import ProfileContent from "./ProfileContent";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const authUser = await getAuthUser();
  if (!authUser) redirect("/");
  
  const dbUser = await getOrCreateDbUser(authUser);
  const latestPosts = await fetchUserLatestPosts(dbUser.id);

  // Extract only the necessary data from the Clerk user object
  const serializedUser = {
    firstName: authUser.firstName,
    lastName: authUser.lastName,
    username: authUser.username,
    imageUrl: authUser.imageUrl,
  };

  // Extract only the necessary data from the database user object
  const serializedDbUser = {
    id: dbUser.id,
    date: dbUser.date,
    email: dbUser.email,
    username: dbUser.username,
  };

  return <ProfileContent 
    initialUser={serializedUser} 
    initialDbUser={serializedDbUser} 
    initialPosts={latestPosts} 
  />;
};

export default ProfilePage;
