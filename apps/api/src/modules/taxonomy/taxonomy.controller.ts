import {Controller,Get} from "@nestjs/common";import {ApiTags} from "@nestjs/swagger";
const localities=["Hadapsar","Manjari","Shewalewadi","Fursungi","Kadamwak Wasti","Loni Kalbhor","Uruli Kanchan","Pune City"];
@ApiTags("Taxonomy")@Controller()export class TaxonomyController{@Get("locations")locations(){return{data:localities.map((name,index)=>({name,slug:name.toLowerCase().replaceAll(" ","-"),priority:index+1,active:true}))}}@Get("categories")categories(){return{data:[]}}}
