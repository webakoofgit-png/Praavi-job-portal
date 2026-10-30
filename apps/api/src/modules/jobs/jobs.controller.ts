import {Controller,Get,Param,Query} from "@nestjs/common";import {ApiOperation,ApiQuery,ApiTags} from "@nestjs/swagger";
@ApiTags("Jobs")@Controller("jobs")export class JobsController{
 @Get()@ApiOperation({summary:"Search approved, active jobs"})@ApiQuery({name:"page",required:false})search(@Query("page")page="1",@Query("limit")limit="20"){return{data:[],meta:{page:Number(page),limit:Math.min(Number(limit),50),total:0},message:"No production jobs. Development seed data is served only by the web preview."}}
 @Get(":slug")@ApiOperation({summary:"Get an approved job by slug"})one(@Param("slug")slug:string){return{data:null,slug,message:"Job not found"}}
}
