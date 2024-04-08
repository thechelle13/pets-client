import { useEffect, useState } from "react"

export const PetList = ({ pets, fetchPets, showAll }) => {
    const [pets, setPets] =useState([])
    useEffect(() => {
        fetchPets(showAll)
    }, [showAll])

 

    const displayPets = () => {
        if (pets && pets.length) {

            return pets.map(pet => (
                <div key={`key-${pet.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                   
                    <div>In the heart, my pets: {pet.name}{pet.image_url}</div>
                    
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