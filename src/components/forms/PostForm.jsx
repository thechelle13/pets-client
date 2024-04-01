import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker";

export const PostForm = ({ fetchPosts }) => {
    const initialPostState = {
        description: "",
        city: "",
        sitStartDate: new Date(),
        sitEndDate: new Date()
    }

    
    const [post, updatePostProps] = useState(initialPostState)
    const navigate = useNavigate()



    const addPost = async (evt) => {
        evt.preventDefault()

        await fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("pet_token")).token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })

        await fetchPosts()

        navigate("/posts")
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={() => { }}>
                    <h1 className="text-3xl">Add a Post</h1>
                    <fieldset className="mt-4">
                        <label htmlFor="post">Description:</label>
                        <input id="post" type="text"
                            onChange={e => {
                                const copy = { ...post }
                                copy.name = e.target.value
                                updatePostProps(copy)
                            }}
                            value={post.description} className="form-control" />
                    </fieldset>

                    <fieldset className="mt-4">
                        <label htmlFor="city">City:</label>
                        <input id="city" type="text"
                            onChange={e => {
                                const copy = { ...post }
                                copy.city = e.target.value
                                updatePostProps(copy)
                            }}
                            value={post.city} className="form-control" />
                    </fieldset>


                    <fieldset className="mt-4">
                        <label htmlFor="sitStartDate"> Start Date: </label>
                      
                        <input id="sitStartDate" className="form-control"
                            onChange={e => {
                                const copy = { ...post }
                                copy.sitStartDate = parseInt(e.target.value)
                                updatePostProps(copy)
                            }}>
                           
                        </input>
                    </fieldset>

                    <fieldset className="mt-4">
                        <label htmlFor="sitEndDate"> End Date: </label>
                       
                        <select id="sitEndDate" className="form-control"
                            onChange={e => {
                                const copy = { ...rock }
                                copy.sitEndDate = parseInt(e.target.value)
                                updatePostProps(copy)
                            }}>
                            
                        </select>
                    </fieldset>



                    <fieldset>
                        <button type="submit"
                            onClick={addPost}
                            className="button rounded-md bg-blue-700 text-blue-100 p-3 mt-4">
                            Add a Post
                        </button>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}