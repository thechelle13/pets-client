import { useEffect } from "react"

export const PetList = ({ pets, fetchPets, showAll }) => {
    useEffect(() => {
        fetchPets(showAll)
    }, [showAll])

    const handleDelete = async () => {
        // deletion logic here

         await fetch(`http://localhost:8000/pets/${pet.id}`, {
             method: "DELETE",
            headers: {
                 Authorization: `Token ${JSON.parse(localStorage.getItem("pet_token")).token}`
             }
         });
              if (response.status === 204) {
              fetchPets(showAll)
             }
        
    };


    const displayPets = () => {
        if (pets && pets.length) {

            return pets.map(pet => (
                <div key={`key-${pet.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                    {pet.name} ({pet.type.label})
                    <div>In the heart, my pets: {pet.user && pet.user.first_name}{pet.user && pet.user.last_name}</div>
                    <button onClick={async () => {
                        const response = 
                        await fetch(`http://localhost:8000/pets/${pet.id}`, {
                            method: "DELETE",
                            headers: {
                                Authorization: `Token ${JSON.parse(localStorage.getItem("pet_token")).token}`
                            }
                        });
                             if (response.status === 204) {
                             fetchPets(showAll)
                            }
                        }}
                        className="bg-red-500 text-white p-2 mt-2 rounded-md"
                    >Delete</button>
                </div>
            ));
        }

        return <h3>Loading Pets...</h3>
    }

    return (
        <>
            <h1 className="text-3xl">Pet List</h1>
            {displayPets()}
        </>
    )
}