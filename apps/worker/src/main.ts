import {Worker} from "bullmq";import IORedis from "ioredis";
const url=process.env.REDIS_URL;if(!url){console.info("Praavi worker idle: REDIS_URL is not configured. Resume parsing, alerts, and notifications are disabled.");process.exit(0)}
const connection=new IORedis(url,{maxRetriesPerRequest:null});
new Worker("resume-parsing",async job=>{return{resumeId:job.data.resumeId,status:"adapter-not-configured"}},{connection});
new Worker("notifications",async()=>({status:"provider-not-configured"}),{connection});
console.info("Praavi workers started.");
