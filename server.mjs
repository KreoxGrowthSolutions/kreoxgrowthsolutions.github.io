import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const types={'.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.mp4':'video/mp4','.jpg':'image/jpeg','.jpeg':'image/jpeg'};
http.createServer(async(req,res)=>{try{
 const url=new URL(req.url,'http://localhost');
 const relative=url.pathname==='/'?'index.html':decodeURIComponent(url.pathname).replace(/^\/+/, '');
 const file=path.resolve(root,relative);
 if(!file.startsWith(root+path.sep)||relative.split(/[\\/]/).some(p=>p.startsWith('.'))){res.writeHead(403);res.end('Forbidden');return}
 const info=await stat(file);const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes'};
 let start=0,end=info.size-1,status=200;
 if(req.headers.range){
  const m=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
  if(!m||(!m[1]&&!m[2])){res.writeHead(416,{'Content-Range':'bytes */'+info.size});res.end();return}
  start=m[1]?Number(m[1]):Math.max(0,info.size-Number(m[2]));
  end=m[1]&&m[2]?Math.min(Number(m[2]),info.size-1):info.size-1;
  if(start>end||start>=info.size){res.writeHead(416,{'Content-Range':'bytes */'+info.size});res.end();return}
  status=206;headers['Content-Range']=`bytes ${start}-${end}/${info.size}`;
 }
 headers['Content-Length']=end-start+1;res.writeHead(status,headers);
 if(req.method==='HEAD'){res.end();return}
 const stream=createReadStream(file,{start,end});stream.on('error',()=>res.destroy());res.on('close',()=>stream.destroy());stream.pipe(res);
}catch{if(!res.headersSent){res.writeHead(404,{'Content-Type':'text/html'});res.end(await readFile(path.join(root,'404.html')))}else res.destroy()}
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
