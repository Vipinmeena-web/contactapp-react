import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const getlocaldata=()=>{
   let  contact=localStorage.getItem("Contacts")
    // console.log(contact)
   
   if(contact){
    return JSON.parse(contact)
   }
   else{
    return []
   }
  }
const app=()=>{


  const[name,setname]=  useState("")
  const[email,setemail]=useState("")
  const[number,setnumber]=useState("")
  // const [image, setImage] = useState(""); // State to store image URL
   const[main,setmain]=useState(getlocaldata())
   const[editindex,seteditindex]=useState(null)   // Track the index of the contact being edited


  
// PAGENATION STATE
const [currentPage, setCurrentPage] = useState(1);// Start on page 1
const [contactsPerPage] = useState(20); // Number of contacts per page



  // Calculate the index range for the current page
 
const indexOfLastContact = currentPage * contactsPerPage;
const indexOfFirstContact = indexOfLastContact - contactsPerPage;
const currentContacts = main.slice(indexOfFirstContact, indexOfLastContact);


    
   const funname=(e)=>{
    setname( e.target.value)
// console.log(name)
}
const funnumber=(e)=>{
  setnumber( e.target.value)
  // console.log(number)
}

const funemails=(e)=>{
    setemail( e.target.value)
    // console.log(email)
  }
//  Image upload to Cloudinary
//  const uploadImage = async (event) => {
//   const file = event.target.files[0];
//   const formData = new FormData();
//   // localStorage.setItem("file", file)
//   formData.append("file", file);
//   formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

//   try {
//     const response = await axios.post(
//       `https://fakestoreapi.com/users`, // Replace with your Cloudinary cloud name
//       formData
//     );
//     setImage(response.data.secure_url); // Set the image URL returned by Cloudinary
//   } catch (error) {
//     console.error("Error uploading image:", error);
//   }
// };
  const deletehandeler=(i)=>{
    const copytask=[...main]
    copytask.splice(i,1)
    setmain(copytask)
   // console.log("hello")
}

 
const edithandelar=(i)=>{
  seteditindex(i)  // // Set the index of the contact being edited
  setname (main[i].name); // Pre-fill the name input field
  setemail(main[i].email); // Pre-fill the email input field
};

const submithandlar=(e)=>{
  e.preventDefault()
  if(name.trim() && email.trim()&& number.trim()){// IT ENSURE THAT name AND emil   ARE NOT EMPTY 
    if (editindex !== null) {
      // If we are editing an existing contact, update it
      const updatedMain = [...main];
      updatedMain[editindex] = { name, email };
      setmain(updatedMain);
      seteditindex(null) // Reset editingIndex after updating
    } else {
      // Otherwise, add a new contact
      setmain([...main, { name,number, email }]);
    }
 

 
  setname(""); // Clear input fields
  setemail(""); // Clear input fields
  setnumber('')
}
}

  let contactdata=<h2 className="text-xl font-bold">No Task</h2>
  if(main.length>0){
    contactdata=currentContacts.map((e,i) => {
     return(
       <li className="list-decimal" key={i} ><div className="flex justify-between text-center text-2xl font-bold my-2">
         
         <h5  
             style={{
               whiteSpace: "normal", // Allow wrapping
               wordWrap: "break-word", // Break words if necessary
               overflow: "hidden", // Hide overflow content
               textOverflow: "ellipsis", // Add ellipsis for overflow text
             }}>{e.name}</h5>
              <h5  
             style={{
               whiteSpace: "normal", // Allow wrapping
               wordWrap: "break-word", // Break words if necessary
               overflow: "hidden", // Hide overflow content
               textOverflow: "ellipsis", // Add ellipsis for overflow text
             }}>{e.number}</h5>
        <h6  
             style={{
               whiteSpace: "normal", // Allow wrapping
               wordWrap: "break-word", // Break words if necessary
               overflow: "hidden", // Hide overflow content
               textOverflow: "ellipsis", // Add ellipsis for overflow text
             }}>{e.email}</h6></div>
        <button onClick={deletehandeler }  className="bg-red-500 text-white px-4 py-2 rounded mr-5  w-28">Delete</button>
        <button onClick={() =>edithandelar(i)}  className="bg-green-500 text-white px-4 py-2 rounded w-28">Edit</button>
   </li> 
     )
    })
   }





  // Pagination Controls
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(main.length / contactsPerPage); i++) {
    pageNumbers.push(i);
  }

  

  const handlerPageChange = (pageNumber) => {
    if (pageNumber>= 1 && pageNumber <= pageNumbers.length) {
      setCurrentPage(pageNumber);
    }
   
  };
  
  

   useEffect(()=>{
      localStorage.setItem("Contacts",JSON.stringify(main))
   },[main])

    
  return(
    <> 

    <form action="" onSubmit={submithandlar} >
    < div className=" w-full  flex  flex-col mx-auto mt-20 sm:w-3/4 md:w-1/2  ">
    <div className="flex  items-center    mb-3">
      <img className="w-[100px] h-[60px] ml-[16%] "  src="https://png.pngtree.com/png-clipart/20191122/original/pngtree-presenter-icon-cartoon-style-png-image_5188409.jpg"/>
      <h1 className="text-3xl font-bold">CONTACT FORM</h1></div>
     <div>
     <input type="text" placeholder="enter name" className="border-solid border-2 w-full mb-2 p-1"
     onChange={funname}
       value={name} />
        <input type="text" placeholder="enter number" className="border-solid border-2 w-full mb-2 p-1"
     onChange={funnumber}
       value={number} />
     <input value={email} onChange={funemails} type="email" placeholder="enter email" className="border-solid border-2 w-full mb-2 p-1" /> 
         {/* Image Upload Input */}
             {/* <input type="file" className="border-solid border-2 w-full mb-2 p-1" onChange={uploadImage} /> */}
         

     <button className="w-full bg-purple-700 text-white text-2xl mb-2">  Add Contact</button></div>

    </div>
    </form>
    <div className=" w-1/2 flex flex-col m-auto ">
      <ul>   {contactdata}</ul>



 {/* //   Pagination Buttons  */}
      
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlerPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlerPageChange(number)}
              className={`px-4 py-2 rounded mr-2 ${
                number === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlerPageChange(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Next
          </button>
        </div> 



      
    </div>
     </>
  )
}

export default app





