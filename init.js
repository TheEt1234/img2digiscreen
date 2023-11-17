Jimp = require("jimp")
fs = require("fs")
image=process.argv[2]

if(fs.lstatSync(image).isDirectory()){
    console.log(fs.readdir(image,{},(err,files)=>{
        for(let i=0;i<files.length;i++){
            if (files[i].endsWith(".txt")) return;
            if (err) throw err // do i have to do this..... UGH NODE IS HELL, literally catch(err) throw err but library so its somehow ok???
      
            Jimp.read(image+"/"+files[i], (err,p)=>{
                if (err) throw err; // WAAWAWHHLKJUJKL I HATE THIS
                fs.writeFile("./"+image+"/"+files[i]+".txt",thing(p,"screen"+i), err=>{if (err) throw err})
            });    
      
        } 
    }))
}else{
    Jimp.read(image, (err,p)=>{
        if (err) throw err;
        p.resize(16,16)
        fs.writeFile("./"+image+".txt",thing(p,"screen0"), err=>{if (err) throw err})
    })
}
function thing(image,screen){
    iterations=0

    code=`--Generated with frog's img2digiscreen\nif event.type=='program' then mem.${screen}={{ `
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        iterations=iterations+1



        if (x == 0 && y != 0) {
            code=code+"},"
            code=code+`{ `
        }
        var r = this.bitmap.data[idx + 0];
        var g = this.bitmap.data[idx + 1];
        var b = this.bitmap.data[idx + 2];
        var _a = this.bitmap.data[idx + 3];
        code=code+`"${rgbToHex(r,g,b)}",`
      });
    code=code+"}} end\n"
    
    code=code+"if event.type=='program' then "
    code=code+`digiline_send("${screen}",mem.${screen})`
    code=code+" end\n"
    return code
}

function rgbToHex(r, g, b) {
    const red = r.toString(16).padStart(2, '0');
    const green = g.toString(16).padStart(2, '0');
    const blue = b.toString(16).padStart(2, '0');
    return `${red}${green}${blue}`;
}