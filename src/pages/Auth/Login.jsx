import React, { useContext, useState } from "react";
import { Input  , Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetDataFromAPI } from "../../services/AuthAPI";
import { Navigate, useNavigate } from "react-router-dom";
import { LogInScheme } from "./scheme";
import { TokenContext } from "../../context/AuthContextComponent";


export default function Login() {
    
  const {isloggedin , setIsloggedin} = useContext(TokenContext)


  const {handleSubmit , register , formState:{errors , touchedFields  } , reset} =  useForm({
    defaultValues :{
      email:'',
      password:'',
    },
    resolver : zodResolver(LogInScheme),
    mode : 'onBlur',
  })

  const [ isLooding , setisLooding ] = useState(false)
  const [ErorrAPI , setErorrAPI] = useState(false)
  const [success , issuccess ] = useState(false)
  const Navigate = useNavigate()

    
  async function GetData(data){
    
    setisLooding(true)
    const respons =  await GetDataFromAPI(data)
    setisLooding(false)
    if(respons.message){
      setErorrAPI(false)

      localStorage.setItem('token' , respons.token)
      setIsloggedin(Boolean(localStorage.getItem('token')))
      issuccess(respons.message)

      Navigate('/')
      reset()
    }else{
      issuccess(false)
      setErorrAPI(respons.error)
    }

  }

  
  return (
    <>
      <div className="sm:w-3/4 md:w-1/2  shadow-2xl p-10 rounded-2xl mx-auto mt-30 ">
        <h1 className="text-4xl  pt-3">LOGIN</h1>

      <form onSubmit={handleSubmit(GetData)} >

        <Input isInvalid={Boolean(errors.email)  & touchedFields.email } errorMessage={errors.email?.message}  validate={"bordered"} className="my-6" label="Email" type="text" {...register("email")} />
        <Input isInvalid={Boolean(errors.password) & touchedFields.password  } errorMessage={errors.password?.message}  validate={"bordered"} className="my-6" label="Password" type="password" {...register("password")} />

        <Button isLoading={isLooding}  type="submit" className="my-10 w-1/2" color="primary">Log In</Button>
        {ErorrAPI && <span className="block text-red-600">{ErorrAPI}</span> }
        {success && <span className="block text-green-500" >{success}</span> }
      </form>
      <p> Dont Have Account yet! <span className="text-blue-600 cursor-pointer" onClick={ ()=>{ Navigate('/Register') }  }>Register</span> </p>

      </div>
    </>
  );
}
