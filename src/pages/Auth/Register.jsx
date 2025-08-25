import React, { useState } from "react";
import { Input , Select, SelectItem , DatePicker , Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendToDataAPI } from "../../services/AuthAPI";
import { Navigate, useNavigate } from "react-router-dom";
import { RegisterScheme } from "./scheme";


export default function Register() {
    
  
  const {handleSubmit , register , formState:{errors , touchedFields , dirtyFields } , reset} =  useForm({
    defaultValues :{
      name: '',
      email:'',
      password:'',
      rePassword:'',
      dateOfBirth:'',
      gender:'',
    },
    resolver : zodResolver(RegisterScheme),
    mode : 'onBlur',
  })

  const [ isLooding , setisLooding ] = useState(false)
  const [ErorrAPI , setErorrAPI] = useState(false)
  const [success , issuccess ] = useState(false)
  const Navigate = useNavigate()

  async function sendData(data){
    
    setisLooding(true)
    const respons =  await SendToDataAPI(data)
    setisLooding(false)
    
    if(respons.message){
      issuccess(respons.message)
      setErorrAPI(false)
      Navigate('/Login')
      reset()
    }else{
      issuccess(false)
      setErorrAPI(respons.error)
    }

  }

  
  return (
    <>
      <div className="sm:w-3/4 md:w-1/2 shadow-2xl p-10 rounded-2xl mx-auto ">
        <h1 className="text-4xl  pt-3">Register</h1>

      <form className="" onSubmit={handleSubmit(sendData)} >
        <Input isInvalid={Boolean(errors.name) & touchedFields.name  } errorMessage={errors.name?.message} validate={"bordered"} className="my-6" label="Name" type="text" {...register("name")} />
        <Input isInvalid={Boolean(errors.email) & touchedFields.email  } errorMessage={errors.email?.message}  validate={"bordered"} className="my-6" label="Email" type="text" {...register("email")} />
        <Input isInvalid={Boolean(errors.password)  & touchedFields.password  } errorMessage={errors.password?.message}  validate={"bordered"} className="my-6" label="Password" type="password" {...register("password")} />
        <Input isInvalid={Boolean(errors.rePassword)  & touchedFields.rePassword  } errorMessage={errors.rePassword?.message} validate={"bordered"} className="my-6" label="Confirm Password" type="password" {...register("rePassword")} />

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">

            <Input isInvalid={Boolean(errors.dateofbirth) & touchedFields.dateOfBirth } errorMessage={errors.dateofbirth?.message} validate={"bordered"} className="max-w-xs" label="Date of Burth" type="date" {...register("dateOfBirth")} />

            <Select  isInvalid={Boolean(errors.gender?.message) & touchedFields.gender} errorMessage={errors.gender?.message} className="max-w-xs" label="Gender" {...register("gender")}>
               <SelectItem key={'male'}>Male</SelectItem>
               <SelectItem key={'female'}>Female</SelectItem>
            </Select>
        </div>
        <Button isLoading={isLooding}  type="submit" className="my-10 w-1/2" color="primary">Register</Button>
        {ErorrAPI && <span className="block text-red-600">{ErorrAPI}</span>}
        {success && <span className="block text-green-500" >{success}</span>}
      </form>
            <p> Have Already an Account ? <span className="text-blue-600 cursor-pointer" onClick={ ()=>{ Navigate('/Login') }  }>LogIn</span> </p>
      </div>
    </>
  );
}
