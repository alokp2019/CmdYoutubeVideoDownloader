const query = require('ytdl-getinfo')
const express = require('express');
const ytdl = require('ytdl-core')
const app = express();
const fs = require('fs');
const rl = require('readline');



    	// Prompting the users to enter command line arguments
   let cmd_prompt = rl.createInterface(process.stdin, process.stdout);
        cmd_prompt.question('Please Input a Youtube URL or a search query\n', (res)=>{
      if(!res)
   	     return

      query.getInfo(res)
     .then((info)=>{
      return new Promise((resolve,reject)=> { //Promises to check and handle errors
      	let video_title = info.items[0].fulltitle;
	    let video_url = info.items[0].webpage_url;
	    if (!fs.existsSync('video_downloads/')) {
				// Create the downloads directory
				fs.mkdirSync('video_downloads');
			}

              //downloads the highest quality and names the title in the directory
			let outputStreams = ytdl(video_url, { quality: 'highest' }).pipe(
				fs.createWriteStream(`video_downloads/${video_title.replace(/[^0-9A-Za-z\s]+/gim, '')}.mp4`)
			);

			console.log('Downloading  completed.');
      	resolve();
      }) 	

       //catching the errors
     }).catch((error)=>{
       console.error(`Error retrieving info from URL.\n${error}`);
			return;
     })
})







    







app.listen(3010, ()=>{
	console.log('listening on the new port');
})