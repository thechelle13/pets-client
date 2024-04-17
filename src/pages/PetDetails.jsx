import { useEffect, useState } from "react";

export const PetDetails = () => {
    const [pet, setPet] = useState(null);

    useEffect(() => {
        // Fetch pet details here
    }, []);

    const displayPets = () => {
        if (pet) {
            return (
                <div className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                    <div><strong>Name:</strong> {pet.name}</div>
                    {pet.image_url && <img src={pet.image_url} alt={pet.name} className="w-48 h-48 mt-2" />}
                </div>
            );
        } else {
            return <h3>Loading Pet...</h3>;
        }
    };

    return (
        <>
            <h1 className="text-3xl">Pet Detail</h1>
            {displayPets()}
        </>
    );
};
