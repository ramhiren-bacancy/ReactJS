import React, { useEffect, useRef, useState } from "react";

type FormData = {
  name: string;
  age: string;
  city: string;
  gender: string;
  outlook : string;
  interests: string[];
  email: string;
  password: string;
};

const Form = () => {
  const [data, setData] = useState<FormData>({
    name: "",
    age: "",
    city: "",
    gender: "",
    outlook: "",
    interests: [],
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");
  // const [tempPass, setTempPass] = useState("")
  const tempPass = useRef("")
  const confirmPassRef = useRef("") 
  const [validationMode, setValidationMode] = useState<"onChange" | "onBlur">("onChange");


 
  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    if (name.length < 2) {
      console.log("err");
      setErr("Name must be at least 2 characters long");
    } else {
      setErr("");
    }

  }

  function handleAge(e: React.ChangeEvent<HTMLInputElement>) {
    const age = e.target.value;
    console.log(age);
    const regex = /^\d+$/;
    if (!regex.test(age)) {
      setErr("You don't Enter a character in age field");
    }
    else if(Number(age) > 150){
      setErr("Enter Valid Age")
    } else {
      setErr("");
    }
  }

  function handleCity(e: React.ChangeEvent<HTMLSelectElement>) {
    const city = e.target.value;
    console.log(city);
    if (city == "") {
      setErr("Please Select City");
    } else {
      setErr("");
      setData((prevData) => ({
        ...prevData,
        city: city,
      }));
    }
  }

  function handleGender(e: React.ChangeEvent<HTMLInputElement>) {
    const gender = e.target.value;
    console.log(gender);

    setData((prevData) => ({
      ...prevData,
      gender: gender,
    }));
  }

  function handleInterest(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;

    setData((prev) => {
      if (checked) {
        return {
          ...prev,
          interests: [...prev.interests, value],
        };
      }

      return {
        ...prev,
        interests: prev.interests.filter((i) => i !== value),
      };
    });
  }

  function handleEmail(e:React.ChangeEvent<HTMLInputElement>){
    const email = e.target.value

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!emailRegex.test(email)){
        setErr("Please Enter Valid Email")
    }else{
        setErr("")
    }
  }

  function handleTempPass(e:React.ChangeEvent<HTMLInputElement>){
    const pass = e.target.value


    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/

    if (!pass) {
        setErr("Password is required")
    } 
    else if(!passwordRegex.test(pass)){
        setErr("Enter Strong Password (8+ chars, 1 uppercase, 1 number)")
    }
    else if(confirmPassRef.current && confirmPassRef.current !== pass){
      setErr("Your Confime Password Does not Match")
    }else{
        setErr("")

    }
  }


  function handlePass(e:React.ChangeEvent<HTMLInputElement>){
    const pass = e.target.value

    if (!pass) {
        setErr("Password is required")
    } 
    else if(pass !== tempPass.current){
        setErr("Confimed Password Does Not Match")
    }else{
        setErr("")
        setData((prevData)=>({
            ...prevData,
            password : pass
        }))
    }
  }

  function handleSubmit(e:React.FormEvent){
    e.preventDefault()
    if(err) return
    
    if(!data.name){
      setErr("Name is required")
    }else if(!data.age){
      setErr("Age is required")
    }else if(!data.city){
      setErr("City is required")
    }else if(!data.email){
      setErr("Email is required")
    }else if(!data.gender){
      setErr("Gender is required")
    }else if(data.interests.length === 0){
      setErr("Please select at least one interest")
    }else if(!data.password){
      setErr("Password is required")
    }else{
        setErr("")
        console.log("Form submitted successfully", data);
      }

  }




  useEffect(() => {
    console.log(data);
    console.log(validationMode)
  }, [data,validationMode]);

  return (
    <>
      <div className="border rounded p-12 bg-gray-700  border-gray-500 rounded-l">
        {err && <p className="text-red-500"> {err}</p>}
        <select  name="validationMode" value={validationMode}  onChange={(e) => setValidationMode(e.target.value as "onChange" | "onBlur")} className="text-black">
          <option value="onChange">On Change</option>
          <option value="onBlur">On Blur</option>
        </select>

        <form action="" className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="name" className="m-2">
            name
          </label>
          <input
            type="text"
            id="name"
            className="p-2 rounded border border-gray-400  focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
                setData(prev => ({ ...prev, name: e.target.value })) 
                if (validationMode === "onChange") handleName(e) 
            }}
            onBlur={(e) => {
              if (validationMode === "onBlur") handleName(e)
            }}
            required
          />

          <label htmlFor="age" className="m-2">
            Age :
          </label>
          <input
            type="text"
            id="age"
            className="p-2 rounded border border-gray-400  focus:outline-none focus:ring-2 focus:ring-blue-400"
            onInput={(e) => {
              if (e.currentTarget.value.length > 3) {
                e.currentTarget.value = e.currentTarget.value.slice(0, 3);
              }
            }}
            onChange={(e)=>{
              setData((prevData)=>({...prevData,age : e.target.value}))
              if(validationMode === "onChange") handleAge(e)
            }}
            onBlur={(e)=>{
              if(validationMode === "onBlur") handleAge(e)
            }}
            required
          />

          <label htmlFor="city" className="m-2">
            City
          </label>
          <select
            id="city"
            className="p-2 rounded border border-gray-400 text-black  focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleCity}
            required
          >
            <option value="">Select city</option>
            <option value="surat">Surat</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="rajkot">Rajkot</option>
            <option value="gandhinagar">Gandhinagar</option>
          </select>

          <p className="text-sm font-semibold m-2">Gender</p>
          <div className="flex flex-row gap-2">
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleGender}
              required
            />
            <label htmlFor="female">female</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleGender}
              required
            />   
          </div>

          {data.gender === "male" &&
            <select id="outlook" className="text-black" onChange={(e)=> setData(prev => ({ ...prev, outlook: e.target.value }))} required>
              <option value="">Select Outlook</option>
              <option value="beard">Beard</option>
              <option value="mustache">Mustache</option>
              <option value="clean-shaven">Clean Shaven</option>
            </select>
          }
          { data.gender === "female" &&
            <select id="outlook" className="text-black" onChange={(e)=> setData(prev => ({ ...prev, outlook: e.target.value }))} required>
              <option value="">Select Outlook</option>
              <option value="long-hair">Long Hair</option>
              <option value="short-hair">Short Hair</option>
              <option value="curly-hair">Curly Hair </option>
            </select>
          }


          <p className="font-semibold m-2">Interests :</p>
          <div className="flex flex-row gap-2">
            <label htmlFor="technology">Technology</label>
            <input type="checkbox" id="technology" value="technology" onChange={handleInterest}/>
            <label htmlFor="sports">Sports</label>
            <input type="checkbox" id="sports" value="sports" onChange={handleInterest} />
            <label htmlFor="music">Music</label>
            <input type="checkbox" id="music" value="music" onChange={handleInterest} />
            <label htmlFor="reading">Reading</label>
            <input type="checkbox" id="reading" value="reading" onChange={handleInterest} />
          </div>

          <label htmlFor="email" className="m-2">
            Email :
          </label>
          <input
            type="email"
            id="email"
            className="p-2 rounded border border-gray-400  focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              setData((prevData) => ({ ...prevData, email: e.target.value }))
              if(validationMode === "onChange") handleEmail(e)
            }}
            onBlur={(e)=>{
              if(validationMode === "onBlur") handleEmail(e)
            }}
            required
          />

          <label htmlFor="password" className="m-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="p-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>{
              tempPass.current = e.target.value
              if(validationMode === "onChange") handleTempPass(e)
            }}
            onBlur={(e)=>{
              if(validationMode === "onBlur") handleTempPass(e)
            }}
            required
          />

          <label htmlFor="cnf-password" className="m-2">
            Confime Password
          </label>
          <input
            type="password"
            id="cnf-password"
            className="p-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>{
              confirmPassRef.current = e.target.value
              if(validationMode === "onChange") handlePass(e)
            }}
            onBlur={(e)=>{
              if(validationMode === "onBlur") handlePass(e)
            }}
            required
          />

          <button type="submit" className="m-2">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Form;
