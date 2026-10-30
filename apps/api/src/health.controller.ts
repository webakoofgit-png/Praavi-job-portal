import {Controller,Get} from "@nestjs/common";import {ApiTags} from "@nestjs/swagger";
@ApiTags("System")@Controller("health")export class HealthController{@Get()check(){return{status:"ok",service:"praavi-api",providers:{email:process.env.EMAIL_DRIVER||"console-development",storage:process.env.STORAGE_DRIVER||"local-development"}}}}
