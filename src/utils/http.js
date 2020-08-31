import {get,post} from "@/utils/axios"

export const login = data => post("/user/login",data)
export const getTree = data => get("/dataOrder/getDestName")