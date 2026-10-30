import {Body,Controller,Post} from "@nestjs/common";import {IsEmail,IsIn,IsString,Length} from "class-validator";import {ApiTags} from "@nestjs/swagger";
class ContactDto{@IsString()@Length(2,100)name!:string;@IsEmail()email!:string;@IsIn(["general","safety","employer-support","report"])topic!:string;@IsString()@Length(20,3000)message!:string}
@ApiTags("Contact")@Controller("contact")export class ContactController{@Post()submit(@Body()dto:ContactDto){return{accepted:true,delivery:"not-configured",message:"Validated but not delivered: configure EMAIL_DRIVER credentials.",reference:null}}}
