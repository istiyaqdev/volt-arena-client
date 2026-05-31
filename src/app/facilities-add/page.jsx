import AddFacilityForm from "@/Components/Facilities/AddFacilityForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  return {
    title: "VoltArena | Add Facility",
  };
}
const AddFacilities = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <div className="w-11/12 mx-auto my-9">
      <div className="md:w-1/2 mx-auto">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
          Add a Facility
        </h1>
        <p className="text-slate-400">
          Reach thousands of players in your city.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mt-9 border border-slate-800 bg-[#0b0f19] rounded-2xl shadow-xl p-6">
        <AddFacilityForm userId={user?.id} />
      </div>
    </div>
  );
};

export default AddFacilities;
