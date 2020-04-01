// pack html,css,js into a single html for easy sharing 2020.2.6
// string to be eval() enclosed with __


const fs=require('fs'); 
const indexhtml=fs.readFileSync('index.html','utf8');

var out=indexhtml;
out=out.replace(/<link href="(.+)" rel="stylesheet">/g,function(m,fn){
	const stylesheet=fs.readFileSync(fn,'utf8');
	console.log("packing stylesheet",fn,'\tlength',stylesheet.length);
	return "<style>\n"+stylesheet+"\n</style>";
});

out=out.replace(/<script src="(.+)"><\/script>/g,function(m,fn){
	const js=fs.readFileSync(fn,'utf8');
	console.log("packing javascript",fn,'\tlength',js.length);
	return "<script><!--\n"+js+"\n//--></script>";
});

const buildver=(new Date().toISOString()).substr(2,8).replace(/-/g,'');
out=out.replace(/__(.+)__/,(m,m1)=>eval(m1));

const outfilename="rubychant"+buildver+".html";
const written=fs.writeFileSync(outfilename,out,'utf8');
console.log("\noutput filename\t",outfilename,'\tlength',out.length);